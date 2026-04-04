# Alex Nova — 3D AI Engineer Portfolio

A fully interactive, 3D animated portfolio site for an AI Engineer, built with **Three.js**, vanilla JavaScript, and modern CSS.

## Features

- 🌌 **Animated 3D neural-network background** — particle system with proximity-based connection lines, mouse parallax, and a rotating wireframe torus knot, all rendered via Three.js
- 🎴 **Project cards with individual 3D mini-scenes** — each project card has its own WebGL canvas (sphere / torus / box wireframes) that animate on load
- ⚡ **Smooth scroll-triggered animations** — skill bars animate in on scroll; every section fades up using IntersectionObserver
- 📱 **Responsive design** — works on desktop, tablet, and mobile

## Sections

| Section | Content |
|---------|---------|
| **Hero** | Name, title, CTA buttons |
| **About** | Bio + animated stat cards |
| **Skills** | Animated skill bars for LLM, CV, MLOps, Data Eng, Python, RL |
| **Projects** | 4 project cards with 3D thumbnails |
| **Experience** | Timeline (Anthropic → DeepMind → OpenAI → Palantir) |
| **Contact** | Email, GitHub, LinkedIn, Twitter, Google Scholar |

## Running locally

Just open `index.html` in any modern browser — no build step required.
Three.js is loaded from a CDN via ES module import, so you need to serve the
files (not open as `file://`):

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then visit `http://localhost:8080`.

## Customisation

- Replace `Alex Nova` with your real name everywhere in `index.html`
- Update skills, projects, and experience entries in `index.html`
- Tweak colours in the `:root` block at the top of `style.css`
- Adjust particle count, connection threshold, or 3D objects in `main.js`
