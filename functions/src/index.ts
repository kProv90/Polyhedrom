import * as functions from 'firebase-functions';
import * as express from 'express';
import cors from 'cors';
import { getDrive, createFolder, uploadFile, deleteNode, moveNode, updateNode, rebuildDrive } from './services/drive.js';
import { db, auth } from './init.js';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Middleware to verify Firebase Auth token
app.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.slice(7);
  try {
    const decodedToken = await auth.verifyIdToken(token);
    (req as any).userId = decodedToken.uid;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

// GET /api/drive - Get full drive data
app.get('/api/drive', async (req, res) => {
  try {
    const userId = (req as any).userId;
    const drive = await getDrive(userId);
    res.json(drive);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/drive - Create folder or upload file
app.post('/api/drive', async (req, res) => {
  try {
    const userId = (req as any).userId;
    const { id, name, action } = req.query as Record<string, string>;

    // Rebuild action
    if (action === 'rebuild') {
      const drive = await rebuildDrive(userId);
      return res.json(drive);
    }

    // File upload (check for file in body)
    if (req.is('application/octet-stream') || req.is('image/*') || req.is('video/*') || req.is('audio/*')) {
      if (!id) return res.status(400).json({ error: 'Parent ID required' });

      const filename = (req.headers['x-file-name'] as string) || 'unnamed';
      const contentType = req.get('content-type') || 'application/octet-stream';
      const buffer = req.body; // express.raw() middleware needed

      const file = await uploadFile(userId, id, buffer, filename, contentType);
      return res.json(file);
    }

    // Folder creation
    if (!id) return res.status(400).json({ error: 'Parent ID required' });
    if (!name) return res.status(400).json({ error: 'Folder name required' });

    const folder = await createFolder(userId, id, name);
    res.json(folder);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/drive - Move node
app.put('/api/drive', async (req, res) => {
  try {
    const userId = (req as any).userId;
    const { id, targetId } = req.query as Record<string, string>;

    if (!id) return res.status(400).json({ error: 'Node ID required' });
    if (!targetId) return res.status(400).json({ error: 'Target ID required' });

    await moveNode(userId, id, targetId);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/drive - Update node
app.patch('/api/drive', async (req, res) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.query as Record<string, string>;

    if (!id) return res.status(400).json({ error: 'Node ID required' });

    const node = await updateNode(userId, id, req.body);
    res.json(node);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/drive - Delete node
app.delete('/api/drive', async (req, res) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.query as Record<string, string>;

    if (!id) return res.status(400).json({ error: 'Node ID required' });

    await deleteNode(userId, id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/user - Get user info
app.get('/api/user', async (req, res) => {
  try {
    const userId = (req as any).userId;
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(userDoc.data());
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export const api = functions.https.onRequest(app);
