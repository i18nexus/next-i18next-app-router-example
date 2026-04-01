# next-i18next App Router Example

This repository is a small example project for a tutorial about using `next-i18next` with the Next.js App Router and I18nexus.

Follow the tutorial here:

https://i18nexus.com/tutorials/nextjs/next-i18next-app-router

The i18nexus commands in this repo run with a read-only API key for a demo project so this example works out of the box.

It demonstrates:

- locale-prefixed routing with a hidden default locale
- server-side translations with `next-i18next/server`
- client-side translations for shared UI like the navbar and language switcher
- route-level namespaces for `home`, `about`, `contact`, and `common`
- an I18nexus workflow where translations are managed remotely and pulled into the app
- a production `resourceLoader` setup that imports locale JSON from `app/i18n/locales`

## Stack

- Next.js 16
- React 19
- `next-i18next`
- `react-i18next`
- I18nexus CLI

## Locales

This example uses three languages:

- English (`en`)
- German (`de`)
- Swedish (`sv`)

The default locale is `en`, and it is hidden from the URL.

Examples:

- `/` renders English
- `/de` renders German
- `/sv/contact` renders Swedish contact content

## Translation Flow

This repo is set up so I18nexus is the translation source of truth.

During development:

- `i18nexus listen` runs alongside `next dev`
- local synced files in `public/locales` are useful for development updates

For production-oriented builds:

- `i18nexus pull -p app/i18n/locales` pulls translation files into the bundled import path
- `i18n.config.ts` uses a `resourceLoader` in production to import locale JSON from `app/i18n/locales`

The `public/locales` directory is gitignored in this repo.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
app/
  [lng]/
    page.tsx
    about/page.tsx
    contact/page.tsx
  components/
  i18n/locales/
public/
  locales/
i18n.config.ts
```

## Notes

- `common` is used for shared UI like navigation labels.
- Route content is split into namespace-specific JSON files.
- In production, translations are loaded through dynamic imports instead of filesystem reads from `public/`.

If you are coming from the tutorial, use this repo as a reference implementation rather than a starter template.
