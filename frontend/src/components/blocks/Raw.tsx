import type { ReactNode } from "react"

interface RawProps {
  children: ReactNode
}

export default function Raw({ children }: RawProps) {
  return <div className="grid-raw">{children}</div>
}
