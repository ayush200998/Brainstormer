import Image from "next/image";

// Custom Components
import Header from './_components/Header';
import Hero from './_components/Hero';

export default function Home() {
  return (
    <div 
      id='app-container'
      className='h-[100vh]'
    >
      <Header />

      <Hero />
    </div>
  );
}
