// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enables the static HTML export.
  // When 'output' is 'export', Next.js will generate a static HTML/CSS/JS site
  // in the 'out' directory which can be hosted on any static hosting provider,
  // like GitHub Pages.
  output: 'export',

  // IMPORTANT: The basePath is now set to '/insurance-landing-page'
  // This matches your GitHub repository name.
  // This tells Next.js that your site will be hosted under a subpath on GitHub Pages.
  basePath: '/insurance-landing-page', 

  // Optional: Disables the 'trailing slash' behavior for cleaner URLs.
  trailingSlash: true,

  // Optional: Configures image optimization. Since GitHub Pages is static,
  // Next.js image optimization features that require a server won't work.
  // Setting 'unoptimized: true' prevents Next.js from trying to optimize
  // images at runtime, ensuring they are served directly.
  images: {
    unoptimized: true,
  },

  // Note: If you use any features that require a Next.js server (e.g., API Routes,
  // server-side rendering with getServerSideProps, server components with 'use server'),
  // they will not work with 'output: 'export''. GitHub Pages only hosts static files.
};

export default nextConfig;
