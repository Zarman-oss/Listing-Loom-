import { HomeIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
export default function ErrorPage() {
  return (
    <main className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-2xl  tracking-tight text-gray-900 sm:text-5xl">
          Something Went Wrong
        </h1>
        <p className="mt-6 text-lg leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/" passHref>
            <span className="inline-flex items-center rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 cursor-pointer">
              <HomeIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              Go back home
            </span>
          </Link>
          <Link href="/contact" passHref>
            <span className="inline-flex items-center text-sm font-semibold text-gray-900 hover:underline cursor-pointer">
              Contact support{' '}
              <ArrowRightIcon className="ml-1 h-5 w-5" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
