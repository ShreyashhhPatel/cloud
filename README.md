# Clouds - Photography Gallery

A beautiful minimal design cloud photography gallery with smooth scroll animations built with TypeScript, Vite, and GSAP.

## ✨ Features

- 🎨 **Stunning Hero Section** - Full-screen cloud photography with parallax effects
- 🖼️ **Dynamic Gallery Grid** - Responsive grid showcasing 12 featured images
- 🎬 **Auto-Playing Slideshow** - Cycles through all 46 images automatically
- ✨ **Smooth Animations** - GSAP-powered scroll-triggered animations
- 📱 **Fully Responsive** - Optimized for all device sizes
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🔷 **Type-Safe** - Written in TypeScript for reliability

## 🖼️ Gallery Sections

1. **Hero Section** - Large immersive cloud photo with animated title
2. **Text Reveals** - Poetic text animations ("Capturing the beauty above", "nature's canvas")
3. **Gallery Grid** - 12 images in a responsive masonry-style grid
4. **Showcase Images** - Individual feature images with circular mask reveal
5. **Slideshow** - Automatic slideshow of all 46 images (3-second intervals)

## 🛠️ Tech Stack

- **Vite 5.x** - Next Generation Frontend Tooling
- **TypeScript 5.x** - Type-safe JavaScript
- **GSAP 3.12** - Professional-grade animation library
- **ScrollTrigger** - Scroll-based animations

## 📦 Project Structure

```
Clouds/
├── img/                    # 46 PNG images of cloud photography
├── src/
│   ├── main.ts            # Main TypeScript entry point with animations
│   ├── images.ts          # Image path definitions and utilities
│   └── style.css          # All CSS styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

### Development

Run the development server with hot module replacement:

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Build for Production

Build optimized production assets:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 🎨 Animations

### Hero Animations
- **Brand Name**: Fades in and moves up, then scales down to navbar on scroll
- **Hero Image**: Parallax effect that moves slower than scroll speed
- **Navbar**: Appears when scrolling past hero section

### Scroll Animations
- **Text Reveals**: Words slide up and fade in as you scroll
- **Gallery Grid**: Images fade and slide up with stagger effect
- **Image Masks**: Circular masks shrink to reveal images
- **Feature Images**: Scale up and fade in on scroll

### Slideshow
- Auto-plays when visible (3-second intervals)
- Shows image counter (e.g., "1 / 46")
- Pauses when scrolled out of view

## 📸 Image Format

All images are in **PNG format** for maximum browser compatibility. The images are stored in the `/img/` folder and dynamically loaded through the `images.ts` module.

### Supported Images

- 46 total images (45 converted from HEIC + 1 original JPG)
- All images are properly optimized for web viewing
- Lazy loading enabled for gallery images

## 🎯 Usage

### Adding New Images

1. Add your PNG images to the `/img/` folder
2. Update `src/images.ts` to include the new image paths
3. The gallery and slideshow will automatically include them

### Customizing Animations

Edit `src/main.ts` to adjust:
- Animation timings
- Scroll trigger positions  
- Slideshow interval (currently 3 seconds)
- Which images appear in which sections

### Styling Changes

Modify `src/style.css` to customize:
- Colors and backgrounds
- Grid layout
- Typography
- Spacing and sizing

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🎨 Design Philosophy

This project embraces minimal design principles:
- Clean, spacious layouts
- Typography-focused sections
- Smooth, purposeful animations
- Natural color palette
- Mobile-first responsive design

## 📄 License

All Rights Reserved (2021)

---

**Built with ❤️ using Vite + TypeScript + GSAP**
