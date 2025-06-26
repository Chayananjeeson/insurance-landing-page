// app/wholelife-products/page.js
"use client";

import React, { useState } from "react";
import styles from "../page.module.css"; // Import styles from the main page's CSS module
import { FiMessageSquare } from "react-icons/fi";
import { FaFacebook, FaTiktok, FaLine } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

export default function WholeLifeProducts() {
  const [showContact, setShowContact] = useState(false);
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define product data for Whole Life Insurance (based on example image)
  // All imgSrc are set to /gsb.jpg as requested.
  const wholeLifeProducts = [
    {
      id: 1,
      name: "Philip Omsin 11/5",
      imgSrc: "/gsb.jpg", 
      link: "#", // Placeholder link for product details
    },
    {
      id: 2,
      name: "Smart Life 90/20",
      imgSrc: "/gsb.jpg",
      link: "#",
    },
    {
      id: 3,
      name: "Extra Life 80/8",
      imgSrc: "/gsb.jpg",
      link: "#",
    },
    {
      id: 4,
      name: "Happy Life 90/6",
      imgSrc: "/gsb.jpg",
      link: "#",
    },
    {
      id: 5,
      name: "Income Protection",
      imgSrc: "/gsb.jpg",
      link: "#",
    },
    {
      id: 6,
      name: "Safety Save 15/15",
      imgSrc: "/gsb.jpg",
      link: "#",
    },
    {
      id: 7,
      name: "Safety Save 10/10",
      imgSrc: "/gsb.jpg",
      link: "#",
    },
  ];

  // Function for the "Back to Home" button
  const handleBack = () => {
    window.location.href = '/'; // Navigate back to the main page
  };

  // Function to validate phone number in the message
  const validateMessage = (text) => {
    const numbers = text.match(/\d/g); // Extract only digits
    if (!numbers || numbers.length < 10) {
      setMessageError('Please include at least 10 digits for a phone number in your message.');
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
            alert('Your message has been sent successfully!');
            setMessage(''); // Clear message input
            setMessageError(''); // Clear any message errors
            setShowContact(false); // Close contact panel
        } else {
            alert('Failed to send message. Please try again.');
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        alert('Failed to send message. Please try again.');
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
          {/* Back to Home Button */}
          <button onClick={handleBack} className={styles.backButton}>
            &lt; Back to Home
          </button>
          
          {/* Wrapper for Social Media Icons and Phone Number (copied from main page) */}
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
        {/* Main Banner Section (copied from main page) */}
        <section className={styles.mainBannerSection}>
          <img
            src="/owner2.jpg" // Main banner image
            alt="Main Banner"
            className={styles.mainBannerImage} // Styles for banner
          />
        </section>

        {/* Main content area for product listing */}
        <main className={styles.mainContentArea}>
          <section className={styles.productListingSection}>
            <h2>Whole Life Insurance Products</h2>
            <div className={styles.productDetailGrid}> {/* Class for this page's grid */}
              {wholeLifeProducts.map((product) => (
                <a
                  key={product.id}
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.productCard} // Reverted to use productCard class
                >
                  <img src={product.imgSrc} alt={product.name} className={styles.productImage} /> {/* Using productImage class */}
                  <p className={styles.productName}>{product.name}</p> {/* Using productName class */}
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Floating Contact Button (copied from main page) */}
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
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
