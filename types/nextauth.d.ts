import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id?: string;
    roleId?: number;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}
