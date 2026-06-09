import type { ReactNode } from "react"

interface GridMProps {
  children: ReactNode
}

export default function GridM({ children }: GridMProps) {
  return (
    <div className="grid-m grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-4">
      {children}
    </div>
  )
}
