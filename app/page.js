// page.js
"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
// SliderClient is no longer used
import { FiMessageSquare } from "react-icons/fi";
// Import icons for social media and phone
import { FaFacebook, FaTiktok, FaLine } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

export default function Home() {
  const [showContact, setShowContact] = useState(false);
  // State for message input and validation
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // State to prevent multiple submissions

  // Define data for the four poster cards, with links to new product pages
  const posterCards = [
    { id: 1, name: "ตลอดชีพ", href: "/wholelife-products", imgSrc: "/insure2.png" }, // Link to /wholelife-products
    { id: 2, name: "ออมทรัพย์", href: "/savings-products", imgSrc: "/insure2.png" }, // Link to /savings-products
    { id: 3, name: "ชั่วระยะ", href: "/term-products", imgSrc: "/insure2.png" },     // Link to /term-products
    { id: 4, name: "บำนาญ", href: "/pension-products", imgSrc: "/insure2.png" },     // Link to /pension-products
  ];

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to validate phone number in the message
  const validateMessage = (text) => {
    const numbers = text.match(/\d/g); // Extract only digits
    if (!numbers || numbers.length < 10) {
      setMessageError('กรุณาระบุเบอร์โทรศัพท์อย่างน้อย 10 หลักในข้อความของคุณ');
      return false;
    }
    setMessageError(''); // Clear error if valid
    return true;
  };

  // Handler for message input changes
  const handleMessageChange = (e) => {
    const text = e.target.value;
    setMessage(text);
    if (text.length > 0) {
      validateMessage(text);
    } else {
      setMessageError(''); // Clear error if input is empty
    }
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const isValid = validateMessage(message);

    if (!isValid) {
      return; // Stop submission if validation fails
    }

    if (isSubmitting) {
        return; // Prevent duplicate submissions
    }
    setIsSubmitting(true);

    // Submit form using Fetch API for better control
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
            setMessage(''); // Clear message input
            setMessageError(''); // Clear any message errors
            setShowContact(false); // Close contact panel
        } else {
            alert('ไม่สามารถส่งข้อความได้ โปรดลองอีกครั้ง');
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        alert('ไม่สามารถส่งข้อความได้ โปรดลองอีกครั้ง');
    })
    .finally(() => {
        setIsSubmitting(false); // Reset submission status
    });
  };

  return (
    <>
      {/* Sticky Header Bar */}
      <header className={styles.stickyHeader}>
        <nav className={styles.headerNav}>
          {/* Home Text */}
          <div className={styles.homeText} onClick={scrollToTop} style={{ cursor: 'pointer' }}>
            หน้าหลัก
          </div>

          {/* Wrapper for Social Media Icons and Phone Number */}
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

      {/* Main Page Content Area */}
      <div className={styles.page}>
        {/* Main Banner Section (previously slider section) */}
        <section className={styles.mainBannerSection}>
          <img
            src="/owner2.jpg" // The main banner image
            alt="แบนเนอร์หลัก"
            className={styles.mainBannerImage} // Apply styling for the banner
          />
        </section>

        {/* Main content area - now contains only the new poster grid */}
        <main className={styles.mainContentArea}>
          {/* New Poster Grid Section */}
          <section className={styles.posterSection}>
            <div className={styles.posterGrid}>
              {posterCards.map((poster) => (
                <a
                  key={poster.id}
                  href={poster.href} // Updated link
                  rel="noopener noreferrer"
                  className={styles.posterCard}
                >
                  {/* Moved posterName above posterImage */}
                  <p className={styles.posterName}>{poster.name}</p>
                  <img src={poster.imgSrc} alt={poster.name} className={styles.posterImage} />
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
          aria-label="ติดต่อเรา"
          title="ติดต่อเรา"
        >
          <FiMessageSquare size={24} style={{ marginRight: showContact ? 0 : 8 }} />
          {!showContact && "ติดต่อเรา"}
        </button>

        {/* Floating Contact Panel */}
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
