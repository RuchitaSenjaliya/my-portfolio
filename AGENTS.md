<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Codebase Structure

The project is a Next.js application built with TypeScript, React 19, and TailwindCSS v4. It follows a clean modular organization:

- **`src/app/`**: Next.js App Router configuration and styles. Contains `page.tsx` (main landing page), `layout.tsx` (root HTML layout), and `globals.css` (Tailwind imports and custom classes).
- **`src/components/`**: Presentation and interactive UI components. Keep component logic modular and focused.
- **`src/data/`**: Static datasets and data models (e.g., project lists, skills, experience details) to keep components clean.
- **`src/types/`**: TypeScript type and interface definitions (e.g., `portfolio.ts`).
- **`src/theme/`**: Design tokens, variables, and presets (e.g., `theme.ts` for colors, font families, and sizes).
- **`src/utils/`**: Helper and utility files containing decoupled logic (e.g., `helper.ts` for DOM, file triggers, and scroll behaviors).
- **`src/assets/`**: Static files and media assets (images, icons).

---

# Development Rules & Coding Standards

1. **Always Create Reusable Components & Keep Main Files Clean**
   - Break complex layouts into reusable, single-responsibility React components under `src/components/`.
   - The main entry page (`src/app/page.tsx`) must remain clean and declarative, acting primarily as a coordinator or layout wrapper importing modular components.

2. **Extract Utility Functions to `helper.ts`**
   - Do not write utility logic (e.g., string manipulation, DOM helpers, browser API triggers, custom events, math calculations) directly within presentation components or main pages.
   - Extract utility functions into `src/utils/helper.ts` and import them as needed.

3. **Utilize and Maintain Theme Files**
   - Manage and reference design tokens for colors, font families, and font sizes using `src/theme/theme.ts` and `src/app/globals.css`.
   - Avoid hardcoded style values (hex colors, arbitrary font sizes) inside components or inline styles. Keep all layout elements aligned with the defined design theme.

