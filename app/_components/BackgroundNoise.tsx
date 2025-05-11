'use client';

import React, { useEffect, useRef, useState } from 'react';

// This component generates a procedural noise texture as an SVG
// It's an alternative to using a static image
const BackgroundNoise = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only run this effect on the client side
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !isMounted) return;

    // Get SVG context
    const svg = svgRef.current;
    const ns = 'http://www.w3.org/2000/svg';
    
    // Clear existing content
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    
    // Create filter
    const filter = document.createElementNS(ns, 'filter');
    filter.setAttribute('id', 'noise');
    
    // Add turbulence with fixed seed (42)
    const turbulence = document.createElementNS(ns, 'feTurbulence');
    turbulence.setAttribute('type', 'fractalNoise');
    turbulence.setAttribute('baseFrequency', '0.80');
    turbulence.setAttribute('numOctaves', '4');
    turbulence.setAttribute('stitchTiles', 'stitch');
    turbulence.setAttribute('seed', '42'); // Fixed seed for consistent rendering
    
    // Add color matrix to make the noise more subtle
    const colorMatrix = document.createElementNS(ns, 'feColorMatrix');
    colorMatrix.setAttribute('type', 'matrix');
    colorMatrix.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0');
    
    // Assemble filter elements
    filter.appendChild(turbulence);
    filter.appendChild(colorMatrix);
    
    // Add rectangle with the filter applied
    const rect = document.createElementNS(ns, 'rect');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('filter', 'url(#noise)');
    rect.setAttribute('opacity', '0.15');
    rect.setAttribute('fill', 'transparent');
    
    // Add elements to SVG
    const defs = document.createElementNS(ns, 'defs');
    defs.appendChild(filter);
    svg.appendChild(defs);
    svg.appendChild(rect);
  }, [isMounted]);

  // Return null until the component is mounted on the client
  if (!isMounted) {
    return null;
  }

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-[0.03]"
      xmlns="http://www.w3.org/2000/svg"
    />
  );
};

export default BackgroundNoise; 