# Leo Goldstein portfolio

A Next.js, React, and TypeScript portfolio with selected project case studies.

## Local development (Windows PowerShell)

Use Node.js 22.14 or later for the included TypeScript tests.

```powershell
npm.cmd ci
git submodule update --init --recursive
npm.cmd run dev
```

Open http://localhost:3000. Changes refresh automatically. `npm.cmd` avoids PowerShell execution-policy restrictions on `npm.ps1`.

Development output is stored in `.next-dev`; production builds and `npm.cmd run start` use `.next`. This keeps production build checks from replacing the files used by a running development server.

## Checks

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npm.cmd run start
```

Lint and type errors are checked during production builds. The focused tests cover upload validation, file signatures, bounded output, request limits, access codes, body size limits, and text encoding.

## Content

- `app/lib/profile.ts`: social links, email, and the resume request URL.
- `app/lib/projects.ts`: project summaries, roles, technologies, sources, and demo links.
- `public/projects/`: project screenshots. Add dice-game media in `public/projects/untitleddicegame/`.
- `content/projects/untitleddicegame/README.md`: intake template for screenshot captions and project details.
- The dice-game case study shows six recent GitHub commits with an hourly server refresh. No GitHub token is required. A dated snapshot in `content/projects/untitleddicegame/commits.ts` is shown if the API is unavailable.
- `public/social-preview.svg` and `.png`: editable social sharing artwork and its raster version.
- `app/globals.css`: shared colors, typography, cards, and responsive layout.

Resume links currently open an email request. Once the final PDF is supplied, add it to `public/resume.pdf`, change `profile.resume` to `/resume.pdf`, and update the link labels. Graduation dates, coursework, and certification claims await verified details. The old certifications URL redirects to About.

The simulator and text adventure are Git submodules. Changes inside them need their own commits before the parent repository can record new submodule revisions. Use `.editorconfig` and save source files as UTF-8.

## Experimental image-to-enemy preview

The endpoint is disabled unless `AI_DEMO_ENABLED=true` and `OPENAI_API_KEY` is configured server-side. Production additionally requires `AI_DEMO_ACCESS_TOKEN`; visitors enter that code in the preview form. Use `.env.example` as the configuration reference, and keep credentials in `.env.local` or the hosting provider's server-side environment settings. Never use a `NEXT_PUBLIC_` prefix for these values.

`GET /api/ai` only reports availability and makes no paid request. POST requests validate PNG/JPEG/WebP declarations and file signatures, allow up to 4 MB, and bound the multipart body even without a Content-Length header. The SDK has no retries, a default 15-second timeout (maximum 20 seconds), a 1,000-token output limit, and schema-constrained output checked again on the server. Errors and logs exclude provider error messages, image content, access codes, and credentials. Images are sent to OpenAI only on submission; the app does not save them.

The preview allows three requests per minute per process bucket, one active conversion per process, and twenty conversion attempts per process per 24-hour window. These limits reset on restart and are not shared between server instances. Keep the preview access-controlled; use a shared persistent limiter and deployment-level spending controls before considering unrestricted public access. Turning `AI_DEMO_ENABLED` off disables conversions immediately after the server adopts the updated environment.

No paid OpenAI calls are required by the tests or build. A full successful model conversion still needs a supervised manual test with the preview enabled.
