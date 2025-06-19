export function resolveRequest<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((res, rej) => {
    req.addEventListener('success', onSuccess, {once: true});
    req.addEventListener('error', onError, {once: true});

    function onSuccess() {
      req.removeEventListener('error', onError);
      res(req.result);
    }

    function onError() {
      req.removeEventListener('success', onSuccess);
      rej(req.error);
    }
  });
}
