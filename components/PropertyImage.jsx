import Image from 'next/image';

export default function PropertyImage({ image }) {
  return (
    <div className="flex relative h-auto lg:h-auto">
      <div className="w-full">
        <Image
          src={image}
          alt="Property Image"
          sizes="(min-width: 768px) 45vw, 100vw"
          layout="responsive"
          height={100}
          width={100}
          className="rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>
    </div>
  );
}
