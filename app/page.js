// page.js
"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
// ไม่ใช้ SliderClient แล้ว
import { FiMessageSquare } from "react-icons/fi";
// นำเข้าไอคอนสำหรับโซเชียลมีเดียและโทรศัพท์
import { FaFacebook, FaTiktok, FaLine } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

export default function Home() {
  const [showContact, setShowContact] = useState(false);
  // สถานะสำหรับช่องข้อความและการตรวจสอบ
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // สถานะเพื่อป้องกันการส่งข้อมูลซ้ำ

  // กำหนดข้อมูลใหม่สำหรับการ์ดโปสเตอร์ทั้งสี่ พร้อมลิงก์ไปยังหน้าสินค้าแต่ละประเภท
  const posterCards = [
    { id: 1, name: "ตลอดชีพ", href: "/wholelife-products", imgSrc: "/insure2.png" }, // ลิงก์ไปที่ /wholelife-products
    { id: 2, name: "ออมทรัพย์", href: "/savings-products", imgSrc: "/insure2.png" }, // ลิงก์ไปที่ /savings-products
    { id: 3, name: "ชั่วระยะ", href: "/term-products", imgSrc: "/insure2.png" },     // ลิงก์ไปที่ /term-products
    { id: 4, name: "บำนาญ", href: "/pension-products", imgSrc: "/insure2.png" },     // ลิงก์ไปที่ /pension-products
  ];

  // ฟังก์ชันเลื่อนไปยังด้านบนสุดของหน้า
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ฟังก์ชันตรวจสอบเบอร์โทรศัพท์ในข้อความ
  const validateMessage = (text) => {
    const numbers = text.match(/\d/g); // ดึงเฉพาะตัวเลข
    if (!numbers || numbers.length < 10) {
      setMessageError('กรุณาระบุเบอร์โทรศัพท์อย่างน้อย 10 หลักในข้อความของคุณ');
      return false;
    }
    setMessageError(''); // ล้างข้อผิดพลาดถ้าถูกต้อง
    return true;
  };

  // ตัวจัดการสำหรับการเปลี่ยนแปลงข้อความ
  const handleMessageChange = (e) => {
    const text = e.target.value;
    setMessage(text);
    if (text.length > 0) {
      validateMessage(text);
    } else {
      setMessageError(''); // ล้างข้อผิดพลาดถ้าช่องว่างเปล่า
    }
  };

  // ตัวจัดการสำหรับการส่งฟอร์ม
  const handleSubmit = (e) => {
    e.preventDefault(); // ป้องกันการทำงานเริ่มต้นของการส่งฟอร์ม

    const isValid = validateMessage(message);

    if (!isValid) {
      return; // หยุดการส่งข้อมูลถ้าการตรวจสอบล้มเหลว
    }

    if (isSubmitting) {
        return; // ป้องกันการส่งข้อมูลซ้ำ
    }
    setIsSubmitting(true);

    // ส่งฟอร์มโดยใช้ Fetch API เพื่อการควบคุมที่ดีขึ้น
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
            alert('ข้อความของคุณถูกส่งเรียบร้อยแล้ว!');
            setMessage(''); // ล้างช่องข้อความ
            setMessageError(''); // ล้างข้อผิดพลาด
            setShowContact(false); // ปิดแผงติดต่อ
        } else {
            alert('ไม่สามารถส่งข้อความได้ โปรดลองอีกครั้ง');
        }
    })
    .catch(error => {
        console.error('เกิดข้อผิดพลาดในการส่งฟอร์ม:', error);
        alert('ไม่สามารถส่งข้อความได้ โปรดลองอีกครั้ง');
    })
    .finally(() => {
        setIsSubmitting(false); // รีเซ็ตสถานะการส่ง
    });
  };

  return (
    <>
      {/* แถบหัวเรื่องแบบติดหนึบ (Sticky Header) */}
      <header className={styles.stickyHeader}>
        <nav className={styles.headerNav}>
          {/* ข้อความ Home */}
          <div className={styles.homeText} onClick={scrollToTop} style={{ cursor: 'pointer' }}>
            หน้าหลัก
          </div>

          {/* Wrapper สำหรับไอคอนโซเชียลมีเดียและเบอร์โทรศัพท์ */}
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

      {/* ส่วนเนื้อหาหลักของหน้า */}
      <div className={styles.page}>
        {/* ส่วนแบนเนอร์หลัก (เคยเป็นส่วนสไลเดอร์) */}
        <section className={styles.mainBannerSection}>
          <img
            src="/owner2.jpg" // รูปภาพแบนเนอร์หลัก
            alt="แบนเนอร์หลัก"
            className={styles.mainBannerImage} // ใช้สไตล์สำหรับแบนเนอร์
          />
        </section>

        {/* ส่วนเนื้อหาหลัก - ตอนนี้มีเพียงส่วนกริดโปสเตอร์ใหม่ */}
        <main className={styles.mainContentArea}>
          {/* ส่วนกริดโปสเตอร์ใหม่ */}
          <section className={styles.posterSection}>
            <div className={styles.posterGrid}>
              {posterCards.map((poster) => (
                <a
                  key={poster.id}
                  href={poster.href} // ลิงก์ที่ถูกอัปเดต
                  rel="noopener noreferrer"
                  className={styles.posterCard}
                >
                  {/* ย้าย posterName มาอยู่เหนือ posterImage */}
                  <p className={styles.posterName}>{poster.name}</p>
                  <img src={poster.imgSrc} alt={poster.name} className={styles.posterImage} />
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* ปุ่มติดต่อลอยน้ำ */}
      <div className={styles.contactWrapper}>
        <button
          className={`${styles.contactToggleButton} ${showContact ? styles.minimized : ""}`}
          onClick={() => setShowContact((prev) => !prev)}
          aria-label="ติดต่อเรา"
          title="ติดต่อเรา"
        >
          <FiMessageSquare size={24} style={{ marginRight: showContact ? 0 : 8 }} />
          {!showContact && "ติดต่อเรา"}
        </button>

        {/* แผงติดต่อลอยน้ำ */}
        <div className={`${styles.floatingContactPanel} ${showContact ? styles.show : ""}`}>
          <h2>ติดต่อเรา</h2>
          <form onSubmit={handleSubmit} action="https://formspree.io/f/mjkrazly" method="POST" className={styles.contactForm}>
            <label>
              ชื่อ:<br />
              <input type="text" name="name" required />
            </label>
            <label>
              อีเมล:<br />
              <input type="email" name="_replyto" required />
            </label>
            <label className={styles.messageLabel}>
              ข้อความ:<br />
              <textarea
                name="message"
                rows={4}
                required
                value={message}
                onChange={handleMessageChange}
              ></textarea>
              {messageError && <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '-10px', marginBottom: '10px' }}>{messageError}</p>}
            </label>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'กำลังส่ง...' : 'ส่งข้อความ'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
