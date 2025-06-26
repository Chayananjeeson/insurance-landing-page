// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Enable static HTML export
  // When 'output' is 'export', Next.js will build your project into static HTML/CSS/JS files
  // in the 'out' directory, suitable for static hosting like GitHub Pages.
  output: 'export',

  // 2. IMPORTANT: Define the base path for your GitHub Pages deployment.
  // This must EXACTLY match your GitHub repository name.
  // Your URL is https://chayananjeeson.github.io/insurance-landing-page/,
  // so the basePath is '/insurance-landing-page'.
  basePath: '/insurance-landing-page', // <-- Ensure this matches your GitHub repo name

  // 3. (Optional) Force trailing slashes for cleaner URLs, good for static sites.
  trailingSlash: true,

  // 4. (Optional) Disable Next.js image optimization for static exports.
  // GitHub Pages doesn't support server-side image optimization.
  images: {
    unoptimized: true,
  },

  // 5. Define environment variables accessible in client-side code.
  // NEXT_PUBLIC_BASE_PATH will be set according to the basePath.
  // This is essential for correct image and asset loading in both development and production builds.
  env: {
    NEXT_PUBLIC_BASE_PATH: '/insurance-landing-page', // <-- Must exactly match the basePath above
  },

  // 6. ***** CRITICAL FIX: Conditionally apply assetPrefix for Production builds only *****
  // assetPrefix specifies the prefix for all assets (JS, CSS, images managed by Next.js)
  // in the Production build (in the 'out' folder).
  // For GitHub Pages on a subpath, assetPrefix should be the full URL of your site.
  //
  // process.env.NODE_ENV === 'production' ensures this is only applied when building for production.
  // In development, it will be undefined, so assets load correctly from localhost.
  assetPrefix: process.env.NODE_ENV === 'production'
    ? 'https://chayananjeeson.github.io/insurance-landing-page/' // Full URL for production
    : '', // Empty string for local development to load assets from localhost
};

export default nextConfig;
