// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // เปิดใช้งานการ Export เป็น Static HTML
  output: 'export',

  // ***** สำคัญมาก! *****
  // กำหนด Base Path สำหรับการ Deploy บน GitHub Pages
  // ต้องเป็นชื่อ Repository ของคุณ EXACTLY (ตรงเป๊ะๆ)
  // สำหรับ URL ของคุณคือ https://chayananjeeson.github.io/insurance-landing-page/
  // ดังนั้น basePath ต้องเป็น '/insurance-landing-page'
  basePath: '/insurance-landing-page', // <-- ตรวจสอบว่าตรงกับชื่อ Repository บน GitHub ของคุณ

  // (ไม่บังคับ) ทำให้ URL มีเครื่องหมาย '/' ปิดท้ายเสมอ
  trailingSlash: true,

  // (ไม่บังคับ) ปิดการ Optimize รูปภาพของ Next.js
  images: {
    unoptimized: true,
  },

  // ***** เพิ่มส่วนนี้เข้ามา *****
  // กำหนด Environment Variables ที่จะสามารถเข้าถึงได้ในโค้ดฝั่ง Client (browser)
  // NEXT_PUBLIC_BASE_PATH จะถูกตั้งค่าตาม basePath ที่คุณกำหนดไว้
  env: {
    NEXT_PUBLIC_BASE_PATH: '/insurance-landing-page', // <-- ต้องตรงกับ basePath ด้านบนเป๊ะๆ
  },

  // หมายเหตุ: ฟีเจอร์ของ Next.js ที่ต้องใช้ Server จะไม่ทำงานเมื่อใช้ 'output: 'export''
};

export default nextConfig;
