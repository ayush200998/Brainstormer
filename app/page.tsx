import Image from "next/image";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Server Components
import Header from './_components/Header';
import Hero from './_components/Hero';

// Client Components with SSR disabled
const BackgroundNoise = dynamic(() => import('./_components/BackgroundNoise'));
const FloatingElements = dynamic(() => import('./_components/FloatingElements'));

export default function Home() {
  return (
    <div 
      id='app-container'
      className='h-full min-h-screen bg-gray-950 relative'
    >
      {/* Background effects - client-side only */}
      <Suspense fallback={null}>
        <BackgroundNoise />
        <FloatingElements />
      </Suspense>
      
      {/* Main content */}
      <Header />
      <Hero />
    </div>
  );
}
