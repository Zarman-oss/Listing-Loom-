const PrimaryButton = ({ text }) => {
  return (
    <button className="bg-white  text-black text-base font-medium  py-2 px-2 rounded-lg sm:w-32">
      {text}
    </button>
  );
};

export default PrimaryButton;
