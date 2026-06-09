import type { ReactNode } from "react"

interface GridLProps {
  children: ReactNode
}

export default function GridL({ children }: GridLProps) {
  return (
    <div className="grid-l grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] gap-4">
      {children}
    </div>
  )
}
