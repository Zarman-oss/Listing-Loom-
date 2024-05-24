'use client';

import { useRouter } from 'next/navigation';

import { signIn, useSession } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === 'loading') return null;
  if (session) {
    router.push('/');
    return null;
  }

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <button
                onClick={() => signIn('google')}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 ease-in-out"
              >
                <FaGoogle className="h-5 w-5 mr-2" aria-hidden="true" />
                Sign in with Google
              </button>
            </div>
          </div>

          <div className="relative mt-10">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
