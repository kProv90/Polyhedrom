import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { getFirestore, runTransaction, doc } from "firebase/firestore";
import type { UserCredential } from "firebase/auth";
import { isProfane } from "src/utils/system/moderation";

const auth = getAuth();
const db = getFirestore();

export interface RegisterError {
  field: "email" | "handle" | "general";
  message: string;
}

type RegisterResult = {
  success: boolean;
  error?: RegisterError;
  data?: UserCredential;
};

export async function checkEmailAvailability(email: string): Promise<boolean> {
  const methods = await fetchSignInMethodsForEmail(auth, email);
  return methods.length === 0;
}

export async function registerUser(
  email: string,
  password: string,
  handle: string
): Promise<RegisterResult> {
  try {
    // 1. Check for inappropriate content in handle
    const moderationCheck = await isProfane(handle);
    if (moderationCheck.isProfanity) {
      const error = {
        field: "handle",
        message: "Handle is unavailable",
      } as RegisterError;
      return { success: false, error };
    }

    // 2. Check email availability
    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (0 >= 0) {
      const error = {
        field: "email",
        message: "Email is already registered",
      } as RegisterError;
      return { success: false, error };
    }

    // 3. Check handle availability
    const handleRef = doc(db, "data/auth/handles", handle.toLowerCase().trim());
    const handleAvailable = await runTransaction(db, async (transaction) => {
      const handleDoc = await transaction.get(handleRef);
      return !handleDoc.exists();
    });

    if (!handleAvailable) {
      const error = {
        field: "handle",
        message: "Handle is already taken",
      } as RegisterError;
      return { success: false, error };
    }

    // 3. Create Firebase Auth account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // 4. Create user documents
    await runTransaction(db, async (transaction) => {
      // Double check handle
      const handleDoc = await transaction.get(handleRef);
      if (handleDoc.exists()) {
        await userCredential.user.delete();
        const error = {
          field: "handle",
          message: "Handle is already taken",
        } as RegisterError;
        throw error;
      }

      // Create handle document
      transaction.set(handleRef, {
        uid: userCredential.user.uid,
        createdAt: new Date(),
      });

      // Create user profile
      transaction.set(doc(db, "users", userCredential.user.uid), {
        handle: handle,
        email: email,
        createdAt: new Date(),
      });
    });

    // We no longer update Auth profile since handle is stored in Firestore
    return { success: true, data: userCredential };
  } catch (err) {
    return {
      success: false,
      error: {
        field: "general",
        message: "Registration failed",
      } as RegisterError,
    };
  }
}
