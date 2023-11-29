"use client";

import { signOut, useSession } from 'next-auth/react';
import { Button } from '../ui/button';

export const  NavBar = () => {


    const { data: session } =  useSession();

  return (
    <div className="flex justify-between p-8">
      <div>App</div>
      <div className="flex items-center gap-4">
            <div>{`Role ID ${session?.user?.roleId}`}</div>
            <div>{session?.user?.name}</div>
            <div>  <Button onClick={() => signOut()}>Logout</Button></div>
      </div>
    </div>
  );
};
