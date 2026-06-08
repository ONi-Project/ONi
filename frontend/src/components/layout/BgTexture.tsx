import { useWebSocketStore } from "../../stores/useWebSocketStore"

export default function BgTexture() {
  const connected = useWebSocketStore((s) => s.connected)

  return (
    <div
      id="bg-texture"
      style={{ opacity: connected ? 1 : 0.15, transition: "opacity 0.3s" }}
    >
      <img
        src="resources/texture_1.png"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          opacity: 0.08,
          pointerEvents: "none",
          userSelect: "none",
        }}
        hidden={!connected}
        alt=""
      />
      <img
        src="resources/texture_higan.png"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          opacity: 0.08,
          pointerEvents: "none",
          userSelect: "none",
        }}
        hidden={connected}
        alt=""
      />
    </div>
  )
}
