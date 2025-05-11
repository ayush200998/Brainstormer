'use client';

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically load HeroSVG with SSR disabled
const HeroSVG = dynamic(() => import('./HeroSVG'), { 
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-gray-900/20 animate-pulse rounded-lg" />
});

function Hero() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    // Only run animations after component mounts client-side
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleRedirectToDashboard = () => {
        router.push('/dashboard');
    }

    return (
        <section
            id='hero-container'
            className="relative bg-gray-950 text-white overflow-hidden"
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none"></div>
            
            {/* Radial glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-blue-600/5 blur-3xl pointer-events-none"></div>
            
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:py-24 lg:flex lg:h-screen lg:items-center">
                <div className="lg:flex w-full gap-x-16 items-center">
                    {/* Left side content */}
                    <motion.div 
                        className="lg:w-1/2"
                        initial={isMounted ? { y: 20, opacity: 0 } : { y: 0, opacity: 1 }}
                        animate={isMounted ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.h1
                            className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl xl:text-6xl"
                            initial={isMounted ? { y: 20, opacity: 0 } : { y: 0, opacity: 1 }}
                            animate={isMounted ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            Documents & diagrams
                            <span className="sm:block mt-1"> For teams </span>
                        </motion.h1>

                        <motion.p 
                            className="mx-auto mt-4 max-w-xl text-lg sm:text-xl text-gray-300 leading-relaxed"
                            initial={isMounted ? { y: 20, opacity: 0 } : { y: 0, opacity: 1 }}
                            animate={isMounted ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            All-in-one markdown editor, collaborative canvas, and diagram-as-a-code builder
                        </motion.p>

                        <motion.div 
                            className="mt-8 flex flex-wrap gap-4"
                            initial={isMounted ? { y: 20, opacity: 0 } : { y: 0, opacity: 1 }}
                            animate={isMounted ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <Button
                                size='lg'
                                variant='outline'
                                className='rounded-full bg-gray-900 text-white border-gray-700 hover:border-blue-500 hover:bg-blue-500/10 hover:text-white transition-all duration-300'
                                onClick={() => handleRedirectToDashboard()}
                            >
                                <span className="mr-2">✨</span>
                                See What's New | AI Diagram
                            </Button>

                            <Button
                                size='lg'
                                className='rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-900/20'
                                onClick={() => handleRedirectToDashboard()}
                            >
                                Learn more
                            </Button>
                        </motion.div>
                        
                        {/* Feature badges */}
                        <motion.div 
                            className="mt-12 flex flex-wrap gap-3"
                            initial={isMounted ? { opacity: 0 } : { opacity: 1 }}
                            animate={isMounted ? { opacity: 1 } : {}}
                            transition={{ duration: 1, delay: 0.6 }}
                        >
                            {['Real-time Collaboration', 'AI Powered', 'Code Integration'].map((feature, index) => (
                                <span 
                                    key={index} 
                                    className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gray-800 text-gray-300"
                                >
                                    {feature}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right side SVG */}
                    <motion.div 
                        className="lg:w-1/2 mt-12 lg:mt-0"
                        initial={isMounted ? { opacity: 0 } : { opacity: 1 }}
                        animate={isMounted ? { opacity: 1 } : {}}
                        transition={{ duration: 1 }}
                    >
                        <Suspense fallback={<div className="w-full h-[400px] bg-gray-900/20 animate-pulse rounded-lg" />}>
                            <HeroSVG />
                        </Suspense>
                    </motion.div>
                </div>
            </div>
            
            {/* Bottom decorative element */}
            <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
        </section>
    );
}

export default Hero;