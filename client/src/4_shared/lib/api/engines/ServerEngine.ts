import {APIEngine, User} from '../types';

export class ServerEngine implements APIEngine {
  isInit: boolean = true;

  async getUsers(): Promise<User[]> {
    const res = await fetch('/api/users', {
      method: 'GET',
    });

    return res as unknown as User[];
  }
}
