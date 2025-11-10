 'use client';

import { useState } from 'react';
import type { PortfolioItem } from '@/types';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import PortfolioDetail from './PortfolioDetail';
import Image from 'next/image';

interface PortfolioSectionProps {
  data: PortfolioItem[];
}

export default function PortfolioSection({ data }: PortfolioSectionProps) {
  const [ref] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const getAnimationClass = (index: number) => {
    if (index % 3 === 0) return 'slide-in-left';
    if (index % 3 === 1) return 'fade-in-up';
    return 'slide-in-right';
  };

  const handleViewDetail = (project: PortfolioItem) => {
    console.log('Viewing project:', project);
    setSelectedProject(project);
  };

  const handleCloseDetail = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <section id="portofolio" className="min-h-screen py-20 pt-24 relative">
        <div className="container mx-auto px-6">
          <div
            ref={ref}
            className="text-center mb-16 fade-in-up animate-in"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Portofolio
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((project, index) => (
              <div
                key={project.id}
                className={`${getAnimationClass(index)} animate-in`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <button
                  type="button"
                  className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden card-hover h-full cursor-pointer w-full text-left portfolio-card-ready"
                  onClick={() => handleViewDetail(project)}
                >
                  <div
                    className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
                  >
                    <Image
                      src={project.photos && project.photos.length > 0 ? project.photos[0] : (project.photo ?? '/img/banner.jpg')}
                      alt={project.title}
                      width={800}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <div className="mb-2">
                      <span className="text-yellow-400 text-sm font-medium">{project.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-white/70 mb-4 flex-grow line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white/20 rounded-md text-white/80 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-white/20 rounded-md text-white/80 text-sm">
                          +{project.technologies.length - 3} lagi
                        </span>
                      )}
                    </div>
                    <div className={`bg-gradient-to-r ${project.gradient} text-white px-4 py-2 rounded-lg text-center mt-auto`}>
                      Lihat Detail
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Detail Modal */}
      {selectedProject && (
        <PortfolioDetail 
          project={selectedProject} 
          onClose={handleCloseDetail}
        />
      )}
    </>
  );
}
