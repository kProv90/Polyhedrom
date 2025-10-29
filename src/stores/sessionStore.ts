import { defineStore } from "pinia";
import type { User } from "firebase/auth";

export enum AuthState {
  None = "None",
  Login = "Login",
  Register = "Register",
  Forgot = "Forgot",
  Reset = "Reset",
  Verify = "Verify",
}

export const useSessionStore = defineStore("session", {
  state: () => ({
    user: null as User | null,
    auth: AuthState.None,
    handle: null as string | null,
  }),
  actions: {
    async updateHandle(newHandle: string) {
      this.handle = newHandle;
    },
  },
});
