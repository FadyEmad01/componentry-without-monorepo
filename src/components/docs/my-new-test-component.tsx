import React from "react"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"
import { MyNewTestComponentDemo } from "@/components/docs/previews/my-new-test-component-preview"

const basicCode = `import { MyNewTestComponent } from "@/components/ui/my-new-test-component"

<MyNewTestComponent />`

export async function MyNewTestComponentDocs() {
  const sourceCode = (await readComponentSource("my-new-test-component")) || "// Unable to load source code"

  return (
    <DocsPageLayout
      title="My New Test Component"
      description="My New Test Component description."
      preview={<MyNewTestComponentDemo />}
      previewCode={basicCode}
      installPackageName="my-new-test-component"
      installDependencies="motion"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/my-new-test-component.tsx"
      usageCode={basicCode}
      props={[]}
    />
  )
}
