import ErrorPage from '../components/ErrorPage';
import PropertyCard from '../components/PropertyCard';
import { fetchProperties } from '../utils/requests';

export default async function FeaturedProperties() {
  const properties = await fetchProperties();

  const recentListing = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-black mb-6 text-start">
          Recent Listings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentListing.length === 0 ? (
            <ErrorPage />
          ) : (
            recentListing.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
