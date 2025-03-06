/**
 * Utility functions for the website
 */

// Fix viewport height for mobile browsers
function setVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Prevent unwanted zooming on mobile
function preventZoom() {
  document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });
}

// Smooth scroll to element
function smoothScrollTo(target, headerOffset = 80) {
  if (target) {
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Export utilities
export { setVH, preventZoom, smoothScrollTo }; 