// page.js
"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import SliderClient from "./components/SliderClient";
import { FiMessageSquare } from "react-icons/fi";
// Import icons for social media and phone
import { FaFacebook, FaTiktok, FaLine } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

export default function Home() {
  const [showContact, setShowContact] = useState(false);
  // เพิ่ม state สำหรับข้อความในช่อง Message และสถานะ error
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // เพิ่ม state สำหรับการป้องกันการกดซ้ำ


  const works = [
    {
      id: 1,
      title: "Work 1",
      desc: "This is the description for the first work. This is the description for the first work. This is the description for the first work. This is the description for the first work. This is the description for the first work. This is the description for the first work.",
      imgSrc: "/gsb.jpg",
    },
    {
      id: 2,
      title: "Work 2",
      desc: "This is the description for the second work. This is the description for the second work. This is the description for the second work.",
      imgSrc: "/owner1.jpg",
    },
  ];

  const products = [
    { id: 1, name: "Product 1", href: "https://example1.com", imgSrc: "/owner1.jpg" },
    { id: 2, name: "Product 2", href: "https://example2.com", imgSrc: "/owner1.jpg" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ฟังก์ชันสำหรับตรวจสอบเบอร์โทรศัพท์ในข้อความ
  const validateMessage = (text) => {
    // ใช้ Regular Expression เพื่อหาตัวเลขในข้อความ
    const numbers = text.match(/\d/g); // ดึงเฉพาะตัวเลข
    if (!numbers || numbers.length < 10) {
      setMessageError('โปรดระบุเบอร์โทรศัพท์อย่างน้อย 10 หลักในข้อความ');
      return false;
    }
    setMessageError(''); // เคลียร์ error ถ้าถูกต้อง
    return true;
  };

  // Handler เมื่อผู้ใช้พิมพ์ในช่อง Message
  const handleMessageChange = (e) => {
    const text = e.target.value;
    setMessage(text);
    // ตรวจสอบทันทีที่พิมพ์ (Optional: สามารถเลือกตรวจสอบแค่ตอน Submit ก็ได้)
    if (text.length > 0) { // ตรวจสอบเมื่อเริ่มพิมพ์เท่านั้น ไม่ใช่ตอนช่องว่าง
      validateMessage(text);
    } else {
      setMessageError(''); // ล้าง error เมื่อช่องว่าง
    }
  };

  // Handler เมื่อฟอร์มถูก Submit
  const handleSubmit = (e) => {
    e.preventDefault(); // ป้องกันการ Submit แบบปกติของเบราว์เซอร์

    // ตรวจสอบความถูกต้องอีกครั้งก่อนส่ง
    const isValid = validateMessage(message);

    if (!isValid) {
      // ถ้าไม่ถูกต้อง ไม่ต้องทำอะไร ปล่อยให้ข้อความ error แสดง
      return;
    }

    // ป้องกันการกดซ้ำ
    if (isSubmitting) {
        return;
    }
    setIsSubmitting(true);

    // ถ้าทุกอย่างถูกต้อง ให้ Submit ฟอร์มผ่าน Formspree
    // เราจะใช้ fetch API แทนการส่งฟอร์มแบบปกติ เพื่อควบคุมสถานะได้ดีกว่า
    const form = e.target;
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
          'Accept': 'application/json'
      }
    })
    .then(response => {
        if (response.ok) {
            // แสดงข้อความสำเร็จ
            alert('ข้อความของคุณถูกส่งเรียบร้อยแล้ว!');
            setMessage(''); // ล้างช่องข้อความ
            setMessageError(''); // ล้าง error
            setShowContact(false); // ปิด panel
        } else {
            // แสดงข้อความผิดพลาด
            alert('เกิดข้อผิดพลาดในการส่งข้อความ โปรดลองอีกครั้ง');
        }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        alert('เกิดข้อผิดพลาดในการส่งข้อความ โปรดลองอีกครั้ง');
    })
    .finally(() => {
        setIsSubmitting(false); // รีเซ็ตสถานะการส่ง
    });
  };

  return (
    <>
      {/* Left side posters (2 vertical) */}
      <div className={styles.leftPosterWrapper}>
        <img src="/insure2.png" alt="Poster 1" className={styles.leftPosterImage} />
        <img src="/insure2.png" alt="Poster 2" className={styles.leftPosterImageSecond} />
      </div>

      {/* Sticky Header */}
      <header className={styles.stickyHeader}>
        <nav className={styles.headerNav}>
          <div className={styles.homeText} onClick={scrollToTop} style={{ cursor: 'pointer' }}>
            Home
          </div>

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
        <section className={styles.sliderSection}>
          <SliderClient className={styles.sliderWrapper} />
        </section>

        <main className={styles.main}>
          <section className={styles.workSection}>
            <h2>Our Works</h2>
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
          {/* เพิ่ม onSubmit handler และผูก input/textarea กับ state */}
          <form onSubmit={handleSubmit} action="https://formspree.io/f/mjkrazly" method="POST" className={styles.contactForm}>
            <label>
              Name:<br />
              <input type="text" name="name" required />
            </label>
            <label>
              Email:<br />
              <input type="email" name="_replyto" required />
            </label>
            <label className={styles.messageLabel}>
              Message:<br />
              {/* ผูก textarea กับ state และ handler */}
              <textarea
                name="message"
                rows={4}
                required
                value={message} // ควบคุมค่า input ด้วย state
                onChange={handleMessageChange} // เมื่อค่าเปลี่ยนให้เรียก handler
              ></textarea>
              {/* แสดงข้อความ error ถ้ามี */}
              {messageError && <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '-10px', marginBottom: '10px' }}>{messageError}</p>}
              
            </label>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'กำลังส่ง...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
