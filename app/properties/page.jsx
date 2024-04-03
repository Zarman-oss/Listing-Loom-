import ErrorPage from '../../components/UI/ErrorPage';
import PropertyCard from '../../components/PropertyCard';
import GoBackBtn from '../../components/UI/buttons/GoBackBtn';
import Link from 'next/link';
import { fetchProperties } from '../../utils/requests';

export default async function HomePage() {
  const properties = await fetchProperties();

  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <section className="px-4 py-4">
      <div className="flex  max-w-7xl mx-auto p-1 ">
        <div className="   ">
          <Link href="/">
            <GoBackBtn text="Go Back" />
          </Link>
        </div>
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
