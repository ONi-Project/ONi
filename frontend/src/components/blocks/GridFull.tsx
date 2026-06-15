import type { ReactNode } from "react"

interface GridFullProps {
  children: ReactNode
}

export default function GridFull({ children }: GridFullProps) {
  return (
    <div className="grid-full w-full">
      {children}
    </div>
  )
}
