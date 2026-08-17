<div align="center">

# 📷 Lumina Gallery

### *A curated editorial photography experience powered by the Unsplash API*

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.1.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Unsplash API](https://img.shields.io/badge/Unsplash_API-Live_Integration-black?style=for-the-badge&logo=unsplash&logoColor=white)](https://unsplash.com/developers)
[![CSS3](https://img.shields.io/badge/Pure_CSS-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License: MIT](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge)](LICENSE)

[**Live Demo**](https://lumina-kohl-eight.vercel.app/)

</div>

---

## 📖 Overview

**Lumina Gallery** is a modern and responsive image gallery built for photography enthusiasts and visual storytellers.

The application uses **React**, **Vite**, and the official **Unsplash API** to provide a smooth image-browsing experience across mobile, tablet, and desktop devices.

It features a dark editorial design, glassmorphic controls, responsive layouts, keyboard-accessible lightbox navigation, category filtering, search, pagination, loading states, and robust API error handling.

---

## ✨ Features

- 🔍 **Unsplash-powered search**  
  Search for photos using keywords and receive results directly from the Unsplash API.

- 🗂️ **Category filtering**  
  Browse images by:
  - All
  - Nature
  - Architecture
  - Travel
  - People
  - Animals

- 🖼️ **Fullscreen lightbox**
  - Open any image in a fullscreen modal.
  - Use `Escape` to close.
  - Use `ArrowLeft` and `ArrowRight` to navigate.
  - Navigate continuously between the first and last loaded images.
  - Lock background scrolling while the modal is open.

- ⚡ **Pagination**
  - Load additional images with the “Load More” button.
  - Preserve the current search query and category.
  - Prevent duplicate requests.
  - Cancel outdated requests using `AbortController`.

- 🎨 **Editorial design**
  - Dark charcoal background.
  - Warm amber accent color.
  - Glassmorphic interface elements.
  - Responsive CSS Grid.
  - Smooth hover effects and transitions.
  - Shimmer loading skeletons.
  - Fallback image handling.

- 🛡️ **Error handling**
  - Missing API key messages.
  - Invalid API key messages.
  - Network error handling.
  - Unsplash rate-limit handling.
  - Empty search-result states.
  - Broken-image fallback support.

- 🏷️ **Unsplash attribution**
  - Photographer attribution is displayed.
  - Photographer profile links are included.
  - Unsplash referral links are included.
  - Images use URLs returned directly by the Unsplash API.

- 📱 **Responsive design**
  - Mobile-first layout.
  - Tablet support.
  - Desktop support.
  - No horizontal scrolling.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| Frontend framework | [React 18](https://react.dev/) |
| Build tool | [Vite 5](https://vitejs.dev/) |
| Programming language | JavaScript and JSX |
| Icons | [Lucide React](https://lucide.dev/) |
| Styling | Pure CSS |
| Image source | [Unsplash API](https://unsplash.com/developers) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```text
lumina-gallery/
├── public/
│   ├── favicon.svg
│   └── fallback-image.svg
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── Gallery.jsx
│   │   ├── GalleryCard.jsx
│   │   ├── Lightbox.jsx
│   │   ├── LoadingState.jsx
│   │   ├── ErrorState.jsx
│   │   ├── EmptyState.jsx
│   │   ├── About.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   ├── useGallery.js
│   │   └── useBodyScrollLock.js
│   ├── services/
│   │   └── unsplashApi.js
│   ├── utils/
│   │   └── imageMapper.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

### Component responsibilities

| File | Responsibility |
| :--- | :--- |
| `Header.jsx` | Sticky navigation and mobile menu |
| `Hero.jsx` | Hero content and search area |
| `SearchBar.jsx` | Search input and submission |
| `CategoryFilter.jsx` | Category filter controls |
| `Gallery.jsx` | Gallery layout and image rendering |
| `GalleryCard.jsx` | Individual image card and attribution |
| `Lightbox.jsx` | Fullscreen image viewer |
| `LoadingState.jsx` | Loading skeleton cards |
| `ErrorState.jsx` | API and network error messages |
| `EmptyState.jsx` | Empty search-result message |
| `About.jsx` | Project description and statistics |
| `Footer.jsx` | Footer content and attribution |
| `useGallery.js` | Gallery state, search, filtering, and pagination |
| `useBodyScrollLock.js` | Prevents page scrolling while lightbox is open |
| `unsplashApi.js` | Unsplash API request functions |
| `imageMapper.js` | Converts Unsplash data into app-friendly data |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) version 16 or higher
- npm
- Git
- An Unsplash developer account

---

### 1. Clone the repository

```bash
git clone https://github.com/SourasishG/lumina-gallery.git
cd lumina-gallery
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Create an Unsplash application

1. Visit the [Unsplash Developers page](https://unsplash.com/developers).
2. Sign in to your Unsplash account.
3. Open **Your Apps**.
4. Click **New Application**.
5. Complete the application details.
6. Copy your **Access Key**.

---

### 4. Configure the environment variable

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Open `.env` and add your Unsplash Access Key:

```env
VITE_UNSPLASH_ACCESS_KEY=your_actual_unsplash_access_key_here
```

Do not commit the `.env` file to GitHub.

---

### 5. Start the development server

```bash
npm run dev
```

Open the local development URL shown in your terminal. It is usually:

```text
http://localhost:5173
```

---

## 📦 Available Scripts

### Start the development server

```bash
npm run dev
```

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

---

## 🌐 Deploying to Vercel

### 1. Push the project to GitHub

```bash
git add .
git commit -m "Create Lumina Gallery"
git push origin main
```

### 2. Import the repository into Vercel

1. Open [Vercel](https://vercel.com/).
2. Sign in with GitHub.
3. Click **Add New Project**.
4. Select the `lumina-gallery` repository.
5. Keep the default Vite settings.
6. Click **Deploy**.

### 3. Add the environment variable

In the Vercel project settings, open **Environment Variables** and add:

```text
Name: VITE_UNSPLASH_ACCESS_KEY
Value: your_actual_unsplash_access_key_here
```

Redeploy the project after adding the variable.

---

## 🔒 Security Notes

The variable name starts with `VITE_` because Vite exposes these variables to frontend code.

This means the API key can be discovered in the browser after deployment. Do not treat it as a fully private secret.

For a high-traffic production application, use a backend or Vercel serverless function:

```text
React frontend
      ↓
Vercel serverless function
      ↓
Unsplash API
```

The serverless function can store the Unsplash key securely on the server side.

Also make sure that:

- `.env` is included in `.gitignore`.
- The Access Key is never committed to GitHub.
- The Secret Key is never used in frontend code.
- The API is not called unnecessarily.
- Pagination and search requests are controlled.

---

## ⚖️ License and Attribution

### Source code

This project is released under the [MIT License](LICENSE).

### Photography

Images are provided by the [Unsplash API](https://unsplash.com/developers) and remain subject to the Unsplash license and API guidelines.

Lumina Gallery displays:

- Photographer names.
- Links to photographer profiles.
- Links to the original Unsplash photos.
- Links to Unsplash.
- Referral parameters where required.

---

## 👨‍💻 Author

### Sourasish Ghosh

- GitHub: [@SourasishG](https://github.com/SourasishG)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/sourasish-ghosh07/)
- Email: [sourasishghosh062@gmail.com](mailto:sourasishghosh062@gmail.com)

---

<div align="center">

### Built with ❤️ using React, Vite, CSS, and the Unsplash API

If you like this project, please consider giving it a ⭐ on GitHub.

</div>
