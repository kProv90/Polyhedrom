import { api } from './core'

const URL: string = '/api/drive'

export const drive = {
  get: {
    all: () =>
      api<VirtualDrive>({
        method: 'GET',
        url: URL,
      }),
  },
  post: {
    folder: (parentId: string, name: string) =>
      api<VdFolder>({
        method: 'POST',
        url: URL,
        params: { id: parentId, name },
      }),
    upload: (parentId: string, file: File) =>
      api<VdFile>({
        method: 'POST',
        url: URL,
        params: { id: parentId },
        headers: {
          'X-File-Name': file.name,
          'Content-Type': file.type || 'application/octet-stream',
        },
        body: file,
      }),
    all: (drive: VirtualDrive) =>
      api({
        method: 'POST',
        url: URL,
        body: drive,
      }),
  },
  put: {
    move: (id: string, targetId: string) =>
      api({
        method: 'PUT',
        url: URL,
        params: { id, targetId },
      }),
  },
  patch: {
    update: (id: string, updates: Record<string, any>) =>
      api({
        method: 'PATCH',
        url: URL,
        params: { id },
        body: JSON.stringify(updates),
      }),
  },
  delete: {
    node: (id: string) =>
      api({
        method: 'DELETE',
        url: URL,
        params: { id },
      }),
  },
}
