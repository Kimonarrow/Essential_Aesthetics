/**
 * Main JavaScript file that imports and initializes all modules
 */

import { setVH, preventZoom } from './utils.js';
import { 
  initThreeJsBackground, 
  initSectionAnimations, 
  initHeroImage, 
  initScrollIndicator 
} from './animations.js';
import { 
  initMobileMenu, 
  initSmoothScroll, 
  initNavScroll 
} from './navigation.js';
import { 
  initCardHoverEffects, 
  initRevealContent, 
  initFormValidation 
} from './interactions.js';

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize utilities
  setVH();
  preventZoom();
  window.addEventListener('resize', setVH);

  // Initialize animations
  initHeroImage();
  initSectionAnimations();
  initScrollIndicator();
  
  // Initialize Three.js background if available
  if (typeof THREE !== 'undefined') {
    initThreeJsBackground();
  } else {
    console.warn('Three.js is not loaded, skipping 3D background');
  }

  // Initialize navigation
  initMobileMenu();
  initSmoothScroll();
  initNavScroll();

  // Initialize interactions
  initCardHoverEffects();
  initRevealContent();
  initFormValidation();
}); 