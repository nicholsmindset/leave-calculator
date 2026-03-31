interface SchemaScriptProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: Record<string, any> | Array<Record<string, any>>
}

/** Renders a JSON-LD schema as a <script> tag. Use in Server Components. */
export default function SchemaScript({ schema }: SchemaScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
