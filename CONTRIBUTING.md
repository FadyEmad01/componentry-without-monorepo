## Contributing to Componentry

This repo is a Next.js docs + component registry. Components are distributed via a **shadcn registry** (`public/registry.json` + `public/r/*.json`) and also rendered in the docs UI.

### Folder map (what goes where)

- **Component source**: `src/components/docs/registry/<slug>.tsx`
- **Preview/demo**: `src/components/docs/previews/<slug>-preview.tsx`
- **Docs page**: `src/components/docs/<slug>.tsx`
- **Docs dynamic imports**: `src/components/docs/lazy-registry.ts`
- **Site component metadata**: `src/registry/index.ts`
- **Shadcn registry index**: `public/registry.json`
- **Shadcn registry item JSONs**: `public/r/<slug>.json`
- **Dynamic OG image**: `src/app/docs/components/[slug]/opengraph-image.tsx`

### Adding a new component (recommended workflow)

1. Run the generator script (creates all required files).
2. Edit the generated docs page to match your component.
3. Add media (optional): add `previewVideo` (and later poster/thumb) into `src/registry/index.ts`.
4. Verify `npm run build` passes.

If the generator script isn’t present yet in your local checkout, it will be in `scripts/` (look for a file named like `generate-component.*`).

### Fixing an existing component

- Fix code in `src/components/docs/registry/<slug>.tsx`
- If you change the exported API, update:
  - the docs usage code in `src/components/docs/<slug>.tsx`
  - the props table in `src/components/docs/<slug>.tsx`
  - the registry JSON file content in `public/r/<slug>.json` (keep it in sync)

### Shadcn registry (how install/source works here)

- `public/registry.json` is the registry index (schema: `https://ui.shadcn.com/schema/registry.json`).
- Each component has `public/r/<slug>.json` (schema: `https://ui.shadcn.com/schema/registry-item.json`).
- Our docs “View Source” reads `public/r/<slug>.json` and displays the first file’s `content`.

### Cloudinary media (videos + thumbnails)

We store **public** media URLs in metadata and use them in UI.

- Add `CLOUDINARY_URL` to `.env` (do not commit secrets).
- **Video URL**: a public Cloudinary URL to the uploaded video.
- **Poster/thumbnail**: either a Cloudinary-derived image URL (recommended) or a separately-uploaded image.

Suggested pattern:

- `previewVideo`: `https://res.cloudinary.com/<cloud-name>/video/upload/.../<slug>.mp4`
- `previewPoster`: `https://res.cloudinary.com/<cloud-name>/video/upload/so_0/.../<slug>.jpg`

If you upload via Cloudinary UI:

1. Upload the video (resource type: **video**).
2. Copy the **secure URL** and paste it into the component metadata.
3. Create a poster thumbnail URL (either by Cloudinary transformations or a separate image upload).

### Where OG + metadata live

- **Component metadata** (title/description/category/slug/media): `src/registry/index.ts`
- **Dynamic OG image** (generated from metadata): `src/app/docs/components/[slug]/opengraph-image.tsx`

