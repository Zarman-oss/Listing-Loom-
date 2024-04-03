import Image from 'next/image';

export default function PropertyImage({ image }) {
  return (
    <div className="flex lg:flex-cols  relative h-auto lg:h-auto">
      <div className="justify-start">
        <Image
          src={`/images/properties/${image}`}
          alt="img"
          sizes="(min-width: 768px) 45vw, 100vw" // Adjusted sizes for md and sm screens
          height={0}
          width={0}
          className="rounded-lg h-auto w-full lg:w-full lg:h-full "
        />
      </div>
    </div>
  );
}
