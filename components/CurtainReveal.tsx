'use client'

import { useRef, useEffect } from 'react'

export function CurtainReveal({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          leftCurtainRef.current?.classList.add('translate-x-[-100%]');
          rightCurtainRef.current?.classList.add('translate-x-[100%]');
        } else {
          leftCurtainRef.current?.classList.remove('translate-x-[-100%]');
          rightCurtainRef.current?.classList.remove('translate-x-[100%]');
        }
      },
      {
        threshold: 0.3,
        rootMargin: '-50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Curtain Container */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Left Curtain */}
        <div
          ref={leftCurtainRef}
          className="absolute top-0 left-0 w-[50%] h-full bg-[#2F4F4F] transform transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `
              linear-gradient(135deg, 
                rgba(47, 79, 79, 0.95) 0%,
                rgba(47, 79, 79, 0.85) 100%
              )
            `,
            clipPath: `polygon(
              0 0,
              100% 0,
              100% calc(100% - 40px),
              90% 100%,
              80% calc(100% - 40px),
              70% 100%,
              60% calc(100% - 40px),
              50% 100%,
              40% calc(100% - 40px),
              30% 100%,
              20% calc(100% - 40px),
              10% 100%,
              0 calc(100% - 40px)
            )`
          }}
        >
          {/* <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay" /> */}
        </div>

        {/* Right Curtain */}
        <div
          ref={rightCurtainRef}
          className="absolute top-0 right-0 w-[50%] h-full bg-[#2F4F4F] transform transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `
              linear-gradient(225deg, 
                rgba(47, 79, 79, 0.95) 0%,
                rgba(47, 79, 79, 0.85) 100%
              )
            `,
            clipPath: `polygon(
              0 0,
              100% 0,
              100% calc(100% - 40px),
              90% 100%,
              80% calc(100% - 40px),
              70% 100%,
              60% calc(100% - 40px),
              50% 100%,
              40% calc(100% - 40px),
              30% 100%,
              20% calc(100% - 40px),
              10% 100%,
              0 calc(100% - 40px)
            )`
          }}
        >
          <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay" />
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
}

