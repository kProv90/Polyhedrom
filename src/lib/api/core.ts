import { authFetch } from '@/lib/auth'
export async function api<T = unknown>(
  config: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    url: string
    body?: any
    headers?: HeadersInit
    params?: Record<string, string | number | boolean | undefined>
  },
  options?: RequestInit
): Promise<T> {
  const { method, url, body, params, headers } = config

  let fullUrl = url
  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value))
      }
    })
    const queryString = searchParams.toString()
    if (queryString) {
      fullUrl += `?${queryString}`
    }
  }
  const res = await authFetch(fullUrl, {
    method,
    headers: {
      ...headers,
      ...options?.headers,
    },
    // Strictly allow only FormData or Blob (File) for body, ignoring any other body payload
    // to enforce "params only" for data and "FormData/Blob only" for uploads.
    body: body instanceof FormData || body instanceof Blob ? body : undefined,
    ...options,
  })

  if (!res.ok) {
    let errorMessage = res.statusText
    try {
      const errorData = await res.json()
      errorMessage = errorData.error || errorData.message || JSON.stringify(errorData)
    } catch {
      errorMessage = await res.text()
    }
    const error = new Error(errorMessage)
    console.error('API Error:', error)
    throw error
  }

  if (res.status === 204) return null as T

  return res.json()
}
