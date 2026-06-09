import { useState, useEffect } from "react"
import { useDataStore } from "../../stores/useDataStore"
import { sendMessage } from "../../hooks/useWebSocket"
import { newWebToServerMessage } from "@oni/interface"
import { randomUUID } from "../../lib/utils"

const picSource = "https://akyuu.cn/oni/itempanel"

interface AeEditProps {
  uuid: string
  onBack: () => void
}

export default function AeEdit({ uuid, onBack }: AeEditProps) {
  const ae = useDataStore((s) => s.ae)
  const targetAe = ae.find((a) => a.uuid === uuid)

  const [editMode, setEditMode] = useState(false)
  const [previews, setPreviews] = useState<any[]>([])

  useEffect(() => {
    if (targetAe) {
      setPreviews(JSON.parse(JSON.stringify(targetAe.levelMaintains || [])))
    }
  }, [targetAe?.levelMaintains])

  if (!targetAe) {
    return <div>AE 网络未找到</div>
  }

  const aeData = targetAe
  const usedList = editMode ? previews : (aeData.levelMaintains || [])

  const handleEdit = () => {
    setEditMode(true)
    setPreviews(JSON.parse(JSON.stringify(aeData.levelMaintains || [])))
  }

  const handleApply = () => {
    sendMessage(
      newWebToServerMessage("DataAeLevelMaintainsSet", {
        uuid,
        levelMaintains: previews,
      })
    )
    setEditMode(false)
  }

  const handleCancel = () => {
    setEditMode(false)
    setPreviews(JSON.parse(JSON.stringify(aeData.levelMaintains || [])))
  }

  const handleAdd = () => {
    setPreviews((prev) => [
      ...prev,
      { uuid: randomUUID(), enabled: false, list: [] },
    ])
  }

  const handleToggle = (i: number) => {
    if (editMode) {
      setPreviews((prev) => {
        const copy = [...prev]
        copy[i] = { ...copy[i], enabled: !copy[i].enabled }
        return copy
      })
    } else {
      const updated = [...(aeData.levelMaintains || [])]
      updated[i] = { ...updated[i], enabled: !updated[i].enabled }
      sendMessage(
        newWebToServerMessage("DataAeLevelMaintainsSet", {
          uuid,
          levelMaintains: updated,
        })
      )
    }
  }

  const handleRemoveItem = (i: number, ii: number) => {
    setPreviews((prev) => {
      const copy = [...prev]
      copy[i] = {
        ...copy[i],
        list: copy[i].list.filter((_: any, idx: number) => idx !== ii),
      }
      return copy
    })
  }

  const handleAddItem = async (i: number) => {
    const fn = (window as any).selectItem
    if (!fn) return
    try {
      const item = await fn(aeData)
      setPreviews((prev) => {
        const copy = [...prev]
        copy[i] = {
          ...copy[i],
          list: [
            ...copy[i].list,
            {
              id: item.id,
              damage: item.damage,
              name: item.name,
              type: item.type,
              display: item.display,
              amount: 1,
              request: 1,
            },
          ],
        }
        return copy
      })
    } catch {
      // User cancelled
    }
  }

  const handleUpdateRequest = (i: number, ii: number, value: number) => {
    setPreviews((prev) => {
      const copy = JSON.parse(JSON.stringify(prev))
      copy[i].list[ii].request = value
      return copy
    })
  }

  const handleUpdateAmount = (i: number, ii: number, value: number) => {
    setPreviews((prev) => {
      const copy = JSON.parse(JSON.stringify(prev))
      copy[i].list[ii].amount = value
      return copy
    })
  }

  return (
    <div className="ae__edit">
      <div className="flex items-center mb-2 gap-2">
        <mdui-button-icon
          icon="arrow_back"
          onClick={onBack}
        ></mdui-button-icon>
        <div className="font-bold text-lg">
          编辑 - {aeData.name}
        </div>
      </div>

      <div className="grid-full">
        <mdui-card className="card" variant="filled">
          <div className="flex items-center gap-2">
            <mdui-icon
              name="grid_on--outlined"
              className="text-[2rem]"
            ></mdui-icon>
            <div>
              <div className="text-lg whitespace-nowrap">
                <b>{aeData.name}</b>
              </div>
            </div>
            <mdui-divider
              vertical
              className="ml-2 mr-2"
            ></mdui-divider>
            <div>
              <div className="opacity-100">...</div>
              <div className="opacity-25 text-sm">
                {aeData.uuid}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <div className="flex opacity-75 gap-2">
              <mdui-icon name="schedule"></mdui-icon>
              <div>...</div>
            </div>
            <div className="flex opacity-75 gap-2">
              <mdui-icon name="memory"></mdui-icon>
              <div>...</div>
            </div>
            <div className="flex opacity-75 gap-2">
              <mdui-icon name="category"></mdui-icon>
              <div>...</div>
            </div>
          </div>
        </mdui-card>
      </div>

      <div className="grid-l">
        <mdui-card className="card" variant="filled" style={{ gap: "0.5rem" }}>
          <div className="card-title mb-2 flex items-center">
            <mdui-icon
              name="grading"
              className="text-[28px] mr-2 self-center"
            ></mdui-icon>
            <div>库存维持</div>
          </div>

          <div className="flex flex-col gap-4 mb-4">
            {usedList.length > 0 ? (
              usedList.map((maintain: any, i: number) => (
                <mdui-card style={{ paddingBottom: "0.5rem" }}>
                  <div className="flex items-center gap-2 p-4 -mb-4">
                    <mdui-icon
                      className="ml-1"
                      name="receipt_long"
                    ></mdui-icon>
                    <div>
                      <div className="font-bold text-lg ml-1">
                        队列 #{i + 1}
                      </div>
                    </div>
                    {editMode && (
                      <mdui-button-icon
                        className="ml-auto"
                        icon="settings"
                      ></mdui-button-icon>
                    )}
                    <mdui-switch
                      className="mr-1"
                      style={editMode ? {} : { marginLeft: "auto" }}
                      checked={maintain.enabled}
                      onClick={() => handleToggle(i)}
                    ></mdui-switch>
                  </div>

                  <mdui-list className="mx-4">
                    {maintain.list.map((item: any, ii: number) => {
                      const currentItem = aeData.items?.find(
                        (_: any) => _.id === item.id && _.damage === item.damage
                      )
                      const current = currentItem?.amount || 0
                      let info = ""
                      if (editMode) {
                        info = item.name
                      } else if (current > item.amount) {
                        info = "已达到库存维持数量"
                      } else {
                        info = "请求中..."
                      }

                      return (
                        <mdui-list-item key={ii}>
                          <div className="flex items-center gap-3">
                            <img
                              src={`${picSource}/${item.type}/${item.id}_${item.damage}.png`}
                              className="h-12"
                              alt=""
                            />
                            <div>
                              <div>{item.display}</div>
                              <div className="text-sm opacity-50">
                                {info}
                              </div>
                            </div>
                            {editMode ? (
                              <>
                                <mdui-text-field
                                  value={item.request}
                                  type="number"
                                  className="w-32 ml-auto"
                                  variant="outlined"
                                  label="单次请求量"
                                  onChange={(e: any) =>
                                    handleUpdateRequest(i, ii, parseInt(e.target.value))
                                  }
                                ></mdui-text-field>
                                <mdui-text-field
                                  value={item.amount}
                                  type="number"
                                  className="w-32"
                                  variant="outlined"
                                  label="维持总量"
                                  onChange={(e: any) =>
                                    handleUpdateAmount(i, ii, parseInt(e.target.value))
                                  }
                                ></mdui-text-field>
                                <mdui-button-icon
                                  icon="clear"
                                  onClick={() => handleRemoveItem(i, ii)}
                                ></mdui-button-icon>
                              </>
                            ) : (
                              <div className="opacity-50 text-right ml-auto">
                                {current} / {item.amount}
                              </div>
                            )}
                          </div>
                        </mdui-list-item>
                      )
                    })}

                    {editMode && (
                      <mdui-list-item>
                        <div
                          className="flex items-center gap-3 cursor-pointer"
                          onClick={() => handleAddItem(i)}
                        >
                          <mdui-icon name="add"></mdui-icon>
                          添加...
                        </div>
                      </mdui-list-item>
                    )}
                  </mdui-list>
                </mdui-card>
              ))
            ) : (
              <div className="opacity-50 text-center p-8">
                暂无库存维持配置
              </div>
            )}
          </div>

          {!editMode ? (
            <div className="flex gap-2 flex-wrap mt-2">
              <mdui-chip elevated className="mr-auto" onClick={handleEdit}>
                编辑
                <mdui-icon slot="icon" name="edit"></mdui-icon>
              </mdui-chip>
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap mt-2">
              <mdui-chip elevated onClick={handleApply}>
                应用
                <mdui-icon slot="icon" name="done"></mdui-icon>
              </mdui-chip>
              <mdui-chip elevated onClick={handleCancel}>
                取消
                <mdui-icon slot="icon" name="close"></mdui-icon>
              </mdui-chip>
              <mdui-chip elevated className="mr-auto" onClick={handleAdd}>
                添加
                <mdui-icon slot="icon" name="add"></mdui-icon>
              </mdui-chip>
            </div>
          )}
        </mdui-card>

        <mdui-card className="card" variant="filled">
          <div className="card-title">操作</div>
          <mdui-chip
            elevated
            className="mr-auto mt-2"
            style={{
              backgroundColor: "rgb(var(--mdui-color-error-container))",
            }}
          >
            删除 {aeData.name}
            <mdui-icon slot="icon" name="delete"></mdui-icon>
          </mdui-chip>
        </mdui-card>
      </div>
    </div>
  )
}
