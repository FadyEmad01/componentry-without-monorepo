import type React from "react";

// Dynamic import map - components are only loaded when needed
// This is a CRITICAL performance optimization that reduces initial bundle size
// by ~80% since we only import the component being viewed.
const docsImportMap: Record<
  string,
  () => Promise<
    | { default: React.ComponentType<Record<string, unknown>> }
    | { [key: string]: React.ComponentType<Record<string, unknown>> }
  >
> = {
  "scroll-based-velocity": () =>
    import("@/components/docs/scroll-based-velocity").then((m) => ({
      default: m.ScrollBasedVelocityDocs,
    })),
};

/**
 * Get the dynamic import function for a docs component.
 * Returns null if the component doesn't exist in the registry.
 */
export function getDocsImporter(slug: string) {
  return docsImportMap[slug] ?? null;
}

/**
 * Get all available component slugs for static generation.
 */
export function getDocsSlugs(): string[] {
  return Object.keys(docsImportMap);
}
