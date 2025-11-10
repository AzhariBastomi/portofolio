'use client';

import type { Hero } from '@/types';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { smoothScrollTo } from '@/utils/helpers';
import Image from 'next/image';
import { useId } from 'react';

interface HeroSectionProps {
  data: Hero;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const [ref, isIntersecting] = useIntersectionObserver();
  const sectionId = useId();

  return (
    <section id={sectionId} className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            <div
              ref={ref}
              className={`slide-in-left ${isIntersecting ? 'animate-in' : ''}`}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                {data.title}
              </h1>
            </div>
            <div className={`slide-in-left ${isIntersecting ? 'animate-in' : ''}`}>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                {data.subtitle}
              </p>
            </div>
            <div className={`fade-in-up ${isIntersecting ? 'animate-in' : ''}`}>
              <button
                type="button"
                onClick={() => smoothScrollTo(data.ctaLink)}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-300 hover:text-purple-700 transition-all duration-300 animate-pulse-glow"
              >
                {data.ctaText}
              </button>
            </div>
          </div>

          {/* Right Photo */}
          <div className="flex justify-center md:justify-end">
            <div className={`slide-in-right ${isIntersecting ? 'animate-in' : ''}`}>
              <div className="relative">
                {/* Profile Photo Container */}
                <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-1 animate-float">
                  <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center overflow-hidden">
                    <Image
                      src="/img/images.jpg"
                      alt={data?.title ?? 'Profile'}
                      className="w-full h-full object-cover"
                      width={384}
                      height={384}
                      priority
                    />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-pulse" />
                <div className="absolute top-1/2 -left-8 w-4 h-4 bg-blue-400 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ...existing code... */}
    </section>
  );
}
