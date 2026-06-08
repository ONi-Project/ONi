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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "0.5rem",
          gap: "0.5rem",
        }}
      >
        <mdui-button-icon
          icon="arrow_back"
          className="ae__edit-back"
          onClick={onBack}
        ></mdui-button-icon>
        <div style={{ fontWeight: "bold", fontSize: "large" }}>
          编辑 - {aeData.name}
        </div>
      </div>

      <div className="grid-full">
        <mdui-card className="card" variant="filled">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <mdui-icon
              name="grid_on--outlined"
              style={{ fontSize: "2rem" }}
            ></mdui-icon>
            <div>
              <div style={{ fontSize: "larger", whiteSpace: "nowrap" }}>
                <b>{aeData.name}</b>
              </div>
            </div>
            <mdui-divider
              vertical
              style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
            ></mdui-divider>
            <div>
              <div className="ae__overview-time-updated" style={{ opacity: 1 }}>
                ...
              </div>
              <div style={{ opacity: 0.25, fontSize: "smaller" }}>
                {aeData.uuid}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
              marginTop: "0.25rem",
            }}
          >
            <div style={{ display: "flex", opacity: 0.75, gap: "0.5rem" }}>
              <mdui-icon name="schedule"></mdui-icon>
              <div className="ae__overview-time-created">...</div>
            </div>
            <div style={{ display: "flex", opacity: 0.75, gap: "0.5rem" }}>
              <mdui-icon name="memory"></mdui-icon>
              <div className="ae__overview-cpu-status">...</div>
            </div>
            <div style={{ display: "flex", opacity: 0.75, gap: "0.5rem" }}>
              <mdui-icon name="category"></mdui-icon>
              <div className="ae__overview-maintain">...</div>
            </div>
          </div>
        </mdui-card>
      </div>

      <div className="grid-l">
        <mdui-card className="card" variant="filled" style={{ gap: "0.5rem" }}>
          <div
            className="card-title"
            style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center" }}
          >
            <mdui-icon
              name="grading"
              style={{ fontSize: "28px", marginRight: "0.5rem", alignSelf: "center" }}
            ></mdui-icon>
            <div>库存维持</div>
          </div>

          <div
            className="ae__maintain-list"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            {usedList.length > 0 ? (
              usedList.map((maintain: any, i: number) => (
                <mdui-card
                  key={maintain.uuid || i}
                  style={{ paddingBottom: "0.5rem", gap: "0.5rem" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "1rem",
                      marginBottom: "-1rem",
                    }}
                  >
                    <mdui-icon
                      style={{ marginLeft: "0.25rem" }}
                      name="receipt_long"
                    ></mdui-icon>
                    <div>
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "large",
                          marginLeft: "0.25rem",
                        }}
                      >
                        队列 #{i + 1}
                      </div>
                    </div>
                    {editMode && (
                      <mdui-button-icon
                        style={{ marginLeft: "auto" }}
                        icon="settings"
                      ></mdui-button-icon>
                    )}
                    <mdui-switch
                      style={{
                        marginRight: "0.25rem",
                        ...(editMode ? {} : { marginLeft: "auto" }),
                      }}
                      checked={maintain.enabled}
                      onClick={() => handleToggle(i)}
                    ></mdui-switch>
                  </div>

                  <mdui-list style={{ marginLeft: "1rem", marginRight: "1rem" }}>
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
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                            }}
                          >
                            <img
                              src={`${picSource}/${item.type}/${item.id}_${item.damage}.png`}
                              style={{ height: "3rem" }}
                              alt=""
                            />
                            <div>
                              <div>{item.display}</div>
                              <div style={{ fontSize: "smaller", opacity: 0.5 }}>
                                {info}
                              </div>
                            </div>
                            {editMode ? (
                              <>
                                <mdui-text-field
                                  value={item.request}
                                  type="number"
                                  style={{ width: "8rem", marginLeft: "auto" }}
                                  variant="outlined"
                                  label="单次请求量"
                                  onChange={(e: any) =>
                                    handleUpdateRequest(i, ii, parseInt(e.target.value))
                                  }
                                ></mdui-text-field>
                                <mdui-text-field
                                  value={item.amount}
                                  type="number"
                                  style={{ width: "8rem" }}
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
                              <div style={{ opacity: 0.5, textAlign: "right", marginLeft: "auto" }}>
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
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            cursor: "pointer",
                          }}
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
              <div style={{ opacity: 0.5, textAlign: "center", padding: "2rem" }}>
                暂无库存维持配置
              </div>
            )}
          </div>

          {!editMode ? (
            <div
              className="ae__edit-maintain-before-edit"
              style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}
            >
              <mdui-chip elevated style={{ marginRight: "auto" }} onClick={handleEdit}>
                编辑
                <mdui-icon slot="icon" name="edit"></mdui-icon>
              </mdui-chip>
            </div>
          ) : (
            <div
              className="ae__edit-maintain-after-edit"
              style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}
            >
              <mdui-chip elevated onClick={handleApply}>
                应用
                <mdui-icon slot="icon" name="done"></mdui-icon>
              </mdui-chip>
              <mdui-chip elevated onClick={handleCancel}>
                取消
                <mdui-icon slot="icon" name="close"></mdui-icon>
              </mdui-chip>
              <mdui-chip elevated style={{ marginRight: "auto" }} onClick={handleAdd}>
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
            style={{
              backgroundColor: "rgb(var(--mdui-color-error-container))",
              marginRight: "auto",
              marginTop: "0.5rem",
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
