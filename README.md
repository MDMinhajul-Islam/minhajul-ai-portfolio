# Md. Minhajul Islam — AI Engineering Portfolio

An interactive portfolio built to present my work across AI engineering, computer vision, machine learning, deep learning, applied research, and software engineering.

**Live website:** [minhajul-ai-portfolio.pages.dev](https://minhajul-ai-portfolio.pages.dev/)

The public portfolio is independently hosted on Cloudflare Pages. The original [OpenAI Sites deployment](https://minhajul-ai-portfolio.alltasksolver.chatgpt.site/) remains available as a backup.

## Why I built it

This portfolio is designed as more than a static CV. It gives recruiters, engineering teams, and collaborators a quick visual understanding of:

- who I am and what I currently do;
- the engineering problems I have worked on;
- how I move from research and experimentation to a usable product;
- the technologies I use across AI and software systems; and
- the direction in which my career is growing.

The experience combines editorial storytelling with live, browser-rendered demonstrations. It does not run real production models in the visitor's browser; instead, the animated scenes communicate the behavior, architecture, and outcomes of the real projects linked from each project card.

## What is inside

### Interactive neural-field hero

The opening scene uses the HTML Canvas API to render a moving three-dimensional neural field. Nodes, connections, perspective, glow, and pointer movement are calculated continuously in the browser. The surrounding expertise label rotates through computer vision, generative AI, AI agents, software systems, and applied research.

### Animated engineering toolkit

The skill matrix begins at zero when it enters the viewport. An `IntersectionObserver` starts a `requestAnimationFrame` loop, keeping each displayed percentage synchronized with the width of its progress bar. The matrix covers programming, AI, data, Git, Docker, and CI/CD experience.

### Evidence-focused project cards

The selected-work section presents eight GitHub projects as short engineering case studies. Each card explains the problem, the system built, the technical evidence, and the core stack. Pointer-responsive perspective transforms add depth without hiding the project information.

Featured work includes:

- PhantomFill — multi-stage person removal and image reconstruction;
- NexDrive AI — an AI-assisted dealership workflow;
- Lightweight Diffusion — efficient image-inpainting research;
- MindCare — a responsible mental-health interview assistant;
- MRI Tumor Classifier — multiclass brain-tumor classification;
- Chat-Wave — real-time browser communication;
- Northstar Voice Agent — a tool-using automotive voice agent; and
- Automatic Toll System — full-stack workflow automation.

### Synthetic live demonstrations

The “Systems in Motion” section rotates through six visual demos:

1. masked-region image reconstruction;
2. an AI dealership search and ranking flow;
3. a voice agent using inventory and scheduling tools;
4. a live Socket.io-style Chat-Wave conversation;
5. four MRI classification outcomes; and
6. a MindCare PHQ-9 screening interaction.

The scenarios change between cycles so repeat visitors see different queries, conversations, vehicles, and classification results.

### Research and career storytelling

The research section visualizes three rotating delivery journeys—vision system, AI agent, and software product—from problem understanding through validation and release. A separate career timeline shows the progression from education to applied research, a completed research internship, and the current AI Engineer Internship at NEXVIX.

### Contact workflow

The contact form submits messages through FormSubmit's AJAX endpoint and includes a direct email fallback. The first production submission may require the portfolio owner to confirm the FormSubmit activation email.

## Technical architecture

| Area | Implementation |
| --- | --- |
| Framework | Vinext with React 19 and TypeScript |
| Rendering | React Server Components-compatible Vite build |
| Styling | Tailwind CSS 4 plus a custom responsive design system |
| Motion | CSS animation, React state, Intersection Observer, and `requestAnimationFrame` |
| 3D visual | Custom Canvas 2D projection and pointer interaction |
| Icons | Lucide React |
| Fonts | Geist, Geist Mono, and Instrument Serif |
| Hosting | Cloudflare Pages static export; original OpenAI Sites deployment retained |
| Contact | FormSubmit AJAX endpoint with `mailto:` fallback |
| Package manager | pnpm |

Most of the product experience lives in:

- `app/page.tsx` — content, data, components, animations, and interactions;
- `app/globals.css` — design tokens, layouts, responsive behavior, and motion;
- `app/layout.tsx` — fonts and site metadata;
- `public/minhajul-professional-v2.png` — the portfolio portrait; and
- `.openai/hosting.json` — the OpenAI Sites project configuration.

## How I built it

1. I translated my CV, GitHub work, research background, and career goals into a recruiter-focused content hierarchy.
2. I chose a dark technical art direction with acid-green highlights, violet depth accents, large editorial typography, and restrained glass-like surfaces.
3. I built the responsive page structure in React and kept the portfolio as one continuous narrative instead of separating the evidence across many routes.
4. I implemented the neural field directly with Canvas so the hero reacts in real time without requiring a 3D engine.
5. I converted project descriptions into concise problem–system–proof case studies linked to their source repositories.
6. I created synthetic product demonstrations to explain how the AI and software projects behave without downloading large models or exposing backend credentials.
7. I added synchronized skill animation, rotating experiment pipelines, the career timeline, and a working contact workflow.
8. I tuned the layout across ultra-wide monitors, laptops, tablets, and mobile screens, including reduced-motion support.
9. I ran a production Vinext build and deployed the validated output through OpenAI Sites.

## Run locally

### Requirements

- Node.js 22.13 or newer
- pnpm

### Setup

```bash
git clone https://github.com/MDMinhajul-Islam/minhajul-ai-portfolio.git
cd minhajul-ai-portfolio
pnpm install
pnpm dev
```

Open the local URL printed by the development server.

## Available commands

```bash
pnpm dev       # Start the local development server
pnpm build     # Create the production build
pnpm start     # Run the built Cloudflare Worker locally
pnpm lint      # Check the source with Oxlint
pnpm format    # Format the project with Oxfmt
```

## Cloudflare Pages deployment

The GitHub repository is connected to Cloudflare Pages. Pushing to `main` automatically builds and publishes the production website.

| Setting | Value |
| --- | --- |
| Project | `minhajul-ai-portfolio` |
| Production branch | `main` |
| Framework preset | None (custom Vinext build) |
| Build command | `pnpm run build` |
| Build output directory | `dist/client` |
| Environment variable | `CLOUDFLARE_PAGES=1` |
| Node version | `NODE_VERSION=22.16.0` |

When `CLOUDFLARE_PAGES=1`, `next.config.ts` enables `output: 'export'` and `vite.config.ts` omits the server-only hosting plugins. Vinext pre-renders the page and copies the JavaScript, CSS, fonts, and portrait into `dist/client`. The browser animations and third-party contact form still work; no Worker or database is needed for the public portfolio.

Without that variable, the original Sites/Worker build is preserved. GitHub changes update Cloudflare Pages automatically, but do not automatically republish the original OpenAI Sites deployment.

To test a Pages export in PowerShell:

```powershell
$env:CLOUDFLARE_PAGES = '1'
pnpm run build
Remove-Item Env:CLOUDFLARE_PAGES
```

## Updating the portfolio

- Edit the `projects` array in `app/page.tsx` to add or update project case studies.
- Edit the `skills` array to change the toolkit and proficiency presentation.
- Edit `career` to extend the career timeline as new roles are added.
- Edit `journeys` or the `ProjectDemo` component to introduce new visual demonstrations.
- Replace the portrait in `public/` and update its reference in `app/page.tsx`.
- Update the profile and contact URLs in the `links` object.

After a change, verify it before publishing:

```bash
pnpm lint
pnpm build
```

## Design and performance decisions

- The animations are code-driven and asset-light, keeping the site fast to load.
- The interactive scenes explain project behavior while the GitHub links provide the implementation evidence.
- Responsive breakpoints adapt the editorial composition instead of merely shrinking the desktop layout.
- `prefers-reduced-motion` is respected for visitors who request less animation.
- No API keys or private credentials are committed to the repository.

## Contact

**Md. Minhajul Islam**  
AI Engineer · Software Builder · Researcher

- [LinkedIn](https://www.linkedin.com/in/md-minhajul-isalm-64785b305/)
- [GitHub](https://github.com/MDMinhajul-Islam)
- [Google Scholar](https://scholar.google.com/citations?user=6482WSIAAAAJ&hl=en)
- [Email](mailto:mdminhajul.islam1823@gmail.com)

## License

The source is publicly available for portfolio review and learning. Personal content, project descriptions, branding, and portrait assets remain the property of Md. Minhajul Islam. Please ask before reusing them in another portfolio or commercial product.
