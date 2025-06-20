import {APIEngine, User} from './types';

export class APIService {
  private engine: APIEngine;

  constructor(engine: APIEngine) {
    this.engine = engine;
  }

  getUsers(): Promise<User[]> {
    return this.engine.getUsers();
  }
}
