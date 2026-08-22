# Page-by-Page Localization Audit

Read-only audit of the Ponsonby Doctors site's static page content per locale. Pairs with [CMS.md](CMS.md) (CMS field policy) and [COMPONENTS.md](COMPONENTS.md) (component-level state). Nothing is being changed.

**Site:** Ponsonby Doctors (`62296a1920ec667f814208e2`)
**Locales (Page Locale IDs):**
- Primary `en`: `6565467ba8096b46dc2eed3c`
- Secondary `zh`: `6565467ba8096b46dc2eed3b`
- Secondary `ko`: `66fcc9f78368ea8a3d08684a`

## Method

For each page:
1. `get_page_content` is called once per locale — `total` from `pagination` is the number of overridden nodes.
2. The primary-locale node count is the upper bound. ZH/KO `total` ÷ EN `total` gives a coverage percentage. Anything ≪ 100% means strings fall through to English.
3. The `seo` object on the page metadata (from `data_pages_tool > list_pages`) is checked for SEO title/description state — note that the per-locale SEO is fetched via `get_page_metadata` with a `localeId` to confirm.
4. Component instances inside the page contribute to the visible content but are scored under [COMPONENTS.md](COMPONENTS.md), not here.

## Page taxonomy

83 pages were enumerated. They sort into five buckets:

| Bucket | Examples | Audit priority |
|---|---|---|
| **Public marketing / informational** | Home, About, Services, Doctors, Contact, Hours, Fees, Reviews, Our Story, Parking, Photo Gallery, FAQs, Quick Consult, Equity Statement, Terms, Heidi | **High** — what users see |
| **Public conversion flows** | Enrol + sub-pages (Eligibility, Start, Medical, Thank You), Casual + Thank You, Welcome Samoa, Easy-Claim, Health 365 | **High** — drop-off risk if untranslated |
| **CMS collection templates** | Services Template, Doctors Template, Articles Template, FAQs Template, Concerns Template, Treatments Template, Modals Template, Eligibility Template, Service Items Template, Locations Template, Categories Template, Clinics Template, Photos Template, Partners Template, Alerts Template, Reviews Template | **High** — drives every CMS-bound page |
| **Admin / test / draft** | Admin Modals, /test/* (Book, Book2, Localization, Autocomplete, etc.), /reports/*, KO Only, EN Only, Zh only, Style Guide, Change Log, Licenses, Pricing Plan, Home Copy, About Copy, Contact Us Copy | **Skip / nil** — internal or unpublished |
| **System** | 404, Password (401), Search Results, Success, Staff Login | **Medium** — visible only in error/auth contexts |

The drafts/admin pages were filtered out of the audit; the auditable surface is **~50 public pages plus 16 CMS templates**.

---

## Sampled pages

### Home (`62296a1920ec66bf464208e3`)

- **EN nodes:** 131
- **ZH overrides:** 36 (≈27%)
- **KO overrides:** 64 (≈49%)
- **SEO (EN):** title `Ponsonby Doctors | Auckland, NZ`, description `A full-service GP clinic with on-site ultrasound and x-ray services, serving Auckland central.`

#### ZH gaps (critical — only 27% of nodes translated)

- **Clinic hero blocks** (the six "visit our X Clinic" hero cards): only the **Skin Health Clinic** subtitle/title is translated. All five of the others (A&E Urgent Care, Sexual Health, Wellness & Mental Health, General Health, Cosmetic Skin, Immigration) — including hero subtitle "visit our", hero title, body copy, and CTA button — are still English.
- "Enrolling Now" service card subtitle/content — wait, this one IS translated. Confirm.
- "COVID-19 Swabs" service card — completely untranslated (title + content + CTA all still EN).
- "Accident & Urgent Care" service card — title translated, content translated, but CTA `+ book now` stays English in some instances.
- The full About section list bullets (Auckland NZ Trained Doctors, Primary care practice, etc.) **are** translated.
- "What We Offer" / "Our Services" section headings — not translated.
- "VIEW ALL SERVICES" button — not translated.
- "Latest Articles" → translated, but author name / metadata not overridden (these may be CMS-bound).
- Patient reviews section — translated headings, but the reviews themselves come from the Reviews CMS collection which (per CMS.md) is heavily under-populated in ZH.

#### KO gaps (≈49% of nodes translated)

- **Mixed-language About section paragraph (`nodeId 506db69a-…`):** The first sentence of the About body is in Korean: `저희는 폰손비에 본사를 둔 작고 친절한 부티크 매장입니다.` — but the rest of the paragraph **reverts to English** (`Our team of local doctors are all highly skilled…`). This is a visibly broken paragraph in KO and should be the highest-priority Home fix.
- Same multi-hero clinic blocks issue as ZH: most clinic hero cards (A&E, Sexual Health, Wellness, General Health, Cosmetic Skin, Immigration) are untranslated, except the duplicate primary "Welcome to Ponsonby Doctors" hero.
- The first hero's body paragraph (the "Open every weekday…" copy on the first instance) — primary text is untranslated; only the second duplicate hero further down the page has its body in Korean.
- "Enrolling Now", "Skin Clinic", "COVID-19 Swabs", "Accident & Urgent Care" service cards — **fully translated in KO**.
- "What We Offer" / "Our Services" / "VIEW ALL SERVICES" — translated.

#### Action items for Home

1. **KO mixed-language paragraph** — fix immediately, visibly broken.
2. **ZH coverage of the six clinic hero cards** — the page has multiple repeated hero blocks with the same structure but different content; ZH has translated only one of the six.
3. **ZH "COVID-19 Swabs" service card** — fully untranslated despite the others being done.

---

## Pages still to deep-sample

The same three-call audit (`get_page_content` × 3 locales) needs to run on:

### High-traffic public pages
- **About** (`62296a1920ec66ec234208e6`)
- **Services** (`62296a1920ec6672e84208f5`) — landing for all services
- **Doctors** (`62296a1920ec667f074208f0`)
- **Contact** (`62296a1920ec66835d4208ea`)
- **Hours** (`62fdbeb7e0d4c0e9904578ca`)
- **Fees** (`625662cc7a5e477770bfc5f1`)
- **Reviews** (`62a2c7dc37ece382f4d57845`)
- **Our Story** (`63390609c1e3e87a277298e2`)
- **Photo Gallery** (`633a45c58721fda1d198985f`)
- **Parking** (`671056b15beac7be33a225ba`)
- **Quick Consult** (`6a015c4f25435da850dd29d4`)
- **FAQs** (`695ef628bd16711462e59941`)
- **Equity Statement** (`666913c119ebd14f24c5de5d`)
- **Terms** (`67568002307465d0d4ea67d9`)
- **Heidi** (`685b428ed649969e0a062bc5`)

### Conversion flows
- **Enrol** (`62296a1920ec6666464208f1`)
- **Enrol Eligibility** (`669dc72d6a4b5888363789e6`)
- **Enrol Start** (`66a939eb0cc5fbbbbe98752d`)
- **Enrol Medical Questionnaire** (`66a89637dc2a63a4359aae5e`)
- **Enrol Thank You** (`66a86329fa0c1a2ec3ac5427`)
- **Casual** (`66b2bdb97ea0488e5b94116b`) and Casual Thank You
- **Welcome Samoa** (`670f078262f5a622226df836`) and Samoa Thank You — special-audience page; check if KO/ZH versions even apply
- **Easy-Claim** (`64efc80047382a95e0c308d3`) — currently draft
- **Health 365** (`67cf7000b482f0791b898d6a`)
- **Quick Consult** (already listed)

### Fees sub-pages (all share the Fees parent layout)
- **Fees / General** (`6948e5aa7a7c485aa3442aca`)
- **Fees / Women's** (`6948e5f0a96000007b62dd72`)
- **Fees / Skin Health** (`6948e6307cfe64321d37c886`)
- **Fees / Cosmetic** (`6948e649f36ce8dce4dd5951`)
- **Fees / Infusions** (`6948ea3ec5319be65c123940`)

### CMS templates (drive hundreds of CMS-bound pages — high leverage)
- **Services Template** (`62296a1920ec6647f04208ef`) — likely most-viewed CMS template
- **Doctors Template** (`62296a1920ec6658064208ee`)
- **Articles Template** (`62296a1920ec66555c4208ec`)
- **Concerns Template** (`66ebc56f75f3bb802093f9f0`)
- **Treatments Template** (`673e7be7e7bfd3e2ac7b506e`)
- **Locations Template** (`62e4b940db3599f99e393c0e`)
- **Clinics Template** (`65865c7b08d9c9ac6dff7905`)
- **Categories Template** (`62296a1920ec6648964208ed`)
- **Eligibility Template** (`669dd6dae7842fc0fa13c5fe`)
- **Service Items Template** (`66405d0d5c868bdd60613230`)
- **Modals Template** (`66ab2020cfc97e536f6c982a`)
- **FAQs Template** (`6854c425e12da36c8a57e697`)
- **Photos Template** (`633a46c761a7c3678a88b049`)
- **Partners Template** (`65b54e02a85bb35ad62a295f`)
- **Reviews Template** (`62a2c680c03c34a92f416c84`)
- **Alerts Template** (`64a62e20b22dc2d1b5bb67f7`)

### System pages
- **404** (`62296a1920ec664b984208e5`)
- **Password (401)** (`62296a1920ec6678324208e4`)
- **Search Results** (`633a598b8721fd7f6899652f`)
- **Success** (`66ea971204cad3143b3f5adb`)

### SEO metadata audit
Many pages were created with English SEO `title` and `description` that lack per-locale overrides. From the page listing, these are baked into the page record; the `get_page_metadata` action with a `localeId` reveals whether each secondary locale has its own SEO copy. Sampling needed for at least the High Priority list above to determine if Chinese/Korean search results are showing English meta.

---

## Cross-cutting observations from Home

1. **Repeated structural patterns are under-translated.** Pages that use a repeating layout (six clinic hero cards on Home; five Fees sub-pages; many service cards) consistently have some instances translated and others left English. Whoever did the initial translation worked top-down and didn't reach the tail.
2. **CMS-bound nodes don't appear in `get_page_content`.** Things like article author names, doctor cards, review excerpts are bound from CMS — translation of those is governed by the CMS audit, not the page audit. So a page that looks ~50% translated may actually be ~80% translated visually because the CMS items contribute many more rendered nodes.
3. **Component instances inside pages are tracked by component, not page.** Footer and Main Header sit inside every page, and their gaps (see [COMPONENTS.md](COMPONENTS.md)) compound across every page in this audit. Fixing Footer + Main Header should be the **first** translation pass, because every page benefits.

## Suggested audit sequence

If PD's goal is to get to "fully translated" with the smallest number of edit cycles, do it in this order:

1. **Footer + Main Header** (one component each, fixes every page chrome)
2. **Section / Appointment v2** and **Section / Appointment** (one fix unblocks every page with a booking form)
3. **CMS Service items + Treatments + Partners** — already translated, just publish out of draft
4. **Modals** — site-wide overlays; pure content translation
5. **Concerns + FAQs** — long-form medical content; the biggest writing effort but most user value
6. **Page-by-page sweep** of the high-priority public pages (Home, About, Services, Fees, Enrol flow) for the residual heading/CTA strings that don't live in a component
7. **CMS templates** — translate the static surrounding copy of each `detail_*` page
8. **SEO metadata per page per locale** — last, since this is one-off work per page
