export type ComponentCategory =
  | "Text Animations"
  // | "Components"
  // | "Hero Backgrounds"
  // | "Visual Effects";

export interface ComponentMetadata {
  title: string;
  description: string;
  category: ComponentCategory;
  slug: string;
  addedAt?: string;
  previewVideo?: string;
  previewPoster?: string;
  author?: {
    name: string;
    url?: string;
  };
  links?: {
    github?: string;
    docs?: string;
    demo?: string;
  };
}

const NEW_BADGE_DURATION_MS = 5 * 24 * 60 * 60 * 1000; // 5 days

export function isNewComponent(component: ComponentMetadata): boolean {
  if (!component.addedAt) return false;
  const addedTime = new Date(component.addedAt).getTime();
  return Date.now() - addedTime < NEW_BADGE_DURATION_MS;
}

export const components: Record<string, ComponentMetadata> = {
  // Text Animations
  "scroll-based-velocity": {
    title: "Velocity Scroll",
    description: "Text that moves horizontally based on scroll speed.",
    category: "Text Animations",
    slug: "scroll-based-velocity",
    // previewVideo:
    //   "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/text-animations/scrollvelocity.mov",
  },
  "my-new-test-component": {
    title: "My New Test Component",
    description: "My New Test Component description.",
    category: "Text Animations",
    slug: "my-new-test-component",
    previewVideo:
      "https://res.cloudinary.com/dtrrutggb/video/upload/v1775059818/test_testimonial_bvwkak.mp4",
  },
};

export function getComponent(slug: string) {
  return components[slug];
}
