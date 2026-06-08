import type { ReactNode } from "react"

interface GridSProps {
  children: ReactNode
}

export default function GridS({ children }: GridSProps) {
  return (
    <div
      className="grid-s"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
        gap: "1rem",
      }}
    >
      {children}
    </div>
  )
}
