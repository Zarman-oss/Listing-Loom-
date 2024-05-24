import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AuthError() {
  const router = useRouter();
  const { error } = router.query;

  const errorMessage = () => {
    switch (error) {
      case 'OAuthAccountNotLinked':
        return 'To confirm your identity, sign in with the same account you used originally.';
      case 'CredentialsSignin':
        return 'Sign in failed. Check the details you provided are correct.';
      default:
        return 'An error occurred during the sign-in process. Please try again.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign In Error
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {errorMessage()}
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="/signin">
            <a className="inline-block bg-black text-white rounded px-4 py-2 hover:bg-gray-800 transition-colors duration-300">
              Go back to sign in
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
