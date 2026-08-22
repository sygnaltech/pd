# Component Localization Reference

Examination of every reusable component on the Ponsonby Doctors site and its localization state. Components are the highest-leverage localization surface: a single header or footer component placed on 80 pages, translated once, lifts the entire site at once.

**Site:** Ponsonby Doctors (`62296a1920ec667f814208e2`)
**Locales (Component/Page Locale IDs — for `data_localization_tool`):**
- Primary `en`: `6565467ba8096b46dc2eed3c` (read-only via tool)
- Secondary `zh`: `6565467ba8096b46dc2eed3b`
- Secondary `ko`: `66fcc9f78368ea8a3d08684a`

## How component localization works in Webflow

- Each component has a canonical (primary-locale) node tree of text/image/HTML-embed/component-instance nodes, identified by `nodeId`.
- A secondary locale stores **overrides** by `nodeId`. If a node has no override, the primary-locale value renders.
- `get_component_content(localeId)` returns **only the overridden nodes** in that locale — nodes absent from the response are not translated.
- Comparing `total` from the primary-locale response with `total` from a secondary-locale response gives you per-component coverage at a glance.
- A component placed on a page can also receive **per-instance property overrides** at the page level (set via `update_static_content` with `propertyOverrides`). Those are stored on the page, not on the component.

## Component inventory and coverage

| Component | EN nodes | ZH nodes | KO nodes | Use | Audit flag |
|---|---:|---:|---:|---|---|
| Footer | 37 | 9 | 20 | Site-wide | **ZH critical** — only 24% overridden |
| Main Header Area | 70 | 42 | 29 | Site-wide nav | **KO critical** — only 41% overridden |
| Banner Title Area | 2 | 2 | 2 | Sub-title decoration | OK (alt text only) |
| Section / Appointment v2 | 18 | **0** | **0** | Appointment form section | **CRITICAL — entirely untranslated in both ZH and KO** |
| Bar | TBD | TBD | TBD | Bar element | Not sampled |
| Hours Text / Viaduct | TBD | TBD | TBD | Hours display (used in Header/Footer) | Not sampled |
| Hours Text / Ponsonby | TBD | TBD | TBD | Hours display (used in Header/Footer) | Not sampled |
| Section / Photo Gallery | TBD | TBD | TBD | Gallery section | Not sampled |
| Section / Appointment | TBD | TBD | TBD | Legacy appointment form | Not sampled — likely same issue as v2 |
| Section / Clinics Bar (Sections) | TBD | TBD | TBD | Clinics bar on home | Not sampled |
| CTA \| Easy-Claim | TBD | TBD | TBD | Easy-Claim CTA | Not sampled |
| Booking Notice | TBD | TBD | TBD | Notice block | Not sampled |
| Doctor / Crew | TBD | TBD | TBD | Doctor card | Not sampled — bound to CMS |
| Pop-up | TBD | TBD | TBD | Pop-up | Not sampled |
| Section \| Partners | TBD | TBD | TBD | Partners section | Not sampled |
| Section Title | TBD | TBD | TBD | Section title wrapper | Not sampled |
| s | TBD | TBD | TBD | Unknown — name is just "s" | Investigate |
| Enrol \| Eligibility | TBD | TBD | TBD | Enrolment eligibility section | Not sampled |
| PD \| Modals (Marketing) | TBD | TBD | TBD | Modal wrapper | Not sampled |
| Service Finder Old | TBD | TBD | TBD | Legacy | May be deletable — check first |
| Modal (Modals, readonly) | TBD | TBD | TBD | SA5 modal lib | Library — translation per modal instance |
| Modal \|\| Button (Modals, readonly) | TBD | TBD | TBD | Modal button | Library |
| Modal \|\| Rich Text (Modals, readonly) | TBD | TBD | TBD | Modal rich text | Library |
| Admin Area (readonly) | — | — | — | Admin chrome — not user-facing | Skip |
| Fees \| Tab Bar | TBD | TBD | TBD | Fees page tab bar | Not sampled |
| Test Component | — | — | — | Test artefact | Likely deletable |
| Our Promise Item | TBD | TBD | TBD | Promise list item | Not sampled |
| Promise Wrap | TBD | TBD | TBD | Promise wrapper | Not sampled |
| Embed (Utility, readonly) | — | — | — | HTML embed utility — no text content | Skip |
| Timely Booking Widget | TBD | TBD | TBD | Booking widget | Not sampled — likely no editable text |

> "TBD" means the component was not deeply sampled in this pass. The three highest-leverage components — Footer, Main Header, and Section / Appointment v2 — were fully sampled and are documented below.

---

## Footer (`9bee52d3-2070-ed7e-df53-b5a10daf2f1a`)

Site-wide footer placed on every page.

- **Primary nodes:** 37 (28 are text/HTML, the rest are images/inputs/buttons)
- **ZH overrides:** 9 nodes (~24% coverage)
- **KO overrides:** 20 nodes (~54% coverage)

### Translated in BOTH ZH and KO

- Contact form CTA (`联系表` / `연락처 양식`)
- "Book now" heading
- Booking text "Book online, using our easy online booking system."
- "APPOINTMENT" button text
- "Free parking" heading
- "map & parking" button
- "Search" heading
- "Equity statement" link

### Translated in KO but missing in ZH

- "Ponsonby" widget title — KO: `폰손비`; ZH: still renders English
- Image alt text "Widget Title Separator"
- "Click for details." CTA — KO has Korean; ZH falls through to English
- Address text `1/582 Karangahape Road / Grey Lynn / Auckland 1010, New Zealand` — KO has Korean transliteration; ZH falls through to English
- Copyright block `© Ponsonby Doctors / Powered by Sygnal.` — KO translated; ZH falls through to English
- "About us" widget title — KO: `회사 소개`; ZH: still English
- "We proudly serve Ponsonby, Grey Lynn…" suburb list (appears twice — both instances) — KO translated; ZH falls through to English

### Missing in BOTH ZH and KO (still English in both locales)

- `info@ponsonbydoctors.co.nz` — email; safe to leave as-is
- `(09) 280 2923` — phone number (appears twice); safe to leave as-is
- "Privacy & terms" link
- "Test results" link
- Search input placeholder "What do you want to find?"

### Action items for Footer
1. **ZH locale needs ~16 additional overrides** to reach KO's level of coverage.
2. "Privacy & terms" and "Test results" links are display copy and should be translated in both locales.
3. "Click for details" appears in multiple components — verify it is overridden consistently.

---

## Main Header Area (`1c7df788-e3ef-ecee-55cb-d07b73767b5e`)

Site-wide top nav, language switcher, mobile menu.

- **Primary nodes:** 70 (many SVG icons + 30+ text/link nodes)
- **ZH overrides:** 42 nodes (~60% coverage)
- **KO overrides:** 29 nodes (~41% coverage)

### Translated in BOTH ZH and KO

- "CALL US" / "HOURS" / "LANGUAGE" headings (KO missing "search" + "SERVICES")
- Search dropdown copy (placeholder, success/error, "No items found", "Search the site")
- Site logo alt text
- "Repeat Scripts" link
- "About" dropdown + all six About submenu items (About Us, Our Story, Photo Gallery, Meet Our Doctors, Client Reviews, After-Treatment Care)
- "Fees" link
- "Enrol" dropdown trigger + "Enrol" main link (translated)
- "Contact" dropdown trigger + "Contact Us" link
- Alert link hyphen separator + "Click for details" CTA (×2)

### Translated in ZH but missing in KO

- "search" / "SERVICES" section headings
- "Our Clinics" dropdown trigger label
- "See All Services" link
- "FAQs" dropdown trigger + all six FAQ submenu items (Test Results FAQ, Prescription FAQ, Parking FAQ, Consultation FAQ, After-Hours FAQ, Telehealth FAQ)
- "Enrol Now" / "About Health 365" / "Health 365 Login" submenu items (×2 instances)
- "Free Parking" submenu link
- "HEALTH 365 LOGIN" header button text

### Missing in BOTH ZH and KO

- Phone number `(09) 280 2923` — safe to leave
- The injected `<style>` block that renders language switcher labels via CSS (`content: "English"` / `content: "中文"`) — this is the language switcher mechanism. Korean version may need adding to the CSS regardless of locale.
- "Header Calendar Icons" / "Service Icon" alt text (KO has some image alt text translated)

### Action items for Main Header
1. **KO locale missing all six FAQ submenu items** — high-impact for KO users.
2. **KO locale missing the "Enrol" dropdown submenu** — only the trigger and main link are translated, not the children.
3. **ZH locale missing the "FAQs" dropdown entirely** (no, on second look — ZH-side FAQs is missing too; KO has FAQs partly translated, ZH does not).
4. Language switcher CSS only injects `en` and `zh` labels — needs a `ko` entry in the `<style>` block for the Korean language to display correctly in the picker.

---

## Banner Title Area (`2ac3aebb-821b-2877-2883-6d7792d6d2c9`)

Sub-title decoration element (two `Sub Title Icon` images).

- **Primary nodes:** 2 (both images)
- **ZH overrides:** 2 (alt text: "副标题图标")
- **KO overrides:** 2 (alt text: "서브 타이틀 아이콘")

OK — alt text is overridden in both locales.

---

## Section / Appointment v2 (`ae1a1b7b-ae4b-c0f0-4b91-49504aec8934`) — CRITICAL

The appointment booking form section.

- **Primary nodes:** 18 (including form labels, button text, success/error messages, the phone-call fallback)
- **ZH overrides:** **0**
- **KO overrides:** **0**

### Nodes entirely untranslated

- "get an appointment" sub-title
- "The Wide Network of Best Healthcare" section title
- Section intro paragraph about the team
- Form placeholders: "Name", "Email", "Phone", "Subject"
- Submit button value `Book Appointment` and waiting text `Please wait...`
- "(or)" connector
- Phone fallback `044 1239999` — **this also appears to be the wrong number** (PD's phone is `(09) 280 2923`)
- Success message "Thank you! Your submission has been received!"
- Error message "Oops! Something went wrong while submitting the form."

### Action items for Appointment v2
1. **Wherever this component is placed**, ZH and KO visitors see an English-only booking form.
2. The fallback phone number `044 1239999` looks like leftover template content — flag for verification regardless of locale.
3. There is also a `Section / Appointment` (without v2) component listed — almost certainly has the same issue. Sample it.

---

## High-leverage components still to sample

Before the audit recommends specific fixes for individual pages, sample these next to round out the picture:

1. **Hours Text / Ponsonby** + **Hours Text / Viaduct** — these are embedded inside Footer AND Main Header Area, so any English bleed-through compounds.
2. **Section / Appointment** (legacy v1) — same problem as v2 expected.
3. **CTA \| Easy-Claim** — appears on multiple pages.
4. **Pop-up** — site-wide overlay; visible to everyone.
5. **Booking Notice** — chrome around bookings.
6. **PD \| Modals** — wrapper around the CMS-driven modals.
7. **Enrol \| Eligibility** — wraps the enrolment CTA.
8. **Section \| Partners** — chrome around the Partners list.

## Components that probably do not need localization

- **Admin Area** — internal admin chrome, not user-facing
- **Test Component** — likely a dev artefact
- **Embed (Utility)** — pure HTML embed
- **Timely Booking Widget** — third-party widget; check whether it has any wrapping text
- **Service Finder Old** — labelled "Old", may be deletable

## Cross-cutting recommendations

1. **Pick a coverage threshold per component** (e.g. "every text node overridden, except brand names and contact info") and audit each component against it.
2. **Document why specific nodes are intentionally left English** (phone, email, partner brand names) so a future round of automated translation does not "fix" them by accident.
3. **Watch for instance-level property overrides** — set on the page via `propertyOverrides` rather than on the component. The Home page already uses one ("CTA Button Text" → "预约" in ZH). These are page-level fixes that bypass the component-level translation — fine for one-offs, but if every page does this for the same prop, the right fix is to translate at the component level.
