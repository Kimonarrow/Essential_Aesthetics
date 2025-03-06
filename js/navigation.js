/**
 * Navigation functionality
 */

import { smoothScrollTo } from './utils.js';

// Initialize mobile menu
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
      }
    });
  }
}

// Initialize smooth scrolling for navigation links
function initSmoothScroll() {
  const navLinks = document.querySelector('.nav-links');
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      smoothScrollTo(target);

      // Close mobile menu after clicking a link
      if (navLinks) {
        navLinks.classList.remove('active');
      }
    });
  });
}

// Initialize navigation scroll effect
function initNavScroll() {
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }
}

// Export navigation functions
export { initMobileMenu, initSmoothScroll, initNavScroll }; 