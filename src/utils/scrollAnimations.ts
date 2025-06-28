
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollEvent {
  timestamp: number;
  scrollY: number;
  sectionId: string;
  animationProgress: number;
  visibility: number;
}

interface AnimationSection {
  element: HTMLElement;
  id: string;
  timeline: gsap.core.Timeline;
  scrollTrigger?: ScrollTrigger;
}

class AdvancedScrollAnimationRecorder {
  private sections: AnimationSection[] = [];
  private events: ScrollEvent[] = [];
  private isRecording: boolean = false;
  private startTime: number = 0;
  private masterTimeline: gsap.core.Timeline;

  constructor() {
    this.masterTimeline = gsap.timeline();
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupAdvancedAnimations());
    } else {
      this.setupAdvancedAnimations();
    }
  }

  private setupAdvancedAnimations() {
    // Enhanced blog card animations
    this.animateBlogCards();
    
    // Text reveal animations
    this.animateTextReveals();
    
    // Image parallax effects
    this.setupParallaxImages();
    
    // Navigation animations
    this.setupNavigationAnimations();
    
    // Page transition effects
    this.setupPageTransitions();

    console.log(`Initialized advanced scroll animations with ${this.sections.length} sections`);
  }

  private animateBlogCards() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach((card, index) => {
      if (card instanceof HTMLElement) {
        const timeline = gsap.timeline({ paused: true });
        
        // Initial state
        gsap.set(card, {
          opacity: 0,
          y: 100,
          scale: 0.9,
          rotationX: 15
        });

        // Sophisticated entrance animation
        timeline
          .to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            ease: "back.out(1.7)"
          })
          .to(card.querySelector('img'), {
            scale: 1,
            duration: 1.5,
            ease: "power2.out"
          }, 0)
          .from(card.querySelectorAll('h3, p, .text-sm'), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
          }, 0.3);

        // Hover interactions
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -15,
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        // ScrollTrigger
        const scrollTrigger = ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          end: "bottom 15%",
          onUpdate: (self) => {
            timeline.progress(self.progress);
            if (this.isRecording) {
              this.recordEvent(card.id || `blog-card-${index}`, self.progress, self.progress);
            }
          },
          onEnter: () => card.classList.add('in-viewport'),
          onLeave: () => card.classList.remove('in-viewport')
        });

        this.sections.push({
          element: card,
          id: card.id || `blog-card-${index}`,
          timeline,
          scrollTrigger
        });
      }
    });
  }

  private animateTextReveals() {
    const textElements = document.querySelectorAll('h1, h2, h3, .animate-text');
    
    textElements.forEach((element, index) => {
      if (element instanceof HTMLElement && !element.classList.contains('hero-title')) {
        const text = element.textContent || '';
        const words = text.split(' ');
        
        element.innerHTML = words
          .map(word => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
          .join(' ');

        const spans = element.querySelectorAll('span span');
        
        gsap.set(spans, { y: '100%' });
        
        ScrollTrigger.create({
          trigger: element,
          start: "top 80%",
          onEnter: () => {
            gsap.to(spans, {
              y: 0,
              duration: 0.8,
              stagger: 0.05,
              ease: "power3.out"
            });
          }
        });
      }
    });
  }

  private setupParallaxImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      if (img.closest('.hero-section')) return; // Skip hero images
      
      ScrollTrigger.create({
        trigger: img,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const speed = img.dataset.speed ? parseFloat(img.dataset.speed) : 0.5;
          gsap.to(img, {
            y: self.progress * 100 * speed,
            duration: 0.3,
            ease: "none"
          });
        }
      });
    });
  }

  private setupNavigationAnimations() {
    const nav = document.querySelector('nav');
    if (nav) {
      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: { targets: nav, className: "nav-scrolled" }
      });
    }
  }

  private setupPageTransitions() {
    // Smooth page loading animation
    const pageElements = document.querySelectorAll('main, section');
    
    pageElements.forEach((element, index) => {
      gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          once: true
        }
      });
    });
  }

  // Enhanced interaction methods
  createMagneticEffect(element: HTMLElement, strength: number = 0.3) {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    });
  }

  createRippleEffect(element: HTMLElement) {
    element.addEventListener('click', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('div');
      ripple.className = 'ripple-effect';
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        margin-left: -5px;
        margin-top: -5px;
        pointer-events: none;
      `;
      
      element.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  }

  // Recording and playback methods
  private recordEvent(sectionId: string, animationProgress: number, visibility: number) {
    const now = Date.now();
    const event: ScrollEvent = {
      timestamp: now - this.startTime,
      scrollY: window.scrollY,
      sectionId,
      animationProgress,
      visibility
    };
    
    this.events.push(event);
  }

  startRecording() {
    this.isRecording = true;
    this.startTime = Date.now();
    this.events = [];
    console.log('Started recording advanced scroll animations');
  }

  stopRecording() {
    this.isRecording = false;
    console.log(`Stopped recording. Captured ${this.events.length} events`);
    return this.events;
  }

  replay(events: ScrollEvent[] = this.events, speed: number = 1) {
    if (events.length === 0) {
      console.warn('No events to replay');
      return;
    }

    console.log(`Starting advanced replay of ${events.length} events at ${speed}x speed`);
    
    const replayTimeline = gsap.timeline();
    
    events.forEach((event) => {
      const section = this.sections.find(s => s.id === event.sectionId);
      if (section) {
        replayTimeline.to(section.timeline, {
          progress: event.animationProgress,
          duration: 0.1 / speed,
          ease: "none"
        }, event.timestamp / 1000 / speed);
      }
    });

    return replayTimeline;
  }

  // Utility methods
  exportEvents(): string {
    return JSON.stringify(this.events, null, 2);
  }

  importEvents(jsonString: string): ScrollEvent[] {
    try {
      const events = JSON.parse(jsonString);
      this.events = events;
      return events;
    } catch (error) {
      console.error('Failed to import events:', error);
      return [];
    }
  }

  destroy() {
    this.sections.forEach(section => {
      if (section.scrollTrigger) {
        section.scrollTrigger.kill();
      }
      section.timeline.kill();
    });
    this.sections = [];
    this.events = [];
    this.masterTimeline.kill();
  }
}

// Create and export the enhanced instance
const advancedScrollRecorder = new AdvancedScrollAnimationRecorder();

export default advancedScrollRecorder;
export type { ScrollEvent, AnimationSection };
