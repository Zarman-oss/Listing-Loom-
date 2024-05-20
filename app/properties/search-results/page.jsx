'use client';
import Loader from '@/components/Loading.jsx';
import PropertyCard from '@/components/PropertyCard.jsx';
import ErrorPage from '@/components/UI/ErrorPage.jsx';
import GoBackBtn from '@/components/UI/buttons/GoBackBtn.jsx';
import Link from 'next/link.js';
import { useSearchParams } from 'next/navigation.js';
import { useEffect, useState } from 'react';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState();
  const [loading, setLoading] = useState(true);

  const location = searchParams.get('location');
  const propertyType = searchParams.get('propertyType');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location, propertyType]);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <section className="px-4 py-4">
      <div className="flex max-w-7xl mx-auto p-1">
        <div>
          <Link href="/">
            <GoBackBtn text="Go Back" />
          </Link>
        </div>
      </div>
      <div className="text-center mt-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Search Results</h1>
        <p className="text-gray-600 mt-2">
          Properties matching your search criteria
        </p>
      </div>
      {properties && properties.length === 0 ? (
        <ErrorPage />
      ) : (
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
