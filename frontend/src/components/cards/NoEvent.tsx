export default function NoEventCard() {
  return (
    <mdui-card variant="filled" className="card">
      <div className="flex flex-col items-center justify-center h-full p-8 opacity-50">
        <mdui-icon name="check_circle" className="text-[3rem]"></mdui-icon>
        <p>暂无事件</p>
      </div>
    </mdui-card>
  )
}

// Registry entry
export const noEventConfig = {
  component: NoEventCard,
}
