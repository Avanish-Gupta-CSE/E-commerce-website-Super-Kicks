# Super Kicks -- Architecture Decision Records (ADRs)

Each decision follows this format:
- **Context**: Why this decision is needed
- **Decision**: What was decided
- **Alternatives**: What else was considered
- **Consequences**: Trade-offs and implications

---

## ADR-001: Migrate from Create React App to Vite

**Date**: 2026-02-07
**Status**: ACCEPTED

**Context**: CRA is effectively unmaintained. The dev server is slow, builds are slow, and the tooling is outdated. The project needs a modern build tool for development speed and bundle optimization.

**Decision**: Migrate to Vite.

**Alternatives**:
- **Stay with CRA**: No benefit; CRA is deprecated.
- **Next.js**: Adds SSR/SSG which is great for SEO, but is a larger migration scope. Could be a Phase 2 consideration if SEO becomes critical.
- **Remix**: Modern, but smaller ecosystem. Overkill for this project scope.

**Consequences**:
- Faster dev server (instant HMR)
- Smaller, optimized production builds
- Native ESM support
- Need to update import patterns and env var prefixes (`REACT_APP_` -> `VITE_`)
- `public/index.html` moves to project root as `index.html`

---

## ADR-002: Migrate from JavaScript to TypeScript

**Date**: 2026-02-07
**Status**: ACCEPTED

**Context**: The codebase has no type checking. There are already bugs related to inconsistent types (prices as strings vs numbers, inconsistent gender values). TypeScript will catch these at compile time.

**Decision**: Migrate to TypeScript with strict mode enabled.

**Alternatives**:
- **JSDoc types**: Less migration effort but weaker enforcement.
- **PropTypes**: Runtime-only, no compile-time safety. Being deprecated.
- **Stay with JS**: No type safety, harder to maintain.

**Consequences**:
- All files renamed from `.js`/`.jsx` to `.ts`/`.tsx`
- Need to define interfaces for all data models
- Stricter code quality enforcement
- Slight learning curve if unfamiliar with TS
- Better IDE support (autocomplete, refactoring)

---

## ADR-003: Migrate from Vanilla CSS to Tailwind CSS

**Date**: 2026-02-07
**Status**: ACCEPTED

**Context**: The current vanilla CSS has issues: potential class name collisions, hard-coded colors, non-standard breakpoints, duplicate code, no design system. Need a consistent, maintainable styling approach.

**Decision**: Adopt Tailwind CSS as the primary styling solution.

**Alternatives**:
- **CSS Modules**: Solves class collisions but doesn't provide a design system.
- **Styled Components**: CSS-in-JS with good DX but larger bundle.
- **Sass/SCSS**: Adds nesting and variables but still manual design system.
- **Chakra UI / MUI**: Full component libraries -- useful but heavy and less customizable.

**Consequences**:
- Utility-first approach, styles live in JSX
- Built-in responsive design, dark mode, design tokens
- Need to define custom theme in `tailwind.config.js`
- All existing CSS files will be gradually removed
- Requires Tailwind CSS IntelliSense extension for good DX

---

## ADR-004: Backend Provider -- Supabase

**Date**: 2026-02-07
**Status**: ACCEPTED

**Context**: The app used MirageJS (in-browser mock). Needed a real backend for production use.

**Decision**: Supabase -- hosted PostgreSQL with built-in auth, real-time, and storage.

**Alternatives**:
- **Express.js + PostgreSQL**: Full control but more setup, need to manage auth/hosting.
- **Firebase**: Good auth but NoSQL (Firestore) less ideal for relational e-commerce data.

**Consequences**:
- Hosted PostgreSQL with relational data model (ideal for e-commerce)
- Built-in auth (email/password + Google OAuth)
- Row Level Security (RLS) for data protection
- Real-time subscriptions available for future features
- Generous free tier for development
- Vendor lock-in (mitigated by standard SQL and open-source Supabase)

---

## ADR-005: Payment Provider

**Date**: 2026-02-07
**Status**: DEFERRED

**Context**: The app needs payment integration for the checkout flow.

**Decision**: Deferred. Mock "Place Order" flow creates orders in database without real payment processing. Stripe integration planned as a future enhancement.

**Alternatives**:
- **Stripe**: Industry standard, great docs, global support, test mode
- **Razorpay**: India-focused, good for INR transactions
- **PayPal**: Global but less developer-friendly

---

## ADR-006: Icon Library

**Date**: 2026-02-07
**Status**: ACCEPTED

**Context**: Currently using `react-icons` which bundles icons inefficiently. Need tree-shakeable, Tailwind-compatible icons.

**Decision**: Migrate to Lucide React.

**Alternatives**:
- **Heroicons**: By Tailwind team, but smaller icon set.
- **react-icons**: Current choice, but not tree-shakeable by default.
- **Phosphor Icons**: Good set, but less Tailwind ecosystem support.

**Consequences**:
- Smaller bundle size (tree-shaking)
- Consistent icon style
- Need to replace all existing react-icons imports

---

## ADR-007: Testing Framework

**Date**: 2026-02-07
**Status**: ACCEPTED

**Context**: The project has zero tests. Need a modern, fast testing setup.

**Decision**: Vitest (unit/integration) + React Testing Library (component) + Playwright (E2E).

**Alternatives**:
- **Jest + RTL**: Slower than Vitest, requires more config with Vite.
- **Cypress**: Good for E2E but slower than Playwright.

**Consequences**:
- Vitest shares Vite config (fast, no extra setup)
- RTL encourages testing user behavior, not implementation
- Playwright provides cross-browser E2E testing
- Need to write tests for all existing and new features
