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
    previewVideo:
      "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/text-animations/scrollvelocity.mov",
  },
  
};

export function getComponent(slug: string) {
  return components[slug];
}
