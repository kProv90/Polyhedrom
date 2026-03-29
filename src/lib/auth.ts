import { getAuth } from 'firebase/auth'

export async function authFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const auth = getAuth()
  const token = auth.currentUser ? await auth.currentUser.getIdToken() : null

  const headers = new Headers(init?.headers)

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  return fetch(input, {
    ...init,
    headers,
  })
}
