/* The file is generated by generate-union.ts. DO NOT EDIT MANUALLY! */

import type * as serverToWeb from "../ws/server-to-web.types"
import type * as webToServer from "../ws/web-to-server.types"
import type * as serverToOc from "../ws/server-to-oc.types"
import type * as ocToServer from "../ws/oc-to-server.types"
import type * as general from "../ws/general.types"

export type ServerToWeb = 
    | serverToWeb.AuthResponse
    | serverToWeb.DataMcServerStatusSet
    | serverToWeb.AeOrderResult
    | serverToWeb.LayoutOverview
    | serverToWeb.DataCommonInit
    | serverToWeb.DataCommonSet
    | serverToWeb.DataCommonAdd
    | serverToWeb.DataCommonRemove
    | serverToWeb.DataBotInit
    | serverToWeb.DataBotComponentsSet
    | serverToWeb.DataBotTasksSet
    | serverToWeb.DataBotAdd
    | serverToWeb.DataBotRemove
    | serverToWeb.DataAeInit
    | serverToWeb.DataAeItemsSet
    | serverToWeb.DataAeCpusSet
    | serverToWeb.DataAeLevelMaintainsSet
    | serverToWeb.DataAeAdd
    | serverToWeb.DataAeRemove
    | serverToWeb.DataEventInit
    | serverToWeb.DataEventSet
    | serverToWeb.DataEventAdd
    | serverToWeb.DataEventRemove
    | serverToWeb.DataRedstoneInit
    | serverToWeb.DataRedstoneSet
    | serverToWeb.DataRedstoneAdd
    | serverToWeb.DataRedstoneRemove
    | serverToWeb.StaticBotTask

export type WebToServer = 
    | webToServer.AuthRequest
    | webToServer.OcTaskRunSingle
    | webToServer.OcTaskAdd
    | webToServer.OcTaskRemove
    | webToServer.DataEventSet
    | webToServer.OcForward
    | webToServer.AeOrder
    | webToServer.RedstoneTask
    | webToServer.BotComponentUpdate
    | webToServer.DataAeLevelMaintainsSet

export type ServerToOc = 
    | serverToOc.AuthResponse
    | serverToOc.Task

export type OcToServer = 
    | ocToServer.AuthRequest
    | ocToServer.DataCommonSet
    | ocToServer.DataAeItemList
    | ocToServer.DataAeCpuList
    | ocToServer.AeOrderResult
    | ocToServer.DataEventAdd
    | ocToServer.DataEventSet
    | ocToServer.DataBotComponent
    | ocToServer.Log

export type General = 
    | general.Info
    | general.Warning
    | general.Error

export type All =
    | ServerToWeb
    | WebToServer
    | ServerToOc
    | OcToServer
    | General
