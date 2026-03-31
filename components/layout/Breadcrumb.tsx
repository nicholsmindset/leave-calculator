import Link from 'next/link'
import { breadcrumbSchema } from '@/lib/seo/schemas'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://leavecalculator.sg'

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items]

  const schema = breadcrumbSchema(
    allItems
      .filter((item) => item.href)
      .map((item) => ({
        name: item.label,
        url: `${BASE_URL}${item.href}`,
      }))
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="py-3">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-on-surface-variant">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1
            return (
              <li key={index} className="flex items-center gap-1">
                {index > 0 && (
                  <span className="material-symbols-outlined text-[14px] text-outline" aria-hidden="true">
                    chevron_right
                  </span>
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? 'text-on-surface font-medium' : ''}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
