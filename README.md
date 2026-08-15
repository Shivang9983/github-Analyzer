# 🔍 GitHub Profile Analyzer

A highly polished, production-grade profile visualization and repository analytics dashboard for GitHub users. Built as a fast, client-side single page app using React, Vite, and custom CSS.

Developed and maintained by **Shivang Kumar Singh**.

---

## ⚡ Features

### 1. Advanced Analytics Dashboard
- **Profile Card:** Full user statistics, avatar, bio, location, company, blog link, Twitter profile, and count metrics for followers, following, and public repos.
- **Language Chart Insights:** Computes and renders a beautiful percentage breakdown of primary programming languages used across the user's top repositories (up to 100).
- **Repositories Grid:** Responsive card layout for public repositories including:
  - Repository search and filter.
  - Sorting options (by Stars, Forks, size, and last updated date).
  - Clean pagination (6 repos per page) to prevent layout shifts.
  - Interactive hover actions and linkouts.

### 2. High-Performance Client-Side Caching
- Integrates a `sessionStorage`-based cache layer to store fetched data with a 5-minute TTL. Clicking recently searched users loads data instantly and saves your API rate limits!

### 3. API Rate Limit Display & Token Integration
- Displays live API rate limits directly in the header (remaining/total limit and reset countdown).
- Provides a **Settings Modal** to configure a Personal Access Token (PAT) securely inside your browser's `localStorage` to increase your rate limits from 60 to 5,000 requests/hour.

### 4. Premium Responsive UI/UX
- **Theme Toggle:** Persistent light and dark themes using CSS design tokens.
- **Micro-animations:** Smooth keyframe animations, fade-ins for grids, scale transitions for the settings modal, and hover state scaling.
- **Skeleton Screen Loaders:** Customized cards skeleton states for content loading to prevent layout shifts.
- **Input Validation:** Sanitization of inputs and adherence to GitHub username requirements.

---

## 🛠️ Tech Stack
- **Library:** React 19 (Vite build system)
- **Styles:** Modern Vanilla CSS (CSS Grid, Flexbox, Variable-driven themes)
- **Icons:** SVG vector graphics
- **API:** GitHub REST API v3

---

## 📦 Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Shivang9983/github-analyzer.git
   cd github-analyzer
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Production Build:**
   ```bash
   npm run build
   ```

---

*Made by [Shivang Kumar Singh](https://github.com/Shivang9983)*