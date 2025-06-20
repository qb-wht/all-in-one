export interface User {
  name: string;
  email: string;
}

export interface APIEngine {
  getUsers: () => Promise<User[]>;
}
