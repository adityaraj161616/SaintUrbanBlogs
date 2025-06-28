# Saint-Urbain Echo

A modern, interactive blog platform built with React, Vite, TypeScript, Tailwind CSS, and advanced GSAP-powered UI/UX animations.  
Showcases beautiful articles with horizontal scroll, animated cards, and seamless Supabase integration.

---

## 🚀 Features

- **Dynamic Blog Feed:** Fetches articles in real time from Supabase.
- **Horizontal Scroll Animation:** Articles slide horizontally as you scroll vertically, powered by GSAP ScrollTrigger.
- **Bi-directional Scroll:** Alternate sections scroll left or right for a unique reading experience.
- **Animated Cards:** Each article card features magnetic, ripple, and hover effects.
- **Auto-Seed Database:** Automatically seeds demo articles if the database is empty.
- **Responsive Design:** Fully responsive and mobile-friendly.
- **Modern Stack:** Built with Vite, React, TypeScript, Tailwind CSS, shadcn-ui, and GSAP.
- **Instant Preview & Hot Reload:** Fast development with Vite's dev server.

---

## 🖥️ Demo

[Live Demo](https://your-demo-url.com) <!-- Replace with your actual demo URL -->

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Supabase](https://supabase.com/) project (for production use)

### Installation

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd saint-urbain-echo-main

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

---

## 🛠️ Project Structure

```
src/
  components/         # React components (BlogList, EnhancedBlogCard, etc.)
  services/           # API services (Supabase API)
  types/              # TypeScript types
  utils/              # Utility functions (scroll animations, seeding)
  App.tsx             # Main app entry
  main.tsx            # Vite entry point
public/
  assets/             # Static assets
```

---

## ✨ Advanced Horizontal Scroll

This project implements advanced horizontal scrolling for articles using GSAP's ScrollTrigger:

- Each `.horizontal` section contains a `.pin-wrap` and `.animation-wrap` with `.item` cards.
- As you scroll vertically, the section is pinned and the cards slide horizontally.
- Direction alternates with `.to-left` and `.to-right` classes.
- All logic is handled in `BlogList.tsx` and `utils/scrollAnimations.ts`.

---

## 🧩 Technologies Used

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn-ui](https://ui.shadcn.com/)
- [GSAP + ScrollTrigger](https://greensock.com/scrolltrigger/)
- [Supabase](https://supabase.com/) (for backend & database)
- [React Query](https://tanstack.com/query/latest)

---

## 📝 Editing & Contributing

### Edit Locally

1. Clone the repo and install dependencies (see above).
2. Make your changes in your favorite IDE (VS Code recommended).
3. Commit and push your changes.

### Edit in GitHub

- Navigate to the file you want to edit.
- Click the pencil icon to edit.
- Commit your changes.

### Use GitHub Codespaces

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

---

## 🌐 Deployment

You can deploy this project to any static hosting provider that supports Vite/React (e.g., Vercel, Netlify, Render, etc.).  
Set your environment variables for Supabase in your deployment dashboard.

---

## 🔗 Custom Domain

You can connect a custom domain via your deployment provider.  
See their documentation for step-by-step instructions.

---

## 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)

---

## 🙏 Credits

- Inspired by modern editorial sites and GSAP animation demos.
- Built by Aditya Raj and contributors.

---

## 💬 Questions?

Open an issue or contact the maintainer.
