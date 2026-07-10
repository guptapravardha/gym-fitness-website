# GymFit — Premium Fitness Website

A handcrafted, cinematic gym & fitness website built with pure HTML5, CSS3, and vanilla JavaScript (no frameworks).

## Structure
```
GymFit/
├── index.html          → Cinematic scroll-story homepage (GSAP ScrollTrigger pinned athlete)
├── programs.html        → 8 training programs + comparison table
├── trainers.html         → Full trainer roster
├── membership.html       → Pricing + full feature comparison table
├── bmi.html               → Interactive BMI / calorie / water calculator (animated gauge)
├── nutrition.html        → Filterable, flip-card nutrition guide + meal planner
├── faq.html               → Accordion FAQ + Myth vs Fact flip cards
├── contact.html           → Validated contact form + map + hours
├── css/
│   ├── style.css         → Core design system (variables, components, sections)
│   └── responsive.css    → Breakpoints for tablet/mobile
├── js/
│   ├── script.js         → Nav, loader, reveals, ripple, accordion, GSAP cinematic hero
│   ├── counter.js        → Animated stat counters
│   ├── bmi.js             → BMI calculator logic
│   └── contact.js         → Contact form validation
└── images/                → (uses hosted Unsplash imagery — see notes below)
```

## Design System
- **Background** `#090909` · **Section** `#111111` · **Card** `#1B1B1B`
- **Accent** `#7CFF3B` (used sparingly — glow only on hover)
- **Headings** Bebas Neue · **Body** Poppins

## Homepage Cinematic Experience
The hero section (`.cinema`) uses GSAP + ScrollTrigger to pin the athlete image in the viewport while 6 scenes scrub past behind/around him — lighting shifts, floating stat cards, and text reveals are all scrubbed directly to scroll position, not autoplay. GSAP is loaded via CDN (`cdnjs.cloudflare.com`), so an internet connection is required for the pinned scroll effect; every other animation (reveals, marquee, accordions, counters, flip cards, before/after sliders) runs on vanilla JS and works fully offline.
