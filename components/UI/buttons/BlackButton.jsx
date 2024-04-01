export default function BlackButton({ text }) {
  return (
    <button className="inline-block bg-black text-white rounded px-4 py-2 hover:bg-gray-700">
      {text}
    </button>
  );
}
