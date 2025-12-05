import './style.css'
import './slider.css'
import './sticky-circle.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { getAllImages, getImageAtIndex } from './images'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Draggable)

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadImages()
  initAnimations()
  setupNavigation()
  initSlideshow()
})

function loadImages(): void {
  const allImages = getAllImages()
  
  // Set hero image
  const heroImage = document.getElementById('hero-image') as HTMLImageElement
  if (heroImage) {
    heroImage.src = getImageAtIndex(0)
  }

  // Set showcase images
  const showcaseImage1 = document.getElementById('showcase-image-1') as HTMLImageElement
  if (showcaseImage1) {
    showcaseImage1.src = getImageAtIndex(10)
  }

  const showcaseImage2 = document.getElementById('showcase-image-2') as HTMLImageElement
  if (showcaseImage2) {
    showcaseImage2.src = getImageAtIndex(20)
  }

  // Create gallery grid
  const galleryGrid = document.getElementById('gallery-grid')
  if (galleryGrid) {
    // Use first 12 images for the gallery grid
    allImages.slice(0, 12).forEach((imagePath, index) => {
      const galleryItem = document.createElement('div')
      galleryItem.className = 'gallery-item'
      galleryItem.style.opacity = '0'
      galleryItem.style.transform = 'translateY(50px)'
      
      const img = document.createElement('img')
      img.src = imagePath
      img.alt = `Cloud photography ${index + 1}`
      img.loading = 'lazy'
      
      galleryItem.appendChild(img)
      galleryGrid.appendChild(galleryItem)
    })
  }

  // Populate slider rows - each row shows exactly 7 images
  const sliderRows = [1, 2, 3, 4]
  sliderRows.forEach(rowNum => {
    const row = document.getElementById(`slider-row-${rowNum}`)
    if (row) {
      // Use a different set of images for each row to make it look varied
      const startIndex = (rowNum - 1) * 7
      for (let i = 0; i < 7; i++) {
        const imageIndex = (startIndex + i) % allImages.length
        
        const sliderItem = document.createElement('div')
        sliderItem.className = 'slider-item'
        
        const img = document.createElement('img')
        img.src = allImages[imageIndex]
        img.alt = `Cloud slider row ${rowNum} image ${i + 1}`
        img.draggable = false
        
        sliderItem.appendChild(img)
        row.appendChild(sliderItem)
      }
    }
  })

  // Set initial slideshow image
  const slideshowImage = document.getElementById('slideshow-image') as HTMLImageElement
  if (slideshowImage) {
    slideshowImage.src = allImages[0]
  }
}

let slideshowIndex = 0
let slideshowInterval: number | null = null

function initSlideshow(): void {
  const allImages = getAllImages()
  const slideshowImage = document.getElementById('slideshow-image') as HTMLImageElement
  const slideshowCounter = document.getElementById('slideshow-counter') as HTMLElement

  if (!slideshowImage || !slideshowCounter) return

  function updateSlideshow() {
    slideshowImage.style.opacity = '0'
    
    setTimeout(() => {
      slideshowIndex = (slideshowIndex + 1) % allImages.length
      slideshowImage.src = allImages[slideshowIndex]
      slideshowCounter.textContent = `${slideshowIndex + 1} / ${allImages.length}`
      slideshowImage.style.opacity = '1'
    }, 500)
  }

  // Start slideshow when section is in view
  ScrollTrigger.create({
    trigger: '.slideshow-section',
    start: 'top center',
    onEnter: () => {
      slideshowImage.style.opacity = '1'
      if (!slideshowInterval) {
        slideshowInterval = window.setInterval(updateSlideshow, 3000)
      }
    },
    onLeave: () => {
      if (slideshowInterval) {
        clearInterval(slideshowInterval)
        slideshowInterval = null
      }
    },
    onEnterBack: () => {
      if (!slideshowInterval) {
        slideshowInterval = window.setInterval(updateSlideshow, 3000)
      }
    },
    onLeaveBack: () => {
      if (slideshowInterval) {
        clearInterval(slideshowInterval)
        slideshowInterval = null
      }
    }
  })
}

function initAnimations(): void {
  // Hero image animation
  gsap.from('.hero-image', {
    scale: 1.2,
    duration: 2,
    ease: 'power2.out'
  })

  // Parallax effect for hero image
  gsap.to('.hero-image', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    y: 200,
    scale: 1.1,
    ease: 'none'
  })

  // Scroll-based brand name animation
  setupBrandNameAnimation()

  // Show navbar when section 2 hits the top
  setupNavbarToggle()
  
  // Navbar logo appearance
  setupNavbarLogoAnimation()

  // Text reveal animations
  setupTextRevealAnimations()

  // Gallery animations
  setupGalleryAnimation()

  // Sticky Circle Animation (replaces previous image reveal)
  setupStickyCircleAnimation()

  // Feature image animation
  setupFeatureImageAnimation()

  // Infinite slider animation
  setupSliderAnimation()
}

function setupSliderAnimation(): void {
  const rows = gsap.utils.toArray<HTMLElement>('.slider-row')
  if (rows.length === 0) return

  const loops: gsap.core.Timeline[] = []

  // Create an infinite horizontal loop for each row, alternating direction
  rows.forEach((row, index) => {
    const items = Array.from(row.querySelectorAll<HTMLElement>('.slider-item'))
    if (items.length === 0) return

    const loop = horizontalLoop(items, {
      repeat: -1,
      paused: true,
      speed: index % 2 === 0 ? 1 : -1, // even rows left, odd rows right
      snap: 0.1
    })

    loops.push(loop)
  })

  // Start/stop the loops when the slider section enters/leaves the viewport
  ScrollTrigger.create({
    trigger: '.slider-section-wrapper',
    start: 'top 80%',
    end: 'bottom top',
    onEnter: () => loops.forEach(loop => loop.play()),
    onLeave: () => loops.forEach(loop => loop.pause()),
    onEnterBack: () => loops.forEach(loop => loop.play()),
    onLeaveBack: () => loops.forEach(loop => loop.pause())
  })
}

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.
*/
function horizontalLoop(items: HTMLElement[], config: any) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => { tl.totalTime(tl.rawTime() + tl.duration() * 100) }}),
    length = items.length,
    startX = items[0].offsetLeft,
    times: number[] = [],
    widths: number[] = [],
    xPercents: number[] = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    populateWidths = () => items.forEach((el, i) => {
      widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
      xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px") as string) / widths[i] * 100 + (gsap.getProperty(el, "xPercent") as number));
    }),
    getTotalWidth = () => items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * (gsap.getProperty(items[length-1], "scaleX") as number) + (parseFloat(config.paddingRight) || 0),
      totalWidth: number, curX, distanceToStart, distanceToLoop, item, i;
  
  populateWidths();
  
  gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: i => xPercents[i]
  });
  gsap.set(items, {x: 0});
  totalWidth = getTotalWidth();
  
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = xPercents[i] / 100 * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);
    
    tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
      .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
      .add("label" + i, distanceToStart / pixelsPerSecond);
    
    times[i] = distanceToStart / pixelsPerSecond;
  }
  
  function toIndex(index: number, vars: any) {
    vars = vars || {};
    (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  
  // @ts-ignore
  tl.next = vars => toIndex(curIndex+1, vars);
  // @ts-ignore
  tl.previous = vars => toIndex(curIndex-1, vars);
  // @ts-ignore
  tl.current = () => curIndex;
  // @ts-ignore
  tl.toIndex = (index, vars) => toIndex(index, vars);
  // @ts-ignore
  tl.updateIndex = () => curIndex = Math.round(tl.progress() * items.length);
  // @ts-ignore
  tl.times = times;
  
  tl.progress(1, true).progress(0, true); // pre-render for performance
  
  if (config.reversed) {
    // @ts-ignore
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  
  if (config.draggable && typeof(Draggable) === "function") {
    let proxy = document.createElement("div"),
        wrap = gsap.utils.wrap(0, 1),
        ratio: number, startProgress: number, draggable: any, dragSnap: number, roundFactor: number,
        align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
        // @ts-ignore
        syncIndex = () => tl.updateIndex();
        
    // @ts-ignore
    typeof(InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club");
    
    draggable = Draggable.create(proxy, {
      // @ts-ignore
      trigger: items[0].parentNode,
      type: "x",
      onPress() {
        startProgress = tl.progress();
        tl.progress(0);
        populateWidths();
        totalWidth = getTotalWidth();
        ratio = 1 / totalWidth;
        dragSnap = totalWidth / items.length;
        roundFactor = Math.pow(10, ((dragSnap + "").split(".")[1] || "").length);
        tl.progress(startProgress);
      },
      onDrag: () => { align() },
      onThrowUpdate: () => { align() },
      inertia: true,
      snap: (value: number) => {
        let n = Math.round(parseFloat(String(value)) / dragSnap) * dragSnap * roundFactor;
        return (n - n % 1) / roundFactor;
      },
      onRelease: () => { syncIndex() },
      onThrowComplete: () => { gsap.set(proxy, {x: 0}); syncIndex() }
    })[0];
    
    // @ts-ignore
    tl.draggable = draggable;
  }
  
  return tl;
}

function setupBrandNameAnimation(): void {
  const logo = document.querySelector('.logo') as HTMLElement

  if (!logo) return

  // Logo scale animation - exactly like MinimalGoods
  // Logo starts huge (like the hero title) and scales down to navbar size
  gsap.timeline({
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  })
  .from(logo, {
    y: '90vh',    // Start from 90% down the viewport (bottom center)
    scale: 8,     // Start at 8x size (large hero text)
    duration: 1
  })
}

function setupNavbarToggle(): void {
  // Navbar is always visible and sticky (no toggle needed)
}

function setupNavbarLogoAnimation(): void {
  // Logo animation is handled by setupBrandNameAnimation
}

function setupTextRevealAnimations(): void {
  const textRevealSections = document.querySelectorAll('.text-reveal')

  textRevealSections.forEach((section) => {
    const words = section.querySelectorAll('.text-reveal-word')

    gsap.to(words, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      },
      opacity: 1,
      y: 0,
      stagger: 0.2,
      ease: 'power2.out'
    })
  })
}

function setupGalleryAnimation(): void {
  const galleryGrid = document.querySelector('.gallery-grid')
  
  if (!galleryGrid) return

  // Animate the grid container
  gsap.to(galleryGrid, {
    scrollTrigger: {
      trigger: '.gallery-section',
      start: 'top 80%',
      end: 'top 30%',
      scrub: 1,
    },
    opacity: 1,
    ease: 'power2.out'
  })

  // Animate individual gallery items
  const galleryItems = document.querySelectorAll('.gallery-item')
  
  galleryItems.forEach((item, index) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: '.gallery-section',
        start: 'top 70%',
        end: 'top 20%',
        scrub: 1,
      },
      opacity: 1,
      y: 0,
      delay: index * 0.05,
      ease: 'power2.out'
    })
  })
}

function setupStickyCircleAnimation(): void {
  // First sticky circle (showcase-image-1 after gallery)
  const triggerElement1 = document.querySelector('.sticky-circle_wrap')
  const targetElement1 = document.querySelector('.sticky-circle_element')

  if (triggerElement1 && targetElement1) {
    gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement1,
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    }).fromTo(
      targetElement1,
      {
        width: "25em",
        height: "25em",
        borderRadius: "25em"
      },
      {
        width: "100vw",
        height: "100vh",
        borderRadius: "0em",
        ease: "none"
      }
    )
  }
}

function setupFeatureImageAnimation(): void {
  const featureImage = document.querySelector('.feature-image') as HTMLElement

  if (!featureImage) return

  gsap.to(featureImage, {
    scrollTrigger: {
      trigger: '.image-section-light',
      start: 'top center',
      end: 'center center',
      scrub: 1,
    },
    opacity: 1,
    scale: 1,
    ease: 'power2.out'
  })
}

function setupNavigation(): void {
  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e: Event) => {
      e.preventDefault()
      const href = (anchor as HTMLAnchorElement).getAttribute('href')
      const target = document.querySelector(href || '')
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        })
      }
    })
  })
}
