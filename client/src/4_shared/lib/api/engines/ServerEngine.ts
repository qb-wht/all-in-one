import {APIEngine, User} from '../types';

export class ServerEngine implements APIEngine {
  isInit: boolean = true;

  async getUsers(): Promise<User[]> {
    const res = await fetch('http://localhost:4200/users', {
      method: 'GET',
    });

    const data = await res.json();

    return data;
  }
}
