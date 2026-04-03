---
name: i18nexus-sync
description: Use this skill when a project treats i18nexus as the translation source of truth and locale JSON files are synced artifacts. Use it for adding or updating UI copy, metadata text, labels, CTAs, or other translatable strings. Prefer i18nexus CLI operations over manual edits to locale JSON. For fewer than 3 new strings, add them individually with `i18nexus add-string`. For 3 or more new strings in one namespace, create a temporary JSON file and import it with `i18nexus import`.
---

# i18nexus Sync

Do not hand-edit locale JSON files when this workflow is active. Treat synced locale files as generated outputs that may be overwritten by `i18nexus listen` or `i18nexus pull`.

## When to use

Use this skill when:

- Adding new UI text that belongs in translations
- Renaming or rewriting translatable copy
- Adding metadata strings
- Populating a namespace with several new keys at once

Do not use this skill for:

- Purely non-translatable code changes
- Editing locale JSON directly unless the user explicitly asks for manual file edits

## Rules

Before adding any new string:

- Check the user's existing locale JSON files for the same source value
- If the same value already exists and its existing key is semantically appropriate, reuse that key instead of creating a duplicate string in i18nexus
- Only create a new key when no suitable existing key already maps to that value

If adding fewer than 3 new strings:

- Use `i18nexus add-string`
- Add each key individually
- Prefer dot-separated keys such as `meta.title` or `hero.cta`
- If translation quality depends on extra context, use `-ai` with brief translator guidance
- Only use `-ai` when it is genuinely helpful for correct translation

If adding 3 or more new strings in the same namespace:

- Create a temporary JSON file in `/tmp`
- Put only the new base strings in that file
- Run `i18nexus import <file> --namespace <ns>`
- Never use `--overwrite`
- Never use the `i18nexus delete-string` command
- `i18nexus import` cannot attach AI translator instructions
- If some strings need AI translator context, add those specific strings separately with `i18nexus add-string -ai ...` instead of relying on `import`

After adding strings:

- Do not manually patch locale JSON files just to mirror the new keys
- Assume `i18nexus listen` may sync changes back automatically
- If needed, tell the user which keys were created
- Recommend that the user run `i18nexus listen --path <translations-path>` during development so updates propagate automatically
- Recommend that the user gitignore synced translation files if i18nexus is their source of truth
- If translation files are gitignored, recommend pulling from i18nexus in `prebuild` so builds have fresh translations

## CLI patterns

Single string:

```bash
i18nexus add-string --namespace common --key meta.title --value "Northstar Studio"
```

Single string with AI translator context:

```bash
i18nexus add-string --namespace common --key hero.cta --value "Book a consultation" --ai "Marketing CTA button on homepage hero section."
```

Multiple strings in one namespace:

```bash
i18nexus import /tmp/i18nexus-home.json --namespace home
```

Example temp JSON content:

```json
{
  "hero.title": "Marketing support with purpose.",
  "hero.subtitle": "Northstar Studio helps companies clarify their message.",
  "hero.primaryCta": "Book a consultation",
  "hero.secondaryCta": "Meet the team",
  "meta.title": "Home"
}
```

## Working style

- Infer the namespace and key names from the existing project structure when reasonable
- Keep key naming consistent with nearby strings
- If the namespace is ambiguous, inspect existing translation keys before choosing one
- Prefer adding source strings through i18nexus even when local files are present
- When discussing project setup, suggest `i18nexus listen` for dev sync and `i18nexus pull` in `prebuild` for CI/build reliability if translations are not committed

## Validation

After creating strings:

- Report the namespace and keys added
- If the CLI fails because of network sandboxing, rerun with escalation
- If a sync process is expected to update locale files, say so instead of editing them directly
