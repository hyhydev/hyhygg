# Experience, skills, and contact — collected content

> Wayfinder ticket [#6](https://github.com/hyhydev/hyhygg/issues/6). The **decisions** below are settled with Harry.
> The **prose and one-liners are drafts to argue with**, not decided wording — same convention as [the case-study outlines](./case-study-outlines.md).
> Slots marked ⟨HARRY⟩ are facts still needed. Points marked **↯** are editorial calls worth arguing with.

Source: `E:/CV/Harry Hartley CV 2024.pdf` (text extracted 2026-08-01), plus Calvium details supplied directly. The CV predates Calvium, Dizzy.gg, and LLB Dojo.

---

## Settled

1. **Five roles**, reverse-chronological — Calvium, AND Digital, Scott Logic, Rocketmakers, BMT. Altran (2015–16) folds into education as part of the Bath degree.
2. **Teaching leaves the timeline and moves into prose.** It earns its place as *evidence for* the lead / speaking / soft-skills claims, not as a chapter of the career.
3. **Client names go in.** No NDAs and no confidentiality constraints. Harry runs his own pre-publish check.
4. **Skills are derived, not authored.** A skill appears on the site only if a case study or a role references it — enforced by the `SkillId` union from [#5](https://github.com/hyhydev/hyhygg/issues/5).
5. **The site and the CV are separate documents**, separately maintained. The CV keeps everything the site deliberately drops.
6. **Contact is `harry@hyhy.gg` plus GitHub**, written as a sentence rather than an icon row.
7. **Standing shopfront.** No availability signal anywhere. "Lead Engineer" is the title; Bath/Bristol stated plainly; freelance gets one low line.

---

## Hero and about

### Hero — draft

> **Harry Hartley**
> Lead engineer, Bath/Bristol. I build and run production systems end to end.

**↯** No availability line, no "open to roles", no remote/hybrid posture — all three are answers to a question the site isn't asking. The identity line does the filtering work instead: a recruiter learns level and location in seven words, and nothing on the page expires.

**↯ "end to end" is doing deliberate work.** It's the one claim the rest of the page can actually prove — two products conceived, architected, built, shipped, and operated by one person — and it's the claim that most cleanly separates you from a portfolio of front-end builds.

### About — draft

> I've been a software engineer for seven years, across consultancy, product, and defence — most recently leading engineering at Calvium, where I build Next.js and Nuxt systems for clients including Arts Council England and Rolls-Royce.
>
> Outside work I design, build, and run two production products on my own: **Dizzy.gg**, a multi-game competitive rankings and tournament platform, and **LLB Dojo**, a single-game training tool. Both are live, both have real users, and I own every part of them — concept, architecture, code, infrastructure, and the day-to-day operations.
>
> Before engineering I taught secondary computing. That's where most of the things on this page that aren't code come from: running study groups and a graduate bootcamp, mentoring engineers, interviewing for senior and lead roles, and speaking at SouthwestJS and in-house on Silent Design, Advanced TypeScript, and Advanced React.

**↯ Paragraph three is the one to keep if the section has to shrink.** It converts a career detour into the causal explanation for the most senior-flavoured evidence you have. Harry's framing, and it's the right one: the teaching is relevant *because* of the lead, speaking, and soft-skills claims — not for its own sake.

**↯ Paragraph two exists to pre-empt "are these side projects?"** The word "solo" and the word "production" have to be adjacent, early, or a reader files Dizzy.gg under hobby and stops crediting the scale numbers.

**↯ "across consultancy, product, and defence"** is a compression of five roles into six words, aimed at a reader who won't reach the timeline. Drop it if it reads as buzzword-y.

---

## Experience — five roles

Each entry: org, title, dates, one line of what it was, and the named client work. Drafted from the CV; **↯** the one-liners are mine and are the thing most worth rewriting in your own voice.

### Calvium — Lead Engineer, 2025–present

> Leading engineering on client systems in Next.js and Nuxt, and building the internal templates and tooling the rest of the business ships on.

- **Clients**: Arts Council England, Rolls-Royce
- **Signal**: current role, senior title, two names with instant recognition, plus internal platform work — which is the part that says "trusted with things other engineers depend on" rather than "delivered a project".

### AND Digital — Senior Software Engineer, 2023–2025

> Full system redesign for TravelChapter in TypeScript and Next.js, alongside modernising their engineering practice; OpenTelemetry observability across microservices for the Office for National Statistics.

- **Clients**: TravelChapter, Office for National Statistics
- **Also on the CV**: technical direction on the ONS account shared with one other senior engineer; upskilling juniors; interviewing candidates for senior and lead positions; founding a social committee.
- **↯** The "bringing their engineering practice up to date" work is more interesting than the redesign and harder to claim — it's consulting *into* a client team rather than delivering to one. Worth a clause even at the cost of length.

### Scott Logic — Software Engineer, 2022–2023

> Led a small team contributing to Vuu, Scott Logic's open-source project, working directly with its stakeholder on requirements and delivery.

- **Client / project**: Vuu (open source — already public, no disclosure question)
- **Also on the CV**: a ChatGPT plugin exposing Salesforce and Confluence data through a Slack bot; leading the Agile and Design Patterns study groups with bespoke training materials for graduates; Scrum Master on a grad project; interviewing candidates.
- **↯ Title regression to watch.** Senior at Rocketmakers (2021–22), Software Engineer here, Senior again at AND. That reads oddly on a bare timeline and an interviewer will ask. Either add a clause explaining it or accept the question — but decide which. ⟨HARRY — what's the actual story here? Consultancy levelling, deliberate move, something else?⟩

### Rocketmakers — Senior Software Engineer, 2021–2022

> Built a complete home-automation platform for Sero Energy in React and Node on Docker and Kubernetes, and was elected to the company's Web seat overseeing frontend practice across the business.

- **Client**: Sero Energy
- **Also on the CV**: unit, component, integration and end-to-end test coverage; a solo Python encryption project for a client; mentoring two junior engineers against annual targets.
- **↯ The elected Web seat is the strongest single line in the pre-2023 history** and it isn't a client engagement — it's peers voting you into technical stewardship. Keep it in the one-liner even though it makes the sentence long.

### BMT — Software Engineer, 2019–2021

> Web applications for the Royal Navy and internal use, taken from backlog creation through to delivery; ran the week-long graduate bootcamp for new joiners.

- **Client**: Royal Navy
- **Stack per CV**: React, Vue, REST, GraphQL, MySQL, MongoDB, Node, ASP.NET
- **Also on the CV**: training in Python, NumPy, TensorFlow and Unity with the ML and visualisation teams; presentations to the wider BMT group on functional programming and single-SPA development; reverse-mentoring a senior engineer.
- **↯ The graduate bootcamp belongs in the one-liner, not the detail.** It's the first visible instance of the teaching background paying off inside an engineering job, which is exactly the thread paragraph three of the About section is pulling.

### Dates — open

⟨HARRY⟩ The CV gives years only. **↯ Recommend the site show years only too** — it's cleaner, it matches the register of a one-page frame, and month precision invites gap-hunting that a standing-shopfront site has no reason to invite. Two facts still needed if you'd rather be precise:

- Calvium start: **April 2025** (confirmed).
- AND Digital end date: inferred as early 2025 from the Calvium start. ⟨HARRY — confirm.⟩

---

## Education

- **University of Bath** — BSc Computer Science with Industrial Placement, 2012–2017 (2:2). Placement year at **Altran**, 2015–16: test suites for an air-traffic-management system, DevOps tooling, and development in C alongside Ada and SPARK for high-reliability applications.
- **University of the West of England** — PGCE Secondary Computing, 2017–2018.
- **Matravers School, Westbury** — Full NQT status, 2018–2019.

**↯ Keep the Altran clause.** Ada and SPARK are unusual enough to be memorable, and high-reliability systems work sits oddly well next to a rankings platform — it reads as range rather than as a placement year.

**↯ Show the degree class or not?** A 2:2 from Bath is a fact the CV states and the site needn't. Recommend **omitting the classification** on the site and keeping it on the CV: nine years of employment history has entirely superseded it as evidence, and it's the one number on the page a skimmer can use to discount everything above it. Not hiding it — it's on the document that goes to anyone who asks. ⟨HARRY — your call, and it's a legitimate one to disagree with.⟩

### Teaching — prose, not a timeline entry

Two roles, both folded into the About section rather than listed:

- **Matravers School** — Secondary Computing Teacher, 2018–2019
- **Abbeywood School & Castle School** — Secondary Computing Teacher, 2017–2018

Both remain on the CV in full.

### Speaking

SouthwestJS, plus in-house talks at several companies. Topics: **Silent Design**, **Advanced TypeScript**, **Advanced React**.

**↯** ⟨HARRY — are any of these recorded, written up, or slide-decked anywhere public?⟩ If so they're a "writing" surface that already exists, and they interact directly with [Decide the blog's v1 shape](https://github.com/hyhydev/hyhygg/issues/14) — a talks list is a legitimate answer to "what does the Writing section contain at launch" that costs no new writing.

---

## Skills — the derived set

**The rule**: a skill appears on the site if and only if a case study or a role references it. Nothing hand-added. The `SkillId` union from [#5](https://github.com/hyhydev/hyhygg/issues/5) enforces it — an unreferenced skill is a compile error, so the section cannot drift into a wish list.

| Group | Skills | Derived from |
|---|---|---|
| Languages | TypeScript, JavaScript, Python | Both case studies; Rocketmakers |
| Runtimes | Node.js, Bun | Both case studies; AND, Rocketmakers, BMT |
| Frameworks | React, Next.js, Vue, Nuxt, React Native / Expo | Both case studies; Calvium, AND, Rocketmakers, BMT |
| UI | Tailwind CSS, shadcn/ui, Base UI, Radix | Both case studies |
| State & data | Zustand, TanStack Query | Dizzy.gg |
| APIs & contracts | oRPC, REST / OpenAPI, Zod | Dizzy.gg |
| Data | PostgreSQL, Prisma, Neon | Both case studies |
| Auth, payments, realtime | Better Auth, Stripe, Pusher | Dizzy.gg, LLB Dojo |
| Testing | Vitest, Playwright, Testing Library | Both case studies |
| Infra & observability | Docker, Kubernetes, AWS, Vercel, OpenTelemetry, PostHog | Both case studies; AND, Rocketmakers |

**Dropped by the rule** — these stay on the CV and appear nowhere on the site: Go, Rust, C, C#, Java, Lisp, Haskell, PHP, Ruby, Angular, Svelte, SvelteKit, Express, Drizzle, Mongoose, Redis, SQLite, Terraform, Skaffold, Minikube, GCP, Azure, Jenkins, CircleCI, Jira, Azure DevOps, Adobe InDesign, Adobe Audition.

**↯ The rule has an edge case it didn't anticipate, and it needs one more clause.** Four skills qualify *only* through BMT (2019–2021) and nothing since: **MySQL, MongoDB, GraphQL, ASP.NET**. They're derived, so the rule admits them — but ASP.NET on a 2026 portfolio next to Next.js 16 reads as archaeology rather than range, and a skills strip is scanned for *what you build with now*.

Recommend the rule become **"referenced by a case study, or by a role from 2021 onward"**, which drops all four cleanly. The cost is GraphQL, which is still widely searched for and which you have genuinely shipped — so the honest alternative is to keep GraphQL and drop the other three by hand, at the price of the rule no longer being purely mechanical.

⟨HARRY — this is an open call and it belongs to the build spec, not to this ticket.⟩ Carried to [Assemble the build spec](https://github.com/hyhydev/hyhygg/issues/7).

---

## Contact

**Draft — a sentence, not an icon row:**

> Reach me at [harry@hyhy.gg](mailto:harry@hyhy.gg), or find me on [GitHub](https://github.com/hyhydev).

- **Email**: `harry@hyhy.gg` — set up and ready. Deliberately not the Gmail on the CV: same inbox, but an address on your own domain reads as intentional.
- **GitHub**: `github.com/hyhydev` — bio already reads "Lead Software Engineer" with `hyhy.gg` set as the site.
- **No phone on the site.** It stays on the CV, where you choose the recipients. A public page is a scraper surface.
- **No Discord.** Personal, and community-facing rather than employer-facing.
- **No LinkedIn, X, Bluesky, or Mastodon** — no accounts exist.

**↯ The GitHub link is conditional on two things, and I'd rather link nothing than link it without them.** The portfolio's central evidence problem is that both showcase repos are private, and a GitHub link is exactly where a sceptical reviewer goes to check. As things stand they'd land on eight small public repos with no visible trace of a 286K-line platform:

1. **Enable "Include private contributions on my profile."** Dizzy.gg is past PR #1065 in three months. With this on, the contribution graph becomes the closest available substitute for the code link the private repos can't provide — dense, dated, and not fakeable.
2. **Pin deliberately.** `hyhygg` — this repo — is public, so the site's own source is inspectable, and that's a real code sample on your own terms. `DojoBot` pins well as a public companion to a private product.

**↯ No LinkedIn is a real cost against an employers-first audience**, and it's the reason the CV download is load-bearing rather than a nicety. Recorded as a known trade-off, not reopened here.

---

## The CV

- **Separate document, separately maintained.** InDesign source (`.indd`) stays the source of truth. The site is a derived subset; the CV is the comprehensive surface. Generating one from the other would force a convergence that loses on one side or the other.
- **Site-side requirement**: a download at a stable path — `/cv/harry-hartley-cv.pdf` or similar. Stable filename so shared links never rot; the revision date lives inside the document, not in the URL.
- **Not a ticket on this map.** Refreshing the PDF is Harry's own errand.
- **But it is a launch blocker.** With no LinkedIn, the CV is the only artifact carrying the full history and the only thing a recruiter can forward internally. A stale CV linked from a current-looking site is worse than no CV.

---

## Launch checklist — for the build spec

Not decisions; things that must be true before the site ships.

1. **Client-name check.** Harry confirms with Calvium before publish that Arts Council England and Rolls-Royce can appear. No NDA exists; this is courtesy and cover, and it's cheap.
2. **CV refresh.** Add Calvium; close AND Digital's dates; add a Dizzy.gg / LLB Dojo projects block; refresh the skills list. Export to the stable path.
3. **GitHub profile.** Enable private contributions; pin `hyhygg` and `DojoBot`.
4. **`harry@hyhy.gg`** — confirmed live.

## Still open

1. **The BMT-only skills clause** — recency qualifier on the derivation rule, or hand-drop three and keep GraphQL. → build spec.
2. **The Scott Logic title regression** — explain it in a clause or accept the interview question.
3. **AND Digital end date**, if the site shows anything finer than years.
4. **Degree classification** — omit from the site (recommended) or show it.
5. **Whether any talks are public** — recorded, written up, or slides. Feeds [Decide the blog's v1 shape](https://github.com/hyhydev/hyhygg/issues/14).
