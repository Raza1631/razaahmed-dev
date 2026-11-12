# Raza Ahmed — Developer Portfolio

Production-ready portfolio for Raza Ahmed, a Laravel Backend Developer based in Karachi, Pakistan.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide React · Geist font · ESLint

## Setup

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

## Project structure

```
src/
  app/
    layout.tsx        Root layout, Geist fonts, metadata, theme bootstrap
    page.tsx          Homepage assembled from the portfolio sections
    sitemap.ts        Search engine sitemap
    robots.ts         Crawler access rules
    globals.css       Theme tokens, base styles, buttons, container
  components/
    layout/
      Navbar.tsx      Sticky nav, active-section highlight, mobile menu
      Footer.tsx      Footer with nav, socials, and live year
      MotionProvider.tsx  Applies the reduced-motion preference to all Framer Motion animations
      ScrollProgress.tsx  Scroll progress bar
      BackToTop.tsx   Floating back-to-top button
      CurrentYear.tsx Client-side current year
    contact/
      ContactForm.tsx Validated contact form; requires a configured endpoint to send
    sections/
      Hero.tsx        Two-column hero with floating tech badges
      About.tsx       About section: intro text and four highlight cards
      Skills.tsx      Categorized skill cards with hover spotlight
      Experience.tsx  Vertical experience timeline
      Projects.tsx    Featured projects section (resolves screenshots on the server)
      Services.tsx    Eight service cards, each linking to #contact
      Process.tsx     Four-step development approach
      Contact.tsx     Contact details and form
    projects/
      ProjectsGrid.tsx   Grid and modal state
      ProjectCard.tsx    Project card
      ProjectModal.tsx   Accessible details modal (Escape, focus trap, scroll lock)
      ProjectVisual.tsx  Real screenshot, or a labelled representative visual
      ProfilePhoto.tsx  Optimized photo with an initials fallback
    icons/
      BrandIcons.tsx  GitHub and LinkedIn icons (Lucide no longer ships brand icons)
    ui/
      Button.tsx      primary | secondary | ghost, sm | md | lg; renders a link when given href
      Container.tsx   Responsive page container
      Section.tsx     Shared section wrapper (anchor id, divider, spacing, optional decoration)
      SectionHeading.tsx  Eyebrow + heading with a gradient accent phrase
      Reveal.tsx      Scroll-triggered fade-and-lift wrapper (respects reduced motion)
      TextReveal.tsx  Masked word-by-word heading reveal
      ThemeToggle.tsx Dark/light switch (saved in localStorage)
  data/
    profile.ts        Name, title, location, social links, asset paths
    navigation.ts     Nav links
    about.ts          About copy and highlight cards
    skills.ts         Skill categories and items
    experience.ts     Roles, dates, and responsibilities
    projects.ts       Project titles, descriptions, features, technologies
    services.ts       Services, process steps, and CTA targets
    contact.ts        Contact config (from env), section copy
  lib/
    utils.ts          cn() class helper
    pointer.ts        Hover-spotlight pointer tracking
    validation.ts     Contact form validation rules
public/
  images/             Site images (profile photo: RazaAhmed.webp)
  projects/           Project screenshots
```

## Design system

All colors are CSS variables in `src/app/globals.css`, exposed to Tailwind as utilities
(`bg-background`, `bg-surface`, `bg-card`, `text-muted`, `border-border`, `bg-primary`, `text-secondary`, ...).

| Token      | Dark      | Light     |
| ---------- | --------- | --------- |
| background | `#09090B` | `#FAFAFA` |
| surface    | `#111116` | `#F4F4F5` |
| card       | `#18181F` | `#FFFFFF` |
| primary    | `#6366F1` | `#4F46E5` |
| secondary  | `#06B6D4` | `#0891B2` |
| foreground | `#FAFAFA` | `#09090B` |
| muted      | `#A1A1AA` | `#52525B` |
| border     | `#27272A` | `#E4E4E7` |

Reusable classes: `.container-page`, `.section-spacing`, `.card`, `.gradient-text`, `.bg-glow`, and `.btn` with `.btn-primary|secondary|ghost` and `.btn-sm|md|lg`.

### Themes

Dark is the default. The theme is set by `data-theme="dark" | "light"` on `<html>`.
A small inline script in `layout.tsx` restores the saved choice before first paint, and `ThemeToggle` switches it.

## Your photo and CV

- **Photo:** save your picture as `public/images/RazaAhmed.webp`. Until it exists, the hero uses a typographic initials treatment rather than a broken image. The image is cropped to a 4:5 frame and optimized with `next/image`.
- **CV:** save your resume as `public/resume.pdf`. Resume buttons appear only when the file exists.
- Links to GitHub and LinkedIn live in `src/data/profile.ts`.

## Editing sections

Copy for the About section lives in `src/data/about.ts`; change the text or add a card there without touching the component.
New sections should use `Section`, `SectionHeading` and `Reveal` so spacing and motion stay consistent.

Skills are defined in `src/data/skills.ts`. Add or remove an item in a category's `skills` array and the card updates. Set `layout: "tiles"` on a category to show icons per item, or `"chips"` for compact tags.

Roles are defined in `src/data/experience.ts`, newest first. Each role has editable `startDate` and `endDate` text fields.
Leave dates empty until they are confirmed; no guessed dates or placeholder date copy is shown.
You can also add a `summary`, `responsibilities` list, or `platforms` to any role; they only render when present.

### Services and process

Edit `src/data/services.ts` to change service cards, process steps, or the CTA label and target (`#contact` by default).

### Contact form

The form validates in the browser (required fields, email format, minimum message length) and then POSTs JSON to a configurable endpoint:

```json
{ "name": "...", "email": "...", "projectType": "...", "message": "..." }
```

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production site origin used for canonical, Open Graph, sitemap, robots, and Person structured data. Replace the example domain before deployment. |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | URL that accepts the POST (for example a Formspree endpoint, or your own Laravel route) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional real email shown in the Contact section and used for the fallback |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional real number for the WhatsApp link, in international format |

Restart the dev server (or rebuild) after changing them.

- **Without an endpoint,** the form does not pretend to send. After validation it explains that it is not connected and points to GitHub and LinkedIn, or to the configured email address if one is set.
- **With an endpoint,** it shows a loading state, then a success or error message. Any 2xx response counts as success. If you point it at your own server, allow cross-origin POSTs from your site and add spam protection (rate limiting or a captcha) there.
- Email and WhatsApp details are omitted until real values are configured.

### Projects

Projects live in `src/data/projects.ts`.

- **Screenshots:** save a real screenshot at the path in each project's `screenshot` field (for example `public/projects/law-management-system.jpg`). It replaces the representative visual automatically. Projects without a file show a labelled "Representative visual".
- **Links:** `liveUrl` and `repoUrl` are empty on purpose. Add only real, public links; buttons appear in the details modal when they are set.
- Only share screenshots and details you are allowed to make public.

## Motion

Animations use Framer Motion and a few CSS keyframes, and are kept deliberately light:

- **Reduced motion:** `MotionProvider` turns off movement and scaling for visitors who prefer reduced motion, and the CSS effects below are also switched off.
- **Larger screens only:** the floating tech badges and the slow background drift in the hero are CSS animations that run only at 768px and wider, so phones stay light.
- **No scroll re-renders:** the scroll progress bar updates a motion value, and the back-to-top button re-renders only when it appears or disappears.
- **Hover effects** (button lift, icon nudges) apply only on devices with a real pointer.
- **Theme switch:** colours fade for about 0.3s when toggling, unless reduced motion is requested.

Motion CSS lives at the end of `src/app/globals.css`. Delete a class there (for example `.drift-a`) to remove that effect.

## Notes

- This Next.js version enables `cacheComponents`. Avoid reading `new Date()` or `Math.random()` during render in prerendered components; move them into effects or wrap them in `<Suspense>`.
- Fonts come from the `geist` package (self-hosted), so builds don't need network access to Google Fonts. To use Inter instead, swap the font in `layout.tsx` with `next/font/google`.
- Portfolio identity and public profile details are configured in `src/data/profile.ts`; section content is organized under `src/data/`. Only add experience, dates, project links, screenshots, and other claims that are accurate and approved for publication.

## SEO and production checklist

- The root layout provides the SEO title, description, keyword targets, canonical URL, Open Graph and Twitter metadata, and Person JSON-LD.
- `src/app/sitemap.ts` and `src/app/robots.ts` generate the sitemap and crawler rules.
- Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin in `.env.local` and in the Vercel project's environment variables. The checked-in example URL is intentionally non-routable and must be replaced before launch.
- Add the real profile image to `public/images/RazaAhmed.webp`, an optional resume to `public/resume.pdf`, and only genuine project screenshots or links. Missing optional files do not create dead links.
- Configure a working contact endpoint (and any real contact details) before advertising the contact form as a way to send messages.

## Vercel deployment

1. Push the project to a Git provider and import it into Vercel.
2. Set `NEXT_PUBLIC_SITE_URL` to the production origin (for example, your own verified domain).
3. Configure `NEXT_PUBLIC_CONTACT_ENDPOINT` and, if desired, `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_WHATSAPP_NUMBER`. Do not enter example values.
4. Add any real public assets before deployment. Review all profile, experience, and project content for accuracy.
5. Use the default Next.js settings: install command `npm ci`, build command `npm run build`, and output directory left unset.
6. Deploy, then verify the homepage, contact endpoint, canonical metadata, `/sitemap.xml`, and `/robots.txt` on the production URL.

Vercel provides the deployment and HTTPS certificate. No server-only secrets are needed by the site itself; values prefixed with `NEXT_PUBLIC_` are embedded in client bundles and must never contain secrets.
