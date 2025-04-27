'use client';

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React from 'react'

function Hero() {
    const router = useRouter();

    const handleRedirectToDashboard = () => {
        router.push('/dashboard');
    }

  return (
    <section
        id='hero-container'
        className="bg-gray-950 text-white"
    >
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
            <div className="mx-auto max-w-3xl text-center">
            <h1
                className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
            >
                Documents & diagrams
                <span className="sm:block"> For engineering teams </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                All-in-one markdown editor, collaborative canvas, and diagram-as-a-code builder
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button
                    size='lg'
                    variant='defaultOutline'
                    className='rounded-full'
                    onClick={() => handleRedirectToDashboard()}
                >
                    See What's New | AI Diagram
                </Button>

                <Button
                    size='lg'
                    className='rounded-full'
                    onClick={() => handleRedirectToDashboard()}
                >
                    Learn more
                </Button>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Hero