/**
 * Animations and visual effects
 */

// Initialize Three.js background
function initThreeJsBackground() {
  // Check if Three.js is loaded
  if (typeof THREE === 'undefined') {
    console.error('Three.js is not loaded');
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  renderer.domElement.classList.add('three-js-background');
  
  // Modify Three.js background to not show on hero section
  const threeJsBg = document.querySelector('.three-js-background');
  threeJsBg.style.opacity = '0'; // Start invisible
  
  // Show Three.js background only after scrolling past hero
  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.8) {
      threeJsBg.style.opacity = '0.8';
    } else {
      threeJsBg.style.opacity = '0';
    }
  });

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
}

// Initialize section animations with Intersection Observer
function initSectionAnimations() {
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
}

// Initialize hero image loading
function initHeroImage() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const heroImage = new Image();
  heroImage.src = './assets/pphoto.jpg';

  // Add error handling
  heroImage.onerror = () => {
    console.error('Could not load hero image');
    // Fallback to a solid color or alternative image
    hero.style.backgroundColor = '#d4a373';
    hero.classList.add('loaded');
  };

  heroImage.onload = () => {
    hero.style.backgroundImage = `url('${heroImage.src}')`;
    hero.classList.add('loaded');
    
    // Ensure proper styling for full-size, single background
    hero.style.backgroundRepeat = 'no-repeat';
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundPosition = 'center';
  };
}

// Initialize scroll indicator fade out
function initScrollIndicator() {
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
}

// Export animation functions
export { 
  initThreeJsBackground, 
  initSectionAnimations, 
  initHeroImage, 
  initScrollIndicator 
}; 