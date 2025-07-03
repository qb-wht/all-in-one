import type {AllDocs} from './types';

export abstract class CRUDPouchDB<T extends AllDocs> {
  constructor(protected db: PouchDB.Database<AllDocs>) {}

  abstract create(...params: unknown[]): Promise<T>;

  abstract getAll(...params: unknown[]): Promise<T[]>;

  async update(doc: T): Promise<T> {
    const res = await this.db.put(doc);

    return this.get(res.id);
  }

  async remove(doc: T): Promise<T> {
    const docToRemove = await this.get(doc._id);

    const res = await this.db.remove(doc);

    if (res.id === docToRemove._id) {
      return docToRemove;
    }

    throw new Error('Document not found');
  }

  async get(id: string): Promise<T> {
    return this.db.get<T>(id);
  }
}
