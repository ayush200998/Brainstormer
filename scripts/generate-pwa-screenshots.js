const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');

// Desktop screenshot (1280x800)
async function createDesktopScreenshot() {
  const canvas = createCanvas(1280, 800);
  const ctx = canvas.getContext('2d');

  // Set background
  ctx.fillStyle = '#030712';
  ctx.fillRect(0, 0, 1280, 800);

  // Draw app name
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText('Brainstormer', 640, 100);

  // Draw tagline with gradient
  const gradient = ctx.createLinearGradient(400, 150, 900, 150);
  gradient.addColorStop(0, '#4ADE80');
  gradient.addColorStop(0.5, '#3B82F6');
  gradient.addColorStop(1, '#8B5CF6');
  
  ctx.font = '28px Arial';
  ctx.fillStyle = gradient;
  ctx.fillText('Documents & diagrams for teams', 640, 150);

  // Draw mockup content 
  ctx.fillStyle = '#1E1E1E';
  ctx.fillRect(100, 200, 1080, 500);
  
  // Draw content sections
  ctx.fillStyle = '#2D2D2D';
  ctx.fillRect(130, 230, 500, 250); // Editor area
  ctx.fillRect(650, 230, 500, 250); // Canvas area
  
  ctx.fillStyle = '#3B82F6';
  ctx.fillRect(130, 500, 1020, 80); // Footer area
  
  // Add some text elements
  ctx.font = '18px Arial';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'left';
  ctx.fillText('Document editor', 150, 250);
  ctx.fillText('Collaborative canvas', 670, 250);

  // Save the canvas to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, '../public/screenshots/desktop.png'), buffer);
  console.log('Desktop screenshot created');
}

// Mobile screenshot (750x1334)
async function createMobileScreenshot() {
  const canvas = createCanvas(750, 1334);
  const ctx = canvas.getContext('2d');

  // Set background
  ctx.fillStyle = '#030712';
  ctx.fillRect(0, 0, 750, 1334);

  // Draw app name
  ctx.font = 'bold 40px Arial';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText('Brainstormer', 375, 100);

  // Draw tagline with gradient
  const gradient = ctx.createLinearGradient(200, 150, 550, 150);
  gradient.addColorStop(0, '#4ADE80');
  gradient.addColorStop(0.5, '#3B82F6');
  gradient.addColorStop(1, '#8B5CF6');
  
  ctx.font = '24px Arial';
  ctx.fillStyle = gradient;
  ctx.fillText('Documents & diagrams for teams', 375, 150);

  // Draw mockup content
  ctx.fillStyle = '#1E1E1E';
  ctx.fillRect(50, 200, 650, 900);
  
  // Draw content sections
  ctx.fillStyle = '#2D2D2D';
  ctx.fillRect(75, 250, 600, 300); // Editor area
  ctx.fillRect(75, 580, 600, 300); // Canvas area
  
  ctx.fillStyle = '#3B82F6';
  ctx.fillRect(75, 900, 600, 80); // Footer area
  
  // Add some text elements
  ctx.font = '18px Arial';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'left';
  ctx.fillText('Document editor', 100, 280);
  ctx.fillText('Collaborative canvas', 100, 610);

  // Save the canvas to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, '../public/screenshots/mobile.png'), buffer);
  console.log('Mobile screenshot created');
}

async function generateScreenshots() {
  try {
    await createDesktopScreenshot();
    await createMobileScreenshot();
    console.log('All screenshots generated successfully!');
  } catch (error) {
    console.error('Error generating screenshots:', error);
  }
}

generateScreenshots(); 