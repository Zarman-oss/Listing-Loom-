import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePreviousPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Link
          key={i}
          href='#'
          onClick={(e) => {
            e.preventDefault();
            onPageChange(i);
          }}
          className={`inline-flex items-center border-t-2 ${
            page === i
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          } px-2 pt-4 text-sm font-medium`}
          aria-current={page === i ? 'page' : undefined}
        >
          {i}
        </Link>
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(
        <span
          key='start-ellipsis'
          className='inline-flex items-center border-t-2 border-transparent px-2 pt-4 text-sm font-medium text-gray-500'
        >
          ...
        </span>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <span
          key='end-ellipsis'
          className='inline-flex items-center border-t-2 border-transparent px-2 pt-4 text-sm font-medium text-gray-500'
        >
          ...
        </span>
      );
    }

    return pageNumbers;
  };

  return (
    <nav className='flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 m-8 p-8'>
      <div className='-mt-px flex w-0 flex-1 justify-around'>
        <Link
          href='#'
          onClick={(e) => {
            e.preventDefault();
            handlePreviousPage();
          }}
          className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium ${
            page === 1
              ? 'text-gray-300'
              : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
          }`}
        >
          <ArrowLongLeftIcon
            className='mr-3 h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
          Previous
        </Link>
      </div>
      <div className='flex -mt-px'>{renderPageNumbers()}</div>
      <div className='-mt-px flex w-0 flex-1 justify-around'>
        <Link
          href='#'
          onClick={(e) => {
            e.preventDefault();
            handleNextPage();
          }}
          className={`inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium ${
            page === totalPages
              ? 'text-gray-300'
              : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
          }`}
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
