---
target: homepage
total_score: 33
p0_count: 1
p1_count: 1
p2_count: 1
p3_count: 1
timestamp: 2026-07-03T08-39-58Z
slug: src-pages-index-astro
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Portfolio carousel has no slide position indicator |
| 2 | Match System / Real World | 4 | Standard resume conventions followed cleanly |
| 3 | User Control and Freedom | 3 | No in-page jump nav on a ~7,000px scroll |
| 4 | Consistency and Standards | 4 | Unified Section/SectionHeading system across sections |
| 5 | Error Prevention | 4 | External links use noopener; clipboard has fallback |
| 6 | Recognition Rather Than Recall | 3 | Level-dots have no visible legend |
| 7 | Flexibility and Efficiency | 2 | No jump nav, no PDF/download for recruiters |
| 8 | Aesthetic and Minimalist Design | 3 | Hero stacks 3 decorative layers; portfolio letterboxing |
| 9 | Error Recovery | 4 | Minimal error surface; copy failure handled gracefully |
| 10 | Help and Documentation | 3 | No legend for dot-rating convention |
| **Total** | | **33/40** | **Good — solid foundation, targeted fixes** |

## Anti-Patterns Verdict

**LLM assessment:** Not classic AI slop. Fraunces + DM Sans and amber-on-zinc read as deliberate identity; copy is fact-dense. Two slop-adjacent risks remain: hero stacks grid + glow + WebGL particles (common dev-portfolio flourish), and portfolio copy reads like pasted product marketing rather than first-person builder narration.

**Deterministic scan:** CLI on `src/pages/index.astro` + components returned **0 findings** — the detector is largely blind to split Astro/Tailwind architecture unless `global.css` is included. Supplemental scan on `global.css` found **4 `gray-on-color` warnings** (lines 38, 42, 167) — mostly false positives on pale `bg-amber-50` tints and `::selection` styles. Manual contrast check on rendered page found **0 AA failures** in both themes.

**Visual overlays:** Not available — script injection blocked in this session; live-server started on port 8400 but overlay not injected.

## Overall Impression

The recent polish pass worked: sections now feel like one page, not eight templates. The biggest remaining gap is **portfolio presentation on mobile** — mismatched screenshot aspect ratios make flagship work illegible. Second: the hero still spends its first impression on decoration instead of contact clarity.

## What's Working

1. **Distinctive typographic identity** — Fraunces display + DM Sans on warm amber/near-black avoids generic Inter/purple-gradient portfolio aesthetics.
2. **Portfolio lightbox accessibility** — Escape/arrow keyboard support, focus management, sr-only labels on level dots.
3. **Coherent section system** — `Section` + `SectionHeading` reused across all live sections after polish.

## Priority Issues

**[P0] Portfolio screenshots have mismatched aspect ratios**
- **Why it matters:** Tanssi captures are ~3810×8316 (full-page scroll) vs Moonbeam ~3838×1858; both forced into `aspect-[16/10]` with `object-contain`. On mobile, Tanssi renders as an illegible sliver — undermining "show shipped work" for the primary persona.
- **Fix:** Re-export screenshots to consistent viewport aspect ratios, or handle tall vs wide images with per-slide aspect classes.
- **Suggested command:** `$impeccable adapt src/components/resume/PortfolioSection.astro`

**[P1] Hero stacks three decorative layers**
- **Why it matters:** `.hero-grid` + `.hero-glow` + Three.js particle scene compete with name, headline, and contact icons — contradicts "content leads" and the anti-reference against over-decoration.
- **Fix:** Keep one hero treatment (grid OR glow OR particles); if keeping WebGL, reduce opacity/count so text dominates.
- **Suggested command:** `$impeccable quieter src/components/resume/ProfileHero.astro`

**[P2] Skill/language ratings cluster near-max with no visible legend**
- **Why it matters:** Most skills at 5/5 triggers recruiter skepticism; dot convention only explained in sr-only text.
- **Fix:** Differentiate levels meaningfully, add a one-line visible legend, or replace dots with proficiency labels.
- **Suggested command:** `$impeccable clarify src/components/resume/SkillsSection.astro`

**[P3] No closing CTA or jump navigation**
- **Why it matters:** Page ends on interest chips + copyright with no "let's talk" prompt; ~7,000px scroll with no anchors for time-constrained recruiters.
- **Fix:** Footer contact CTA + lightweight section jump nav or back-to-top.
- **Suggested command:** `$impeccable distill src/pages/index.astro`

## Persona Red Flags

**Jordan (first-timer):** Lands on Skills, sees amber dots with no legend — must guess or use a screen reader to learn the 1–5 scale.

**Casey (mobile):** Tanssi portfolio slide is an illegible sliver on 390px viewport due to portrait source image letterboxed in 16:10 frame.

**Sam (a11y):** Carousel prev/next buttons lack "slide X of 5" live-region announcement; lightbox is well-built but carousel position is opaque.

**Morgan (recruiter, project-specific):** No PDF download, no email CTA after 2+ minutes of reading — high friction to take the next step.

## Minor Observations

- `ProfilesSection.astro` exists but is never imported — likely dead code.
- Language flags (🇬🇧🇩🇪🇷🇺🇱🇻) map countries to languages — imprecise i18n convention.
- Footer "Built with Astro & Tailwind CSS" is a nice builder-voice touch.
- Detector architecture gap: `.astro` split from `global.css` yields false-clean CLI scans.

## Questions to Consider

- If a recruiter has 90 seconds, does the Three.js particle field prove range — or spend the one moment that needs to land (name, headline, contact)?
- If every skill is 5/5, what is the rating system communicating? Would removing dots be more credible?
- The page is optimized for being read — but is it optimized for getting the recruiter to email you?
