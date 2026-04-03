---
name: i18nexus-sync
description: Use this skill when a project treats i18nexus as the translation source of truth and locale JSON files are synced artifacts. Use it for adding or updating UI copy, metadata text, labels, CTAs, or other translatable strings. Prefer i18nexus CLI operations over manual edits to locale JSON. For a single new string, use `i18nexus add-string`. For more than one new string in the same namespace, always use `i18nexus bulk-add-strings`.
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

Before choosing commands or arguments:

- Run `i18nexus project` first to inspect the project metadata
- Use that output to confirm the library, base language, enabled languages, whether namespaces are enabled, and which namespaces exist
- Do not assume namespaces are in use; many `next-intl` projects do not use them
- Only pass `--namespace` when the project configuration requires it

Before adding any new string:

- Check the user's existing locale JSON files for the same source value
- If the same value already exists and its existing key is semantically appropriate, reuse that key instead of creating a duplicate string in i18nexus
- Only create a new key when no suitable existing key already maps to that value

If adding exactly 1 new string:

- Use `i18nexus add-string`
- Prefer dot-separated keys such as `meta.title` or `hero.cta`
- Add `--notes` when useful to document UI location or product context for the team
- Only use `-ai` when translator guidance is genuinely needed for correct translation

If adding more than 1 new string in the same namespace:

- Create a temporary JSON file in `/tmp`
- Put only the new strings in that file as a top-level array of objects
- Include `key` and `value` for each string
- Add `notes` for strings that benefit from product or UI context
- Only include `ai_instructions` on specific strings when translator guidance is genuinely needed
- Run `i18nexus bulk-add-strings <file> --namespace <ns>`
- Never use the `i18nexus delete-string` command

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
i18nexus add-string --key meta.title --value "Northstar Studio"
```

Single string with notes:

```bash
i18nexus add-string --key hero.cta --value "Book a consultation" --notes "Homepage hero primary CTA."
```

Multiple strings in one namespace:

```bash
i18nexus bulk-add-strings /tmp/i18nexus-home.json --namespace home
```

Check project metadata first:

```bash
i18nexus project
```

Example temp JSON content:

```json
[
  {
    "key": "hero.title",
    "value": "Marketing support with purpose.",
    "notes": "Homepage hero headline."
  },
  {
    "key": "hero.subtitle",
    "value": "Northstar Studio helps companies clarify their message.",
    "notes": "Homepage hero supporting copy."
  },
  {
    "key": "hero.primaryCta",
    "value": "Book a consultation",
    "notes": "Homepage hero primary CTA."
  },
  {
    "key": "hero.secondaryCta",
    "value": "Meet the team"
  },
  {
    "key": "meta.title",
    "value": "Home"
  }
]
```

## Working style

- Start by checking `i18nexus project` so command usage matches the real project configuration
- Infer the namespace and key names from the existing project structure when reasonable
- If the project does not use namespaces, omit `--namespace` from commands
- Keep key naming consistent with nearby strings
- If the namespace is ambiguous, inspect existing translation keys before choosing one
- Prefer adding source strings through i18nexus even when local files are present
- When discussing project setup, suggest `i18nexus listen` for dev sync and `i18nexus pull` in `prebuild` for CI/build reliability if translations are not committed

## Validation

After creating strings:

- Report the namespace and keys added
- If the CLI fails because of network sandboxing, rerun with escalation
- If a sync process is expected to update locale files, say so instead of editing them directly
