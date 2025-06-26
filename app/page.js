// page.js
"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import SliderClient from "./components/SliderClient";
import { FiMessageSquare } from "react-icons/fi";
// Import icons for social media and phone
import { FaFacebook, FaTiktok, FaLine } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

// กำหนด BASE_PATH จาก environment variable
// Next.js จะแทนที่ค่านี้ด้วย basePath จาก next.config.mjs ตอน build
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''; // เพิ่ม || '' เพื่อป้องกัน undefined ในบางกรณี


export default function Home() {
  const [showContact, setShowContact] = useState(false);

  const works = [
    {
      id: 1,
      title: "Work 1",
      desc: "This is the description for the first work. This is the description for the first work. This is the description for the first work. This is the description for the first work. This is the description for the first work. This is the description for the first work.",
      imgSrc: `${BASE_PATH}/owner1.jpg`, // แก้ไขตรงนี้
    },
    {
      id: 2,
      title: "Work 2",
      desc: "This is the description for the second work. This is the description for the second work. This is the description for the second work.",
      imgSrc: `${BASE_PATH}/owner1.jpg`, // แก้ไขตรงนี้
    },
  ];

  const products = [
    { id: 1, name: "Product 1", href: "https://example1.com", imgSrc: `${BASE_PATH}/owner1.jpg` }, // แก้ไขตรงนี้
    { id: 2, name: "Product 2", href: "https://example2.com", imgSrc: `${BASE_PATH}/owner1.jpg` }, // แก้ไขตรงนี้
  ];

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Left side posters (2 vertical) */}
      <div className={styles.leftPosterWrapper}>
        <img src={`${BASE_PATH}/insure2.png`} alt="Poster 1" className={styles.leftPosterImage} /> {/* แก้ไขตรงนี้ */}
        <img src={`${BASE_PATH}/insure2.png`} alt="Poster 2" className={styles.leftPosterImageSecond} /> {/* แก้ไขตรงนี้ */}
      </div>

      {/* Sticky Header */}
      <header className={styles.stickyHeader}>
        <nav className={styles.headerNav}>
          {/* Home Text - changed from button to div for text */}
          <div className={styles.homeText} onClick={scrollToTop} style={{ cursor: 'pointer' }}>
            Home
          </div>

          {/* Social Media Icons and Phone Number Wrapper */}
          <div className={styles.socialAndPhoneWrapper}>
            <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FaFacebook size={24} />
            </a>
            <a href="https://www.tiktok.com/@yourpage" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FaTiktok size={24} />
            </a>
            <a href="https://line.me/ti/p/@yourid" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FaLine size={24} />
            </a>
            <div className={styles.phoneNumber}>
              <FiPhone size={20} style={{ marginRight: '5px' }} /> 081-XXX-XXXX
            </div>
          </div>
        </nav>
      </header>

      {/* Main page content container */}
      <div className={styles.page}>
        {/* Slider Section */}
        <section className={styles.sliderSection}>
          {/* ตรวจสอบว่า SliderClient ส่ง Path รูปภาพเข้าไปอย่างถูกต้องด้วย BASE_PATH หรือไม่ */}
          {/* หาก SliderClient ใช้ src="/slide1.jpg" จะต้องแก้ไขภายใน SliderClient.js ด้วยเช่นกัน */}
          <SliderClient className={styles.sliderWrapper} />
        </section>

        {/* Main content area */}
        <main className={styles.main}>
          {/* Work Section */}
          <section className={styles.workSection}>
            <h2>Our Works</h2>
            {/* Featured Work Item */}
            {works[0] && (
              <div key={works[0].id} className={styles.featuredWorkItem}>
                <div className={styles.workImageWrapper}>
                  <img src={works[0].imgSrc} alt={works[0].title} className={styles.workImage} />
                </div>
                <div className={styles.workText}>
                  <h3>{works[0].title}</h3>
                  <p>{works[0].desc}</p>
                </div>
              </div>
            )}

            {/* Other Work Items */}
            {works.slice(1).map((work, index) => (
              <div
                key={work.id}
                className={`${styles.workItem} ${index % 2 === 0 ? styles.reverse : ""}`}
              >
                <div className={styles.workImageWrapper}>
                  <img src={work.imgSrc} alt={work.title} className={styles.workImage} />
                </div>
                <div className={styles.workText}>
                  <h3>{work.title}</h3>
                  <p>{work.desc}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Products Section */}
          <section className={styles.productsSection}>
            <h2>Products</h2>
            <div className={styles.productsGrid}>
              {products.map((product) => (
                <a
                  key={product.id}
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.productCard}
                >
                  <img src={product.imgSrc} alt={product.name} className={styles.productImage} />
                  <p>{product.name}</p>
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Floating Contact Button */}
      <div className={styles.contactWrapper}>
        <button
          className={`${styles.contactToggleButton} ${showContact ? styles.minimized : ""}`}
          onClick={() => setShowContact((prev) => !prev)}
          aria-label="Contact Us"
          title="Contact Us"
        >
          <FiMessageSquare size={24} style={{ marginRight: showContact ? 0 : 8 }} />
          {!showContact && "Contact Us"}
        </button>

        {/* Floating Contact Panel */}
        <div className={`${styles.floatingContactPanel} ${showContact ? styles.show : ""}`}>
          <h2>Contact Us</h2>
          <form
            action="https://formspree.io/f/mjkrazly"
            method="POST"
            className={styles.contactForm}
          >
            <label>
              Name:<br />
              <input type="text" name="name" required />
            </label>
            <label>
              Email:<br />
              <input type="email" name="_replyto" required />
            </label>
            <label className={styles.messageLabel}> {/* Added class for positioning context */}
              Message:<br />
              <textarea name="message" rows={4} required></textarea>
              {/* Added the persistent note inside the message box */}
              <div className={styles.phoneNumberReminder}>
                โปรดระบุเบอร์โทรแนบตลอด
              </div>
            </label>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </>
  );
}
