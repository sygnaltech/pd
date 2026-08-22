# CMS Localization Rules

Per-field translation policy for every CMS collection. Fields are grouped under three sub-headings per collection:

- **Translate** — field value should differ per locale.
- **Ignore** — field value stays identical across locales.
- **Unspecified** — newly discovered fields. Decide which bucket they belong in before automated processing runs against them.

Format per line: `` `slug` (Display Name) ``

Execution workflow, API limits, and known gotchas live in [CMS-PROTOCOL.md](CMS-PROTOCOL.md). This file is just the rules.

---

# Doctors

Translate

- `job-title` (Doctor's Department)
- `bio-summary` (Bio Summary)
- `full-bio` (Full Bio)
- `languages` (Languages)
- `experience` (Experience)
- `patients` (Patients)
- `certification` (Certification)
- `specialty` (Specialty)
- `degree` (Degree)
- `training` (Training)
- `working-days` (Working Days)
- `info` (Info)

Ignore

- `name` (Name)
- `slug` (Slug)
- `photo` (Photo)
- `profile-picture` (Profile Picture)
- `email` (Email)
- `phone-number` (Phone Number)
- `readmore-link` (Readmore Link)
- `appointment-button` (Appointment Button)
- `seq` (Seq)
- `registration-date` (Registration Date)

Unspecified

# Categories

Translate

- `name` (Category Name)
- `short-name` (Short Name)
- `brief` (Brief)
- `info` (Info)

Ignore

- `slug` (Category Slug)
- `clinic` (Clinic)
- `hero` (Hero)
- `icon` (Icon)
- `seq` (Seq)
- `services` (DONOTUSE Services)

Unspecified

# Articles

Translate

- `name` (Title of the article)
- `post-body` (Post Body)
- `brief` (Brief)
- `alert-bar-text` (Alert Bar Text)

Ignore

- `slug` (Slug)
- `main-image` (Main Image)
- `thumbnail-image` (Thumbnail image)
- `category-2` (Category)
- `date` (Date)
- `author` (Author)
- `readmore` (Readmore)
- `alert-start-date` (Alert Start Date)
- `alert-end-date` (Alert End Date)
- `alert-link` (Alert Link)
- `related-services` (Related Services)
- `related-clinics` (Related Clinics)

Unspecified

# Services

Translate

- `name` (Name)
- `full-name` (Full Name)
- `meta-description` (META Description)
- `text` (Text)
- `pricing` (Pricing)
- `special-booking-note` (Special Booking Note)
- `faqs` (FAQs)
- `post-treatment-care` (Post-Treatment Care)
- `service-item-template` (Service Item Template)

Ignore

- `slug` (Slug)
- `keywords` (Keywords)
- `disclaimer` (Disclaimer)
- `mandatory-statement` (Mandatory Statement)
- `featured` (Featured?)
- `clinic` (Clinic)
- `category` (Category)
- `hero` (Hero)
- `seq` (Seq)
- `booking-type` (Booking Type)
- `timelycategoryid` (Timely / CategoryID)
- `book-specific-service` (Timely / Book Specific Service?)
- `timely-service-id` (Timely / Service ID)
- `sbm-booking` (SimplyBookMe / CategoryID)
- `external-booking-link` (Special / External Booking Link)
- `final-content` (Special / Booking Form)
- `hreflang` (Hreflang)
- `lang-en` (Variant Lang EN)
- `lang-zh` (Variant Lang ZH)
- `photos` (Photos)
- `video` (Video)
- `related-services` (Related Services)
- `jotform` (JotForm)
- `jotform-popup-class` (JotForm Popup Class)

Unspecified

# Reviews

Translate

Ignore

- `name` (Full Name)
- `slug` (Slug)
- `from` (From)
- `where` (Where)
- `date` (Date)
- `rating` (Rating)
- `brief` (Brief)
- `text` (Full)
- `link-2` (Link)
- `reviewer-photo` (Reviewer Photo)
- `reviewer-image-url` (Reviewer Image URL)
- `doctors` (Doctors)
- `clinic` (Clinic)
- `category` (Category)

Unspecified

# Locations

Translate

- `text` (Text)
- `parking` (Parking)
- `important-message-red` (Important Message (Red))
- `hours` (Hours)

Ignore

- `name` (Name)
- `slug` (Slug)
- `google-map-url-part` (Google Map URL Part)
- `seq` (Seq)
- `phone` (Phone)
- `email` (Email)
- `address` (Address)
- `city-zip` (City & Zip)
- `parking-map` (Parking Map)
- `photos` (Photos)
- `featured` (Featured?)

Unspecified

# Photos

Translate

Ignore

- `name` (Name)
- `slug` (Slug)
- `photo` (Photo)
- `featured` (Featured?)

Unspecified

# Alerts

Translate

- `alert-message` (Alert Message)
- `text` (Text)
- `button-1-text` (Button 1 Text)

Ignore

- `name` (Name)
- `slug` (Slug)
- `button-1-link` (Button 1 Link)
- `image` (Image)
- `start-date` (Start Date)
- `end-date` (End Date)

Unspecified

# Clinics

Translate

- `name` (Name)
- `full-name` (Short Name)
- `info` (Info)

Ignore

- `slug` (Slug)
- `featured` (Featured?)
- `icon` (Icon)
- `seq` (Seq)
- `image` (Image)
- `photos` (Photos)
- `color` (Color)
- `credentials` (Credentials)
- `related-clinics` (Related Clinics)
- `reviews-permitted` (Reviews Permitted?)

Unspecified

# Partners

Translate

- `text` (Text)

Ignore

- `name` (Name)
- `slug` (Slug)
- `cta-image` (CTA Image)
- `banner-image` (Banner Image)

Unspecified

# Service Items

Translate

- `name` (Name)
- `sub-item-display-text` (Sub-Item Display Text)
- `text` (Text)
- `price-note` (Price Note)

Ignore

- `slug` (Slug)
- `service` (Service)
- `seq` (Seq)
- `timely-categoryid` (Timely / CategoryID)
- `timely-serviceid` (Timely / ServiceID)
- `age-min` (Age Min)
- `age-max` (Age Max)
- `price` (Price)
- `layout-group` (Layout Group)
- `parent-service-item` (Parent Service Item)
- `sub-items` (Sub-Items)

Unspecified

# Eligibilities

Translate

- `name` (Name)
- `info` (Info)
- `proof` (Proof)

Ignore

- `slug` (Slug)
- `seq` (Seq)

Unspecified

# Modals

Do not translate anything in this table, it creates too much risk as the base content changes too often.

Translate

Ignore

- `name` (Name)
- `slug` (Slug)
- `enabled` (Enabled?)
- `show-from-date` (Start Date)
- `show-to-date` (End Date)
- `image` (Image)
- `content` (Content)
- `button` (Button 1)
- `button-1-service` (Button 1 Service)
- `link` (Link 1)
- `button-2` (Button 2)
- `link-2` (Link 2)
- `artwork` (Artwork)

Unspecified

# Concerns

Translate

- `name` (Name)
- `text` (Text)

Ignore

- `slug` (Slug)
- `services` (Services)
- `clinics` (Clinics)

Unspecified

# Treatments

Translate

- `name` (Name)
- `text` (Text)

Ignore

- `slug` (Slug)
- `image` (Image)
- `images` (Images)
- `services` (Services)

Unspecified

# FAQs

Translate

- `name` (Name)
- `question` (Question)
- `answer` (Answer)
- `detailed-answer` (Detailed Answer)

Ignore

- `slug` (Slug)
- `service` (Service)

Unspecified
