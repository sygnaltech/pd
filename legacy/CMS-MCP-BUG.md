# Bug Report: Webflow MCP — CMS Item Locale-Record Cannot Be Recreated After Locale-Scoped Delete

## Environment

- **MCP Server:** Webflow MCP (beta)
- **Server identifier in client:** `webflow-pd`
- **Tool prefix observed:** `mcp__webflow-pd__*`
- **Webflow API version targeted:** v2 (based on `developers.webflow.com/data/v2.0.0/reference/` docs path)
- **Site under test:** Ponsonby Doctors (`62296a1920ec667f814208e2`)
- **Collection under test:** Modals (`66ab2020cfc97e536f6c9812`)
- **Item under test:** `Enrol` modal (`66ab241cc5a04c6a7e663eb7`)
- **Locales:**
  - Primary EN — `cmsLocaleId`: `653ad511e882f528b32983a9`
  - Secondary KO — `cmsLocaleId`: `66fcc9f78368ea8a3d08684d`

## Summary

There is no mechanism in the Webflow MCP (and apparently no public Webflow Data API endpoint) to either:

1. **Revert a single localized field** on a CMS item back to inherit from the primary locale, or
2. **Recreate a secondary-locale record** on an existing CMS item after it has been deleted with `delete_collection_items` + `cmsLocaleIds`.

This makes the locale-scoped delete operation a **one-way destructive action** with no recovery path. It cannot be safely automated.

## Use case

A site has CMS items that were previously translated into a secondary locale (Korean, in this case) by setting per-field overrides via the API. The desired action is to **untranslate** those items — i.e. remove the field-level override flags so that the field values fall back to and inherit from the primary locale automatically going forward (including future changes to the primary value).

The Webflow Designer provides this affordance via a per-field "Revert" UI control. We need the equivalent capability via the API/MCP so it can be automated across many items.

## Expected behavior

One of the following should be true:

- A documented way to clear a single field's locale override (e.g. an `update_collection_items` semantic where omitting/nulling a field clears its override, or a dedicated `reset_field` action), **or**
- A documented way to bulk-clear all overrides on a single secondary-locale item record without deleting the item from that locale, **or**
- If `delete_collection_items` with `cmsLocaleIds` is intended to perform the bulk-clear, the docs should say so clearly, and there should be a complementary `create_collection_items` mode that can recreate a missing locale-record on an existing item (matched by item id or by slug+collection).

## Actual behavior

- `update_collection_items` with a `cmsLocaleId` writes values that **become overrides regardless of whether they match the primary value**. Every field present in `fieldData` is marked as a translated override.
- `delete_collection_items` with `cmsLocaleIds` removes the **entire locale-record** for the item, making the item disappear from that locale's view of the collection.
- `create_collection_items` with `cmsLocaleIds: [secondary_id]` and a `fieldData` matching an existing primary-locale item's slug **rejects with a slug-uniqueness error**, with no way to indicate "this is meant to be a locale-record for the existing item."
- `update_collection_items` with `cmsLocaleId: secondary_id` on the same item id after the delete **returns 404**, because the locale-record no longer exists for that item id.
- `publish_collection_items` after the delete does not recreate the missing locale-record.

The locale-record cannot be restored via any combination of public MCP/API actions.

## Reproduction steps

The following sequence of MCP `data_cms_tool` calls demonstrates the issue.

### Step 1 — Confirm primary-locale item exists

```json
{
  "action": "list_collection_items",
  "collection_id": "66ab2020cfc97e536f6c9812",
  "request": {
    "limit": 1,
    "cmsLocaleId": "653ad511e882f528b32983a9",
    "slug": "enrol"
  }
}
```

Result: returns the EN item with `id: 66ab241cc5a04c6a7e663eb7` and full `fieldData`.

### Step 2 — Confirm secondary-locale (KO) record exists pre-test

```json
{
  "action": "list_collection_items",
  "collection_id": "66ab2020cfc97e536f6c9812",
  "request": {
    "limit": 1,
    "cmsLocaleId": "66fcc9f78368ea8a3d08684d",
    "slug": "enrol"
  }
}
```

Result: returns the KO item with the same `id` and Korean-translated `name`, `content`, `button` fields. This is the starting state.

### Step 3 — First attempted "revert" (failed in a different way): overwrite KO with EN values

```json
{
  "action": "update_collection_items",
  "collection_id": "66ab2020cfc97e536f6c9812",
  "request": {
    "items": [{
      "id": "66ab241cc5a04c6a7e663eb7",
      "cmsLocaleId": "66fcc9f78368ea8a3d08684d",
      "fieldData": {
        "name": "Enrol",
        "slug": "enrol",
        "content": "<h1 id=\"\">Enrol with us!</h1>...",
        "button": "Enrol Online Today."
      }
    }]
  }
}
```

Result: API succeeded. **However**, on inspecting the Designer, the four fields were now displayed as **translated overrides containing English text**, not as inherited fields. This means the API has no concept of "matching primary = inherit"; presence in `fieldData` always creates/maintains an override flag. So this is not a revert — it is a content swap that will not pick up future primary-locale changes.

### Step 4 — Delete the locale-record entirely

```json
{
  "action": "delete_collection_items",
  "collection_id": "66ab2020cfc97e536f6c9812",
  "request": {
    "items": [{
      "id": "66ab241cc5a04c6a7e663eb7",
      "cmsLocaleIds": ["66fcc9f78368ea8a3d08684d"]
    }]
  }
}
```

Result: opaque success response (`{"type":"text"}`).

Re-querying KO after the delete:

```json
{
  "action": "list_collection_items",
  "collection_id": "66ab2020cfc97e536f6c9812",
  "request": {
    "limit": 100,
    "cmsLocaleId": "66fcc9f78368ea8a3d08684d",
    "slug": "enrol"
  }
}
```

Returns: `{"items": [], "pagination": {"limit":100, "offset":0, "total":0}}`.

**The item no longer exists in the KO locale at all.** The Designer confirms: opening Modals in the Korean locale shows that the Enrol item is simply not present — not as a translated record, not as an inherited record, not at all. EN locale is unaffected and still contains the item.

This means `delete_collection_items` + `cmsLocaleIds` removes the item from the locale entirely. It is not the field-level override clear that we (and the docs ambiguity) initially hoped it might be.

### Step 5 — Attempt to recreate locale-record via update (FAILS with 404)

```json
{
  "action": "update_collection_items",
  "collection_id": "66ab2020cfc97e536f6c9812",
  "request": {
    "items": [{
      "id": "66ab241cc5a04c6a7e663eb7",
      "cmsLocaleId": "66fcc9f78368ea8a3d08684d",
      "fieldData": { "name": "Enrol", "slug": "enrol" }
    }]
  }
}
```

Result:

```
NotFoundError
Status code: 404
Body: {
  "message": "Requested resource not found",
  "code": "resource_not_found",
  "details": []
}
```

`update_collection_items` cannot create a missing locale-record. It only modifies existing ones.

### Step 6 — Attempt publish to trigger locale sync (no effect on KO)

```json
{
  "action": "publish_collection_items",
  "collection_id": "66ab2020cfc97e536f6c9812",
  "request": {
    "itemIds": ["66ab241cc5a04c6a7e663eb7"]
  }
}
```

Result: success — `{"publishedItemIds":["66ab241cc5a04c6a7e663eb7"], "errors":[]}`.

Re-query KO: still `{"items": [], "pagination": {"total": 0}}`. **Publish does not recreate missing locale-records.**

### Step 7 — Attempt create with minimal fieldData and KO locale (FAILS — missing required fields)

```json
{
  "action": "create_collection_items",
  "collection_id": "66ab2020cfc97e536f6c9812",
  "request": {
    "cmsLocaleIds": ["66fcc9f78368ea8a3d08684d"],
    "fieldData": [
      { "name": "Enrol", "slug": "enrol" }
    ]
  }
}
```

Result:

```
BadRequestError
Status code: 400
Body: {
  "message": "Validation Error: Field 'show-from-date': Field is required",
  "code": "validation_error",
  "externalReference": null,
  "details": []
}
```

### Step 8 — Attempt create with all required fields and KO locale (FAILS — slug uniqueness)

```json
{
  "action": "create_collection_items",
  "collection_id": "66ab2020cfc97e536f6c9812",
  "request": {
    "cmsLocaleIds": ["66fcc9f78368ea8a3d08684d"],
    "fieldData": [{
      "name": "Enrol",
      "slug": "enrol",
      "show-from-date": "2024-08-01T00:00:00.000Z",
      "show-to-date": "2030-08-01T00:00:00.000Z"
    }]
  }
}
```

Result:

```
BadRequestError
Status code: 400
Body: {
  "message": "Validation Error",
  "code": "validation_error",
  "externalReference": null,
  "details": [
    {
      "param": "slug",
      "description": "Unique value is already in database: 'enrol'"
    }
  ]
}
```

This is the wall. `create_collection_items` cannot be used to "join" an existing item id — it always creates a new item with a new id, and the slug-uniqueness constraint blocks that path here.

## Root cause analysis

The MCP/API surface exposes operations to **create** locale-records (only as part of brand-new items) and to **destroy** locale-records (item-scoped delete with `cmsLocaleIds`), but exposes no operation to:

- Restore a locale-record on an existing item, or
- Clear a single field's override flag without removing the value entirely.

The Webflow Designer is able to perform both operations through its UI, which strongly suggests internal API endpoints exist that are not surfaced via the public Data API (and therefore not via the MCP wrapper).

## Impact

- **Cannot safely automate cleanup of translated content.** Any cleanup script that calls `delete_collection_items` with `cmsLocaleIds` to bulk-remove a translation results in the item disappearing from that locale entirely, with no recovery path via the API.
- **Cannot programmatically untranslate individual fields.** Common content workflows (e.g. retiring a translation while keeping the item live in the secondary locale) are not possible from the API.
- **Documentation does not warn that `delete_collection_items` + `cmsLocaleIds` is destructive in this way.** The docs description ("Items will only be deleted in the primary locale unless a `cmsLocaleId` is included") is ambiguous; combined with the copy-paste error referring to "created" in the delete endpoint description (visible in the Webflow Data API v2 reference), this is a footgun.

## Requested

Either of the following would resolve this:

1. **Add public-API endpoints** equivalent to the Designer's per-field Revert and per-locale-record Create-for-existing-item operations.
2. **Expose those endpoints through the MCP** as new actions on `data_cms_tool` (e.g. `reset_collection_item_fields` taking `item_id`, `cmsLocaleId`, and a `field_slugs` array; and `create_collection_item_locale` taking `item_id` and `cmsLocaleId`).

At minimum, the docs for `delete_collection_items` should clearly warn that passing `cmsLocaleIds` is a destructive, irreversible operation via the public API.

## Recovery in the current case

After confirming via the reproduction steps that the API cannot restore the deleted KO locale-record, the recovery has to be performed manually in the Webflow Designer:

1. Open the Modals collection.
2. Switch the locale picker to Korean.
3. Locate or instantiate the Enrol item (Designer should offer to create the locale-record).
4. Save and re-publish.
