# noor-fatima · portfolio

Static site: plain HTML, CSS and JS with no build step and no dependencies.

```
index.html   page markup and content (experience, research, about)
styles.css   design tokens + layout (palette shared with the GitHub README)
main.js      project data, project modal, neural-field canvas, animations
og.png       1200×630 social preview
vercel.json  clean URLs + caching headers
```

## Deploy on Vercel

1. Push this folder to a GitHub repo (e.g. `nooorf/portfolio`).
2. Go to vercel.com/new and import the repo.
3. Set Framework Preset to **Other**, leave Build Command empty, and set Output Directory to `./`. Then deploy.
4. After the first deploy, change `og:image` in `index.html` to the absolute URL
   (e.g. `https://your-domain.vercel.app/og.png`) so LinkedIn/Slack previews work.

## Editing

- Projects: edit the `PROJECTS` array at the top of `main.js`.
- Tech marquee: edit `STACK_A` / `STACK_B` in `main.js`.
- Typing line in the hero: edit `TYPED` in `main.js`.
