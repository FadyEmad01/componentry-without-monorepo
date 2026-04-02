import { readFile, writeFile, mkdir } from "node:fs/promises"
import path from "node:path"

type RegistryIndex = {
  $schema?: string
  name: string
  homepage: string
  items: Array<{
    name: string
    type: string
    title?: string
    description?: string
    dependencies?: string[]
    files: Array<{ path: string; type: string }>
  }>
}

function toSlug(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function toTitle(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w[0]!.toUpperCase() + w.slice(1))
    .join(" ")
}

async function ensureDir(dir: string) {
  await mkdir(dir, { recursive: true })
}

async function main() {
  const rawName = process.argv[2]
  if (!rawName) {
    console.error("Usage: node scripts/generate-component.mts <component-name-or-slug>")
    process.exit(1)
  }

  const slug = toSlug(rawName)
  const title = toTitle(slug)

  const repoRoot = process.cwd()
  const registryDir = path.join(repoRoot, "src", "components", "docs", "registry")
  const previewsDir = path.join(repoRoot, "src", "components", "docs", "previews")
  const docsDir = path.join(repoRoot, "src", "components", "docs")
  const publicRDir = path.join(repoRoot, "public", "r")

  await Promise.all([ensureDir(registryDir), ensureDir(previewsDir), ensureDir(publicRDir)])

  // 1) Component implementation (placeholder)
  const componentTsxRel = `src/registry/default/${slug}/${slug}.tsx`
  const componentTsxAbs = path.join(repoRoot, componentTsxRel)
  const componentTsx = `"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ${title.replace(/\s/g, "")}Props {
  className?: string
}

export function ${title.replace(/\s/g, "")}({ className }: ${title.replace(/\s/g, "")}Props) {
  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      <div className="rounded-xl border border-border/50 bg-background px-4 py-3 text-sm text-muted-foreground">
        ${title} (preview)
      </div>
    </div>
  )
}
`

  // 2) Preview wrapper
  const previewName = `${title.replace(/\s/g, "")}Demo`
  const previewTsxAbs = path.join(previewsDir, `${slug}-preview.tsx`)
  const previewTsx = `"use client"

import { ${title.replace(/\s/g, "")} } from "@/registry/default/${slug}/${slug}"

export function ${previewName}() {
  return (
    <div className="w-full h-full">
      <${title.replace(/\s/g, "")} />
    </div>
  )
}
`

  // 3) Docs page
  const docsTsxAbs = path.join(docsDir, `${slug}.tsx`)
  const usageCode = `import { ${title.replace(/\s/g, "")} } from "@/components/ui/${slug}"

<${title.replace(/\s/g, "")} />`
  const docsTsx = `import React from "react"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"
import { ${previewName} } from "@/components/docs/previews/${slug}-preview"

const basicCode = \`${usageCode}\`

export async function ${title.replace(/\s/g, "")}Docs() {
  const sourceCode = (await readComponentSource("${slug}")) || "// Unable to load source code"

  return (
    <DocsPageLayout
      title="${title}"
      description="${title} description."
      preview={<${previewName} />}
      previewCode={basicCode}
      installPackageName="${slug}"
      installDependencies="motion"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/${slug}.tsx"
      usageCode={basicCode}
      props={[]}
    />
  )
}
`

  // 4) Registry item JSON (with embedded content)
  const registryItemAbs = path.join(publicRDir, `${slug}.json`)
  const registryItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: slug,
    type: "registry:block",
    title,
    description: `${title} description.`,
    dependencies: [],
    files: [
      {
        path: componentTsxRel,
        type: "registry:block",
        content: componentTsx,
      },
    ],
  }

  // 5) Registry index update
  const registryIndexAbs = path.join(repoRoot, "registry.json")
  const indexRaw = await readFile(registryIndexAbs, "utf8")
  const index = JSON.parse(indexRaw) as RegistryIndex

  const exists = index.items.some((i) => i.name === slug)
  if (!exists) {
    index.items.push({
      name: slug,
      type: "registry:block",
      title,
      description: `${title} description.`,
      dependencies: [],
      files: [{ path: componentTsxRel, type: "registry:block" }],
    })
    index.items.sort((a, b) => a.name.localeCompare(b.name))
  }

  // Write files (do not overwrite existing component/doc files)
  const writes: Array<Promise<void>> = []

  async function writeIfMissing(file: string, content: string) {
    try {
      await readFile(file, "utf8")
      console.log(`skip (exists): ${path.relative(repoRoot, file)}`)
    } catch {
      await writeFile(file, content, "utf8")
      console.log(`created: ${path.relative(repoRoot, file)}`)
    }
  }

  writes.push(writeIfMissing(componentTsxAbs, componentTsx))
  writes.push(writeIfMissing(previewTsxAbs, previewTsx))
  writes.push(writeIfMissing(docsTsxAbs, docsTsx))
  writes.push(writeFile(registryItemAbs, JSON.stringify(registryItem, null, 2) + "\n", "utf8").then(() => {
    console.log(`wrote: ${path.relative(repoRoot, registryItemAbs)}`)
  }))
  writes.push(writeFile(registryIndexAbs, JSON.stringify(index, null, 2) + "\n", "utf8").then(() => {
    console.log(`updated: ${path.relative(repoRoot, registryIndexAbs)}`)
  }))

  await Promise.all(writes)

  console.log("")
  console.log("Next steps:")
  console.log(`- Add docs importer in src/components/docs/lazy-registry.ts for "${slug}"`)
  console.log(`- Add metadata entry in src/registry/index.ts for "${slug}" (title/description/category/media)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

