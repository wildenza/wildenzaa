# Wildenza - 3D Artist Portfolio

A modern, responsive portfolio website showcasing 3D artwork and digital creations. Built with clean HTML5, CSS3, and JavaScript, featuring smooth animations, glass morphism effects, and a mobile-first responsive design.

## ✨ Features

- **Modern Design**: Glass morphism effects, gradients, and smooth animations
- **Responsive Layout**: Perfect on desktop, tablet, and mobile devices
- **Interactive Portfolio**: Filterable gallery with hover effects
- **Smooth Scrolling**: Seamless navigation between sections
- **Contact Form**: Built-in form validation and submission handling
- **Performance Optimized**: Fast loading with optimized assets
- **SEO Ready**: Proper meta tags and semantic HTML structure

## 🚀 Quick Start

### Deploy to GitHub Pages

1. **Fork this repository** or **create a new repository** named `[your-username].github.io`

2. **Upload the files** to your repository:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`

3. **Enable GitHub Pages**:
   - Go to your repository's Settings
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access your site** at: `https://[your-username].github.io`

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/[your-repository].git
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using VS Code Live Server extension
```

## 🎨 Customization

### Personal Information

1. **Update the title and meta tags** in `index.html`:
```html
<title>Your Name - 3D Artist Portfolio</title>
<meta name="description" content="Your description here">
```

2. **Replace portfolio links** with your profiles:
```html
<!-- Update these URLs -->
<a href="https://artstation.com/yourprofile" target="_blank">
<a href="https://yourprofile.itch.io" target="_blank">
```

3. **Update contact information** in the contact section:
```html
<p>your.email@example.com</p>
<p>artstation.com/yourprofile</p>
<p>yourprofile.itch.io</p>
```

### Portfolio Images

Replace the placeholder images with your actual artwork:

1. **Create an `images` folder** in your repository
2. **Upload your portfolio images** (recommended size: 400x300px or higher)
3. **Update image sources** in `index.html`:
```html
<img src="images/your-artwork-1.jpg" alt="Your Artwork Title">
```

### Color Scheme

Customize the colors in `styles.css`:

```css
/* Primary gradient colors */
:root {
  --primary-gradient: linear-gradient(45deg, #4a9eff, #00d4ff);
  --secondary-gradient: linear-gradient(45deg, #ff6b6b, #ffa500);
  --background-dark: #0a0a0a;
  --text-light: #ffffff;
  --text-muted: #b0b0b0;
}
```

### Content Sections

#### Hero Section
Update the hero content in `index.html`:
```html
<h1 class="hero-title">
    <span class="title-line">Your Tagline</span>
    <span class="title-line">Professional</span>
    <span class="title-line highlight">3D Artist</span>
</h1>
<p class="hero-description">
    Your professional description and specializations...
</p>
```

#### About Section
Customize your skills and stats:
```html
<div class="skills-grid">
    <div class="skill-item">
        <i class="fas fa-cube"></i>
        <span>Your Skill</span>
    </div>
    <!-- Add more skills -->
</div>

<div class="stat-item">
    <div class="stat-number">X+</div>
    <div class="stat-label">Your Achievement</div>
</div>
```

#### Portfolio Categories
Add or modify portfolio categories:
```html
<button class="filter-btn" data-filter="your-category">Your Category</button>
```

## 📱 Responsive Design

The portfolio is built with a mobile-first approach and includes:

- **Desktop**: Full-width layout with side-by-side sections
- **Tablet**: Stacked layout with optimized spacing
- **Mobile**: Single-column layout with touch-friendly navigation

## 🔧 Technical Stack

- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern features including Grid, Flexbox, and animations
- **JavaScript**: Vanilla JS for interactivity and smooth UX
- **Font Awesome**: Icon library for consistent iconography
- **Google Fonts**: Inter and Playfair Display font families

## 🎯 SEO Optimization

- Semantic HTML5 structure
- Meta tags for social sharing
- Optimized images with alt text
- Fast loading performance
- Mobile-friendly design

## 📧 Contact Form

The contact form includes:
- Client-side validation
- Animated submission feedback
- Responsive design
- Accessibility features

**Note**: The form currently shows a success message for demonstration. To make it functional, integrate with:
- **Formspree**: Easy form handling service
- **Netlify Forms**: If hosting on Netlify
- **EmailJS**: Client-side email service
- **Backend service**: Your own server solution

## 🚀 Performance Tips

1. **Optimize images**: Use WebP format when possible
2. **Lazy loading**: Add `loading="lazy"` to images
3. **Minify files**: Use tools like UglifyJS and CleanCSS for production
4. **CDN**: Consider using a CDN for faster global delivery

## 🎨 Animation Features

- **CSS Keyframes**: Smooth transitions and hover effects
- **Intersection Observer**: Scroll-triggered animations
- **Parallax scrolling**: Floating elements that move with scroll
- **Loading animations**: Smooth page entrance effects

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and pull requests to improve this portfolio template.

## 📞 Support

If you have questions or need help customizing your portfolio:

1. Check the documentation above
2. Open an issue in this repository
3. Refer to the code comments for implementation details

---

**Happy showcasing your 3D artwork! 🎨✨** 