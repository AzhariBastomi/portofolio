"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselProps {
  images: string[];
  alt: string;
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

export default function Carousel({ images, alt, className, autoPlay = true, interval = 10000 }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);
  const total = images.length;
  // Destructure props for autoplay and interval

  // Auto play logic
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (total > 1 && typeof window !== 'undefined' && autoPlay) {
      timer = setInterval(() => {
        setFade(true);
        setTimeout(() => {
          setCurrent((c) => (c === total - 1 ? 0 : c + 1));
          setFade(false);
        }, 400);
      }, interval);
    }
    return () => timer && clearInterval(timer);
  }, [total, autoPlay, interval]);
  const handlePrev = () => {
    setFade(true);
    setTimeout(() => {
      setCurrent((c) => (c === 0 ? total - 1 : c - 1));
      setFade(false);
    }, 400);
  };
  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrent((c) => (c === total - 1 ? 0 : c + 1));
      setFade(false);
    }, 400);
  };

  return (
    <div className={`relative w-full h-full ${className ?? ''}`}>
  <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
      <Image
        src={images[current]}
        alt={alt}
        fill
        className={`object-cover w-full h-full z-0 transition-opacity duration-400 ${fade ? 'opacity-0' : 'opacity-100'}`}
        priority
      />
      {total > 1 && (
        <>
          {/* Selalu tampilkan tombol panah untuk manual navigation */}
          <button
            type="button"
            onClick={() => { handlePrev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-[999] bg-black/40 text-white p-2 rounded-full hover:bg-black/60 pointer-events-auto"
            aria-label="Sebelumnya"
          >
            &#8592;
          </button>
          <button
            type="button"
            onClick={() => { handleNext(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-[999] bg-black/40 text-white p-2 rounded-full hover:bg-black/60 pointer-events-auto"
            aria-label="Selanjutnya"
          >
            &#8594;
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((img, i) => (
              <span
                key={img || i}
                className={`w-2 h-2 rounded-full bg-white/60 ${i === current ? 'bg-yellow-400' : ''}`}
                style={{ display: 'inline-block' }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
