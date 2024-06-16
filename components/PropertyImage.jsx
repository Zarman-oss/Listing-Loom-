'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';

export default function PropertyImage({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className='relative h-auto lg:h-auto'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {images.map((image, index) => (
          <div
            key={index}
            className='w-full'
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image}
              alt={`Property Image ${index + 1}`}
              sizes='(min-width: 768px) 45vw, 100vw'
              layout='responsive'
              height={100}
              width={100}
              className='rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer'
            />
          </div>
        ))}
      </div>

      {isLightboxOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center'>
          <button
            className='absolute top-4 right-4 text-white'
            onClick={closeLightbox}
          >
            <XCircleIcon className='h-8 w-8' />
          </button>
          <button className='absolute left-4 text-white' onClick={prevImage}>
            <ArrowLeftIcon className='h-8 w-8' />
          </button>
          <div className='max-w-4xl mx-auto p-8'>
            <Image
              src={images[currentImageIndex]}
              alt={`Property Image ${currentImageIndex + 1}`}
              sizes='100vw'
              layout='responsive'
              height={100}
              width={100}
              className='rounded-lg'
            />
          </div>
          <button className='absolute right-4 text-white' onClick={nextImage}>
            <ArrowRightIcon className='h-8 w-8' />
          </button>
        </div>
      )}
    </div>
  );
}
