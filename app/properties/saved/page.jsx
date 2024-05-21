'use client';
import { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard.jsx';
import Loader from '@/app/loading.jsx';
import Alert from '@/components/UI/Alert.jsx';
import Link from 'next/link.js';
import GoBackBtn from '@/components/UI/buttons/GoBackBtn.jsx';
import ErrorPage from '@/components/UI/ErrorPage.jsx';

export default function SavedPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState({
    show: false,
    type: 'success',
    message: '',
  });

  useEffect(() => {
    const fetchSavedProperty = async () => {
      try {
        const res = await fetch('/api/bookmarks');
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setAlertData({
            show: true,
            type: 'error',
            message: 'Failed to fetch saved properties',
          });
        }
      } catch (error) {
        console.log(error);
        setAlertData({
          show: true,
          type: 'error',
          message: 'Failed to fetch saved properties',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSavedProperty();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Alert
        show={alertData.show}
        onClose={() => setAlertData({ ...alertData, show: false })}
        type={alertData.type}
        message={alertData.message}
      />
      <section className="px-4 py-4">
        <div className="max-w-7xl mx-auto p-1">
          <div>
            <Link href="/">
              <GoBackBtn />
            </Link>
          </div>
        </div>
        <div className="text-center mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Saved Listings</h1>
          <p className="text-gray-600 mt-2">
            Here are the properties you've saved
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
    </div>
  );
}
