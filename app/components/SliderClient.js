// SliderClient.js
"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// กำหนด BASE_PATH จาก environment variable
// Next.js จะแทนที่ค่านี้ด้วย basePath จาก next.config.mjs ตอน build
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''; // เพิ่ม || '' เพื่อป้องกัน undefined ในบางกรณี

const images = [
  // แก้ไข src ของรูปภาพแต่ละรูปให้มี BASE_PATH นำหน้า
  { id: 1, src: `${BASE_PATH}/owner1.jpg`, alt: "Slide 1" },
  { id: 2, src: `${BASE_PATH}/owner2.jpg`, alt: "Slide 2" },
  { id: 3, src: `${BASE_PATH}/owner3.jpg`, alt: "Slide 3" },
];

export default function SliderClient({ className }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div style={{ maxWidth: 960, width: "100%", margin: "0 auto" }} className="sliderWrapper">
      <Slider {...settings} className={className}>
        {images.map((image) => (
          <div key={image.id}>
            <div style={{ overflow: "hidden" }}>
              <img
                src={image.src} // ตรงนี้จะใช้ Path ที่ถูกแก้ไขแล้ว
                alt={image.alt}
                style={{
                  width: "100%",
                  height: "400px",      // กำหนดความสูงตายตัวเพื่อให้รูปภาพเต็มพื้นที่
                  objectFit: "cover",    // เปลี่ยนเป็น cover เพื่อให้รูปภาพเต็มกรอบและอาจมีการตัดบางส่วน
                  backgroundColor: "#e0f4ff", // สีพื้นหลังกลมกลืนไม่ขาวล้น
                  userSelect: "none",
                  pointerEvents: "none",
                  display: "block",
                  margin: "0 auto",      // จัดกึ่งกลางแนวนอน
                }}
                draggable={false}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
