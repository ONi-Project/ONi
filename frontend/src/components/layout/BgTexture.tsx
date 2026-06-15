import { useWebSocketStore } from "../../stores/useWebSocketStore"

export default function BgTexture() {
  const connected = useWebSocketStore((s) => s.connected)

  return (
    <div
      id="bg-texture"
      className="z-[-1]" 
      style={{ opacity: connected ? 0.01 : 0.025 }}
    >
      <img
        src="resources/texture_higan.png"
        className="fixed top-0 left-0 w-full h-full object-cover -z-1 opacity-8 pointer-events-none select-none"
        style={{ opacity: !connected ? 1 : 0, transition: "opacity 0.5s" }}
        hidden={connected}
        alt=""
      />
      <img
        src="resources/texture_1.png"
        className="fixed top-0 left-0 w-full h-full object-cover -z-1 opacity-8 pointer-events-none select-none"
        style={{ opacity: connected ? 0.5 : 0, transition: "opacity 0.5s" }}
        hidden={!connected}
        alt=""
      />
    </div>
  )
}
