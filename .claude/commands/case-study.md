Build or upgrade the case study at /work/$ARGUMENTS/ from work-source/$ARGUMENTS/. Audience: hiring managers and design leads who skim first. The page must feel designed, not like stacked screenshots.

Read first (memory): reference-case-study-inspirations and feedback-case-study-style. Match the SRED.io entry in src/data/workDetails.ts; reuse components in src/components/organisms (WorkFlow, WorkViews, WorkCarousel, WorkCopy, WorkFilmBox). Add a component only when no existing one can show the view.

1. Inventory work-source/$ARGUMENTS/ with contact sheets, not by opening every image. Flag low-res files, mouse arrows baked into screens (run `node scripts/remove-cursors.mjs $ARGUMENTS`, check the result by eye) and customer names to blur.
2. Plan the page as a sequence of different views, never the same view twice in a row: slides film, opening statement (WorkIntro), About, interactive flows (WorkFlow) for 2 to 4 real flows, a sitemap of where the screens sit (WorkSitemap), carousels for overviews, design-to-code loop (WorkLoop) when relevant. Every carousel and flow gets a heading and a one-line subtext.
3. Screens: add the flows to a PLANS entry in scripts/case-study-images.mjs and run it. Zoom in a flow never exceeds 1.4x so retina stays sharp.
4. Copy: short, concrete, first person, only facts the user gave or the screens show. No invented quotes, dates, metrics or charts. No "Initial Thoughts" quote or parallel three-card lists. Unproven claims go in a code comment as NEEDS PROOF, not on the page.
5. Verify: copy-only edits need `npx tsc --noEmit`. Anything visual needs tsc, one `npm run build`, and one look at each new view at desktop width.
6. Report once, briefly: what changed, what was checked, what wasn't. Do not commit or push until the user says "push", then commit src only.
