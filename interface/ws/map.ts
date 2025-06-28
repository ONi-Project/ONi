import type * as base from "./base.types"
import type * as serverToWeb from "./server-to-web.types"
import type * as webToServer from "./web-to-server.types"
import type * as serverToOc from "./server-to-oc.types"
import type * as ocToServer from "./oc-to-server.types"

export type Base =
    | base.Message
    | base.OcMessage

export type ServerToClient =
    | serverToWeb.AuthResponse
    | serverToWeb.DataCommonSet
    | serverToWeb.DataBotSet
    | serverToWeb.DataAeSet
    | serverToWeb.DataMcServerStatusSet

export type ClientToServer =
    | webToServer.AuthRequest
    | webToServer.OcTaskAdd
    | webToServer.OcTaskRemove
    | webToServer.OcTaskRunSingle
    | webToServer.DataEventSet

export type ServerToOc =
    | serverToOc.AuthResponse
    | serverToOc.Task

export type OcToServer =
    | ocToServer.AuthRequest
    | ocToServer.DataCommonSet
    | ocToServer.DataAeItemList
    | ocToServer.DataAeCpuList
    | ocToServer.DataEventAdd
    | ocToServer.DataEventSet
    | ocToServer.DataBotComponent

export type All =
    | ServerToClient
    | ClientToServer
    | ServerToOc
    | OcToServer