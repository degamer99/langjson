# ADR Log — langjson improvements

## ADR-001: Iteration scope
**Decision:** This iteration covers Stage 1 (production hygiene) and Stage 2 (local persistence) only. Sample-data onboarding and scaling (virtualization, multi-doc library) are deferred to backlog.
**Status:** Accepted

## ADR-002: Drop AI Studio scaffolding
**Decision:** Fully strip AI Studio ties — remove the `esm.sh` import map from `index.html`, remove `GEMINI_API_KEY`/`API_KEY` plumbing from `vite.config.ts`, remove AI Studio references from README. Commit to standard Vite + npm workflow only.
**Rationale:** Nothing in the app calls Gemini or any AI API. Maintaining two parallel module-resolution paths (import map + npm/Vite bundling) is dead-weight risk with no benefit.
**Status:** Accepted

## ADR-003: Migrate to build-time Tailwind
**Decision:** Replace the `cdn.tailwindcss.com` script tag with a proper build-time Tailwind pipeline (tailwindcss + postcss + autoprefixer installed as devDependencies, wired into Vite, config content-glob fixed to actual file locations since there is no `src/` folder).
**Rationale:** The Play CDN script is explicitly unsupported for production (full JIT compile in-browser on every load, no purge/caching). The existing `tailwind.config.js` is currently dead code because its content glob (`./src/**/*`) matches nothing in this repo's flat structure.
**Status:** Accepted

## ADR-004: Fix dynamic gap-y-{n} class under build-time purge
**Decision:** Safelist `gap-y-2` through `gap-y-16` (step 2, matching the slider's min/max/step) explicitly in `tailwind.config.js`'s `safelist` option, rather than switching to an inline style or a lookup map.
**Rationale:** Keeps the component code untouched (still emits `gap-y-${n}` class names) at the cost of a config list that must be kept in sync if the slider's range in Header.tsx ever changes. Accepted trade-off per user preference.
**Risk noted:** If someone changes the slider's min/max/step in Header.tsx without updating the safelist, spacing will silently break for out-of-range values. Flagging this in code comments during implementation.
**Status:** Accepted

## ADR-005: Placeholder PWA icons
**Decision:** Generate simple placeholder icon-192.png/icon-512.png (solid color + initial/mark) now rather than leaving broken references.
**Rationale:** A broken icon is worse than a plain placeholder; low effort either way. Can be swapped for real branded artwork later without touching manifest.json/index.html.
**Status:** Accepted

## ADR-006: Persist settings + last document via IndexedDB
**Decision:** Persist both `settings` (theme, RTL, view options) and the last-loaded `data` (SentenceData[]) so a refresh restores full reading state. Use IndexedDB rather than localStorage as the backing store.
**Rationale:** Document data can run several MB for book-length texts, exceeding comfortable localStorage limits and risking main-thread blocking on read/write. IndexedDB is async and has effectively no practical size ceiling for this use case.
**Implementation note:** Zustand persist middleware supports a custom async storage adapter — will wrap IndexedDB (via a small idb-keyval style helper, avoiding a heavy ORM dependency) as that adapter rather than hand-rolling persistence logic in each store action.
**Status:** Accepted

## ADR-007: Persist scroll/reading position
**Decision:** Track and persist scroll position within the loaded document (debounced) so returning users land where they left off instead of at the top.
**Status:** Accepted

## ADR-008: Add 'Clear saved data' control
**Decision:** Add a visible UI control (in Header, near the upload button) that clears persisted IndexedDB data (document, settings, scroll position) and resets the app to first-load defaults.
**Rationale:** Once document content persists beyond the tab session, users need an explicit way to wipe it — privacy on shared machines and a clean "start fresh" path.
**Status:** Accepted
