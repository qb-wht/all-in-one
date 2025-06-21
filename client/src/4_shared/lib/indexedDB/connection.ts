import {createScheme} from './createScheme';
import {generateMockData} from './generateMockData';
import {resolveRequest} from './resolveRequest';

export const connection = new Promise<IDBDatabase>((res, rej) => {
  const req = indexedDB.open('example', 1);

  setTimeout(() => {
    rej('Не удалось подключиться к БД');
  }, 500);

  req.onupgradeneeded = async (e) => {
    const target = e.target as IDBOpenDBRequest;

    const db = target.result;
    const tr = target.transaction;
    if (!tr || !db) return;

    switch (e.oldVersion) {
      case 0: {
        createScheme(db, tr);
        generateMockData(tr);
      }
    }
  };

  resolveRequest(req).then(res, rej);
});
