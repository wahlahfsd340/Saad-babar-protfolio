# Saad Babar — Developer Portfolio

A responsive, single-page developer portfolio built with Next.js. It includes animated page sections, project filters, an About section, and a contact form that opens an email draft.

> **Before publishing:** Update the sample project details and other placeholder content with your own information.

## Features

- Responsive layout with dark and light themes; the theme choice is saved in the browser.
- Animated hero section with rotating role titles, counters, and a technology marquee.
- Filterable project cards with interactive motion effects.
- About section with a timeline and skill indicators.
- Contact form that validates the required fields and prepares an email using the visitor's default email app. It does not send messages through a backend.
- Resume download link, scroll progress indicator, and reduced-motion support.

## Built with

- [Next.js](https://nextjs.org/) 14 (App Router)
- [React](https://react.dev/) 18
- [Framer Motion](https://www.framer.com/motion/)
- CSS

## Run locally

You'll need Node.js 18.17 or newer and npm.

```bash
git clone https://github.com/wahlahfsd340/Saad-babar-protfolio.git
cd Saad-babar-protfolio
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The development server reloads when you edit the source files.

## Customize the portfolio

- **Profile, projects, skills, stats, and timeline:** edit [`components/data.js`](components/data.js).
- **About paragraph:** edit the text in [`components/Sections.js`](components/Sections.js).
- **Page title and description:** edit the `metadata` object in [`app/layout.js`](app/layout.js).
- **Resume:** add your PDF as `public/cv.pdf`; the hero's download button points to that path.
- **Project and social links:** replace the example URLs in `components/data.js` with your own.

## Production build

```bash
npm run build
npm start
```

The production server runs at [http://localhost:3000](http://localhost:3000).

## Deploy to Netlify

1. Push this repository to GitHub and import it in Netlify using **Add new site → Import an existing project**.
2. Keep the repository root as the base directory.
3. Use `npm run build` as the build command. Let Netlify detect the Next.js publish settings.
4. Deploy the site.

No environment variables are required by the current project.
