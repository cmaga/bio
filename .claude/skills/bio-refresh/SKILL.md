---
name: bio-refresh
description: Interview the user about career developments since the content draft was last updated, then draft and propagate updates to the bio site. Invoke when the user says "let's update the content", "bio refresh", "refresh the site", or types /bio-refresh.
disable-model-invocation: false
---

# Bio Refresh

Conversational workflow for updating the content of this Astro bio site.

## Critical Rules

- Never modify `src/components/*.astro` until the user has approved the updated `content.md` draft.
- Never invent accomplishments. Draft only from what the user says in the interview.
- **Never touch the resume.** `resume/` is strictly out of scope — read-only, for context only. The bio site is a professional front door, not a copy-paste of the resume. Read the resume so you can deliberately *avoid* heavy overlap; the site should summarize and position, not restate.

## Context

- **Content draft:** `.claude/skills/bio-refresh/content.md` — single source of truth for what the site should say. Tracks `last_updated:` at the bottom.
- **Live site:** `src/components/{Hero,About,Highlights,Interests,Mission,Contact,Footer}.astro` — each component holds the content for one section.
- **Resume source (read-only, never edit):** `resume/resume.tex` — read this before drafting so you can avoid overlap. The site is the front door; the resume is the detailed record. They serve different purposes.
- Draft and live components may be out of sync at the start of a run. Reconcile both.

## Section-to-file map

| Section in content.md | Component                         | Where content lives in the file                                |
| --------------------- | --------------------------------- | -------------------------------------------------------------- |
| Hero                  | `src/components/Hero.astro`       | `skills` array, hero-title name block, tagline `<p>`           |
| 01 / ABOUT            | `src/components/About.astro`      | `<h2>` heading, two column `<p>` blocks                        |
| 02 / HIGHLIGHTS       | `src/components/Highlights.astro` | `highlights` array (each item has `id` + `body` or `bodyHtml`) |
| 03 / INTERESTS        | `src/components/Interests.astro`  | `interests` array (`label` + `body`)                           |
| 04 / MISSION          | `src/components/Mission.astro`    | `<h2>` heading + single body `<p>`                             |
| 05 / CONTACT          | `src/components/Contact.astro`    | `channels` array — only update if a channel actually changed   |
| Footer                | `src/components/Footer.astro`     | Year auto-derived from `Date`; copy text otherwise static      |

## Workflow

1. Read `.claude/skills/bio-refresh/content.md`. Note the `last_updated` date at the bottom.
2. Read `resume/resume.tex` for context only — never edit it. The goal is to know what the resume already covers so the site can stay distinct (front door, not duplicate).
3. **Interview.** Open with: "What's happened in your career since `{last_updated}`?" Then dig in conversationally. Goal: surface meaningful career shifts and accomplishments, not incremental noise. Probe for:
   - New roles, promotions, scope changes
   - Notable projects shipped or architectural wins
   - Shifts in technical focus or positioning
   - Recognition, mentorship, leadership moments
   - Changes to interests, mission, or contact channels (ask only if implied)
4. **Draft section-by-section in `content.md`.** Present each changed section to the user inline.
5. **Iterate.** User reviews and edits. Stay in this loop until the user approves the full draft.
6. **Propagate to components.** For each section that changed, edit the corresponding `.astro` file using the section-to-file map above. Match existing formatting conventions (arrays, `bodyHtml` vs `body`, Tailwind classes). Do not restructure components.
7. Update `last_updated:` at the bottom of `content.md` to today's date (ISO `YYYY-MM-DD`).
8. Run `npm run build` to verify nothing broke.
9. Summarize the diff. Do not commit — leave that to the user.

## Verification

- `npm run build` succeeds
- `last_updated` in `content.md` is today's date
- Every section changed in `content.md` has a matching edit in its `.astro` component

## Remember

Never modify `.astro` components until the user has approved the `content.md` draft. Never invent accomplishments.
