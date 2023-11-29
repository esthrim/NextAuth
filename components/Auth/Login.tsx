'use client';

import { signIn } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { GithubIcon } from 'lucide-react';


export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    
  const handleCredentialsLogin = () => {
    signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/dashboard',
    });
  };

  const handleGithubLogin = () => {
    signIn('github', {
        redirect:true,
        callbackUrl:'/dashboard'
    });
  };

  const handleGoogleLogin = () => {
    signIn('google', {
        redirect:true,
        callbackUrl:'/dashboard'
    });
  };
    


  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-[380px] p-4">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Please fill email and password</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <Input type="email" onChange={(e) => setEmail(e.target.value)} className="bg-white border-gray-400 " placeholder="enter your email" />
          <Input type="password" onChange={(e) => setPassword(e.target.value)}  className="bg-white border-gray-400" placeholder="enter your password" />
          <Button onClick={handleCredentialsLogin}>Login</Button>
          <Button onClick={handleGithubLogin}> Continue with Github<GithubIcon className="h-4 w-4 ml-2" /></Button>
          <Button onClick={handleGoogleLogin}> Continue with Google</Button>
        
        </CardContent>
        
      </Card>
    </div>
  );
}
