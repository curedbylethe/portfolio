export interface ProgressItem {
  label: string
  detail: string
  value: string
  context: string
  progress?: number
}

export default function Progress({ items }: { items: ProgressItem[] }) {
  return (
    <ul className="fp-progress" aria-label="Acceptance criteria measurements">
      {items.map((item) => (
        <li className="fp-progress-item" key={item.label}>
          <span className="fp-progress-label">
            {item.label}
            <small>{item.detail}</small>
          </span>
          <span className="fp-progress-value">
            {item.value}
            <small>{item.context}</small>
          </span>
          {item.progress !== undefined && (
            <span
              className="fp-progress-track"
              role="progressbar"
              aria-label={`${item.label} progress`}
              aria-valuetext={`${item.value} ${item.context}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={item.progress}
            >
              <span className="fp-progress-bar" style={{ width: `${item.progress}%` }} />
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
