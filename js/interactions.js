/**
 * User interactions
 */

// Initialize card hover effects
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.process-card, .experiment-card, .team-card, .connect-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
      card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Initialize reveal functionality
function initRevealContent() {
  const revealButton = document.querySelector('.reveal-button');
  const revealContent = document.querySelector('.reveal-content');

  if (revealButton && revealContent) {
    revealButton.addEventListener('click', () => {
      revealContent.classList.toggle('active');
      
      // Change button text based on state
      const buttonSpan = revealButton.querySelector('span');
      if (revealContent.classList.contains('active')) {
        buttonSpan.textContent = 'Απόκρυψη';
        revealButton.querySelector('i').classList.remove('fa-lightbulb');
        revealButton.querySelector('i').classList.add('fa-eye-slash');
      } else {
        buttonSpan.textContent = 'Περίεργοι για την ιστοσελίδα μας;';
        revealButton.querySelector('i').classList.remove('fa-eye-slash');
        revealButton.querySelector('i').classList.add('fa-lightbulb');
      }
    });
  }
}

// Initialize form validation
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          // Create error message if it doesn't exist
          let errorMsg = field.parentNode.querySelector('.error-message');
          if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Αυτό το πεδίο είναι υποχρεωτικό';
            field.parentNode.appendChild(errorMsg);
          }
        } else {
          field.classList.remove('error');
          const errorMsg = field.parentNode.querySelector('.error-message');
          if (errorMsg) {
            errorMsg.remove();
          }
        }
      });
      
      if (!isValid) {
        e.preventDefault();
      }
    });
    
    // Remove error styling on input
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        const errorMsg = input.parentNode.querySelector('.error-message');
        if (errorMsg) {
          errorMsg.remove();
        }
      });
    });
  });
}

// Export interaction functions
export { initCardHoverEffects, initRevealContent, initFormValidation }; 