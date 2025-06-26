// SliderClient.js
"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  { id: 1, src: "/owner1.jpg", alt: "Slide 1" },
  { id: 2, src: "/owner2.jpg", alt: "Slide 2" },
  { id: 3, src: "/owner3.jpg", alt: "Slide 3" },
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
                src={image.src}
                alt={image.alt}
                style={{
                  width: "100%",
                  height: "400px",         // กำหนดความสูงตายตัวเพื่อให้รูปภาพเต็มพื้นที่
                  objectFit: "cover",       // เปลี่ยนเป็น cover เพื่อให้รูปภาพเต็มกรอบและอาจมีการตัดบางส่วน
                  backgroundColor: "#e0f4ff", // สีพื้นหลังกลมกลืนไม่ขาวล้น
                  userSelect: "none",
                  pointerEvents: "none",
                  display: "block",
                  margin: "0 auto",         // จัดกึ่งกลางแนวนอน
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