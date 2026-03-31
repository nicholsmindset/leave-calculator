interface StepSectionProps {
  step: number
  title: string
  children: React.ReactNode
  className?: string
}

export default function StepSection({ step, title, children, className = '' }: StepSectionProps) {
  return (
    <div className={`card-surface space-y-4 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="step-badge" aria-hidden="true">{step}</span>
        <h3 className="font-headline font-bold text-base text-on-surface">{title}</h3>
      </div>
      {children}
    </div>
  )
}
