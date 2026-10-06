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

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the static export and publishes it to GitHub Pages.

## Credits

Scaffolded from [ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template) (MIT, see `LICENSE`).
