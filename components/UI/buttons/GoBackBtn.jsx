export default function GoBackBtn({ text }) {
  return (
    <div className=" text-sm font-semibold text-purple-500 flex items-center">
      <span className="mr-1">←</span>
      <span>{text}</span>
    </div>
  );
}
