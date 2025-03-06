# Essential Aesthetics Website

This is the codebase for the Essential Aesthetics website, a beauty clinic specializing in aesthetic treatments.

## Refactoring Overview

The codebase has been refactored to improve maintainability, performance, and organization:

### CSS Refactoring
- Split the large CSS file (1333 lines) into modular components:
  - `reset.css`: Base styles and CSS variables
  - `background.css`: Background elements and animations
  - `layout.css`: Layout structure and common elements
  - `components.css`: Reusable UI components
  - `sections.css`: Section-specific styles
  - `main.css`: Imports all CSS modules

### JavaScript Refactoring
- Split the JavaScript file into modular components:
  - `utils.js`: Utility functions
  - `animations.js`: Animation and visual effects
  - `navigation.js`: Navigation functionality
  - `interactions.js`: User interactions
  - `main.js`: Imports and initializes all modules

### HTML Structure
- Organized HTML into modular components:
  - Created separate component files for each section
  - Maintained a clean, semantic structure
  - Fixed potential bugs and improved accessibility

### Performance Improvements
- Added proper preloading for critical resources
- Improved error handling for image loading
- Added responsive optimizations for mobile devices
- Fixed potential memory leaks in animations

### Bug Fixes
- Fixed missing script tag in the original code
- Added proper error handling for Three.js background
- Improved mobile menu functionality
- Fixed responsive layout issues

## Project Structure

```
├── index.html              # Main HTML file
├── css/                    # CSS directory
│   ├── main.css            # Main CSS file that imports all modules
│   ├── reset.css           # Base styles and CSS variables
│   ├── background.css      # Background elements and animations
│   ├── layout.css          # Layout structure and common elements
│   ├── components.css      # Reusable UI components
│   └── sections.css        # Section-specific styles
├── js/                     # JavaScript directory
│   ├── main.js             # Main JS file that imports all modules
│   ├── utils.js            # Utility functions
│   ├── animations.js       # Animation and visual effects
│   ├── navigation.js       # Navigation functionality
│   └── interactions.js     # User interactions
├── components/             # HTML components
│   ├── head.html           # Head component
│   ├── background.html     # Background elements
│   ├── hero.html           # Hero section
│   ├── navigation.html     # Navigation
│   ├── about.html          # About section
│   ├── services.html       # Services section
│   ├── philosophy.html     # Philosophy section
│   ├── experience.html     # Experience section
│   ├── testimonials.html   # Testimonials section
│   ├── booking.html        # Booking section
│   └── footer.html         # Footer
└── assets/                 # Assets directory
    └── pphoto.jpg          # Hero image
```

## Usage

The website can be viewed by opening `index.html` in a web browser. No build process is required.

## Future Improvements

- Implement a build process to automatically combine the modular CSS and JS files
- Add a content management system for easier content updates
- Implement form validation for the booking form
- Add internationalization support for multiple languages
- Optimize images further for better performance

## Features

- Responsive design optimized for all devices
- Elegant animations and transitions
- Modern UI with gradient and particle backgrounds
- Interactive navigation with smooth scrolling
- Section-based content organization
- Booking system integration
- Newsletter subscription
- Social media integration

## Technologies Used

- HTML5
- CSS3 (with modern animations and transitions)
- JavaScript (with Intersection Observer API and Three.js)
- Google Fonts (Cormorant Garamond, Montserrat & Italiana)
- Font Awesome icons
- Three.js for background effects

## View the Site

Visit [https://kimonarrow.github.io/Essential_Aesthetics/](https://kimonarrow.github.io/Essential_Aesthetics/) to see the live site.

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/essential-aesthetics.git
   ```
2. Open `index.html` in your browser
3. Make changes to HTML, CSS, or JavaScript files
4. Refresh to see updates

## GitHub Pages Deployment

1. Ensure your repository is named `essential-aesthetics`
2. Go to repository Settings > Pages
3. Under "Source", select "Deploy from a branch"
4. Select the `main` branch and root folder (`/`)
5. Click Save
6. Wait a few minutes for the site to deploy

## Troubleshooting

If images are not loading:
1. Check that all image files are in the `assets/` directory
2. Verify that image paths in HTML and CSS use the correct case sensitivity
3. Make sure the repository has proper permissions

## License

© 2025 Essential Aesthetics. All Rights Reserved. 
