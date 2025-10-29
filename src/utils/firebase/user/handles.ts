import {
  getFirestore,
  runTransaction,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

const db = getFirestore();

export interface HandleData {
  uid: string;
  createdAt: Date;
}

export async function checkHandleAvailability(
  handle: string
): Promise<boolean> {
  const handleRef = doc(db, "data/auth/handles", handle.toLowerCase().trim());
  try {
    const handleDoc = await runTransaction(db, async (transaction) => {
      return await transaction.get(handleRef);
    });
    return !handleDoc.exists();
  } catch (error) {
    console.error("Error checking handle availability:", error);
    throw error;
  }
}

export async function createHandleDocument(
  handle: string,
  uid: string
): Promise<void> {
  const handleRef = doc(db, "data/auth/handles", handle.toLowerCase().trim());

  await setDoc(handleRef, {
    uid,
    createdAt: new Date(),
  } as HandleData);
}

export async function deleteHandle(handle: string): Promise<void> {
  const handleRef = doc(db, "data/auth/handles", handle.toLowerCase().trim());
  await deleteDoc(handleRef);
}

import { isProfane } from "src/utils/system/moderation";

export async function updateHandle(
  oldHandle: string,
  newHandle: string,
  uid: string
): Promise<void> {
  // Check for inappropriate content first
  const moderationCheck = await isProfane(newHandle);
  if (moderationCheck) {
    throw new Error("This handle is not allowed");
  }

  const oldHandleRef = doc(
    db,
    "data/auth/handles",
    oldHandle.toLowerCase().trim()
  );
  const newHandleRef = doc(
    db,
    "data/auth/handles",
    newHandle.toLowerCase().trim()
  );
  const userRef = doc(db, "users", uid);

  await runTransaction(db, async (transaction) => {
    // Check if new handle is available
    const newHandleDoc = await transaction.get(newHandleRef);
    if (newHandleDoc.exists()) {
      throw new Error("Handle is already taken");
    }

    // Verify old handle exists and belongs to user
    const oldHandleDoc = await transaction.get(oldHandleRef);
    if (!oldHandleDoc.exists()) {
      throw new Error("Old handle not found");
    }
    if (oldHandleDoc.data()?.uid !== uid) {
      throw new Error("Not authorized to update this handle");
    }

    // Create new handle document
    transaction.set(newHandleRef, {
      uid,
      createdAt: new Date(),
    } as HandleData);

    // Delete old handle document
    transaction.delete(oldHandleRef);

    // Update user profile - only store in Firestore
    transaction.update(userRef, {
      handle: newHandle,
    });
  });
}

export async function getUserHandle(uid: string): Promise<string | null> {
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? userDoc.data().handle : null;
}
