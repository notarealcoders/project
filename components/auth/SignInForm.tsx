'use client';

import { signIn } from 'next-auth/react';

export default function SignInForm() {
  return (
    <div className="mt-8 space-y-6">
      <div className="space-y-4">
        <button
          onClick={() => signIn('github', { callbackUrl: '/' })}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Sign in with GitHub
        </button>
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}