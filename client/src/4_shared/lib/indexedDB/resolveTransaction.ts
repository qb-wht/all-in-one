export function resolveTransaction(tr: IDBTransaction): Promise<Event> {
  return new Promise((res, rej) => {
    tr.addEventListener('complete', onComplete, {once: true});
    tr.addEventListener('error', onError, {once: true});
    tr.addEventListener('abort', onAbort, {once: true});

    function onAbort(e: Event) {
      tr.removeEventListener('complete', onComplete);
      tr.removeEventListener('error', onError);
      rej(e);
    }

    function onError(e: Event) {
      tr.removeEventListener('complete', onComplete);
      tr.removeEventListener('abort', onAbort);
      rej(e);
    }

    function onComplete(e: Event) {
      tr.removeEventListener('error', onError);
      tr.removeEventListener('abort', onAbort);
      res(e);
    }
  });
}
