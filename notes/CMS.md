# CMS Localization Reference

Schema reference for every CMS collection on the Ponsonby Doctors site, with a per-field localization policy and a current-state coverage summary. Read-only audit — no field is being changed.

**Site:** Ponsonby Doctors (`62296a1920ec667f814208e2`)
**Locales (CMS Locale IDs — for `data_cms_tool`):**
- Primary `en` (English): `653ad511e882f528b32983a9`
- Secondary `zh` (Chinese): `6565467ba8096b46dc2eed42`
- Secondary `ko` (Korean): `66fcc9f78368ea8a3d08684d`

## How field-level CMS localization works in Webflow

- Each CMS item has a separate record per locale, identified by `cmsLocaleId`.
- Every field is **technically** localizable. Webflow does not flag any field as "translate" vs "keep". Choosing what to translate is a content-policy decision (this doc).
- When a secondary-locale item exists but a particular field is left identical to the primary, the rendered page will show that primary string in the secondary locale. **This makes audit by sample comparison necessary** — counts alone do not detect un-translated fields.
- Slugs, reference IDs, dates, numbers, image asset IDs, and booleans are conceptually "structural" — they identify or link, not display copy — and should stay identical across locales unless there is a deliberate URL strategy that says otherwise.

## Coverage summary (current state)

Item counts per locale, plus observed translation state of the first sampled item's display name (sample only — does not prove all items are translated):

| Collection | EN | ZH | KO | Observed in sample (ZH) | Observed in sample (KO) | Coverage flag |
|---|---:|---:|---:|---|---|---|
| Doctors | 10 | 9 | 9 | name still EN | name still EN | Missing 1 item; names not translated |
| Categories | 12 | 12 | 12 | Translated | Translated | OK |
| Articles | 11 | 11 | 11 | Sample title still EN | Sample title translated | Likely partial in ZH |
| Services | 67 | 67 | 67 | name still EN ("Skinfill Bacio" — may be brand) | name still EN | Likely partial — needs deeper sampling |
| Reviews | 80 | 29 | 49 | Different first item per locale | Different first item per locale | **Major gap** — 51 missing in ZH, 31 missing in KO |
| Locations | 2 | 2 | 2 | name still EN | name still EN | Names not translated |
| Photos | 8 | 8 | 8 | name still EN | name still EN | Not translated (decoration only — may be fine) |
| Alerts | 2 | 2 | 2 | Content still EN | Content still EN | **Not translated** |
| Clinics | 8 | 8 | 8 | name & full-name still EN | name & full-name still EN | **Not translated** |
| Partners | 4 | 4 | 4 | Content still EN, **isDraft=true** | Content still EN, **isDraft=true** | **Not translated, not published** |
| Service Items | 8 | 8 | 8 | Translated, but **isDraft=true** | Translated, but **isDraft=true** | Translated but not published live |
| Eligibilities | 10 | 10 | 10 | Translated | Translated | OK |
| Modals | 13 | 13 | 13 | Content still EN | Content still EN | **Not translated** |
| Concerns | 30 | 30 | 30 | Content still EN | Content still EN | **Not translated** |
| Treatments | 7 | 7 | 7 | Content still EN, **isDraft=true** | Content still EN, **isDraft=true** | **Not translated** |
| FAQs | 15 | 1 | 1 | Only 1 item exists in ZH | Only 1 item exists in KO | **Critical** — 14 items missing in each |

Headline takeaways before reading the per-collection sections:
1. **Reviews, FAQs, and Doctors have missing items in secondary locales** (CMS rows that simply do not exist).
2. **Alerts, Clinics, Modals, Concerns, Treatments, and Partners have items in all locales but the secondary locales still hold the English text** — looks "translated" by item count, but isn't.
3. **Treatments, Service Items, and Partners secondary locales are stuck in draft** even where translated.

---

## Per-collection field policy

Legend for the **Localize?** column:
- **Yes** — the field's value should differ per locale.
- **No** — the field is structural/identifier/asset and must stay identical across locales.
- **Optional / Brand** — discretionary; the policy decision belongs to PD. Common cases: product/brand names, address strings, partner organisation names.

### Doctors (`62296a1920ec661497420911`) — 24 fields

Per-item context: a doctor profile. Name, languages, bio, qualifications.

| Field (slug) | Type | Localize? | Reason |
|---|---|---|---|
| `name` (required) | PlainText | **Brand** | Doctor's real name; transliterate only if the doctor goes by a transliterated name in the target language |
| `slug` (required) | PlainText | No | URL path; must match across locales for shared routing |
| `photo` | Image | No | Same image |
| `profile-picture` | Image | No | Same image |
| `job-title` (Doctor's Department) | PlainText | Yes | Display copy |
| `bio-summary` | PlainText | Yes | Display copy |
| `full-bio` | PlainText | Yes | Display copy |
| `email` | Email | No | Same address |
| `phone-number` | Phone | No | Same number |
| `readmore-link` | Link | No | Internal route |
| `languages` | PlainText | Yes | Help text says "Fluent in" — phrase needs translating; language list itself may differ |
| `experience` | PlainText | Yes | "X years experience" phrase |
| `patients` | PlainText | Yes | Display copy |
| `certification` | PlainText | Yes | Display copy |
| `appointment-button` | Link | No | Booking URL |
| `specialty` | PlainText | Yes | Display copy |
| `degree` | PlainText | Yes | Display copy (MBChB, etc. may translate or stay) |
| `training` | PlainText | Yes | Display copy |
| `working-days` | PlainText | Yes | Days-of-week strings |
| `info` | RichText | Yes | Display body |
| `seq` | Number | No | Sort order |
| `registration-date` | DateTime | No | Date |

Missing items: ZH and KO each have 9 doctors vs 10 in EN. Identify which doctor is missing.

### Categories (`62296a1920ec66668342092f`) — 11 fields

Per-item context: a service category (Birth Control, Skin, etc.) used for grouping services.

| Field (slug) | Type | Localize? | Reason |
|---|---|---|---|
| `name` (Category Name, required) | PlainText | Yes | Display copy |
| `slug` (required) | PlainText | No | URL path |
| `clinic` | Reference → Clinics | No | Reference ID |
| `short-name` | PlainText | Yes | Display copy |
| `hero` | Image | No | Same image |
| `icon` | Image | No | Same image |
| `brief` | PlainText | Yes | Display copy |
| `info` | RichText | Yes | Display body |
| `seq` | Number | No | Sort order |
| `services` (DONOTUSE Services) | MultiReference | No | Legacy refs — confirm with PD before touching |

Coverage looks complete — ZH and KO names appear translated in sample.

### Articles (`62296a1920ec661246420944`) — 16 fields

Per-item context: a blog/news article.

| Field (slug) | Type | Localize? | Reason |
|---|---|---|---|
| `name` (Title, required) | PlainText | Yes | Display copy |
| `slug` (required) | PlainText | No | URL path |
| `post-body` | RichText | Yes | Main body |
| `brief` | PlainText | Yes | Excerpt |
| `main-image` | Image | No | Same image (unless culturally specific) |
| `thumbnail-image` | Image | No | Same image |
| `category-2` | Reference → Categories | No | Reference ID |
| `date` | DateTime | No | Publication date |
| `author` | PlainText | **Brand** | Real name; typically not translated |
| `readmore` | Link | No | URL |
| `alert-bar-text` | PlainText | Yes | Display copy |
| `alert-start-date` | DateTime | No | Date |
| `alert-end-date` | DateTime | No | Date |
| `alert-link` | Link | No | URL |
| `related-services` | MultiReference | No | Reference IDs |
| `related-clinics` | MultiReference | No | Reference IDs |

ZH sample shows English title — translation may be partial.

### Services (`62296a1920ec660a09420959`) — 33 fields (largest collection)

Per-item context: a single service Ponsonby Doctors offers. Drives `/services/<slug>` pages.

| Field (slug) | Type | Localize? | Reason |
|---|---|---|---|
| `name` (required) | PlainText | **Brand** | Some service names are NZ-localised brand names (Skinfill Bacio, etc.); translate only generic ones |
| `slug` (required) | PlainText | No | URL path |
| `full-name` | PlainText | Yes | Display copy |
| `meta-description` | PlainText | Yes | SEO description |
| `keywords` | PlainText | Yes | Quick-search keywords (per-language vocab) |
| `featured` | Switch | No | Boolean flag |
| `clinic` | Reference → Clinics | No | Reference ID |
| `category` (required) | Reference → Categories | No | Reference ID |
| `text` | RichText | Yes | Main body |
| `pricing` | RichText | Yes | Layout copy around prices (numbers stay; "from" / labels translate) |
| `hero` | Image | No | Same image |
| `seq` | Number | No | Sort order |
| `booking-type` | Option | No | Enum selector |
| `timelycategoryid` | PlainText | No | Booking system ID |
| `book-specific-service` | Switch | No | Boolean |
| `timely-service-id` | PlainText | No | Booking system ID |
| `sbm-booking` | PlainText | No | Booking system ID |
| `external-booking-link` | Link | No | URL |
| `final-content` (Special Booking Form) | RichText | **Optional** | Help text says "For special programming use only" — confirm with PD |
| `special-booking-note` | RichText | Yes | Display copy |
| `disclaimer` | RichText | Yes | Display copy |
| `hreflang` | PlainText | No | The `hreflang` value itself (`en`/`zh`) is metadata — see note below |
| `lang-en` (Variant Lang EN) | Reference → Services | No | Cross-locale service variant link |
| `lang-zh` (Variant Lang ZH) | Reference → Services | No | Cross-locale service variant link |
| `faqs` | RichText | Yes | Display body |
| `photos` | MultiImage | No | Same images |
| `mandatory-statement` | RichText | Yes | Display copy |
| `video` | VideoLink | No | Same URL |
| `related-services` | MultiReference | No | Reference IDs |
| `post-treatment-care` | RichText | Yes | Display body |
| `jotform` | Link | No | URL |
| `jotform-popup-class` | PlainText | No | CSS class |
| `service-item-template` | RichText | Yes | Display body |

> **Note on `hreflang`, `lang-en`, `lang-zh`:** Services has a hand-rolled cross-locale linking mechanism (separate from Webflow's native locale system). Confirm with PD whether this is still in use before changing anything related — these are not part of the standard localization surface.

### Reviews (`62a2c67fc03c341187416c6d`) — 14 fields — **Largest gap**

Per-item context: a client review. **Counts: 80 / 29 / 49 — biggest item-count mismatch on the site.**

| Field (slug) | Type | Localize? | Reason |
|---|---|---|---|
| `name` (Full Name, required) | PlainText | No (reference only) | Help text: "Not displayed" |
| `slug` (required) | PlainText | No | URL path |
| `from` (Display Name) | PlainText | **Brand** | Reviewer's name — typically not translated |
| `where` | PlainText | No | "PD" / "VD" code, structural |
| `date` | DateTime | No | Date |
| `rating` | Number | No | 0–5 numeric |
| `brief` | PlainText | **Policy decision** | The review text. Three choices: (1) leave reviews in original language and skip them in other locales, (2) machine-translate with disclosure, (3) selectively translate. **Recommend (1) — leave originals, mark untranslated reviews to not appear in the other locale's review feed.** |
| `text` | RichText | **Policy decision** | Same as `brief` |
| `link-2` | Link | No | URL |
| `reviewer-photo` | Image | No | Same image |
| `reviewer-image-url` | Link | No | URL |
| `doctors` | MultiReference | No | Reference IDs |
| `clinic` | Reference → Clinics | No | Reference ID |
| `category` | Reference → Categories | No | Reference ID |

> **Critical:** ZH has 29 reviews, KO has 49, EN has 80. Either (a) reviews were deliberately filtered per locale, or (b) reviews are being created in only one locale at a time. Get the PD content policy on reviews before recommending action.

### Locations (`62e4b940db3599142c393c0c`) — 15 fields

Per-item context: a physical clinic location (Ponsonby, Viaduct, etc.).

| Field (slug) | Type | Localize? | Reason |
|---|---|---|---|
| `name` (required) | PlainText | **Brand** | Location brand name |
| `slug` (required) | PlainText | No | URL path |
| `text` | RichText | Yes | Display body |
| `parking` | RichText | Yes | Display body |
| `google-map-url-part` | Link | No | URL fragment |
| `important-message-red` | RichText | Yes | Display copy |
| `seq` | Number | No | Sort order |
| `phone` | Phone | No | Same number |
| `email` | Email | No | Same address |
| `address` | PlainText | **Optional** | Address string. Typically kept in source language but may transliterate street names for navigation context |
| `city-zip` | PlainText | **Optional** | Same — typically not translated |
| `hours` | PlainText | Yes | "Open Mon–Fri 8am–6pm" — translate the day/time phrasing |
| `parking-map` | Image | No | Same image |
| `photos` | MultiImage | No | Same images |
| `featured` | Switch | No | Boolean |

Sample shows EN names in all locales — confirm whether display name should be translated or kept.

### Photos (`633a46c761a7c3017d88b047`) — 4 fields

Per-item context: a photo for the gallery.

| Field (slug) | Type | Localize? | Reason |
|---|---|---|---|
| `name` (required) | PlainText | **Optional** | Only matters if the photo name is rendered. If used as alt text or caption — yes. If purely admin label — no. |
| `slug` (required) | PlainText | No | URL path |
| `photo` | Image | No | Same image |
| `featured` | Switch | No | Boolean |

### Alerts (`64a62e20b22dc2d1b5bb67eb`) — 9 fields

Per-item context: a time-bound site-wide alert/banner.

| Field (slug) | Type | Localize? | Reason |
|---|---|---|---|
| `name` (required) | PlainText | No (reference only) | Admin label |
| `slug` (required) | PlainText | No | URL path |
| `alert-message` | PlainText | Yes | Display copy (alert headline) |
| `text` | RichText | Yes | Display body |
| `button-1-text` | PlainText | Yes | Button label |
| `button-1-link` | Link | No | URL |
| `image` | Image | No | Same image |
| `start-date` (required) | DateTime | No | Date |
| `end-date` (required) | DateTime | No | Date |

> Sample alert "Enrol with us!" is identical English text in ZH and KO. **Currently not translated.**

### Clinics (`65865c7b08d9c9ac6dff78e2`) — 13 fields

Per-item context: a clinic department (Corporate Health, Skin, etc.).

| Field (slug) | Type | Localize? | Reason |
|---|---|---|---|
| `name` (required) | PlainText | Yes | Display copy |
| `slug` (required) | PlainText | No | URL path |
| `full-name` (labeled "Short Name") | PlainText | Yes | Display copy |
| `featured` | Switch | No | Boolean |
| `icon` | Image | No | Same image |
| `seq` | Number | No | Sort order |
| `image` | Image | No | Same image |
| `photos` | MultiImage | No | Same images |
| `color` | Color | No | Hex color |
| `info` | RichText | Yes | Display body |
| `credentials` | MultiImage | No | Same images |
| `related-clinics` | MultiReference | No | Reference IDs |
| `reviews-permitted` | Switch | No | Boolean policy flag |

> Sample shows EN `name` and `full-name` in both ZH and KO. **Currently not translated.**

### Partners (`65b54e02a85bb35ad62a294e`) — 5 fields

Per-item context: a payment/insurance partner (Cornerstone, Southern Cross, etc.).

| Field (slug) | Type | Localize? | Reason |
|---|---|---|---|
| `name` (required) | PlainText | **Brand** | Partner brand name — leave |
| `slug` (required) | PlainText | No | URL path |
| `cta-image` | Image | No | Same image (logo) |
| `banner-image` | Image | No | Same image |
| `text` | RichText | Yes | Display body |

> ZH and KO items exist but are marked **`isDraft: true`** and content is identical English. Need to translate AND publish.

### Service Items (`66405d0d5c868bdd6061320b`) — 16 fields

Per-item context: a sub-item under a Service (e.g., an immigration medical sub-package).

| Field (slug) | Type | Localize? | Reason |
|---|---|---|---|
| `name` (required) | PlainText | Yes | Display copy |
| `slug` (required) | PlainText | No | URL path |
| `sub-item-display-text` | PlainText | Yes | Display copy |
| `service` | Reference → Services | No | Reference ID |
| `seq` | Number | No | Sort order |
| `timely-categoryid` | PlainText | No | Booking ID |
| `timely-serviceid` | PlainText | No | Booking ID |
| `text` | RichText | Yes | Display body |
| `age-min` | Number | No | Numeric |
| `age-max` | Number | No | Numeric |
| `price` | PlainText | No | Numeric price (currency symbol stays "$" — no formatting changes per locale here) |
| `price-note` | RichText | Yes | Display copy |
| `layout-group` | PlainText | No | SA5 layout name |
| `parent-service-item` | Reference (self) | No | Reference ID |
| `sub-items` | MultiReference (self) | No | Reference IDs |

> Sample is **translated in ZH and KO** (Chinese + Korean text in `text` and `name`), but **`isDraft: true`** in both. Translations done but not published.

### Eligibilities (`669dd6d9e7842fc0fa13c5e4`) — 5 fields

Per-item context: an enrolment eligibility criterion.

| Field (slug) | Type | Localize? | Reason |
|---|---|---|---|
| `name` (required) | PlainText | Yes | Display copy |
| `slug` (required) | PlainText | No | URL path |
| `info` | RichText | Yes | Display body |
| `proof` | RichText | Yes | Display body |
| `seq` | Number | No | Sort order |

> Sample is **translated in ZH and KO** — looks complete. Spot-check additional items to confirm.

### Modals (`66ab2020cfc97e536f6c9812`) — 13 fields

Per-item context: a time-bound popup modal.

| Field (slug) | Type | Localize? | Reason |
|---|---|---|---|
| `name` (required) | PlainText | No (reference only) | Admin label |
| `slug` (required) | PlainText | No | URL path |
| `enabled` | Switch | No | Boolean |
| `show-from-date` (required) | DateTime | No | Date |
| `show-to-date` (required) | DateTime | No | Date |
| `image` | Image | No | Same image |
| `content` | RichText | Yes | Display body |
| `button` (Button 1) | PlainText | Yes | Button label |
| `button-1-service` | Reference → Services | No | Reference ID |
| `link` (Link 1) | Link | No | URL |
| `button-2` | PlainText | Yes | Button label |
| `link-2` | Link | No | URL |
| `artwork` | MultiImage | No | Same images |

> Sample shows identical English `content` and `button` in ZH and KO. **Currently not translated** — and modals are shown to ALL users regardless of locale, so this is high-visibility.

### Concerns (`66ebc56f75f3bb802093f9d5`) — 5 fields

Per-item context: a medical concern (Cuts, etc.) used for service finder.

| Field (slug) | Type | Localize? | Reason |
|---|---|---|---|
| `name` (required) | PlainText | Yes | Display copy |
| `slug` (required) | PlainText | No | URL path |
| `text` | RichText | Yes | Long medical content body |
| `services` | MultiReference | No | Reference IDs |
| `clinics` | MultiReference | No | Reference IDs |

> 30 items, **sample shows identical English `text` and `name` in ZH and KO** — currently not translated. Sizable translation effort (the `text` fields are full medical articles).

### Treatments (`673e7be7e7bfd3e2ac7b4f6e`) — 6 fields

Per-item context: a treatment (Athlete's foot, etc.).

| Field (slug) | Type | Localize? | Reason |
|---|---|---|---|
| `name` (required) | PlainText | Yes | Display copy |
| `slug` (required) | PlainText | No | URL path |
| `text` | RichText | Yes | Display body |
| `image` | Image | No | Same image |
| `images` | MultiImage | No | Same images |
| `services` | MultiReference | No | Reference IDs |

> Sample shows identical English text + **`isDraft: true`** in ZH and KO. **Not translated AND not published.**

### FAQs (`6854c425e12da36c8a57e68a`) — 6 fields — **Critical gap**

Per-item context: a single FAQ.

| Field (slug) | Type | Localize? | Reason |
|---|---|---|---|
| `name` (required) | PlainText | Yes | Display copy (same as question typically) |
| `slug` (required) | PlainText | No | URL path |
| `service` (required) | Reference → Services | No | Reference ID |
| `question` | PlainText | Yes | Display copy |
| `answer` | RichText | Yes | Display body |
| `detailed-answer` | RichText | Yes | Display body |

> EN has 15 FAQs. **ZH has 1, KO has 1.** 14 items missing in each secondary locale.

---

## Open policy questions for PD

These are decisions the audit cannot make autonomously — confirm with PD before adjusting anything:

1. **Reviews policy** — leave originals as-is per language (recommended), or translate all to all languages?
2. **Doctor names** — translate / transliterate / leave as-is?
3. **Service brand names** (Skinfill Bacio, Radiesse, etc.) — leave as English brand even in ZH/KO?
4. **Partner names** (Cornerstone, etc.) — confirmed leave English?
5. **Location address strings** — leave English or transliterate?
6. **Photo names** — are these displayed anywhere user-facing, or admin-only?
7. **Services `hreflang` / `lang-en` / `lang-zh` mechanism** — is this still in use, or fully replaced by Webflow native locales?
8. **Service Items / Treatments / Partners stuck in draft in secondary locales** — intentional, or oversight?
