import type { ReactNode } from "react"

interface GridMProps {
  children: ReactNode
}

export default function GridM({ children }: GridMProps) {
  return (
    <div
      className="grid-m"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(22rem, 1fr))",
        gap: "1rem",
      }}
    >
      {children}
    </div>
  )
}
