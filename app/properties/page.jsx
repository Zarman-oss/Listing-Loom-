import properties from '../../properties.json';
import PropertyCard from '../../components/PropertyCard';
import ErrorPage from '../../components/ErrorPage';
export default function page() {
  return (
    <section className="px-4 py-6">
      {properties.length === 0 ? (
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
