# CMS Localization Execution Protocol

Read this before running any localization updates against the Ponsonby Doctors Webflow site. It documents the workflow, API capabilities, and known limitations. Companion file: [CMS-RULE.md](CMS-RULE.md) for the per-field rules, [CMS-MCP-BUG.md](CMS-MCP-BUG.md) for the documented bug case.

If you are a fresh agent with no prior session context, read this whole file first. The Webflow MCP and the underlying Data API have non-obvious behaviours that have already caused production damage in past sessions.

## Site and locale IDs

- **Site:** Ponsonby Doctors — site_id `62296a1920ec667f814208e2`
- **Locales** — note there are TWO distinct ID types per locale:
  - **Primary EN** — page/component `localeId` `6565467ba8096b46dc2eed3c`, CMS `cmsLocaleId` `653ad511e882f528b32983a9`
  - **Secondary ZH** — page/component `localeId` `6565467ba8096b46dc2eed3b`, CMS `cmsLocaleId` `6565467ba8096b46dc2eed42`
  - **Secondary KO** — page/component `localeId` `66fcc9f78368ea8a3d08684a`, CMS `cmsLocaleId` `66fcc9f78368ea8a3d08684d`

The page/component IDs are used by `data_localization_tool`. The CMS IDs are used by `data_cms_tool`. They are NOT interchangeable. Use the CMS IDs for everything in this document.

## What the API can and cannot do

| Operation | API supports it? |
|---|---|
| Create a new item across multiple locales (`create_collection_items` with `cmsLocaleIds[]`) | Yes |
| Write a value to a field in a secondary locale (creates an override) | Yes — `update_collection_items` with `cmsLocaleId` |
| Read item values per locale | Yes — `list_collection_items` with `cmsLocaleId` |
| Delete an item's locale-record (`delete_collection_items` with `cmsLocaleIds`) | Yes — **DESTRUCTIVE, ONE-WAY, NO RECOVERY** |
| **Clear an override on a single field so it inherits from primary** | **NO — Designer only** |
| **Restore a locale-record on an existing item after it was deleted** | **NO — Designer only** |
| Publish item(s) live | Yes — `publish_collection_items` |

The "NO" rows mean: if you call `delete_collection_items` with `cmsLocaleIds` and remove a secondary-locale record, the only way to put it back is the Webflow Designer. The same is true for clearing a single field override. Do not attempt to engineer around either limitation via the API — it has been tried and confirmed unrecoverable.

## The translation protocol (apply per collection)

For every collection you process:

### Step 1 — Pull all items in all three locales

```
list_collection_items(collection_id, cmsLocaleId = EN)
list_collection_items(collection_id, cmsLocaleId = ZH)
list_collection_items(collection_id, cmsLocaleId = KO)
```

You need all three so you can compare what's in each locale.

### Step 2 — For each item, audit TRANSLATE fields

A field marked **Translate** in CMS-RULE.md is supposed to differ per locale. For each translate field in each secondary locale:

- If the value is `null` and EN has content → translate it
- If the value is still English (matches EN word-for-word) → translate it
- If the value is already in the target language but contains obvious errors (mistranslation, typos, garbled HTML) → fix it
- If the value is a good existing translation → leave it alone

**Quality checks while translating:**

- Watch for **word-sense errors**. Examples from past sessions: `두더지` (animal mole) used where `점` (skin mole) was meant; `健康人支票` (`支票` means bank cheque) used where `健康检查` (health check) was meant; `工商管理硕士` (MBA) used where `MBChB` (medical degree) was meant.
- Watch for **brand-name vs generic-name confusion**. EN may say `anti-wrinkle treatments` and a prior translator wrote `Botox` — always match the EN's level of specificity. If EN says generic, translation should be generic.
- **Cross-reference other items** in the same collection for consistent terminology. If most doctor records use `메디컬 닥터` for Medical Doctor, the new one should too. If EN's "General Practitioner (GP)" was translated as `일반의 (GP)` elsewhere, use the same form.
- **Preserve HTML structure** — keep `<p id="">`, `<h1>`, `<br>`, etc. exactly as EN has them. The CMS uses these for layout. Only the text content changes.

### Step 3 — For each item, audit IGNORE fields

A field marked **Ignore** is supposed to be identical across all locales. For each IGNORE field, compare the secondary-locale value to the EN value:

- **If they match** → do NOT include the field in your update payload. Leaving the field out preserves whatever state it's in (ideally inherited) and avoids creating an unnecessary override.
- **If they differ** → include the EN value in your update payload. This writes EN over the secondary, ensuring content consistency.

**Important caveat:** Writing the EN value into the secondary locale creates an override flag on that field. The content will match EN today, but the field will not auto-track future EN changes (because Webflow now treats it as "explicitly set in this locale"). The Designer's per-field Revert is the only way to truly remove the override flag. This is a known Webflow limitation — accept the tradeoff and document it for the editor.

**What counts as a "real" disagreement:**

- Text difference (e.g., `Dr Sunee Kim` vs `Dr. Sunee Kim`) — REAL, fix it
- Number difference (e.g., `seq: 40` vs `seq: 50`) — REAL, fix it
- Image asset `fileId` difference — REAL, fix it
- Image asset URL host difference only (`uploads-ssl.webflow.com` vs `cdn.prod.website-files.com`) when the `fileId` is identical — NOT a real disagreement, skip
- Null vs empty array `[]` — NOT a real disagreement, skip

### Step 4 — Apply all updates in one batched call

`update_collection_items` accepts an array of items with per-item `cmsLocaleId` and `fieldData`. Batch every fix for the collection into a single call. This is faster and less error-prone than calling per-item.

For each item update, include in `fieldData` ONLY the fields you actually want to override. Every field present in the payload becomes an override regardless of whether its value matches primary. Omitting fields preserves their current state (inherited if they were inherited).

### Step 5 — Publish all affected items

```
publish_collection_items(collection_id, itemIds = [every id you touched])
```

Per-item draft state resets every time you update. Publishing pushes the updates live across all locales for those items. If an item is archived in EN, the publish call will report an error for it — that is expected, the secondary-locale updates will sit as drafts until the item is unarchived.

## What to do when something is wrong but you can't fix it via API

If you find a missing locale-record on an existing item (item exists in EN but not in ZH or KO), DO NOT attempt to fix it with `create_collection_items` — that creates a brand new item with a new id and either errors with a slug conflict or silently produces an orphan record. The correct path is:

1. Stop and tell the user.
2. The user has to fix it in the Designer (typically by duplicating the EN item, which creates the missing locale-records, then deleting the original).
3. Once the user confirms the fix, verify all three locale records share the same item id, then proceed with translation.

If you find an unwanted IGNORE-field override that you want to clear (where the secondary locale has been edited to a different-from-EN value and you want it to inherit from EN cleanly going forward), the API can only overwrite with EN's value (still an override). True clearing requires the Designer's per-field Revert. Note this in your summary so the user knows which fields still need a manual Designer revert for ideal state.

## Publishing scope

Default is "publish every item you touched in this run." If the user has not specified otherwise, batch a single `publish_collection_items` call at the end with the full id list. Do not publish individual items mid-run unless explicitly told to.

## Summary report at the end of each collection

After processing a collection, report:

- Total items processed
- TRANSLATE field fixes applied (per locale)
- IGNORE field disagreements fixed (per locale)
- Items skipped (e.g., already fully translated)
- Publish results — successes and any per-item failures (typically archived items)
- Any issues found that could not be fixed via API (e.g., remaining override flags that need Designer revert)
