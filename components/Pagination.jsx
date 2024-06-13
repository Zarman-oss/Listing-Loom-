import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function Pagination() {
  return (
    <nav className='flex items-center justify-between border-t border-gray-200 px-4 sm:px-0'>
      <div className='-mt-px flex w-0 flex-1'>
        <Link
          href='#'
          className='inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
        >
          <ArrowLongLeftIcon
            className='mr-3 h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
          Previous
        </Link>
      </div>
      <div className='flex -mt-px'>
        <Link
          href='#'
          className='inline-flex items-center border-t-2 border-transparent px-2 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
        >
          1
        </Link>
        <Link
          href='#'
          className='inline-flex items-center border-t-2 border-indigo-500 px-2 pt-4 text-sm font-medium text-indigo-600'
          aria-current='page'
        >
          2
        </Link>
        <Link
          href='#'
          className='inline-flex items-center border-t-2 border-transparent px-2 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
        >
          3
        </Link>
        <span className='inline-flex items-center border-t-2 border-transparent px-2 pt-4 text-sm font-medium text-gray-500'>
          ...
        </span>
        <Link
          href='#'
          className='inline-flex items-center border-t-2 border-transparent px-2 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
        >
          8
        </Link>
        <Link
          href='#'
          className='inline-flex items-center border-t-2 border-transparent px-2 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
        >
          9
        </Link>
        <Link
          href='#'
          className='inline-flex items-center border-t-2 border-transparent px-2 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
        >
          10
        </Link>
      </div>
      <div className='-mt-px flex w-0 flex-1 justify-end'>
        <Link
          href='#'
          className='inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
        >
          Next
          <ArrowLongRightIcon
            className='ml-3 h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </Link>
      </div>
    </nav>
  );
}
