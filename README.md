# Ridona (Rido NA)

![Ridona Banner](https://rido-na.vercel.app/og-image.png)

Ridona is a highly interactive, modern learning platform designed to provide a "notebook" aesthetic for exploring complex subjects. It combines course materials, interactive coding playgrounds, and rich text learning tools into a unified, high-performance web experience.

**Live Site:** [rido-na.vercel.app](https://rido-na.vercel.app/)

---

## 🚀 Key Features

- **Multi-Subject Learning Hub:** Dynamic curriculum for Math, Science, Languages, and more.
- **Interactive Coding Lab:** Full-featured code playground with syntax highlighting and live execution support (Python, JavaScript, etc.).
- **Rich Text Practice:** Professional-grade writing environment with rich text support and digital pen capabilities.
- **Multilingual Support:** Full internalization (i18n) for German, English, and Uzbek strings.
- **Intelligent Search:** Global command-palette style search to quickly jump between courses, modules, and platform features.
- **Unified Brand Identity:** A customized "Notebook" theme (Paper background, Primary copper/tan tones) built on top of Tailwind CSS and shadcn/ui.
- **Progress Tracking:** Automatic state persistence for quizzes, course modules, and user preferences.

---

## 🛠 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with a custom unified design system.
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) with persistence.
- **Animations:** [Framer Motion](https://www.framer.com/motion/).
- **Components:** [shadcn/ui](https://ui.shadcn.com/) Radix-based components.
- **Icons:** [Lucide React](https://lucide.dev/).
- **Testing:** [Playwright](https://playwright.dev/) for E2E, A11y, and Visual Regression.

---

## 📂 Project Structure

```text
app/
├── platform/        # Dynamic routes for subjects and courses
├── (coding)/        # Course-specific modules and projects
├── notwendig/       # Specialized internal interactive environments
└── globals.css      # Core brand tokens and CSS variable mappings

components/
├── platform/        # Complex context-aware components (Playgrounds, Canvas)
├── ui/              # Reusable atomic shadcn/ui components
└── providers/       # Theme and Store providers

lib/
├── store/           # Zustand state configurations
├── i18n/            # Translation dictionaries (DE, EN, UZ)
├── curriculum/      # Static data definitions for course content
└── hooks/           # Shared logic (Translations, Input, etc.)

tests/               # Comprehensive Playwright test suite
```

---

## 🛠 Getting Started

### Prerequisites

- Node.js 18+ 
- npm / yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aallanazar/rido-na.git
   cd rido-na
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing

The project includes a robust testing suite covering navigation, interactions, and responsiveness.

```bash
# Run all tests
npx playwright test

# Run tests in UI mode
npx playwright test --ui
```

---

## 📜 License

This project is private and intended for educational purposes. All rights reserved.

---

Created with ❤️ by the Ridona Team.
