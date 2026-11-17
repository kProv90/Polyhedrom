import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import type { UserCredential } from "firebase/auth";

const auth = getAuth();

export async function loginWithEmail(
  email: string,
  password: string
): Promise<UserCredential> {
  return await signInWithEmailAndPassword(auth, email, password);
}

// Add other login methods here (Google, etc.)
