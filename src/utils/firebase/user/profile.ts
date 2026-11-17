import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

interface ProfileData {
  displayName?: string | null;
  photoURL?: string | null;
  // Add other profile fields as needed
}

export async function updateUserProfile(
  uid: string,
  data: ProfileData
): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user");

  // Update Auth profile
  if (data.displayName || data.photoURL) {
    await updateProfile(user, {
      displayName: data.displayName ?? null,
      photoURL: data.photoURL ?? null,
    });
  }

  // Update Firestore profile
  const firestoreData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  );

  await updateDoc(doc(db, "users", uid), firestoreData);
}
