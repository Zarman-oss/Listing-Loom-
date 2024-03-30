/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchProperty } from '../../../utils/requests';

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

  return (
    <div>
      <h1>From property id page</h1>
    </div>
  );
}
