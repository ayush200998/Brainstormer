import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-4">
      <div className="text-center max-w-md">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <Image
            src="/icons/icon-192x192.png"
            alt="Brainstormer Logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">You're offline</h1>
        
        <p className="mb-8 text-gray-400">
          It looks like you're currently offline. Please check your internet connection 
          and try again. Some features may not be available while offline.
        </p>
        
        <div className="space-y-4">
          <Link href="/" passHref>
            <Button className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
              Try Again
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 