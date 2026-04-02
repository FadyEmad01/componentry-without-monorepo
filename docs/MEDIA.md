## Media (Cloudinary) for components

We use Cloudinary for hosting **public** preview videos and optional poster/thumbnail images.

### Environment variables

- `CLOUDINARY_URL`: base Cloudinary URL used for constructing links and/or transformations (public).

Example `.env`:

```bash
CLOUDINARY_URL=https://res.cloudinary.com/<cloud-name>
```

### What to store in metadata

In `src/registry/index.ts`, each component can have:

- `previewVideo`: public Cloudinary video URL
- `previewPoster`: public image URL used as the thumbnail/poster

Suggested URL patterns:

- Video:
  - `https://res.cloudinary.com/<cloud-name>/video/upload/.../<slug>.mp4`
- Poster frame from video (example):
  - `https://res.cloudinary.com/<cloud-name>/video/upload/so_0/.../<slug>.jpg`

### Upload steps (Cloudinary UI)

1. Upload the asset (resource type **video** for mp4/mov).
2. Copy the **secure URL** and paste into `previewVideo`.
3. Create a poster:
   - Either derive a frame from the video URL (recommended), or
   - Upload a separate image and use that URL for `previewPoster`.

