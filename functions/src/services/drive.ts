import { db, storage } from './init.js';
import type { FieldValue } from 'firebase-admin/firestore';

const PLAN_LIMITS = {
  free: 500 * 1024 * 1024, // 500MB
  bronze: 2 * 1024 * 1024 * 1024, // 2GB
  silver: 10 * 1024 * 1024 * 1024, // 10GB
  gold: 50 * 1024 * 1024 * 1024, // 50GB
  platinum: 100 * 1024 * 1024 * 1024, // 100GB
};

interface VdFile {
  id: string;
  title: string;
  type: 'file';
  icon: string;
  description?: string;
  ref: string; // Cloud Storage path
  isLocked: boolean;
  file: {
    size: number;
    mimeType: string;
    extension: string;
    uploadedAt: string;
  };
  meta?: Record<string, any>;
}

interface VdFolder {
  id: string;
  title: string;
  type: 'folder';
  icon: string;
  children: (VdFile | VdFolder)[];
  isLocked: boolean;
  meta?: Record<string, any>;
}

type VdNode = VdFile | VdFolder;

interface VirtualDrive {
  userId: string;
  version: number;
  index: Record<string, { title: string; parentId: string; path: string[] }>;
  storageUsed: number;
  storageLimit: number;
  root: VdFolder;
  trash: VdFolder;
  shared: VdFolder;
  favorites: VdFolder;
  recent: VdFolder;
}

function getMimeDetails(mime: string, ext: string) {
  const map: Record<string, { icon: string; desc: string }> = {
    'application/json': { icon: 'mdi-code-json', desc: 'JSON File' },
    'application/pdf': { icon: 'mdi-file-pdf-box', desc: 'PDF Document' },
    'text/plain': { icon: 'mdi-file-document-outline', desc: 'Text File' },
    'text/markdown': { icon: 'mdi-language-markdown', desc: 'Markdown File' },
    'image/png': { icon: 'mdi-file-image', desc: 'PNG Image' },
    'image/jpeg': { icon: 'mdi-file-image', desc: 'JPEG Image' },
    'image/gif': { icon: 'mdi-file-image', desc: 'GIF Image' },
    'image/webp': { icon: 'mdi-file-image', desc: 'WebP Image' },
    'image/svg+xml': { icon: 'mdi-svg', desc: 'SVG Image' },
    'video/mp4': { icon: 'mdi-video', desc: 'MP4 Video' },
    'video/webm': { icon: 'mdi-video', desc: 'WebM Video' },
    'audio/mpeg': { icon: 'mdi-music', desc: 'MP3 Audio' },
    'audio/wav': { icon: 'mdi-music', desc: 'WAV Audio' },
  };

  if (map[mime]) return map[mime];

  if (mime.startsWith('image/')) return { icon: 'mdi-file-image', desc: 'Image File' };
  if (mime.startsWith('video/')) return { icon: 'mdi-video', desc: 'Video File' };
  if (mime.startsWith('audio/')) return { icon: 'mdi-music', desc: 'Audio File' };
  if (mime.startsWith('text/')) return { icon: 'mdi-file-document-outline', desc: 'Text File' };

  return { icon: 'mdi-file', desc: 'File' };
}

function makeFolder(title: string, locked = true, meta = {}): VdFolder {
  return {
    id: Math.random().toString(36).substr(2, 9),
    title,
    type: 'folder',
    icon: 'mdi-folder',
    children: [],
    isLocked: locked,
    meta: {
      ...meta,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
}

function rebuildIndex(drive: VirtualDrive) {
  const index: Record<string, { title: string; parentId: string; path: string[] }> = {};
  let totalSize = 0;

  const traverse = (node: VdNode, path: string[], parentId: string) => {
    index[node.id] = {
      title: node.title,
      parentId,
      path,
    };

    if (node.type === 'file') {
      totalSize += node.file.size;
    } else if (node.type === 'folder') {
      const folder = node as VdFolder;
      const newPath = [...path, node.id];
      if (folder.children) {
        for (const child of folder.children) {
          traverse(child, newPath, node.id);
        }
      }
    }
  };

  traverse(drive.root, [], 'root');
  if (drive.trash) traverse(drive.trash, [], 'trash');
  if (drive.shared) traverse(drive.shared, [], 'shared');
  if (drive.favorites) traverse(drive.favorites, [], 'favorites');
  if (drive.recent) traverse(drive.recent, [], 'recent');

  return { index, totalSize };
}

export async function getDrive(userId: string): Promise<VirtualDrive> {
  const userDoc = await db.collection('users').doc(userId).get();
  if (!userDoc.exists) throw new Error('User not found');

  const userData = userDoc.data() as any;
  const driveDoc = await db.collection('drives').doc(userData.driveId).get();
  if (!driveDoc.exists) throw new Error('Drive not found');

  const drive = driveDoc.data() as VirtualDrive;

  // Lazy init auxiliary folders
  let needsUpdate = false;
  if (!drive.trash) {
    drive.trash = makeFolder('Trash', true);
    needsUpdate = true;
  }
  if (!drive.shared) {
    drive.shared = makeFolder('Shared', true);
    needsUpdate = true;
  }
  if (!drive.favorites) {
    drive.favorites = makeFolder('Favorites', true);
    needsUpdate = true;
  }
  if (!drive.recent) {
    drive.recent = makeFolder('Recent', true);
    needsUpdate = true;
  }

  // Rebuild index
  const { index, totalSize } = rebuildIndex(drive);
  const limit = PLAN_LIMITS[userData.plan as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.free;

  if (needsUpdate || drive.storageUsed !== totalSize || !drive.index) {
    await db.collection('drives').doc(userData.driveId).update({
      trash: drive.trash,
      shared: drive.shared,
      favorites: drive.favorites,
      recent: drive.recent,
      index,
      storageUsed: totalSize,
      storageLimit: limit,
    });
  }

  return { ...drive, index, storageUsed: totalSize, storageLimit: limit };
}

export async function createFolder(
  userId: string,
  parentId: string,
  name: string
): Promise<VdFolder> {
  const drive = await getDrive(userId);
  const newFolder = makeFolder(name, false);

  let found = false;
  const findAndAdd = (node: any) => {
    if (node.id === parentId) {
      if (!node.children) node.children = [];
      node.children.push(newFolder);
      found = true;
      return;
    }
    if (node.children) {
      for (const child of node.children) {
        findAndAdd(child);
        if (found) return;
      }
    }
  };

  findAndAdd(drive.root);
  if (!found) throw new Error('Parent folder not found');

  const userData = await db.collection('users').doc(userId).get();
  await db.collection('drives').doc(userData.data()?.driveId).update({
    root: drive.root,
  });

  return newFolder;
}

export async function uploadFile(
  userId: string,
  parentId: string,
  fileBuffer: Buffer,
  filename: string,
  contentType: string
): Promise<VdFile> {
  const userDoc = await db.collection('users').doc(userId).get();
  if (!userDoc.exists) throw new Error('User not found');

  const userData = userDoc.data() as any;
  const drive = await getDrive(userId);

  const contentLength = fileBuffer.length;
  let currentUsage = drive.storageUsed || 0;
  const limit = drive.storageLimit;

  if (currentUsage + contentLength > limit) throw new Error('Storage quota exceeded');

  // Upload to Cloud Storage
  const fileId = Math.random().toString(36).substr(2, 9);
  const ext = filename.split('.').pop() || '';
  const storagePath = `users/${userId}/${fileId}.${ext}`;

  await storage.file(storagePath).save(fileBuffer, {
    metadata: {
      contentType: contentType || 'application/octet-stream',
    },
  });

  const mimeDetails = getMimeDetails(contentType || '', ext);

  const newFile: VdFile = {
    id: fileId,
    title: filename,
    type: 'file',
    icon: mimeDetails.icon,
    description: mimeDetails.desc,
    ref: storagePath,
    isLocked: false,
    file: {
      size: contentLength,
      mimeType: contentType || '',
      extension: ext,
      uploadedAt: new Date().toISOString(),
    },
    meta: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };

  // Add to drive
  let found = false;
  const findAndAddFile = (node: any) => {
    if (node.id === parentId) {
      if (!node.children) node.children = [];
      node.children.push(newFile);
      found = true;
      return;
    }
    if (node.children) {
      for (const child of node.children) {
        findAndAddFile(child);
        if (found) return;
      }
    }
  };

  findAndAddFile(drive.root);
  const newUsage = currentUsage + contentLength;
  const { index } = rebuildIndex(drive);

  await db.collection('drives').doc(userData.driveId).update({
    root: drive.root,
    index,
    storageUsed: newUsage,
  });

  return newFile;
}

export async function deleteNode(userId: string, nodeId: string): Promise<void> {
  const userDoc = await db.collection('users').doc(userId).get();
  if (!userDoc.exists) throw new Error('User not found');

  const userData = userDoc.data() as any;
  const drive = await getDrive(userId);

  if (drive.root.id === nodeId) throw new Error('Cannot delete root folder');
  if (drive.trash?.id === nodeId) throw new Error('Cannot delete trash folder');

  const targetIndex = drive.index[nodeId];
  if (!targetIndex) throw new Error('Item not found in index');

  const trashId = drive.trash!.id;
  const isInTrash = targetIndex.path.includes(trashId) || targetIndex.parentId === trashId;

  if (isInTrash) {
    // Hard delete
    let parentNode: any = null;
    let targetNode: any = null;
    let targetIdx = -1;

    const findInTree = (node: VdNode) => {
      if (node.type === 'folder' && (node as VdFolder).children) {
        const folder = node as VdFolder;
        for (let i = 0; i < folder.children.length; i++) {
          const child = folder.children[i];
          if (child.id === nodeId) {
            parentNode = folder;
            targetNode = child;
            targetIdx = i;
            return;
          }
          findInTree(child);
          if (targetNode) return;
        }
      }
    };

    if (drive.trash) findInTree(drive.trash);
    if (!targetNode) throw new Error('Node not found in Trash');

    // Delete blobs
    if (targetNode.type === 'file' && targetNode.ref) {
      await storage.file(targetNode.ref).delete().catch(() => {});
    }

    parentNode.children.splice(targetIdx, 1);
    const { index } = rebuildIndex(drive);

    await db.collection('drives').doc(userData.driveId).update({
      trash: drive.trash,
      index,
    });
  } else {
    // Soft delete (move to trash)
    await moveNode(userId, nodeId, trashId);
  }
}

export async function moveNode(userId: string, nodeId: string, targetId: string): Promise<void> {
  if (nodeId === targetId) throw new Error('Cannot move node to itself');

  const userDoc = await db.collection('users').doc(userId).get();
  if (!userDoc.exists) throw new Error('User not found');

  const userData = userDoc.data() as any;
  const drive = await getDrive(userId);

  if (nodeId === drive.root.id) throw new Error('Cannot move root');

  let nodeToMove: any = null;
  let currentParent: any = null;
  let nodeIndex = -1;

  const findNodeAndParent = (node: any) => {
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].id === nodeId) {
          nodeToMove = node.children[i];
          currentParent = node;
          nodeIndex = i;
          return;
        }
        findNodeAndParent(node.children[i]);
        if (nodeToMove) return;
      }
    }
  };

  findNodeAndParent(drive.root);
  if (!nodeToMove && drive.trash) findNodeAndParent(drive.trash);
  if (!nodeToMove) throw new Error('Item not found');

  let targetParent: any = null;
  const findTarget = (node: any) => {
    if (node.id === targetId) {
      targetParent = node;
      return;
    }
    if (node.children) {
      for (const child of node.children) {
        findTarget(child);
        if (targetParent) return;
      }
    }
  };

  findTarget(drive.root);
  if (!targetParent && drive.trash) findTarget(drive.trash);
  if (!targetParent) throw new Error('Target folder not found');
  if (targetParent.type !== 'folder') throw new Error('Target must be a folder');

  currentParent.children.splice(nodeIndex, 1);
  if (!targetParent.children) targetParent.children = [];
  targetParent.children.push(nodeToMove);

  const { index } = rebuildIndex(drive);

  await db.collection('drives').doc(userData.driveId).update({
    root: drive.root,
    trash: drive.trash,
    index,
  });
}

export async function updateNode(
  userId: string,
  nodeId: string,
  updates: Record<string, any>
): Promise<VdNode> {
  const userDoc = await db.collection('users').doc(userId).get();
  if (!userDoc.exists) throw new Error('User not found');

  const userData = userDoc.data() as any;
  const drive = await getDrive(userId);

  let targetNode: any = null;
  const findNode = (node: any) => {
    if (node.id === nodeId) {
      targetNode = node;
      return;
    }
    if (node.children) {
      for (const child of node.children) {
        findNode(child);
        if (targetNode) return;
      }
    }
  };

  findNode(drive.root);
  if (!targetNode && drive.trash) findNode(drive.trash);
  if (!targetNode) throw new Error('Node not found');

  if (updates.title) targetNode.title = updates.title;
  if (typeof updates.isLocked === 'boolean') targetNode.isLocked = updates.isLocked;

  const { index } = rebuildIndex(drive);

  await db.collection('drives').doc(userData.driveId).update({
    root: drive.root,
    trash: drive.trash,
    index,
  });

  return targetNode;
}

export async function rebuildDrive(userId: string): Promise<VirtualDrive> {
  const userDoc = await db.collection('users').doc(userId).get();
  if (!userDoc.exists) throw new Error('User not found');

  const userData = userDoc.data() as any;
  const drive = await getDrive(userId);

  // Delete all blobs for user
  const [files] = await storage.getFiles({ prefix: `users/${userId}/` });
  await Promise.all(files.map((f) => f.delete().catch(() => {})));

  // Rebuild structure
  const newDrive: VirtualDrive = {
    userId,
    version: 1,
    index: {},
    storageUsed: 0,
    storageLimit: drive.storageLimit,
    root: makeFolder('My Drive', true),
    trash: makeFolder('Trash', true),
    shared: makeFolder('Shared', true),
    favorites: makeFolder('Favorites', true),
    recent: makeFolder('Recent', true),
  };

  const { index } = rebuildIndex(newDrive);

  await db.collection('drives').doc(userData.driveId).update({
    root: newDrive.root,
    trash: newDrive.trash,
    shared: newDrive.shared,
    favorites: newDrive.favorites,
    recent: newDrive.recent,
    index,
    storageUsed: 0,
  });

  return newDrive;
}
