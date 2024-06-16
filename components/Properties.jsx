'use client';
import { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard.jsx';
import ErrorPage from './UI/ErrorPage.jsx';
import Loader from './Loading.jsx';
import Pagination from './Pagination.jsx';

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        setProperties(data.properties);
        setTotalItems(data.total);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      {properties && properties.length === 0 ? (
        <ErrorPage />
      ) : (
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      )}
      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </>
  );
}
