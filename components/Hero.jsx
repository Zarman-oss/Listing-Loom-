import PropertySearchForm from './PropertySearchForm.jsx';
export default function Hero() {
  return (
    <div className=" text-black py-20 w-full flex flex-col items-center justify-center">
      <div className="container flex flex-col items-center text-center px-4">
        <h1 className="text-4xl lg:text-6xl font-bold text-red-700 mb-6">
          Search Through Countless Properties And Rentals To Match Your Needs
        </h1>
        <p className="text-base lg:text-xl text-gray-700 mb-8">
          Search, post rentals, and sell properties with ease
        </p>
      </div>
      <PropertySearchForm />
    </div>
  );
}
