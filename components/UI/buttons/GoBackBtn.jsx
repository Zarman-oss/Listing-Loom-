export default function GoBackBtn({ text }) {
  return (
    <div className=" text-xl font-semibold text-indigo-600 flex items-center">
      <span className="mr-1">←</span>
      <span>{text}</span>
    </div>
  );
}
