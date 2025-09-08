import { defineStore } from "pinia";

export const useSessionStore = defineStore("session", {
  state: () => ({
    token: null as string | null,
  }),
  actions: {},
});
