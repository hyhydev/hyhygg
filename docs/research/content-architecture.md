# Content architecture — recommendation

> Wayfinder ticket [#5](https://github.com/hyhydev/hyhygg/issues/5). A **recommendation**, confirmed or overturned during spec assembly ([#7](https://github.com/hyhydev/hyhygg/issues/7)).
> Next.js facts below are read from `node_modules/next/dist/docs/` at the installed version (16.2.10), not from memory. Items marked **⚠ verify** are the ones I could not confirm without building.

## Recommendation in one line

**A typed registry, not a content pipeline.** Structured content (case studies, experience, skills) lives in typed TypeScript modules; long-form prose (blog posts) lives in MDX bodies whose *metadata stays outside the MDX file*, in a TS registry that also holds the import. No Zod, no frontmatter parser, no `fs`, no content-collection library.

The reasoning is one idea applied consistently: **runtime validation exists to guard a runtime boundary, and this site has no runtime boundary.** Every byte of content is authored in-repo and resolved by the bundler at build time. A Zod schema over YAML frontmatter takes a value the compiler could have checked for free, launders it through a parser into `unknown`, and then buys the safety back with a dependency and a build step. That is a net loss when the source file is already inside `tsc`'s reach.

---

## The three collections and where each lands

| Collection | Storage | Why |
| --- | --- | --- |
| **Case studies** (Dizzy.gg, LLB Dojo) | Typed `.tsx` data modules | Both pages share one fixed section order and one renderer ([outlines](../spec/case-study-outlines.md)). Structure that must not drift is exactly what a type is for. `.tsx` rather than `.ts` so prose fields can hold `ReactNode` for inline emphasis and links. |
| **Experience · skills · CV data** | Typed `.ts` data modules | Pure records. Also where cross-collection referential integrity pays off (below). |
| **Blog posts** | `.mdx` bodies + typed registry entry | Arbitrary per-post shape — headings, code blocks, images. Authoring these as JSX would be miserable and is the one place MDX clearly earns its config. |

The line falls where authoring cost crosses over. Case-study prose is ~50 short paragraphs written once; paying JSX-escaping tax there is fine. A blog post is continuous prose written repeatedly; paying it there is not.

---

## Why metadata leaves the MDX file

This is the load-bearing detail, and it is the opposite of the usual frontmatter habit.

**`@next/mdx` does not support frontmatter.** Verbatim from `01-app/02-guides/mdx.md`:

> Frontmatter is a YAML like key/value pairing that can be used to store data about a page. `@next/mdx` does **not** support frontmatter by default, though there are many solutions for adding frontmatter to your MDX content, such as: remark-frontmatter, remark-mdx-frontmatter, gray-matter.

So frontmatter is never free — it is always a plugin plus a validator plus a loader. The docs' own suggested alternative is an ES export inside the MDX (`export const metadata = { … }`), which is better but still not type-checked: `@types/mdx` declares `*.mdx` as an ambient wildcard module exporting only a default component, so a named `meta` export is not visible to `tsc`. You can *declare* it in a `.d.ts`, but that is an assertion the compiler trusts rather than a fact it verifies — a typo'd or missing `meta` still compiles.

Keeping metadata in a `.ts` registry gets the property both alternatives lack: it is genuinely checked, not asserted.

```ts
// content/posts.ts
import type { MDXComponent } from '@/lib/mdx'
import type { SkillId } from './skills'

export interface Post {
  slug: string
  title: string
  description: string
  publishedAt: `${number}-${number}-${number}`
  draft?: boolean
  tags: readonly SkillId[]
  /** Static-literal import so Turbopack resolves it without globbing a directory. */
  body: () => Promise<{ default: MDXComponent }>
}

export const posts = [
  {
    slug: 'why-games-are-rows',
    title: 'Games are database rows, not enum values',
    description: '…',
    publishedAt: '2026-08-14',
    tags: ['typescript', 'postgres'],
    body: () => import('./posts/why-games-are-rows.mdx'),
  },
] as const satisfies readonly Post[]

export type PostSlug = (typeof posts)[number]['slug']
```

`as const satisfies` is doing real work: `satisfies` structurally checks every entry, while `as const` preserves `slug` as a **literal union**. That union flows into `generateStaticParams` and route params, so a link to a post that does not exist is a compile error rather than a 404.

**Ergonomic cost, stated plainly:** adding a post is two edits (write the `.mdx`, add the registry entry) instead of one. That is the price of compile-time checking, and at this cadence it is small. A `bun run content:check` script that fails when `content/posts/*.mdx` and the registry disagree would close the gap if it ever bites — cheap to add later, not worth it on day one.

---

## Why not `fs` + globby

The Next docs suggest reading the content directory with `fs` or `globby` to build an index. Rejected for three reasons, in ascending order of weight:

1. It reintroduces the runtime boundary this design exists to avoid — directory entries are `string`, so you are back to parsing and validating.
2. It is fragile under Turbopack, which is now the default bundler for both `next dev` and `next build` in v16. Files read through `fs` are outside the module graph, so nothing invalidates on change.
3. **It is the exact pattern that becomes an error under Cache Components.** From `migrating-to-cache-components.md`: with `cacheComponents` enabled, "Next.js surfaces uncached dynamic data as errors in development." A request-time `fs.readdir` is uncached dynamic data. Choosing static imports now means the door to Cache Components stays open at zero cost.

Static-literal dynamic imports (`() => import('./posts/x.mdx')`) also beat the docs' template-literal form (``import(`@/content/${slug}.mdx`)``): the bundler resolves an exact module rather than globbing a directory, and the return type is precise.

---

## Schema sketch

### Case study

Modelled directly on the settled eight-section shape in the [outlines](../spec/case-study-outlines.md).

```tsx
// content/case-studies/types.ts
import type { ReactNode } from 'react'
import type { SkillId } from '../skills'

export interface Highlight {
  heading: string
  body: ReactNode
}

export interface Stat {
  value: string           // '5,590'
  label: string           // 'players ranked'
  /** Qualifier that must ship with the number — e.g. the indexed-vs-run-live split. */
  note?: string
}

export type ProofItem =
  | { kind: 'stat'; stat: Stat }
  | { kind: 'note'; body: ReactNode }

export interface Screen {
  src: string
  alt: string
  caption?: string
  /** Non-obvious surfaces carry the evidential weight while both repos are private. */
  emphasis?: boolean
}

export interface CaseStudy {
  slug: string
  name: string
  oneLiner: ReactNode
  live: { href: string; label: string }
  since: string                                  // 'April 2026' — ⟨open, ticket #3⟩
  /** Drives the landing-page contrast line; the whole portfolio story hangs on it. */
  scope: 'multi-game' | 'single-game'
  problem: readonly ReactNode[]                  // paragraphs
  role: ReactNode
  /** 3–5, enforced by the tuple union — the ceiling from the outlines, as a type. */
  highlights:
    | readonly [Highlight, Highlight, Highlight]
    | readonly [Highlight, Highlight, Highlight, Highlight]
    | readonly [Highlight, Highlight, Highlight, Highlight, Highlight]
  stack: readonly SkillId[]
  /** The visual anchor — large type, near the top. Exactly three. */
  anchorStats: readonly [Stat, Stat, Stat]
  proof: readonly ProofItem[]
  screens: readonly Screen[]
  card: { blurb: string }
}
```

Two notes on the shape:

- The `highlights` tuple union is the answer to "isn't Zod stricter?" — it is not. A cardinality rule Zod would check at runtime is checked here as you type.
- `anchorStats` is separate from `proof` because the outlines call for the three usage numbers to be a distinct visual element, not the first three list items. Keeping that distinction in the type stops it from being a styling accident. The unresolved `796 tournaments` split fits either as one `Stat` with a `note` or as two `Stat`s — the schema does not force the answer, so it can land whenever ticket #3's open fact does.

### Skills — the referential-integrity payoff

```ts
// content/skills.ts
export const SKILLS = {
  typescript: { label: 'TypeScript', group: 'language' },
  postgres:   { label: 'PostgreSQL', group: 'data' },
  prisma:     { label: 'Prisma',     group: 'data' },
  // …
} as const

export type SkillId = keyof typeof SKILLS
export type SkillGroup = (typeof SKILLS)[SkillId]['group']
```

This is the single strongest argument for typed TS over frontmatter, and it is worth stating explicitly because it is easy to miss: `stack` and `tags` are `SkillId[]`, so a typo is a red squiggle in the editor, and "which projects used Prisma?" is a type-safe derivation rather than a string match. Frontmatter-plus-Zod can reach the same guarantee only with a hand-written refinement, and only at build time.

### Experience

```ts
// content/experience.ts
import type { ReactNode } from 'react'
import type { SkillId } from './skills'

export interface ExperienceEntry {
  role: string
  org: string
  orgHref?: string
  start: `${number}-${number}`          // 'YYYY-MM'
  end: `${number}-${number}` | 'present'
  summary: ReactNode
  points: readonly ReactNode[]
  tags: readonly SkillId[]
}
```

---

## What to install and configure

```bash
bun add @next/mdx @mdx-js/loader @mdx-js/react
bun add -d @types/mdx
```

`@next/mdx` tracks the Next.js version line — `16.2.12` is current on npm against `next@16.2.10`. Nothing else is needed: **no `zod`, no `gray-matter`, no remark-frontmatter.** (`zod@4.4.3` is already in `node_modules` as a dev-only transitive of `eslint-plugin-react-hooks`; it is not a direct dependency and should not become one for content.)

```ts
// next.config.ts
import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  typedRoutes: true,
}

const withMDX = createMDX({
  options: {
    // Turbopack requires plugins as strings with serializable options.
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['rehype-slug'],
  },
})

export default withMDX(nextConfig)
```

Four version-specific traps, all confirmed in the installed docs:

1. **`mdx-components.tsx` at the project root is required** — `@next/mdx` "will not work without it" under App Router.
2. **`useMDXComponents()` takes no arguments** in this version. The widely-known `useMDXComponents(components)` signature that merges an incoming map is wrong here and will not typecheck against `mdx/types`. The correct form is:
   ```tsx
   // mdx-components.tsx
   import type { MDXComponents } from 'mdx/types'
   const components: MDXComponents = {}
   export function useMDXComponents(): MDXComponents { return components }
   ```
3. **Turbopack is the default bundler in v16** for `next dev` *and* `next build`. remark/rehype plugins must therefore be named as **strings** with serializable options — "plugins without serializable options cannot be used yet with Turbopack, because JavaScript functions can't be passed to Rust." Any plugin needing a function option forces `next build --webpack`, which is a real cost and a reason to keep the plugin list short.
4. **Enable `typedRoutes`** (stable in 16, no longer `experimental.typedRoutes`). Combined with the literal `PostSlug` union it makes every internal `<Link href>` compile-checked, which is a large share of "the whole site stays strictly type-safe" for very little config.

⚠ **verify at implementation:** whether `pageExtensions` must include `md`/`mdx` when MDX is only ever *imported* and never file-routed. The docs present the two together, but the loader — not `pageExtensions` — is what enables imports. Harmless to include; worth a one-minute check since we deliberately do not use MDX file-routing.

Also worth wiring while touching config: `next typegen` generates the `PageProps<'/blog/[slug]'>` helper (types are generated during `next dev` / `next build` too), giving typed `await params` on the dynamic post route.

---

## Rendering, and RSC compatibility

Both halves are Server-Component-native. Typed data modules trivially so; MDX likewise — "The Next.js plugin handles transforming markdown and React components into HTML, including support for usage in Server Components (the default in App Router)." Neither needs `'use client'`.

The one boundary to watch: if a post body embeds an interactive component, that component needs its own `'use client'`. This lands on the same seam the [react-bits survey](./reactbits-survey.md) flagged — only 7 of 139 components ship the directive themselves, so anything adopted into MDX likely needs wrapping.

```tsx
// app/blog/[slug]/page.tsx  — sketch
import { posts } from '@/content/posts'

export function generateStaticParams() {
  return posts.filter((p) => !p.draft).map((p) => ({ slug: p.slug }))
}

export const dynamicParams = false

export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()
  const { default: Body } = await post.body()
  return <Body />
}
```

Note `await props.params` — synchronous access to `params` was **fully removed** in v16, not merely deprecated.

---

## Cache Components: leave it off for v1

`cacheComponents` is opt-in (it is not set in the current `next.config.ts`) and should stay off. Under this architecture there is no request-time data at all — every page resolves from compile-time imports and prerenders statically without it. Enabling it would add a rendering model to reason about plus a new rule to obey (`generateStaticParams` returning `[]` now errors), in exchange for nothing.

The reason it is worth mentioning rather than ignoring: the `fs`-based content loader rejected above is precisely what would make Cache Components painful later. Choosing static imports keeps that option free.

---

## Options considered and rejected

**MDX with Zod-validated frontmatter.** The default reflex, and wrong here. Costs a remark plugin, a schema, a validator, and a runtime dependency; buys back only the type safety that keeping metadata in `.ts` never gave up. It earns its place when content comes from a CMS or from authors outside the repo — neither is true.

**Metadata as an `export const` inside the MDX.** The Next docs' own suggestion, and a genuine improvement on frontmatter. Still rejected: `@types/mdx` types `*.mdx` as a wildcard module exporting only a default, so named exports are invisible to `tsc`. Declaring them in a `.d.ts` gives an assertion, not a check — which fails the ticket's actual requirement.

**Content-collection libraries** (Velite, content-collections; Contentlayer's maintenance status would need checking before it could even be considered). All solve a problem this site does not have — dozens-to-hundreds of files needing generated indexes and cached parsing. At two case studies and a handful of posts, a codegen step plus a dependency that must keep pace with Next 16 and Turbopack is pure coupling risk. Revisit only if the blog passes ~30 posts.

**Everything in MDX, including case studies.** Rejected because the two case-study pages share a fixed section order by design, and the whole portfolio argument rests on the Dizzy.gg/Dojo contrast reading cleanly across both. Free-form bodies let the pages drift; a shared type makes drift a compile error and lets one renderer serve both.

**Everything as typed data, including blog posts.** Rejected on authoring cost alone. Continuous prose in JSX is unpleasant enough that it would quietly suppress writing, which defeats the point of having a blog.

---

## Open questions this leaves for spec assembly

- **Prose fields as `ReactNode` vs `string`.** `ReactNode` allows inline emphasis and links, which the outlines clearly need, but it means case-study content is `.tsx`. The alternative — `string` plus a tiny inline-markdown renderer — keeps content in `.ts` at the cost of a renderer. Recommending `ReactNode` for its zero-machinery simplicity; worth one look during spec assembly.
- **Whether case studies want a `body` MDX escape hatch** for a long narrative section. The current outlines do not need one. Adding it later is non-breaking (optional field), so it should not be added pre-emptively.
- **Where screenshots and OG images live** and how they are typed — depends on the visual direction and on the still-unspecified case-study visual assets.
- **CV download**: whether the PDF is generated from the same typed experience data or maintained separately. Generating it is attractive precisely because the data is already typed, but it is a build-pipeline decision, not a content-storage one.
