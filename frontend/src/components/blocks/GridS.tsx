import type { ReactNode } from "react"

interface GridSProps {
  children: ReactNode
}

export default function GridS({ children }: GridSProps) {
  return (
    <div className="grid-s grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
      {children}
    </div>
  )
}
