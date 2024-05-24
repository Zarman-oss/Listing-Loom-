export default function BlackButton({ text, onClick }) {
  return (
    <button
      className="inline-block bg-black text-white rounded px-4 py-2 hover:bg-gray-800 transition-colors duration-300"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
