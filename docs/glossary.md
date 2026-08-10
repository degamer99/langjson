# Glossary

**AI Studio scaffolding** — Leftover config from the Google AI Studio export environment: the `esm.sh` import map in `index.html`, `GEMINI_API_KEY`/`API_KEY` injection in `vite.config.ts`, and AI-Studio-specific README/`metadata.json` content. Unused by the actual app logic.

**Tailwind Play CDN** — The `<script src="https://cdn.tailwindcss.com">` tag currently providing all styling. Compiles Tailwind classes to CSS live in the browser on every page load by scanning the rendered DOM. Officially unsupported for production use (no purging, no caching, ships the full compiler as JS).

**Build-time Tailwind** — Standard production setup: `tailwindcss` + `postcss` + `autoprefixer` as devDependencies, wired into the Vite build, with a `content` glob pointing at real source files so only used classes are compiled into a static, cacheable CSS file.

**Safelist** — A Tailwind config list of class names to always generate even if they aren't found by static content-scanning. Used here for `gap-y-2` through `gap-y-16`, since that class name is built dynamically at runtime (`` `gap-y-${n}` ``) rather than appearing literally in source.

**SentenceData** — The core document unit (defined in `types.ts`): one sentence, its translation, and a word-by-word gloss array. A loaded document is `SentenceData[]`.

**Persisted state** — Data written to IndexedDB so it survives a page refresh/reopen: `settings` (theme, RTL, view options), the last-loaded `data` (SentenceData[]), and scroll/reading position.

**Reading position** — The scroll offset within the currently loaded document, saved (debounced) so a returning user lands back where they left off instead of at the top.

**Clear saved data** — A UI control that wipes all persisted IndexedDB state (document, settings, reading position) and resets the app to first-load defaults.
