import {connection, resolveRequest} from '@/4_shared/lib/indexedDB';
import {APIEngine, User} from '../types';

export class IndexedDBEngine implements APIEngine {
  private static instance: IndexedDBEngine;

  private whenConnection: Promise<void> | null = null;

  private db: IDBDatabase | null = null;

  constructor() {
    if (IndexedDBEngine.instance) {
      return IndexedDBEngine.instance;
    }

    IndexedDBEngine.instance = this;
    this.init();
  }

  private init() {
    this.whenConnection = connection.then((db) => {
      this.db = db;
      this.whenConnection = null;
    });
  }

  private request<T>(
    executor: (res: (value: T) => void, rej: (value: unknown) => void) => void,
  ): Promise<T> {
    return new Promise<T>((res, rej) => {
      const request = () => {
        executor(res, rej);
      };

      if (!this.db && this.whenConnection) {
        return this.whenConnection.then(request).catch(rej);
      }

      if (!this.db) {
        return rej(new Error('IndexedDB not initialized properly'));
      }

      request();
    });
  }

  getUsers(): Promise<User[]> {
    return this.request((res, rej) => {
      const tr = this.db!.transaction(['users'], 'readonly');
      const users = tr.objectStore('users').getAll();

      resolveRequest(users).then(res).catch(rej);
    });
  }
}
