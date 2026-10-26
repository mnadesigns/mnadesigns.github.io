# Portfolio

A personal portfolio built with Next.js 16, React 19, Tailwind CSS v4 and Framer Motion, exported as a static site and hosted on GitHub Pages.

All content is placeholder text for now. Replace it in `src/data/site.ts` and `src/data/pages.ts`.

## Develop

```bash
npm install
npm run dev
```

## Check and build

```bash
npm run check   # lint + typecheck + static export to ./out
```

## Deploy

The site is a static export served by GitHub Pages at https://mnadesigns.github.io/. Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `out/`.

Optional free analytics stay off until you add repository variables (Settings > Secrets and variables > Actions > Variables): `NEXT_PUBLIC_GA_ID` (Google Analytics 4, `G-XXXXXXXXXX`) and `NEXT_PUBLIC_CLARITY_ID` (Microsoft Clarity).

## Credits

Scaffolded from [ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template) (MIT, see `LICENSE`).
