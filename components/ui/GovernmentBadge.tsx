interface GovernmentBadgeProps {
  href?: string
  label?: string
  className?: string
}

export default function GovernmentBadge({
  href = 'https://www.mom.gov.sg/employment-practices/leave',
  label = 'Based on MOM 2026 guidelines',
  className = '',
}: GovernmentBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`gov-badge inline-flex ${className}`}
      aria-label={`${label} — opens Ministry of Manpower website`}
    >
      <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
        verified
      </span>
      {label}
    </a>
  )
}
