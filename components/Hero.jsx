import HeroBtn from './heroBtn.jsx';

export default function Hero() {
  return (
    <div className="bg-white text-black py-20 w-full flex flex-col sm:flex-row justify-center items-center">
      <div className="container flex flex-col m-8 items-center ">
        <h1 className="text-5xl font-bold text-wrap text-red-700 text-center">
          Search Through Countless Properties And Rentals To Match Your Needs
        </h1>
        <p className="mt-4 text-xl  text-gray-700 text-wrap">
          Search, post rentals, and sell properties with ease
        </p>
      </div>

      <div className=" container flex flex-col sm:flex-row items-center m-24 ">
        <input
          type="text"
          placeholder="Search City Zip Code"
          className="border border-gray-300 px-4 py-2 mr-2 mb-2 sm:mb-0"
        />
        <select className="border border-gray-300 px-4 py-2 mr-2 mb-2 sm:mb-0">
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="townhouse">Townhouse</option>
        </select>
        <HeroBtn text="Search" />
      </div>
    </div>
  );
}
