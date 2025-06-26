// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // การตั้งค่าเหล่านี้ถูกลบ/comment ออกไป เพราะ Vercel จัดการ Next.js deployment ได้อย่าง native
  // ทำให้ไม่จำเป็นต้องตั้งค่าสำหรับ Static Export หรือ basePath/assetPrefix อีกต่อไป

  // output: 'export', // ไม่จำเป็นสำหรับ Vercel
  // basePath: '/insurance-landing-page', // ไม่จำเป็นสำหรับ Vercel
  // trailingSlash: true, // ไม่จำเป็นสำหรับ Vercel

  // images: {
  //   unoptimized: true, // Vercel รองรับ Next.js Image Optimization เต็มรูปแบบแล้ว
  // },

  // env: {
  //   NEXT_PUBLIC_BASE_PATH: '/insurance-landing-page', // ไม่จำเป็นอีกต่อไปเมื่อไม่มี basePath
  // },

  // assetPrefix: process.env.NODE_ENV === 'production'
  //   ? 'https://chayananjeeson.github.io/insurance-landing-page/'
  //   : '', // ไม่จำเป็นสำหรับ Vercel
};

export default nextConfig;
