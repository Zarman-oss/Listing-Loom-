'use client';
import profileDefault from '@/assets/styles/images/profile.png';
import Loader from '@/components/Loading.jsx';
import Alert from '@/components/UI/Alert.jsx';
import Modal from '@/components/UI/Modal.jsx';
import HeroBtn from '@/components/UI/buttons/HeroBtn.jsx';
import { useSession } from 'next-auth/react';
import Image from 'next/image.js';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaMapMarker } from 'react-icons/fa';

export default function ProfilePage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      console.log('Fetching properties for user:', userId);
      if (!userId) {
        return;
      }

      try {
        const res = await fetch(`/api/properties/user/${userId}`);

        console.log('Response:', res);
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.log('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  const handleDeleteProperty = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async (propertyId) => {
    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE',
      });

      if (res.status === 200) {
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        );
        setProperties(updatedProperties);
        setAlert({
          show: true,
          type: 'success',
          message: 'Property deleted successfully',
        });

        // Hide the alert after 5 seconds
        // setTimeout(() => {
        //   setAlert({ show: false, type: '', message: '' });
        // }, 5000);
      } else {
        setAlert({
          show: true,
          type: 'error',
          message: 'Failed to delete property',
        });

        // Hide the alert after 5 seconds
        // setTimeout(() => {
        //   setAlert({ show: false, type: '', message: '' });
        // }, 5000);
      }
    } catch (error) {
      setAlert({
        show: true,
        type: 'error',
        message: 'Failed to delete property',
      });

      // Hide the alert after 5 seconds
      // setTimeout(() => {
      //   setAlert({ show: false, type: '', message: '' });
      // }, 5000);
    }

    setIsModalOpen(false);
  };
  return (
    <section className="py-12">
      <Alert
        show={alert.show}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ show: false, type: '', message: '' })} 
      />
      <div className="container mx-auto">
        <div className="rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="md:w-1/3 mx-auto md:mx-0 md:mr-6 mb-6 md:mb-0 text-center">
              <Image
                className="h-28 w-28 rounded-full object-cover mx-auto mb-4"
                src={profileImage || profileDefault}
                alt="User"
                width={400}
                height={300}
              />
              <div>
                <h2 className="text-xl mb-1 font-semibold">Name:</h2>
                <p className="text-lg">{profileName}</p>
                <h2 className="text-xl mb-1 font-semibold mt-4">Email:</h2>
                <p className="text-lg">{profileEmail}</p>
              </div>
            </div>

            <div className="md:w-2/3 md:pl-4">
              <h2 className="text-xl font-semibold mb-6">Your Listings</h2>
              {!loading && properties.length === 0 && (
                <p>You have not listed anything</p>
              )}

              {loading ? (
                <Loader />
              ) : (
                properties.map((property) => (
                  <div
                    key={property._id}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div className="p-4 flex flex-col justify-between">
                      <Link href={`/properties/${property._id}`}>
                        <Image
                          className="h-48 w-full object-cover mb-4 cursor-pointer"
                          src={property.images[0]}
                          alt=""
                          width={300}
                          height={400}
                          priority={true}
                        />
                      </Link>
                      <div>
                        <p className="text-lg font-semibold">{property.name}</p>

                        <p className="flex mt-2">
                          <FaMapMarker className="text-red-700 mr-1 inline mt-1" />
                          {property.location.street}, {property.location.city}{' '}
                          {property.location.state}
                        </p>
                      </div>
                      <div className="mt-4">
                        <Link
                          href={`/properties/${property._id}/edit`}
                          className="text-black px-4 py-2 font-semibold mr-4"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteProperty(property._id)}
                        >
                          <HeroBtn text="Delete" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => handleConfirmDelete(selectedPropertyId)}
      />
    </section>
  );
}
