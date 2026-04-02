import { readFile } from "node:fs/promises"
import path from "node:path"

type RegistryFile = { path: string; type: string; content?: string }
type RegistryItem = { files?: RegistryFile[] } | { default?: { files?: RegistryFile[] } }

// Cache for source code - persists across renders
const sourceCache = new Map<string, string | null>()

function extractFirstFileContent(registry: RegistryItem): string | null {
  // Support both "registry-item.json" and module-wrapped JSON shapes.
  // (Some bundlers wrap JSON in a { default: ... } export.)
  const anyRegistry = registry as unknown as { files?: RegistryFile[]; default?: { files?: RegistryFile[] } }

  const files = anyRegistry.files ?? anyRegistry.default?.files
  const first = files?.[0]
  return typeof first?.content === "string" ? first.content : null
}

/**
 * Read component source code from `public/r/<name>.json` with caching.
 *
 * This matches the shadcn registry convention of serving registry item JSON
 * from a public `r/` folder (or equivalent endpoint).
 */
export async function readComponentSource(componentName: string): Promise<string | null> {
  const cached = sourceCache.get(componentName)
  if (cached !== undefined) return cached

  try {
    const filename = path.join(process.cwd(), "public", "r", `${componentName}.json`)
    const raw = await readFile(filename, "utf8")
    const registry = JSON.parse(raw) as RegistryItem
    const content = extractFirstFileContent(registry)
    sourceCache.set(componentName, content)
    return content
  } catch (error) {
    console.error(`Error reading registry JSON for ${componentName}:`, error)
    sourceCache.set(componentName, null)
    return null
  }
}

export async function preloadComponentSources(componentNames: string[]): Promise<void> {
  await Promise.all(componentNames.map((name) => readComponentSource(name)))
}
