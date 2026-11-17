import { getAuth, sendEmailVerification, User } from "firebase/auth";

const auth = getAuth();

export async function sendVerificationEmail(user: User): Promise<void> {
  await sendEmailVerification(user);
}

export async function checkVerificationStatus(user: User): Promise<boolean> {
  await user.reload(); // Refresh the user object
  return user.emailVerified;
}
