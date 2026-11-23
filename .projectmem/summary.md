# projectmem - portfolio

_Last updated: 2026-11-23_

## Project purpose
This is a [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) blogging starter template. Version 2 is based on Next App directory with [React Server Component](https://nextjs.org/docs/getting-started/react-essentials#server-components) and uses…

## Recent issues
- [OPEN] #0011 Televim crate map text and step numbers look smaller than specimen [app/projects/televim/page.tsx] (open)
  - Failed attempt: Raised map badges to 12px and aligned surrounding typography; user still sees step numbers smaller than specimen. [css/tailwind.css]
  - Partial attempt: Increased trace list and map step numerals to 16px after user reported 12px still appeared too small. [css/tailwind.css]
  - Partial attempt: Matched step counters to 12px and map badges to 11px per dossier.css; prior 16px change exceeded reference. Needs browser visual confirmation. [css/tailwind.css]
- [OPEN] #0010 Progress bars lack the design specimen's mini cell marks [css/tailwind.css] (open)
- [DONE] #0026 Production type check rejects .hash on Testing Library's HTMLElement in the Soorin contents test. [components/__tests__/projects.test.tsx:40] (fixed)
- [DONE] #0025 Projects reference headings with adjacent br text produce concatenated accessible region names in the new catalogue test. [app/projects/page.tsx] (fixed)
- [DONE] #0024 Catlog’s dossier buries its benchmark conditions and radio recovery behind tabs and decisions. The co-listening latency range lacks the names of the two measured queries. [app/projects/catlog/page.tsx] (fixed)
- [DONE] #0023 Televim evidence sidebar shows "memory.md ↗" as plain text, not a link [app/projects/televim/page.tsx:835] (fixed)
- [DONE] #0022 Basalam page reports hydration mismatch and CSP blocks Google Fonts stylesheet. [app/projects/basalam] (fixed)
- [DONE] #0021 Case study test fails TypeScript build: closest returns Element without hidden property. [components/__tests__/CaseStudy.test.tsx] (fixed)
- [DONE] #0020 Basalam dossier paraphrases reference and omits interactive event-to-frame paths. [app/projects/basalam/page.tsx] (fixed)
- [DONE] #0019 CI build fails because js-yaml 4 removes safeLoad used by Contentlayer [yarn.lock] (fixed)
- [DONE] #0018 minimatch 11 resolution breaks FlatCompat default import in @eslint/eslintrc [yarn.lock] (fixed)
- [DONE] #0017 Recursive audit found vulnerable transitive dependencies missed by non-recursive Yarn audit [yarn.lock] (fixed)
- ...and 16 older fixed issues not shown (`pjm search`, or `get_issue(issue_id)` via MCP)

## Decisions
- Add Televim as a local project dossier at /projects/televim, linked from the existing project catalog. [app/projects/televim/page.tsx]
- Build evidence gauges as reusable Progress component driven by criterion data; keep section copy and measurement context in the dossier. [components/Progress.tsx]
- Build featured challenge cards as reusable CaseStudy component with data-driven stations and caller-supplied station content. [components/CaseStudy.tsx]
- Render dossier decision records with one reusable native-details component; keep each record's evidence content in the project page. [components/DecisionRecord.tsx]
- Refactor: refactor(projects): rewrite Basalam dossier copy for recruiters [app/projects/basalam/BasalamArchitecture.tsx]
- Embed Televim's live WASM demo by iframing the GitHub Pages shell (curedbylethe.github.io/televim/) after a click, per televim docs/web-demo-embed.md; the iframe uses fixed heights per breakpoint because a cross-origin frame cannot report its height. [app/projects/televim/TelevimDemo.tsx]
- Televim dossier restructured into seven short sections (What it does, Why I built it, architecture, RTL case study, six decision records, evidence, open work) without Act banners, matching Basalam's recruiter format. Archive, outbox and read receipts added as decision records; voice and... [app/projects/televim/page.tsx]
- Televim crate map pans sideways on phones (760px min-width canvas in a scroll wrapper) instead of shrinking to fit; case studies take an optional outcome line above tabs. Branch worktree-televim-dossier-review. [app/projects/televim/TelevimArchitecture.tsx]
- Catlog leads the project catalogue. Its dossier uses seeded local captures and cites private Gitea PR numbers for benchmarks and engineering decisions. [app/projects/catlog/page.tsx]
- The Catlog dossier keeps the verified radio mechanisms in a static illustrated narrative, uses the portfolio’s grouped contents, and links early results to public on-page methods for private benchmarks. [app/projects/catlog/RadioCaseStudy.tsx]
- Use an always-visible timeline for the Catlog radio case study. The late join, drift rules and tested recovery must read without JavaScript and in print. [app/projects/catlog/RadioCaseStudy.tsx]
- Use the supplied Projects and Soorin reference bodies in the existing portfolio shell. Preserve Catlog, Televim and Basalam content and use the shared grouped contents styles on Soorin. [app/projects/page.tsx]
- Soorin dossier and its projects-index card carry no figures; metrics live only on the résumé (recruiters), the portfolio targets engineers. Dossier now covers scripting runtime (WASM ruled out by regulator policy), options workspace, customer edition, fund platform, mobile app. [app/projects/soorin/page.tsx]
- Soorin dossier restructured per editorial audit: arc strip (contribute / take over / start), runtime CaseStudy with matrix, decision records per product, no figures, no mentorship or Scrumban claims, regulator not named, customer edition without deal terms. [app/projects/soorin/page.tsx]

## Notes
- Merge: fix(projects): keep Televim case study inside small viewports
- Added Basalam and Signal dossier using existing project components, with links to original sources and Salam adoption. [app/projects/basalam/page.tsx]
- Shared CaseStudy presents one station at a time in keyboard-accessible tabs on both Televim and Basalam. [components/CaseStudy.tsx]
- Basalam event-to-frame diagram uses the shared FlowBoard with keypress, resize and redraw traces from the dossier. [data/projects/basalam/architecture.ts]
- New feature: feat(projects): link the Televim and Basalam dossiers in the footer [app/projects/basalam/Dossier.tsx]
- gotcha: Televim GitHub Pages was set to legacy "deploy from branch", which raced pages.yml and served the Jekyll README over the WASM shell. Pages source must stay "GitHub Actions" (build_type=workflow) or the dossier demo iframe breaks. [next.config.js:16]
- New feature: feat(projects): embed the Televim live demo and v0.17.0 benchmarks [app/projects/televim/TelevimDemo.tsx]
- gotcha: in a worktree, symlinked node_modules breaks Turbopack dev (use `next dev --webpack`); cp/rm are interactive-aliased (use `command cp -f`, `command rm -f`); the Bash tool filter rejects any command containing the string ".github".
- Merge: fix(projects): act on Televim dossier review feedback
- gotcha: a symlink to main's node_modules caused TS2883 in the Catlog worktree's Next production build. A worktree-local APFS copy passed the same build and RSS postbuild. [eslint.config.mjs:16]

## Key files
- `.devcontainer/devcontainer.json`
- `.env.example`
- `.gitattributes`
- `.github/FUNDING.yml`
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`
- `.github/workflows/pages.yml`
- `.gitignore`
- `.husky/.gitignore`
- `.husky/pre-commit`
- `.vscode/settings.json`
- `.yarn/releases/yarn-3.6.1.cjs`
- `.yarnrc.yml`
- `LICENSE`
- `README.md`
- `app/Main.tsx`
- `app/about/page.tsx`
- `app/api/newsletter/route.ts`
- `app/blog/[...slug]/page.tsx`
- `app/blog/page.tsx`

## Open questions
- None logged yet.
