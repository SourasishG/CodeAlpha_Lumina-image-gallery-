<div align="center">

# 📷 Lumina Gallery

### *A Curated Editorial Photography Experience Powered by the Unsplash API*

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Unsplash API](https://img.shields.io/badge/Unsplash%20API-Live%20Integration-black?style=for-the-badge&logo=unsplash&logoColor=white)](https://unsplash.com/developers)
[![CSS3](https://img.shields.io/badge/Pure_CSS-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License: MIT](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge)](LICENSE)

[**Live Demo**](https://your-deployment-url.vercel.app) • [**Report Bug**](https://github.com/SourasishG/lumina-gallery/issues) • [**Request Feature**](https://github.com/SourasishG/lumina-gallery/issues)

</div>

---

## 📖 Overview

**Lumina Gallery** is a modern, responsive web application designed for photography enthusiasts and visual storytellers. Built with **React 18** and **Vite**, it queries the official **Unsplash Search API** to deliver a fluid image-browsing experience across mobile, tablet, and desktop screens.

Featuring a dark editorial aesthetic, glassmorphic UI controls, keyboard-driven navigation, and zero heavy CSS frameworks, Lumina demonstrates modern frontend best practices, robust error handling, and strict compliance with the Unsplash API Guidelines.

---

## ✨ Key Features

- 🔍 **Live Search Engine**: Instant query-based search with input sanitation, loading states, and empty-state fallbacks.
- 🗂️ **Curated Category Filters**: Rapid one-click exploration for *All, Nature, Architecture, Travel, People,* and *Animals*.
- 🖼️ **Interactive Fullscreen Lightbox**:
  - Full keyboard support: `Escape` to close, `ArrowLeft` / `ArrowRight` to step through photos.
  - Infinite circular wrapping between the first and last loaded images.
  - Automatic background scroll locking (`useBodyScrollLock`).
- ⚡ **Incremental Pagination**: Smooth "Load More" pagination that preserves active search filters and prevents duplicate requests with `AbortController`.
- 🎨 **Editorial Design System**:
  - Dark charcoal backdrop with luminous gold accents (`#F59E0B`).
  - Fluid typography, subtle ambient mesh glows, and custom slim scrollbars.
  - Responsive CSS Grid (1 to 4 columns depending on viewport width).
  - Shimmer skeleton loaders and fallback SVG placeholders for broken image URLs.
- 🛡️ **Resilient API State Management**:
  - Clear alerts for missing API keys, rate limits (`HTTP 429`), invalid credentials (`HTTP 401/403`), and offline network loss.
- 🏷️ **100% Unsplash Attribution Compliant**: Direct referral links with UTM tracking for every photographer and photo.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) (Functional Components & Custom Hooks) |
| **Build Tooling** | [Vite 5](https://vitejs.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Styling** | Pure CSS (Custom Properties, Glassmorphism, CSS Grid, Flexbox) |
| **Data Source** | [Unsplash Search & Photos API](https://unsplash.com/developers) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Architecture

```plaintext
lumina-gallery/
├── public/
│   ├── favicon.svg                # Custom SVG brand favicon
│   └── fallback-image.svg         # Graceful broken-image placeholder
├── src/
│   ├── components/
│   │   ├── Header.jsx             # Sticky navigation with mobile drawer
│   │   ├── Hero.jsx               # Hero section with embedded search
│   │   ├── SearchBar.jsx          # Accessible search bar with clear button
│   │   ├── CategoryFilter.jsx     # Category pill buttons
│   │   ├── Gallery.jsx            # Dynamic CSS Grid gallery container
│   │   ├── GalleryCard.jsx        # Image card with lazy load & attribution
│   │   ├── Lightbox.jsx           # Accessible fullscreen modal
│   │   ├── LoadingState.jsx       # Shimmer skeleton loader cards
│   │   ├── ErrorState.jsx         # Friendly contextual error alerts
│   │   ├── EmptyState.jsx         # "No results found" fallback screen
│   │   ├── About.jsx              # Dynamic metrics and story section
│   │   └── Footer.jsx             # Social links & Unsplash legal attribution
│   ├── hooks/
│   │   ├── useGallery.js          # Main state & async data pipeline
│   │   └── useBodyScrollLock.js   # Modal scroll prevention hook
│   ├── services/
│   │   └── unsplashApi.js         # Fetch wrapper with AbortController & error handling
│   ├── utils/
│   │   └── imageMapper.js         # API payload normalizer & UTM builder
│   ├── App.jsx                    # Root component layout
│   ├── main.jsx                   # React DOM entry point
│   └── index.css                  # Global design system & animations
├── .env.example                   # Environment variable template
├── .gitignore                     # Git ignore rules (protects credentials)
├── index.html                     # HTML5 shell
├── package.json                   # Dependencies and scripts
├── vite.config.js                 # Vite configuration
└── README.md                      # Project documentation

🚀 Getting Started
Follow these steps to run Lumina Gallery locally:
1. Prerequisites
Ensure you have Node.js (v16.0 or higher) installed.
2. Clone the Repository
code
Bash
git clone https://github.com/SourasishG/lumina-gallery.git
cd lumina-gallery
3. Install Dependencies
code
Bash
npm install
4. Configure Unsplash API Access Key
Register for a free developer account at Unsplash Developers.
Create a new application and copy your Access Key.
Create a .env file in your project root:
code
Bash
cp .env.example .env
Open .env and paste your key:
code
Env
VITE_UNSPLASH_ACCESS_KEY=your_actual_unsplash_access_key_here
5. Launch the Development Server
code
Bash
npm run dev
Open http://localhost:5173 in your browser.
📦 Production Build
To generate an optimized production bundle:
code
Bash
npm run build
To preview the production build locally:
code
Bash
npm run preview
🌐 Deploying to Vercel
Push your code to your GitHub repository.
Import the repository into Vercel.
In the Environment Variables panel, add:
Key: VITE_UNSPLASH_ACCESS_KEY
Value: your_actual_unsplash_access_key_here
Click Deploy.
🔒 Security Best Practice Note:
In a frontend-only Vite application, import.meta.env.VITE_UNSPLASH_ACCESS_KEY is embedded in the client bundle. For high-traffic enterprise applications, Unsplash requests should be proxied through a backend service or serverless function (such as Vercel Serverless /api/photos) to keep keys hidden.
⚖️ License & Attribution
Source Code: Released under the MIT License.
Photography: All images are provided via the Unsplash API and are subject to the Unsplash License. Attribution to original creators is strictly displayed on all gallery cards and within the lightbox.
👨‍💻 Author
Sourasish
GitHub: @SourasishG
LinkedIn: Connect with me
Email: sourasish@example.com
<div align="center">
<sub>Built with ❤️ using React & Vite. If you like this project, please consider giving it a ⭐!</sub>
</div>
```