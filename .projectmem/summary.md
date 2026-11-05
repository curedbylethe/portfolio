# projectmem - portfolio

_Last updated: 2026-11-03_

## Project purpose
This is a [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) blogging starter template. Version 2 is based on Next App directory with [React Server Component](https://nextjs.org/docs/getting-started/react-essentials#server-components) and uses…

## Recent issues
- [OPEN] #0001 Next production build ends with uncaught TypeError reading null.hash after CSS and TypeScript compile [css/tailwind.css] (open)
  - Partial attempt: Ran npm run build and traced uncaught null.hash after successful Next compilation; npx eslint and git diff checks run separately
- [DONE] #legacy_7a67 Legacy issue: fix(build): allow static export with no posts or tags (fixed)
- [DONE] #legacy_2f79 Legacy issue: post: Minute Cryptic Clue, 2 Nov 2026 (and fix static export of posts) (fixed)

## Decisions
- No decisions logged yet.

## Notes
- Initial commit
- chore: remove template placeholder content
- feat(mdx): add Spoiler component
- feat(spoiler): pixelated cover instead of blur

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
