"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

interface PasscodeProtectProps {
  children: React.ReactNode;
  correctPasscode: string;
}

export function PasscodeProtect({ children, correctPasscode }: PasscodeProtectProps) {
  const [input, setInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === correctPasscode) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect passcode. Please try again.');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-2">Admin Access</CardTitle>
          <CardDescription>This page is protected. Please enter the passcode to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter passcode"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-center"
            />
            <Button type="submit" className="w-full">Unlock</Button>
            {error && (
              <div className="flex items-center justify-center text-sm text-destructive pt-2">
                <ShieldAlert className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
