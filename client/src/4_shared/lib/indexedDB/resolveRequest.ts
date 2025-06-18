export function resolveRequest(req: IDBOpenDBRequest): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    req.addEventListener('success', () => res(req.result), {once: true});
    req.addEventListener('error', () => rej(req.error), {once: true});
  });
}
