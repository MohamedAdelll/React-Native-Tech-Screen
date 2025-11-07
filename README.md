<div align="center">

# React Native Tech Screen — To‑Do App

An Expo Router React Native app (iOS, Android, Web) showcasing a simple, polished to‑do list with detail view, completion state, sorting, and clean theming.

  </div>

## 🚀 Quick Start

Clone the repo and install dependencies:

```bash
git clone https://github.com/MohamedAdelll/React-Native-Tech-Screen.git
cd React-Native-Tech-Screen
npm install
```

Start the development server:

```bash
npm run start
```

Then choose a target from the terminal or Expo Dev Tools:

- Press i to open in the iOS simulator
- Press a to open in the Android emulator
- Press w to open in the web browser

You can also run directly:

```bash
npm run ios
npm run android
npm run web
```

## ✨ Features

- Create to‑dos (title + description)
- Toggle completion; completed items show a completion timestamp
- Detail screen per to‑do with full description and actions
- Sorted list: unchecked items first (newest at top), then checked
- Delete with confirmation (platform‑appropriate dialogs)
- Subtle animation: when a completed item becomes incomplete, it fades and smoothly reorders upward

## � Project Structure

- `app/` — File‑based routing via Expo Router
  - `index.tsx` — Home list
  - `modal.tsx` — Add new to‑do
  - `todo/[id].tsx` — To‑do detail
- `components/` — Themed primitives and to‑do UI
- `contexts/todo-context.tsx` — In‑memory state and actions
- `hooks/use-form.ts` — Lightweight custom form state hook used in the modal
- `types/`, `utils/` — Shared types and helpers

## 🔎 Notes on Libraries & Forms

- This project uses the dependencies provided by the Expo Router template; no extra third‑party libraries were added beyond the template defaults.
- For the “Add To‑Do” form, a tiny custom hook (`hooks/use-form.ts`) manages form state instead of bringing in a well‑known form library. For a small demo like this, the bespoke hook keeps things lean and easy to follow.

## 🔧 Scripts

- `npm run start` — Start dev server
- `npm run ios` — Launch iOS simulator
- `npm run android` — Launch Android emulator
- `npm run web` — Launch web
- `npm run reset-project` — Reset to a clean starter (keeps an example) - won't be used
- `npm run lint` — Run linter
