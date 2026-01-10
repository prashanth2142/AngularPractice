// users.data.ts
export interface User {
  id: number;
  username: string;
  name: string;
  role: 'Admin' | 'User';
}

export const USERS: User[] = [
  { id: 1, username: 'admin', name: 'Prashanth', role: 'Admin' },
  { id: 2, username: 'user', name: 'Ravi', role: 'User' }
];
