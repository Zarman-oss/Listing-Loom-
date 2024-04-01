import Image from 'next/image';

export default function PropertyImage({ image }) {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8 relative h-96 lg:h-auto">
      <Image
        src={`/images/properties/${image}`}
        alt="img"
        sizes="50vw"
        height={0}
        width={0}
        className="  rounded-sm h-full w-full lg:w-full"
      />
    </div>
  );
}
