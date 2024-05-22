import Link from 'next/link';
import PropertyCard from '../../components/PropertyCard';
import ErrorPage from '../../components/UI/ErrorPage';
import GoBackBtn from '../../components/UI/buttons/GoBackBtn';
import { fetchProperties } from '../../utils/requests';
import PropertySearchForm from '@/components/PropertySearchForm.jsx';
export default async function HomePage() {
  const properties = await fetchProperties();

  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <section className="px-4 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center sm:px-6 lg:px-8 ">
          <PropertySearchForm />
        </div>
        <div className="flex max-w-7xl mx-auto p-1">
          <div>
            <Link href="/">
              <GoBackBtn />
            </Link>
          </div>
        </div>
        <div className="text-center mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Latest Properties
          </h1>
          <p className="text-gray-600 mt-2">
            Check out the latest properties added to our listings
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
    </>
  );
}
