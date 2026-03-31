'use client'

import { useState } from 'react'
import { faqPageSchema } from '@/lib/seo/schemas'

export interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
  title?: string
  includeSchema?: boolean
  className?: string
}

function FAQItem({ faq, index }: { faq: FAQItem; index: number }) {
  const [open, setOpen] = useState(false)
  const id = `faq-${index}`

  return (
    <div className="border-b border-outline-variant/30 last:border-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-btn`}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left hover:text-primary transition-colors"
      >
        <span className="font-headline font-semibold text-sm text-on-surface">
          {faq.question}
        </span>
        <span
          className={`material-symbols-outlined text-[20px] text-primary flex-shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>

      {open && (
        <div
          id={`${id}-panel`}
          role="region"
          aria-labelledby={`${id}-btn`}
          className="pb-4 text-sm text-on-surface-variant leading-relaxed"
        >
          {faq.answer}
        </div>
      )}
    </div>
  )
}

export default function FAQSection({
  faqs,
  title = 'Frequently Asked Questions',
  includeSchema = true,
  className = '',
}: FAQSectionProps) {
  const schema = includeSchema ? faqPageSchema(faqs) : null

  return (
    <section className={className} aria-labelledby="faq-heading">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <h2 id="faq-heading" className="font-headline font-bold text-xl text-on-surface mb-6">
        {title}
      </h2>

      <div className="card-surface divide-y-0">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} index={index} />
        ))}
      </div>
    </section>
  )
}
