export async function createDB() {
  return new Promise<IDBDatabase>((res, rej) => {
    const openReq = indexedDB.open('example', 1);

    openReq.onupgradeneeded = (e) => {
      const target = e.target as IDBOpenDBRequest;

      const db = target.result;
      const tr = target.transaction;

      if (!tr) return;

      if (e.oldVersion === 0) {
        const userStore = db.createObjectStore('users', {
          keyPath: 'id',
          autoIncrement: true,
        });

        db.createObjectStore('logs', { autoIncrement: true });

        userStore.createIndex('age', 'age');
        userStore.createIndex('skills', 'skills', { multiEntry: true });

        tr.objectStore('users').add({
          name: 'Bob',
          age: 42,
          skills: ['code', 'dance'],
        });

        tr.objectStore('logs').add('User Bob added');

        tr.objectStore('users').add({
          name: 'Mary',
          age: 43,
          skills: ['code'],
        });

        tr.objectStore('logs').add('User Mary added');

        tr.objectStore('users').add({
          name: 'Kerosin',
          age: 28,
          skills: ['code', 'lid'],
        });

        tr.objectStore('logs').add('User Mary added');
      }
    };

    openReq.onsuccess = () => {
      res(openReq.result);
    };

    openReq.onerror = () => {
      rej(openReq.error);
    };
  });
}
