'use client';
import { fetchProperty } from '@/utils/requests.js';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PropertyDetails from '../../../components/PropertyDetails';
import PropertyImage from '../../../components/PropertyImage';
import ErrorPage from '../../../components/UI/ErrorPage';
import GoBackBtn from '../../../components/UI/buttons/GoBackBtn';
import BookMarkButton from '@/components/UI/buttons/BookMarkButton.jsx';

export default function PropertyPage() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };
    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return <ErrorPage />;
  }
  return (
    <div className='max-w-4xl mx-auto p-8'>
      <div className='flex justify-start gap-x-6 mb-4'>
        <Link href='/'>
          <GoBackBtn />
        </Link>
      </div>
      {!loading && property && (
        <>
          <PropertyImage images={property.images} />
          <div className='flex gap-x-4 mt-4'>
            <BookMarkButton property={property} />
          </div>
        </>
      )}
      {property && <PropertyDetails property={property} />}
    </div>
  );
}
