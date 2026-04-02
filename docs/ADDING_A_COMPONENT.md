## Adding a new component

### 1) Generate scaffold (recommended)

From repo root:

```bash
npm run gen:component -- my-new-component
```

This creates/updates:

- `src/components/docs/registry/<slug>.tsx`
- `src/components/docs/previews/<slug>-preview.tsx`
- `src/components/docs/<slug>.tsx`
- `public/r/<slug>.json` (includes embedded file `content`)
- `public/registry.json` (adds/updates registry item)

### 2) Wire it into the docs router

Add an entry to:

- `src/components/docs/lazy-registry.ts`

Example:

```ts
"my-new-component": () =>
  import("@/components/docs/my-new-component").then((m) => ({
    default: m.MyNewComponentDocs,
  })),
```

### 3) Add site metadata

Add an entry to:

- `src/registry/index.ts`

This powers:

- Docs sidebar nav
- Per-component SEO metadata
- Dynamic OG images

### 4) (Optional) Add Cloudinary video + poster

See `docs/MEDIA.md`. Add `previewVideo` and `previewPoster` to the component entry in `src/registry/index.ts`.

### 5) Verify

```bash
npm run build
```

