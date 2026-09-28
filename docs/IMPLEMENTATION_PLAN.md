# Xtravon Studio — Implementation Plan

Source of truth: [PRD.md](../PRD.md). Stack: Next.js 16 App Router + TypeScript +
Tailwind (`web/`), Supabase planned (Postgres, Auth, Storage, Realtime).
Repo: https://github.com/Xtravon/xtravon-studio (public, branch `main`).

Current state (verified): scaffolded Next.js 16 app in `web/` with customer nav
(Home, Design Studio, My Projects, Consultations, Measurements, Orders,
Messages, Profile), Xtravon home page, Design Studio form → localStorage-backed
`DesignProject` stub (`web/src/lib/projects.ts`), placeholder routes for the
rest. Lint + `tsc --noEmit` clean; production build verified before the latest
UI changes.

Working agreements: conventional commits, PR per phase, `npm.cmd` prefix on
Windows while ExecutionPolicy is default, stop dev server before `npm run build`
(OneDrive locks `.next` otherwise).

---

## Phase 0 — Foundations (done, keep enforcing)

- Toolchain: Node 24 LTS, npm, Git + `gh` (one-time auth, token in Windows
  Credential Manager).
- Conventions: TypeScript strict, ESLint, `@/*` → `src/*`, Server Components by
  default, `'use client'` only for interactivity, `<Link>` for navigation.
- Docs: PRD.md, README.md, this plan. Backlog lives in Phase 8.
- Exit: clean `lint` + `tsc --noEmit` + `next build` on every commit.

## Phase 1 — Design system

Goal: every later screen looks like one studio, not separate pages.
PRD refs: §36 nav, §37 home, §24 dashboard, §15 tracking visuals.

1. Tokens in `web/src/app/globals.css`: brand palette (acc discourages pure
   black/white only), type scale, radii, spacing; light/dark via existing
   `@theme inline` pattern.
2. Primitives in `web/src/components/ui/`: Button, Input, Select, Textarea,
   RadioCard, Badge/StatusPill, Card, EmptyState, FileUpload (preview + 1.5MB
   cap rule carried over from the stub), Stepper/JourneyTrack, Modal.
3. App shell in `layout.tsx`: header nav (customer set), footer tagline
   ("Imagine it. Design it. Consult. Create. Track it. Wear it."), mobile menu,
   admin shell variant (sidebar: Dashboard, Orders, Customers, Designs,
   Consultations, Production, Fittings, Payments, Delivery, Reports, Settings).
4. Migrate existing pages (home, design-studio form, projects list,
   placeholders) onto primitives; delete ad-hoc class strings.
- Exit: Storybook-style `/design-system` preview page rendering all primitives;
  no raw `<button>`/ad-hoc inputs outside `components/ui`.

## Phase 2 — Architecture + data model (Supabase)

Goal: replace the localStorage stub with a real backend and auth.

1. Supabase project + env (`NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, service key server-only). Client in
   `web/src/lib/supabase/`.
2. Auth: email/password + OAuth (Google) via Supabase Auth; middleware protects
   `/projects`, `/orders`, `/measurements`, `/messages`, `/profile`, `/admin/*`;
   roles in `profiles.role`: customer, consultant, production, qc, admin,
   org_manager (PRD §35).
3. Schema (Postgres + RLS per table):
   - `profiles`, `measurement_profiles` (PRD §11–12: guided + verified,
     multiple profiles per customer)
   - `designs` (template/inspiration/custom fields from §6), `design_templates`,
     `inspiration_assets` (Storage bucket)
   - `projects` (the Order Journey, §5) + `project_status_history`
   - `consultations` (chat/live/none, §8–10), `messages` (per-project thread, §23;
     Realtime for chat)
   - `quotations` (§14 line items), `approvals` (§13, §30: design, measurements,
     price, change, fitting, completion records)
   - `production_stages`, `production_updates` (photos via Storage, §15–16)
   - `change_requests` (state machine §17), `fittings` (§18–19), `quality_checks`
     (§20), `deliveries` (§21: collection/delivery)
   - `payments` (§31: total/paid/balance, deposit/staged), `notifications` (§22),
     `reviews` (§32), `design_library` (§25), `organisations` +
     `organisation_members` + `organisation_recipients` (§26)
   - `feature_flags` (§28: design_assistance, chat, live, remote_fitting,
     production_photos, change_requests, delivery, registrations)
4. Storage buckets: `inspiration`, `production-photos`, `brand-assets` (private
   by default, signed URLs).
5. Migration path: `web/src/lib/projects.ts` gains a Supabase adapter behind the
   same interface; localStorage becomes offline fallback. Seed script for
   design templates + production stages (§15 list).
- Exit: authenticated user can CRUD a project end-to-end against Supabase with
  RLS tests passing; flags readable from DB.

## Phase 3 — Customer journey MVP (outside production)

PRD refs: §6–7 Design Studio + assistance toggle, §8–10 consultation,
§11–12 measurements, §13–14 review + quotation + APPROVE & START PRODUCTION.

1. Design Studio v2: template gallery, inspiration upload → Storage, guided
   options (garment/sleeve/neckline/length/fabric/colour), design-assistance
   suggestions gated by flag.
2. Measurement profiles: CRUD + select-per-project + verified-status workflow.
3. Consultations: request flow (chat thread via Realtime; live booking with
   availability/duration/pricing from admin), consultant view of full project
   context (§9).
4. Review + quotation: order summary page (design, fabric, colour,
   measurements, instructions, price, timeline, fitting, delivery), line-item
   quote, explicit APPROVE & START PRODUCTION creating the approval record and
   moving status to Approved/In Production.
- Exit: a customer can go idea → approved order without touching production
  screens; every approval in §30 recorded.

## Phase 4 — Production, fitting, delivery

PRD refs: §15–17 tracking/updates/changes, §18–19 fitting, §20 QC, §21 delivery.

1. Tracker UI: stage list from §15 with current-stage highlight + history.
2. Updates: staff post notes/photos/milestones; customer sees feed; fitting
   notices and decision requests.
3. Change requests: customer form → studio review → quotation delta → customer
   confirm; stage-gated rules (§17: free before cutting, cost after, restricted
   at finishing).
4. Fitting: physical booking + remote feedback (photos/notes) gated by flag;
   adjustment loop until fitting approval.
5. QC checklist (§20) → READY → collection/delivery choice + status.
- Exit: one test order driven Draft → Delivered with updates, one change
  request, one fitting loop, QC sign-off.

## Phase 5 — Engagement surfaces

PRD refs: §22 notifications, §23 per-project messages, §24 dashboard, §25
library + reorder, §26 organisations, §32 reviews, §33 repeat, §34 support.

1. Notifications centre + email (Supabase Auth emails first, provider later);
   only action-required events (§22 list).
2. Dashboard: My Projects by status + Quick Actions (§24).
3. Design library: save/favourite/duplicate → new order; Order Again flow (§33).
4. Organisation workspace: group project, quantities, recipients + measurements,
   sample review, group tracking (§26).
5. Reviews post-completion (§32) + support/escalation routes (§34).
- Exit: dashboard is the default landing for returning customers; repeat order
  takes < 3 clicks.

## Phase 6 — Admin portal

PRD refs: §27–29, §10, §31.

1. Admin routes + RBAC: customers, designs/templates/categories/options,
   consultants (profiles, availability, assignments, requests), production
   (stages, assignments, updates, fittings, QC), orders by status (§29 list),
   quotations/payments/balances, collection/delivery boards.
2. Feature flags UI (§28) wired to customer experience gates.
3. Order management board with status transitions + audit trail; reports page
   feeding §41 metrics (designs, conversion, bookings, completions, repeats,
   production time, fittings, change frequency, org orders).
- Exit: admin can run the whole studio without SQL; every status change logged.

## Phase 7 — Hardening + launch

1. Security: RLS review, signed URLs, rate limits, PII handling for measurement
   data; dependency audit (`npm audit`).
2. Quality: Vitest/Playwright smoke tests for journey + approval + tracker;
   a11y pass (labels, focus, contrast), responsive check, SEO/metadata per route.
3. Performance: image optimisation, prefetch discipline (`<Link>`), loading
   skeletons for dynamic routes.
4. Deploy: Vercel from `web/` (or monorepo root config), preview per PR,
   Supabase branching; custom domain + analytics for §41 metrics.
- Exit: production URL, green build + tests, rollback plan.

## Phase 8 — Future expansion (backlog, not MVP)

Per PRD §40: AI-assisted inspiration, virtual previews, style profiles,
recommendations, designer/fabric marketplaces, ready-to-wear, subscriptions,
wedding/corporate packages, loyalty, gift cards, community, referrals.

---

## Route map (target)

`/`, `/design-studio`, `/projects`, `/projects/[id]`, `/consultations`,
`/measurements`, `/orders`, `/orders/[id]/track`, `/messages`, `/profile`,
`/library`, `/organisations`, `/admin/*`, `/design-system` (dev only).

## Risks

- OneDrive folder name (`XREAVON STUDION`) breaks npm naming → app lives in
  `web/`; never run scaffolds at root.
- OneDrive file locks → stop dev server before builds; consider moving repo out
  of OneDrive long-term.
- localStorage stub divergence → Phase 2 adapter keeps one interface.
- Scope creep from §40 → quarantined in Phase 8 until MVP metrics (§41) pass.
