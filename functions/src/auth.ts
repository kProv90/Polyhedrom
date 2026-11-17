import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { db } from './init.js';

// Initialize Firebase Admin (already done in init.ts, but needed here for this function)
admin.initializeApp();

const PLAN_LIMITS = {
  free: 500 * 1024 * 1024,
  bronze: 2 * 1024 * 1024 * 1024,
  silver: 10 * 1024 * 1024 * 1024,
  gold: 50 * 1024 * 1024 * 1024,
  platinum: 100 * 1024 * 1024 * 1024,
};

function makeFolder(title: string, locked = true) {
  return {
    id: Math.random().toString(36).substr(2, 9),
    title,
    type: 'folder',
    icon: 'mdi-folder',
    children: [],
    isLocked: locked,
    meta: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
}

/**
 * Triggered when a new user is created in Clerk (via webhook)
 * Creates corresponding user document and drive in Firestore
 */
export const onClerkUserCreated = functions.https.onRequest(async (req, res) => {
  // Verify webhook signature (implement with Clerk's webhook secret)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data } = req.body;
    const clerkId = data.id;
    const email = data.email_addresses[0]?.email_address;

    if (!clerkId || !email) {
      return res.status(400).json({ error: 'Missing clerkId or email' });
    }

    // Create user document
    const driveId = `drive_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    await db.collection('users').doc(clerkId).set({
      clerkId,
      email,
      plan: 'free',
      driveId,
      createdAt: now,
      updatedAt: now,
      lastLoginAt: now,
      access: {
        status: 'active',
      },
    });

    // Create drive document
    await db.collection('drives').doc(driveId).set({
      userId: clerkId,
      version: 1,
      index: {},
      storageUsed: 0,
      storageLimit: PLAN_LIMITS.free,
      root: makeFolder('My Drive', true),
      trash: makeFolder('Trash', true),
      shared: makeFolder('Shared', true),
      favorites: makeFolder('Favorites', true),
      recent: makeFolder('Recent', true),
      createdAt: now,
      updatedAt: now,
    });

    res.json({ success: true });
  } catch (error: any) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
});
