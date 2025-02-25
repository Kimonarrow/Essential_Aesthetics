document.addEventListener('DOMContentLoaded', function() {
  // Handle hero image loading
  const hero = document.querySelector('.hero');
  const heroImage = new Image();
  heroImage.src = 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';
  heroImage.onload = () => {
    hero.classList.add('loaded');
  };

  // Three.js Background Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  renderer.domElement.classList.add('three-js-background');

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1500;
  const posArray = new Float32Array(particlesCount * 3);
  
  for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  // Create material with custom shader
  const particlesMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 2.0 * (1.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      void main() {
        float strength = 1.0 - distance(gl_PointCoord, vec2(0.5));
        strength = pow(strength, 3.0);
        vec3 color = mix(vec3(0.831, 0.639, 0.451), vec3(0.580, 0.824, 0.741), vUv.y);
        gl_FragColor = vec4(color, strength * 0.5);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  camera.position.z = 2;

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0005;
    
    particlesMesh.rotation.x += (targetY - particlesMesh.rotation.x) * 0.05;
    particlesMesh.rotation.y += (targetX - particlesMesh.rotation.y) * 0.05;
    
    renderer.render(scene, camera);
  }
  
  animate();

  // Intersection Observer for section animations
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));

  // Mobile menu toggle
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

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu after clicking a link
        navLinks.classList.remove('active');
      }
    });
  });

  // Navigation scroll effect
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Form submission handling
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      // Here you would typically send the email to your server
      alert('Thank you for subscribing! We\'ll be in touch soon.');
      this.reset();
    });
  }

  // Scroll indicator fade out
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled > 100) {
        scrollIndicator.style.opacity = '0';
      } else {
        scrollIndicator.style.opacity = '1';
      }
    });
  }

  // Behind the scenes reveal functionality
  const revealButton = document.querySelector('.reveal-button');
  const revealContent = document.querySelector('.reveal-content');

  if (revealButton && revealContent) {
    revealButton.addEventListener('click', () => {
      revealContent.classList.toggle('active');
      
      // Change button text based on state
      const buttonSpan = revealButton.querySelector('span');
      if (revealContent.classList.contains('active')) {
        buttonSpan.textContent = 'Hide the secret';
        revealButton.querySelector('i').classList.remove('fa-lightbulb');
        revealButton.querySelector('i').classList.add('fa-eye-slash');
      } else {
        buttonSpan.textContent = 'Curious about this website?';
        revealButton.querySelector('i').classList.remove('fa-eye-slash');
        revealButton.querySelector('i').classList.add('fa-lightbulb');
      }
    });
  }

  // Add hover effect to cards
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
}); 