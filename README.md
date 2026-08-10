# Interlinear Language Reader

A privacy-friendly interlinear reader for language learners. Upload a JSON text with sentence, translation, and word-by-word glosses, and read it with customizable themes, typography, spacing, and RTL support — entirely client-side, nothing leaves your browser.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`
3. Build for production:
   `npm run build`

## Text format

Upload a `.json` file shaped like this:

```json
[
  {
    "sentence": "Foreign text...",
    "translation": "English translation...",
    "wordbyword": [{ "src": "...", "tr": "..." }]
  }
]
```
