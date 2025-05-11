import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url).searchParams.get('url');
    if (!url) {
      return NextResponse.json({ success: 0, error: 'URL is required' });
    }
    
    const response = await fetch(url);
    const html = await response.text();
    
    // Extract metadata
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const descriptionMatch = html.match(/<meta name="description" content="(.*?)"/i);
    const imageMatch = html.match(/<meta property="og:image" content="(.*?)"/i);
    
    return NextResponse.json({
      success: 1,
      link: url,
      meta: {
        title: titleMatch ? titleMatch[1] : '',
        description: descriptionMatch ? descriptionMatch[1] : '',
        image: {
          url: imageMatch ? imageMatch[1] : ''
        }
      }
    });
  } catch (error) {
    return NextResponse.json({ success: 0 });
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    const response = await fetch(url);
    const html = await response.text();
    
    // Extract metadata
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const descriptionMatch = html.match(/<meta name="description" content="(.*?)"/i);
    const imageMatch = html.match(/<meta property="og:image" content="(.*?)"/i);
    
    return NextResponse.json({
      success: 1,
      link: url,
      meta: {
        title: titleMatch ? titleMatch[1] : '',
        description: descriptionMatch ? descriptionMatch[1] : '',
        image: {
          url: imageMatch ? imageMatch[1] : ''
        }
      }
    });
  } catch (error) {
    return NextResponse.json({ success: 0 });
  }
}