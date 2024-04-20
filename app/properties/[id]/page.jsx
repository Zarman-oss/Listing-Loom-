/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PropertyDetails from '../../../components/PropertyDetails';
import PropertyImage from '../../../components/PropertyImage';
import ErrorPage from '../../../components/UI/ErrorPage';
import GoBackBtn from '../../../components/UI/buttons/GoBackBtn';
import { fetchProperty } from '@/utils/requests.js';

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
    <div className="max-w-4xl mx-auto p-8 ">
      <div className=" flex justify-start gap-x-6 mb-4">
        <Link href="/">
          <GoBackBtn text="Go Back" />
        </Link>
      </div>
      {!loading && property && (
        <>
          <PropertyImage image={property.images[0]} />
        </>
      )}
      <PropertyDetails property={property} />
    </div>
  );
}
