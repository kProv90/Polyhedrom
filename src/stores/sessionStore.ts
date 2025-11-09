import { defineStore } from 'pinia'

export enum AuthState {
  None = 'None',
  Login = 'Login',
  Register = 'Register',
  Forgot = 'Forgot',
  Reset = 'Reset',
  Verify = 'Verify',
}

export enum UserState {
  None = 'None',
  Active = 'Active',
}

export const useSessionStore = defineStore('session', {
  state: () => ({
    _user: UserState.Active,
    _auth: AuthState.None,
  }),
  actions: {
    setAuthState(state: AuthState) {
      this._auth = state
    },
    setUserState(state: UserState) {
      this._user = state
    },
    getUserState(): UserState {
      return this._user
    },
    getAuthState(): AuthState {
      return this._auth
    },
  },
})
