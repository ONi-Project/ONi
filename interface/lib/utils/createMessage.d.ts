import { allMessageType, messageTypeMap } from "../index.js";
export declare let newServerToWebMessage: <T extends "AuthResponse" | "DataMcServerStatusSet" | "AeOrderResult" | "LayoutOverview" | "DataCommonInit" | "DataCommonSet" | "DataCommonAdd" | "DataCommonRemove" | "DataBotInit" | "DataBotComponentsSet" | "DataBotTasksSet" | "DataBotAdd" | "DataBotRemove" | "DataAeInit" | "DataAeItemsSet" | "DataAeCpusSet" | "DataAeLevelMaintainsSet" | "DataAeAdd" | "DataAeRemove" | "DataEventInit" | "DataEventSet" | "DataEventAdd" | "DataEventRemove" | "DataRedstoneInit" | "DataRedstoneSet" | "DataRedstoneAdd" | "DataRedstoneRemove" | "StaticBotTask">(type: T, ...args: messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").AuthResponse, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataMcServerStatusSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").AeOrderResult, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").LayoutOverview, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataCommonInit, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataCommonSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataCommonAdd, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataCommonRemove, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataBotInit, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataBotComponentsSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataBotTasksSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataBotAdd, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataBotRemove, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataAeInit, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataAeItemsSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataAeCpusSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataAeLevelMaintainsSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataAeAdd, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataAeRemove, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataEventInit, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataEventSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataEventAdd, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataEventRemove, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataRedstoneInit, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataRedstoneSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataRedstoneAdd, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").DataRedstoneRemove, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web.js").StaticBotTask, {
    type: T;
}>> extends true ? [data: messageTypeMap.DataType<allMessageType.ServerToWeb>[T], target: messageTypeMap.TargetType<allMessageType.ServerToWeb>[T]] : [data: messageTypeMap.DataType<allMessageType.ServerToWeb>[T]]) => Extract<import("../ws/server-to-web.js").AuthResponse, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataMcServerStatusSet, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").AeOrderResult, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").LayoutOverview, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataCommonInit, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataCommonSet, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataCommonAdd, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataCommonRemove, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataBotInit, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataBotComponentsSet, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataBotTasksSet, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataBotAdd, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataBotRemove, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataAeInit, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataAeItemsSet, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataAeCpusSet, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataAeLevelMaintainsSet, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataAeAdd, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataAeRemove, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataEventInit, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataEventSet, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataEventAdd, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataEventRemove, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataRedstoneInit, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataRedstoneSet, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataRedstoneAdd, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").DataRedstoneRemove, {
    type: T;
}> | Extract<import("../ws/server-to-web.js").StaticBotTask, {
    type: T;
}>;
export declare let newWebToServerMessage: <T extends "DataAeLevelMaintainsSet" | "DataEventSet" | "AuthRequest" | "OcTaskRunSingle" | "OcTaskAdd" | "OcTaskRemove" | "OcForward" | "AeOrder" | "RedstoneTask" | "BotComponentUpdate">(type: T, ...args: messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server.js").AuthRequest, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server.js").OcTaskRunSingle, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server.js").OcTaskAdd, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server.js").OcTaskRemove, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server.js").DataEventSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server.js").OcForward, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server.js").AeOrder, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server.js").RedstoneTask, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server.js").BotComponentUpdate, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server.js").DataAeLevelMaintainsSet, {
    type: T;
}>> extends true ? [data: messageTypeMap.DataType<allMessageType.WebToServer>[T], target: messageTypeMap.TargetType<allMessageType.WebToServer>[T]] : [data: messageTypeMap.DataType<allMessageType.WebToServer>[T]]) => Extract<import("../ws/web-to-server.js").AuthRequest, {
    type: T;
}> | Extract<import("../ws/web-to-server.js").OcTaskRunSingle, {
    type: T;
}> | Extract<import("../ws/web-to-server.js").OcTaskAdd, {
    type: T;
}> | Extract<import("../ws/web-to-server.js").OcTaskRemove, {
    type: T;
}> | Extract<import("../ws/web-to-server.js").DataEventSet, {
    type: T;
}> | Extract<import("../ws/web-to-server.js").OcForward, {
    type: T;
}> | Extract<import("../ws/web-to-server.js").AeOrder, {
    type: T;
}> | Extract<import("../ws/web-to-server.js").RedstoneTask, {
    type: T;
}> | Extract<import("../ws/web-to-server.js").BotComponentUpdate, {
    type: T;
}> | Extract<import("../ws/web-to-server.js").DataAeLevelMaintainsSet, {
    type: T;
}>;
export declare let newServerToOcMessage: <T extends "AuthResponse" | "Task">(type: T, ...args: messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-oc.js").AuthResponse, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-oc.js").Task, {
    type: T;
}>> extends true ? [data: messageTypeMap.DataType<allMessageType.ServerToOc>[T], target: messageTypeMap.TargetType<allMessageType.ServerToOc>[T]] : [data: messageTypeMap.DataType<allMessageType.ServerToOc>[T]]) => Extract<import("../ws/server-to-oc.js").AuthResponse, {
    type: T;
}> | Extract<import("../ws/server-to-oc.js").Task, {
    type: T;
}>;
export declare let newOcToServerMessage: <T extends "AeOrderResult" | "DataCommonSet" | "DataEventSet" | "DataEventAdd" | "AuthRequest" | "DataAeItemList" | "DataAeCpuList" | "DataBotComponent" | "Log">(type: T, ...args: messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server.js").AuthRequest, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server.js").DataCommonSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server.js").DataAeItemList, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server.js").DataAeCpuList, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server.js").AeOrderResult, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server.js").DataEventAdd, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server.js").DataEventSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server.js").DataBotComponent, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server.js").Log, {
    type: T;
}>> extends true ? [data: messageTypeMap.DataType<allMessageType.OcToServer>[T], target: messageTypeMap.TargetType<allMessageType.OcToServer>[T]] : [data: messageTypeMap.DataType<allMessageType.OcToServer>[T]]) => Extract<import("../ws/oc-to-server.js").AuthRequest, {
    type: T;
}> | Extract<import("../ws/oc-to-server.js").DataCommonSet, {
    type: T;
}> | Extract<import("../ws/oc-to-server.js").DataAeItemList, {
    type: T;
}> | Extract<import("../ws/oc-to-server.js").DataAeCpuList, {
    type: T;
}> | Extract<import("../ws/oc-to-server.js").AeOrderResult, {
    type: T;
}> | Extract<import("../ws/oc-to-server.js").DataEventAdd, {
    type: T;
}> | Extract<import("../ws/oc-to-server.js").DataEventSet, {
    type: T;
}> | Extract<import("../ws/oc-to-server.js").DataBotComponent, {
    type: T;
}> | Extract<import("../ws/oc-to-server.js").Log, {
    type: T;
}>;
export declare let newGeneralMessage: <T extends "Info" | "Warning" | "Error">(type: T, ...args: messageTypeMap.IsOcMessage<Extract<import("../ws/general.js").Info, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/general.js").Warning, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/general.js").Error, {
    type: T;
}>> extends true ? [data: messageTypeMap.DataType<allMessageType.General>[T], target: messageTypeMap.TargetType<allMessageType.General>[T]] : [data: messageTypeMap.DataType<allMessageType.General>[T]]) => Extract<import("../ws/general.js").Info, {
    type: T;
}> | Extract<import("../ws/general.js").Warning, {
    type: T;
}> | Extract<import("../ws/general.js").Error, {
    type: T;
}>;
