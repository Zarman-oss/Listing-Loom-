export default function HeroBtn({ text, onClick }) {
  return (
    <button
      className='bg-red-700 hover:bg-red-900 text-white px-4 py-2 rounded'
      onClick={onClick}
    >
      {text}
    </button>
  );
}
