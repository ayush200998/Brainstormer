declare module 'next-pwa' {
  import type { NextConfig } from 'next';
  
  interface PWAConfig {
    dest?: string;
    disable?: boolean | (() => boolean);
    register?: boolean;
    scope?: string;
    sw?: string;
    runtimeCaching?: any[];
    skipWaiting?: boolean;
    buildExcludes?: Array<string | RegExp> | (() => Array<string | RegExp>);
    publicExcludes?: Array<string | RegExp> | (() => Array<string | RegExp>);
  }
  
  type WithPWA = (config?: PWAConfig) => (nextConfig: NextConfig) => NextConfig;
  
  const withPWA: WithPWA;
  
  export = withPWA;
} 