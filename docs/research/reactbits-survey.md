# react-bits — library survey (2026-07-31)

Primary sources only: the [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) repo at `main` (tree via GitHub API, files via `raw.githubusercontent.com`), the machine-readable [reactbits.dev/llms.txt](https://www.reactbits.dev/llms.txt), and this repo's shipped Next.js docs under `node_modules/next/dist/docs/`. The live site is a Vite SPA, so its HTML is a shell — its content is the repo's `src/`, which is what was read. Package sizes are from the bundlephobia API and are labelled as such.

## What it is

An open-source collection of animated React components, MIT + Commons Clause, maintained by David Haz. Not an npm package — a **registry of copy-paste source files**. Official ports exist for Vue (vue-bits.dev) and Svelte (sveltebits.xyz) ([README.md](https://github.com/DavidHDev/react-bits/blob/main/README.md)).

Also ships three browser tools (Background Studio, Shape Magic, Texture Lab) and an MCP server config — the MCP path is just shadcn's: `npx shadcn@latest mcp init --client <client>` with `"@react-bits": "https://reactbits.dev/r/{name}.json"` in `components.json` ([src/docs/McpServer.jsx](https://github.com/DavidHDev/react-bits/blob/main/src/docs/McpServer.jsx)).

## 1. Component inventory & categories

Four top-level categories, confirmed identically by the sidebar nav ([src/constants/Categories.js](https://github.com/DavidHDev/react-bits/blob/main/src/constants/Categories.js)), the metadata map ([src/constants/Information.js](https://github.com/DavidHDev/react-bits/blob/main/src/constants/Information.js)), and the directory tree. **139 components**, each in 4 variants → 556 registry entries in `public/r/`. (README markets "140+"; the tree says 139 as of this read.)

| Category | Count | Notable |
|---|---|---|
| Backgrounds | 45 | Aurora, Silk, Threads, Particles, Beams, Prism, Iridescence, LiquidChrome, LiquidEther, Galaxy, Hyperspeed, FaultyTerminal, LetterGlitch, DotGrid, Waves, Balatro, Dither, Plasma, PixelBlast, Grainient, DarkVeil, Lightning, Orb, RippleGrid, GridMotion |
| Components | 40 | MagicBento, SpotlightCard, TiltedCard, ChromaGrid, CardSwap, ScrollStack, Dock, PillNav, CardNav, StaggeredMenu, BubbleMenu, GooeyNav, Masonry, Carousel, ProfileCard, GlassSurface, FluidGlass, DomeGallery, CircularGallery, InfiniteMenu, Lanyard, Stepper, AnimatedList, Folder, ModelViewer |
| Animations | 31 | AnimatedContent, FadeContent, TargetCursor, ClickSpark, BlobCursor, SplashCursor, PixelTrail, ImageTrail, GradualBlur, LogoLoop, ElectricBorder, StarBorder, GlareHover, Magnet, MagnetLines, Noise, PixelTransition, LaserFlow, Ribbons, StickerPeel |
| Text Animations | 23 | SplitText, BlurText, ScrollReveal, ScrollFloat, ScrollVelocity, ShinyText, GradientText, DecryptedText, TextType, RotatingText, CountUp, Shuffle, TrueFocus, VariableProximity, TextPressure, FuzzyText, GlitchText, ASCIIText, CircularText, CurvedLoop, FallingText, ScrambledText, TextCursor |

Docs URLs are kebab-case (`/text-animations/split-text`); CLI ids are PascalCase (`SplitText`) — per [llms.txt](https://www.reactbits.dev/llms.txt).

## 2. Consumption model

Copy-paste. There is no `react-bits` package to install; `package.json` is `"private": true` and is the docs site's own manifest.

**Variant matrix** — every one of the 139 components exists in all four, and the four trees each contain all 139 dirs (verified by counting the tree):

| Variant code | jsrepo path | Repo dir |
|---|---|---|
| `JS-CSS` | `default` | `src/content/<Category>/<Name>/` (`.jsx` + `.css`) |
| `JS-TW` | `tailwind` | `src/tailwind/<Category>/<Name>/` (`.jsx`) |
| `TS-CSS` | `ts/default` | `src/ts-default/<Category>/<Name>/` (`.tsx` + `.css`) |
| `TS-TW` | `ts/tailwind` | `src/ts-tailwind/<Category>/<Name>/` (`.tsx`) |

Source: [jsrepo.config.ts](https://github.com/DavidHDev/react-bits/blob/main/jsrepo.config.ts) and [src/docs/Installation.jsx](https://github.com/DavidHDev/react-bits/blob/main/src/docs/Installation.jsx).

**CLI** — the registry is built by **jsrepo** (`jsrepo build`, devDep `jsrepo@^3.2.0`) but emitted in **shadcn registry-item format** via `@jsrepo/shadcn` into `public/r/`. Each JSON carries `"$schema": "https://ui.shadcn.com/schema/registry-item.json"`. So both CLIs work against the same URLs:

```
npx shadcn@latest add https://reactbits.dev/r/<Component>-<LANG>-<STYLE>
npx jsrepo@latest add https://reactbits.dev/r/<Component>-<LANG>-<STYLE>
```

`<LANG>` = `JS|TS`, `<STYLE>` = `CSS|TW`. Any package manager prefix works (`bunx`, `pnpm dlx`).

**What you end up with**: one `.tsx` (plus a sibling `.css` on CSS variants) dropped into your source tree, plus the component's npm deps installed by the CLI. `excludeDeps: ['react']` in jsrepo.config, so React is never re-installed. `Lanyard` is the one exception — `dependencyResolution: 'manual'`, so its registry JSON lists **zero** dependencies while the file actually imports `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, `meshline`, `three`, plus local `card.glb` and `lanyard.png` assets you must supply yourself.

The files are yours after copy — no upstream update path. Several components ship **hardcoded demo data in the source** you're expected to edit (e.g. `MagicBento` defines a `cardData` array of Analytics/Insights placeholder cards at module scope).

## 3. Dependency footprint

Extracted from all 139 `public/r/<Name>-TS-TW.json` `dependencies` arrays — this is the authoritative mapping, since the CLI installs exactly that list.

**Family split (139 total, primary dep):** zero deps 33 · ogl 31 · gsap 28 · three-family 22 · motion 20 · other 5.

Frequency across all components: `ogl` 31, `gsap` 29, `three` 22, `motion` 20, `@react-three/fiber` 7, `@react-three/drei` 4, `postprocessing` 4, `react-icons` 2, `@gsap/react` 2, and one each of `@react-three/postprocessing`, `@use-gesture/react`, `matter-js`, `maath`, `face-api.js`, `gl-matrix`, `react-router-dom`, `lucide-react`, `lenis`.

| Component | Runtime deps (pinned range) |
|---|---|
| SplitText, Shuffle | `gsap@^3.13.0` + `@gsap/react@^2.1.2` (also `gsap/ScrollTrigger`, `gsap/SplitText`) |
| ScrollReveal, ScrollFloat, TextType, ScrambledText | `gsap` |
| AnimatedContent, FadeContent, MagicBento, ChromaGrid, CardSwap, Masonry, DotGrid, TargetCursor, StaggeredMenu, BubbleMenu, FlowingMenu, GridMotion, ImageTrail, BlobCursor, Crosshair | `gsap` |
| BlurText, ShinyText, GradientText, DecryptedText, RotatingText, CountUp, TrueFocus, VariableProximity, ScrollVelocity, TextCursor, TiltedCard, Dock, Stack, Stepper, ElasticSlider, AnimatedList, Counter, CircularText, OrbitImages | `motion@^12.23.12` |
| Aurora, Silk*, Threads, Particles, Prism, PrismaticBurst, Iridescence, LiquidChrome, Galaxy, Balatro, DarkVeil, FaultyTerminal, Orb, RippleGrid, Ribbons, MetaBalls, LightRays, Plasma, PlasmaWave, Grainient, GradientBlinds, EvilEye, Ferrofluid, SideRays, SoftAurora, Strands, Radar, LineWaves, Lightfall, CircularGallery, FlyingPosters, SpecularButton | `ogl@^1.0.11` (*Silk is `three` + `@react-three/fiber`) |
| ASCIIText, LiquidEther, LaserFlow, GridDistortion, ShapeBlur, FloatingLines, ColorBends, LightPillar, MagicRings, PixelSnow, GhostCursor | `three@^0.180.0` |
| Beams, FluidGlass, ModelViewer, PixelTrail | `three` + `@react-three/fiber` + `@react-three/drei` (+ `maath` for FluidGlass) |
| Dither | `three` + `@react-three/fiber` + `@react-three/postprocessing` + `postprocessing` |
| Hyperspeed, PixelBlast | `three` + `postprocessing` |
| GridScan | `three` + `postprocessing` + **`face-api.js`** (webcam face detection) |
| Ballpit | `three` + `gsap` |
| FallingText | `matter-js@^0.20.0` |
| ScrollStack | `lenis@^1.3.13` |
| InfiniteMenu | `gl-matrix@^3.4.3` |
| DomeGallery | `@use-gesture/react@^10.2.27` |
| CardNav, Carousel | `+ react-icons@^5.5.0` |
| PillNav | `gsap` **+ `react-router-dom@^6.30.1`** ← incompatible assumption for Next.js |
| ReflectiveCard | `lucide-react@^0.542.0` |
| Zero deps (33) | BorderGlow, ClickSpark, CursorGrid, CurvedInput, CurvedLoop, DotField, ElectricBorder, Folder, FuzzyText, GlareHover, GlassIcons, GlassSurface, GlitchText, GooeyNav, GradualBlur, LetterGlitch, Lightning, LineSidebar, LogoLoop, Magnet, MagnetLines, MetallicPaint, Noise, OptionWheel, PixelCard, ProfileCard, ShapeGrid, SplashCursor, SpotlightCard, StarBorder, TextPressure, Waves, (Lanyard — mislabelled, see above) |

**Sizes** — bundlephobia API, whole-package min / min+gzip, at the latest published version (which drifts slightly from react-bits' pins). Tree-shaking will cut `three`/`drei` substantially in practice; these are ceilings, not what you ship.

| Package | min | min+gzip |
|---|---|---|
| `lenis` 1.3.25 | 18 KB | **5 KB** |
| `gl-matrix` 3.4.4 | 53 KB | 13 KB |
| `matter-js` 0.20.0 | 81 KB | 25 KB |
| `gsap` 3.15.0 | 69 KB | **27 KB** |
| `ogl` 1.0.11 | 128 KB | **33 KB** |
| `motion` 12.43.0 | 132 KB | **44 KB** |
| `@react-three/fiber` 9.6.1 | 156 KB | 50 KB |
| `postprocessing` 6.39.4 | 318 KB | 110 KB |
| `three` 0.185.1 | 709 KB | **178 KB** |
| `@react-three/drei` 10.7.7 | 1567 KB | **485 KB** |

Takeaway: `gsap` and `ogl` are the cheap engines; `motion` is mid; anything pulling `three` costs ~178 KB gz floor and anything pulling `drei` is a different category of decision entirely.

## 4. Integration with this stack

Installed here: `next@16.2.10`, `react@19.2.4`, `tailwindcss@^4` via `@tailwindcss/postcss`, `typescript@^5` ([package.json](/package.json)). Local [tsconfig.json](/tsconfig.json) is `"strict": true`, `"skipLibCheck": true`, `moduleResolution: "bundler"`, `target: "ES2017"` — the Next.js default, i.e. strict but without `noUncheckedIndexedAccess` or `exactOptionalPropertyTypes`.

### Client components

**Effectively every react-bits component must be a Client Component.** They all use hooks/refs/browser APIs; the boundary rule is in [`node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-client.md`](/node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-client.md) — the directive goes at the top of the file, before imports, and marks the entry point.

Only **7 of 139** files ship the directive already: `DotGrid`, `BlobCursor`, `SplashCursor`, `Dock`, `MetallicPaint`, `Lanyard`, `TextType`. **You must add `'use client'` yourself to the other 132.**

Corollary from the same doc: props crossing the boundary must be serializable. Several react-bits components take function props (`onComplete`, custom easing functions, `ease?: string | ((t: number) => number)` on `SplitText`) — so the parent that supplies those must itself be a client component, or the prop must be omitted.

### SSR / hydration hazards

Counts over `src/ts-tailwind/` (139 files):

- 91 files touch `window.`, 38 touch `document.`, 78 call `requestAnimationFrame`, 20 create a canvas context.
- Nearly all of that is inside `useEffect`/`useLayoutEffect`, which is safe. **Two files evaluate browser globals at module scope**, guarded:
  - `ASCIIText.tsx:51` — `const PX_RATIO = typeof window !== 'undefined' ? window.devicePixelRatio : 1;`
  - `ModelViewer.tsx:36` — `const isTouch = typeof window !== 'undefined' && (...)`

  Guarded, so they won't crash SSR, but they compute a **server value that differs from the client** — a latent hydration-mismatch/wrong-DPI source if used in render output.
- 8 files branch on `window.innerWidth` inside handlers/effects (`Ballpit`, `FlowingMenu`, `BubbleMenu`, `TargetCursor`, `FluidGlass`, `GradualBlur`) — responsive behaviour is JS-measured, not CSS media queries, so the server always renders the "unknown viewport" branch. Expect a first-paint flash on breakpoint-dependent ones.
- 10 files use `useLayoutEffect` (incl. `ScrollStack`), which React warns about during server rendering.
- **`PillNav` imports `react-router-dom`.** Unusable as-shipped in the App Router; you'd rewrite its `<Link>` usage against `next/link`. Same class of problem, smaller, for `CardNav`/`Carousel` pulling `react-icons` when you likely already have an icon set.
- WebGL/canvas components render nothing meaningful on the server. For the heavy ones, `next/dynamic` with `ssr: false` is the escape hatch — but per [`01-app/02-guides/lazy-loading.md:94`](/node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md) *"`ssr: false` is not supported in Server Components. You will see an error if you try to use it."* So the `dynamic(..., { ssr: false })` call itself has to live inside a client component.

### Tailwind v4

react-bits' own site is already on Tailwind v4 (`tailwindcss@^4.0.3`, `@tailwindcss/vite`), and the `-TW` variants are plain utility classes plus inline `style` objects — no `@apply`, no plugin dependencies. That mostly transfers cleanly to this repo's `@tailwindcss/postcss` setup (which matches the recipe in [`01-app/01-getting-started/11-css.md`](/node_modules/next/dist/docs/01-app/01-getting-started/11-css.md); note Next 16.2 also ships a separate legacy [`tailwind-v3-css.md`](/node_modules/next/dist/docs/01-app/02-guides/tailwind-v3-css.md) guide, confirming v4 is the default path).

Concrete v4 frictions found:

- **Two components ship v3 `tailwind.config.js` snippets as trailing comments** and depend on custom `animation:`/`keyframes:` theme keys: `StarBorder` (`animate-star-movement-top`/`-bottom`) and `GlitchText` (`animate-glitch-before`/`-after`). Under v4's CSS-first model these must be rewritten as `@theme { --animate-star-movement-top: ... }` plus `@keyframes` in your global CSS. Without that, the classes silently produce nothing.
- Three components inject a `<style>` tag with raw `@keyframes` directly in JSX (`GooeyNav` ×3, `ProfileCard`) — these work under v4 unchanged, but they're unscoped global CSS in a component.
- Legacy-utility usage is minor: 10 × `outline-none`, 3 × `flex-shrink-0`, 3 × `flex-grow` across the whole TS-TW tree. All still resolve in v4 (deprecated-but-supported aliases); worth normalising to `outline-hidden`/`shrink-0`/`grow` on copy.
- No `bg-opacity-*` / `text-opacity-*` / `overflow-ellipsis` usage — the genuinely removed v3 utilities are absent.

### Strict TS

react-bits' own [tsconfig.json](https://github.com/DavidHDev/react-bits/blob/main/tsconfig.json) is `"strict": true`, so the TS variants do typecheck under strict — but with escape hatches you inherit:

- 24 of 139 files contain `: any` or `as any`; 15 use non-null assertions (`!.`).
- 2 explicit `@ts-ignore` (`MagnetLines.tsx:75`, `PixelCard.tsx:240`).
- `Lanyard` needs ambient declarations that live in the repo's [`src/global.d.ts`](https://github.com/DavidHDev/react-bits/blob/main/src/global.d.ts) — `declare module '*.glb'`, `declare module 'meshline'`, and a `JSX.IntrinsicElements` augmentation — **none of which the registry ships**. Copying `Lanyard` alone will not compile.
- `skipLibCheck: true` both upstream and locally; `three`/`drei` typings are heavy, so expect friction if you ever turn that off.
- `noUncheckedIndexedAccess` is set neither upstream nor here. If you enable it, expect breakage in the array-heavy canvas/particle components.
- Upstream targets `ESNext` with `moduleResolution: "node"`; this repo is `ES2017` / `"bundler"`. No component-level issue found, but downlevelling to ES2017 will transpile the heavy `for...of`/generator loops in the shader files.

## 5. Licensing

[LICENSE.md](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md) — **MIT + Commons Clause License Condition v1.0**, © 2026 David Haz.

- Grants use, copy, modify, merge, publish, distribute **"as part of an application, website, or product"**.
- Commons Clause restriction: *"You may use this Software, including for any commercial purpose, so long as you do not sell, sublicense, or redistribute the components themselves—whether alone, in a bundle, or as a ported version."*
- **"The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software."** — this is retained from MIT and is the one active obligation. Copying component sources into a portfolio is "copies of the Software"; strictly read, the notice should travel with them. Pragmatic compliance: keep the license text in `LICENSE-THIRD-PARTY` or a header comment on copied files.

Using them on a portfolio site is squarely permitted. Publishing a "my component library" derived from them is not.

- **No per-component attribution requirement exists in the repo.** The README has an informal *Credit* note: *"React Bits occasionally draws inspiration from publicly available code examples… If you recognize your work, open an issue to request credit."* That is a request directed at original authors, not an obligation on consumers. There are no per-component `NOTICE`/attribution files in the tree and no attribution field in the registry metadata.
- One transitive-license flag: `GridScan` pulls `face-api.js` (and uses a webcam). Not investigated further; avoid.

## 6. Bundle weight & runtime performance

Total TS-TW source is ~47,000 lines across 139 files. Size varies wildly: `SpotlightCard` is 70 lines, `SplashCursor` is 1,317 and `Hyperspeed` 1,315.

**Cheap — CSS/transform only, no per-frame loop** (verified: zero `requestAnimationFrame`, zero canvas): `SpotlightCard` (70 L), `GlassIcons` (71), `StarBorder` (75), `Magnet` (85), `GlitchText` (89), `MagnetLines` (100), `GlareHover` (108), `Folder` (175), `GradualBlur` (296), `GlassSurface` (379). These are LCP-safe.

**Moderate — JS animation, no GPU context**: the `gsap` and `motion` text/card components (`SplitText`, `BlurText`, `ScrollReveal`, `TiltedCard`, `Dock`, `CardSwap`, `ChromaGrid`). Cost is one shared engine (27–44 KB gz) amortised across however many you use — using ten gsap components costs barely more than using one.

**Expensive — persistent per-frame canvas**: 78 of 139 files run a `requestAnimationFrame` loop. 20 create a canvas context. A full-viewport WebGL background (`Aurora`, `Silk`, `Threads`, `Particles`, `LiquidEther`, `Hyperspeed`, `PixelBlast`) runs a fragment shader over every pixel, every frame, **for the entire time the page is open** — none of them pause on `visibilitychange` or when scrolled out of view (no `IntersectionObserver` gating found in the shader backgrounds).

**LCP/INP flags for a portfolio landing page:**

1. `three`-based backgrounds (~178 KB gz floor, 485 KB for `drei`) block LCP if they're in the hero and not dynamically imported. **Prefer `ogl`-based (33 KB gz) for any full-bleed hero background** — `Aurora`, `Threads`, `Particles`, `Iridescence`, `Prism` all give you a shader hero at a fifth the JS.
2. Cursor components (`TargetCursor`, `BlobCursor`, `SplashCursor`, `CursorGrid`, `GhostCursor`, `PixelTrail`) attach global `mousemove` handlers driving per-frame work — direct INP risk, and they hard-break on touch. `TargetCursor` at least self-disables below 768px (`TargetCursor.tsx:67`).
3. `SplashCursor` (1,317 lines, a full fluid simulation) and `Hyperspeed`/`LiquidEther` are the worst offenders. Do not put them above the fold.
4. `ScrollStack` installs Lenis — global smooth-scroll hijacking. Cheap in bytes (5 KB gz), expensive in feel and in accessibility; it overrides native scrolling site-wide.
5. `SplitText` and `ScrollReveal` split text into per-character spans, which reflows the element after hydration — a CLS source if applied to the H1 that *is* your LCP element.
6. `GridScan` requests camera access. Never ship this.

## 7. Reduced motion & accessibility

Honest answer: **almost nothing is handled for you.**

**`prefers-reduced-motion` — 4 of 139 components** (grep over the whole TS-TW tree): `Plasma`, `LogoLoop`, `PixelCard`, `Shuffle`. `LogoLoop` does it correctly in JS (`LogoLoop.tsx:136-139`, `window.matchMedia('(prefers-reduced-motion: reduce)').matches`); the CSS variant additionally has a media query in `LogoLoop.css`. **The other 135 — including every shader background, every cursor effect, every scroll animation — ignore the user's motion preference entirely.** Eight files call `matchMedia` at all, and half of those are for viewport width, not motion.

**ARIA — 23 of 139 files** contain any `aria-*` attribute; 11 use `role=`. Concentrated in the `Components` category (menus, galleries, `Dock`, `Carousel`, `ProfileCard`, `PillNav`, `StaggeredMenu`) where it's most obviously needed. Backgrounds and Animations are essentially unannotated — `PixelBlast` is the only Background with any ARIA at all. Decorative canvases are not marked `aria-hidden` by default.

**Keyboard/focus — 9 of 139 files** handle `onKeyDown`/`keydown`, 9 use `tabIndex`: `CardNav`, `Dock`, `DomeGallery`, `Folder`, `GooeyNav`, `AnimatedList`, `CurvedInput`, `OptionWheel`, `CircularGallery`. Every other interactive component is mouse/pointer-only. The nav components (`PillNav`, `BubbleMenu`, `StaggeredMenu`) are built on `<a>`/`<button>` so they inherit native focus, but their open/close state is not keyboard-driven.

**What you'd have to add yourself**, per component you adopt:
- A `useReducedMotion` hook wrapping every animated component, and a static fallback for each shader background.
- `aria-hidden="true"` + `pointer-events: none` on every decorative canvas.
- For `SplitText`/`ScrollReveal`/`DecryptedText`: the split spans destroy the accessible text node — needs the original string in an `aria-label` or a visually-hidden sibling, or screen readers read it character by character.
- Focus-visible styling on the card/tilt components, which suppress default outlines.
- Escape/arrow-key handling on the nav components.

---

## Candidate ingredient bundles

Five contrasting directions. Each names concrete components; dep footprints are the union of the registry `dependencies` of the listed components.

### A. "Instrument Panel" — precise, technical, monochrome

*Vibe: a well-built dev tool. Grid, measurement, restraint. Motion is functional, never decorative.*

| Slot | Component |
|---|---|
| Hero background | `DotGrid` (gsap, canvas — reacts to pointer) or `LetterGlitch` (zero-dep 2D canvas) |
| Heading treatment | `SplitText` for the H1, `DecryptedText` for section labels |
| Card/list | `SpotlightCard` (70 lines, pure CSS) + `AnimatedList` |
| Cursor/interaction | `TargetCursor` (crosshair reticle that snaps to targets) |
| Transitions | `AnimatedContent` + `FadeContent` scroll-in wrappers |
| Accent | `CountUp` for metrics, `LogoLoop` for a stack marquee |

**Deps:** `gsap` + `@gsap/react` + `motion` — **~71 KB gz total, no WebGL, no three.**
**Risk:** the most *common* react-bits look; a hiring manager who browses dev portfolios may have seen `SplitText` + `DotGrid` five times this month. Differentiation has to come from typography and copy, not the components.

### B. "Deep Field" — cinematic shader hero, quiet everywhere else

*Vibe: one enormous, beautiful, slow-moving background and then absolute silence. High confidence, low noise.*

| Slot | Component |
|---|---|
| Hero background | `Aurora` **or** `Silk` **or** `Threads` (pick one, full-bleed, ~100vh) |
| Heading treatment | `BlurText` (motion) — soft resolve matching the background's softness |
| Card/list | `GlassSurface` (zero-dep, SVG filter) or plain cards + `GradualBlur` at section edges |
| Cursor/interaction | none — the background *is* the interaction |
| Transitions | `AnimatedContent` |
| Case-study pages | `Grainient` or `SoftAurora` as a muted variant of the hero shader |

**Deps:** `ogl` + `motion` + `gsap` — **~104 KB gz** if you stick to `Aurora`/`Threads`. Swapping in `Silk` instead pulls `three` + `@react-three/fiber` and takes it to ~272 KB gz.
**Risk:** a fullscreen fragment shader is your LCP element. Needs dynamic import with a static gradient poster fallback, an `IntersectionObserver` pause, and a `prefers-reduced-motion` off-switch you write yourself. Also very "AI-startup landing page" in 2026 — the exact shader choice carries a lot of dated-ness risk.

### C. "Cabinet" — physical objects, spatial navigation

*Vibe: work as artifacts you can pick up. Depth, tilt, weight. Reads as design-literate rather than shader-flashy.*

| Slot | Component |
|---|---|
| Hero background | `Iridescence` (ogl, subtle) or none — let the objects carry it |
| Heading treatment | `ScrollFloat` / `ScrollReveal` (gsap ScrollTrigger, word-by-word) |
| Card/list | `CardSwap` for the project stack, `TiltedCard` for individual case-study cards, `ChromaGrid` for a skills/tech grid |
| Cursor/interaction | `ClickSpark` (zero-dep, 161 lines) + `Magnet` on CTAs |
| Nav | `Dock` (motion) or `BubbleMenu` (gsap) |
| Transitions | `PixelTransition` between case-study sections |

**Deps:** `gsap` + `motion` + `ogl` — **~104 KB gz.** No `three`.
**Risk:** highest component *count* of any bundle, so the highest surface area for the a11y work you'd have to add (tilt/hover components have zero keyboard story). `CardSwap` also hides content behind an animation — bad for an employer skimming for "what did he build".

### D. "Terminal" — retro-CRT, unapologetically nerdy

*Vibe: green-on-black, scanlines, decrypting text. A strong personality bet.*

| Slot | Component |
|---|---|
| Hero background | `FaultyTerminal` (ogl) — CRT flicker/scanline shader |
| Heading treatment | `ASCIIText` for the name, `TextType` for a typed tagline, `DecryptedText` on hover |
| Card/list | `PixelCard` (zero-dep, and one of the four that respects reduced motion) + `Folder` |
| Cursor/interaction | `CursorGrid` (zero-dep 2D canvas) |
| Accent | `GlitchText`, `ShapeGrid`, `Noise` overlay |
| Transitions | `PixelTransition` (gsap) |

**Deps:** `ogl` + `three` (`ASCIIText` needs it) + `gsap` — **~238 KB gz.** Drop `ASCIIText` and it falls to ~60 KB gz with no `three` at all; strongly recommended.
**Risk:** polarising, and reads "junior/hobbyist" to some senior-hiring audiences — the opposite of the intended signal. Also the highest reduced-motion liability (flicker, glitch, scanlines are literally the effects motion-sensitive users are protected from). `GlitchText` additionally needs the v3→v4 `@theme` keyframe rewrite.

### E. "Paper" — near-static, typography-first, one flourish

*Vibe: an essay that happens to be a portfolio. Content-forward. The restraint is the statement.*

| Slot | Component |
|---|---|
| Hero background | `Waves` (zero-dep 2D canvas, low-amplitude) — or literally nothing |
| Heading treatment | `ShinyText` on the name only; everything else is plain CSS type |
| Card/list | `SpotlightCard` (pure CSS) and `Masonry` for a work grid |
| Cursor/interaction | `GlareHover` (zero-dep, no rAF) on links |
| Transitions | `FadeContent` (gsap) — a single opacity/translate on scroll |
| Accent | `GradualBlur` for scroll edge-fade, `LogoLoop` for the stack strip |

**Deps:** `motion` (`ShinyText`) + `gsap` (`FadeContent`, `Masonry`) — **~71 KB gz**, and swapping `ShinyText` for hand-written CSS drops it to `gsap` alone at 27 KB gz. Lightest bundle by a wide margin; near-perfect Core Web Vitals available.
**Risk:** doesn't demonstrate front-end range. If the hiring signal you want is "can build rich interactive UI", this bundle actively argues the opposite — the case-study pages would have to carry that load with real product screenshots and interaction demos instead.

---

**Cross-cutting note for whichever wins:** `gsap`, `motion`, and `ogl` are each ~27–44 KB gz and amortise across every component using them — so the real cost decision is *how many engines*, not how many components. Bundles A, C, and E each land at one or two engines. Anything pulling `three` (B-with-Silk, D-with-ASCIIText, or any `drei` component) is a 3–7× step up in JS and should be a deliberate choice, not a side effect of liking one background.
