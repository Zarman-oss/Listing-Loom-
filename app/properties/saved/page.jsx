'use client';

import { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard.jsx';
import Loader from '@/app/loading.jsx';

export default function page() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperty = async () => {
      try {
        const res = await fetch('/api/bookmarks');
        if (res.status === 200) {
          const data = await res.json();
          setProperties();
        } else {
          console.log(res.statusText);
        }
      } catch (error) {}
    };
  }, []);

  return (
    <div>
      <h1>vdsvvds</h1>
    </div>
  );
}
