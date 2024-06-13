import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='grid min-h-full place-items-center bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-4xl font-extrabold text-red-600 animate-bounce'>
          404
        </p>
        <h1 className='mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl'>
          Page not found
        </h1>
        <p className='mt-6 text-lg leading-7 text-gray-700'>
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Link href='/'>
            <a className='rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out duration-300'>
              Go back home
            </a>
          </Link>
          <a
            href='#'
            className='text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-300'
          >
            Contact Team <span aria-hidden='true'>&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
