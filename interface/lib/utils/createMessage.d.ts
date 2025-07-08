import { allMessageType, messageTypeMap } from "../index";
export declare let newServerToWebMessage: <T extends "AuthResponse" | "DataMcServerStatusSet" | "AeOrderResult" | "LayoutOverview" | "DataCommonInit" | "DataCommonSet" | "DataCommonAdd" | "DataCommonRemove" | "DataBotInit" | "DataBotComponentsSet" | "DataBotTasksSet" | "DataBotAdd" | "DataBotRemove" | "DataAeInit" | "DataAeItemsSet" | "DataAeCpusSet" | "DataAeLevelMaintainsSet" | "DataAeAdd" | "DataAeRemove" | "DataEventInit" | "DataEventSet" | "DataEventAdd" | "DataEventRemove" | "DataRedstoneInit" | "DataRedstoneSet" | "DataRedstoneAdd" | "DataRedstoneRemove" | "StaticBotTask">(type: T, ...args: messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").AuthResponse, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataMcServerStatusSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").AeOrderResult, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").LayoutOverview, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataCommonInit, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataCommonSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataCommonAdd, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataCommonRemove, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataBotInit, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataBotComponentsSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataBotTasksSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataBotAdd, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataBotRemove, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataAeInit, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataAeItemsSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataAeCpusSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataAeLevelMaintainsSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataAeAdd, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataAeRemove, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataEventInit, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataEventSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataEventAdd, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataEventRemove, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataRedstoneInit, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataRedstoneSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataRedstoneAdd, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").DataRedstoneRemove, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-web").StaticBotTask, {
    type: T;
}>> extends true ? [data: messageTypeMap.DataType<allMessageType.ServerToWeb>[T], target: messageTypeMap.TargetType<allMessageType.ServerToWeb>[T]] : [data: messageTypeMap.DataType<allMessageType.ServerToWeb>[T]]) => Extract<import("../ws/server-to-web").AuthResponse, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataMcServerStatusSet, {
    type: T;
}> | Extract<import("../ws/server-to-web").AeOrderResult, {
    type: T;
}> | Extract<import("../ws/server-to-web").LayoutOverview, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataCommonInit, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataCommonSet, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataCommonAdd, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataCommonRemove, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataBotInit, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataBotComponentsSet, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataBotTasksSet, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataBotAdd, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataBotRemove, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataAeInit, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataAeItemsSet, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataAeCpusSet, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataAeLevelMaintainsSet, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataAeAdd, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataAeRemove, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataEventInit, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataEventSet, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataEventAdd, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataEventRemove, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataRedstoneInit, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataRedstoneSet, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataRedstoneAdd, {
    type: T;
}> | Extract<import("../ws/server-to-web").DataRedstoneRemove, {
    type: T;
}> | Extract<import("../ws/server-to-web").StaticBotTask, {
    type: T;
}>;
export declare let newWebToServerMessage: <T extends "DataAeLevelMaintainsSet" | "DataEventSet" | "AuthRequest" | "OcTaskRunSingle" | "OcTaskAdd" | "OcTaskRemove" | "OcForward" | "AeOrder" | "RedstoneTask" | "BotComponentUpdate">(type: T, ...args: messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server").AuthRequest, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server").OcTaskRunSingle, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server").OcTaskAdd, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server").OcTaskRemove, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server").DataEventSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server").OcForward, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server").AeOrder, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server").RedstoneTask, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server").BotComponentUpdate, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/web-to-server").DataAeLevelMaintainsSet, {
    type: T;
}>> extends true ? [data: messageTypeMap.DataType<allMessageType.WebToServer>[T], target: messageTypeMap.TargetType<allMessageType.WebToServer>[T]] : [data: messageTypeMap.DataType<allMessageType.WebToServer>[T]]) => Extract<import("../ws/web-to-server").AuthRequest, {
    type: T;
}> | Extract<import("../ws/web-to-server").OcTaskRunSingle, {
    type: T;
}> | Extract<import("../ws/web-to-server").OcTaskAdd, {
    type: T;
}> | Extract<import("../ws/web-to-server").OcTaskRemove, {
    type: T;
}> | Extract<import("../ws/web-to-server").DataEventSet, {
    type: T;
}> | Extract<import("../ws/web-to-server").OcForward, {
    type: T;
}> | Extract<import("../ws/web-to-server").AeOrder, {
    type: T;
}> | Extract<import("../ws/web-to-server").RedstoneTask, {
    type: T;
}> | Extract<import("../ws/web-to-server").BotComponentUpdate, {
    type: T;
}> | Extract<import("../ws/web-to-server").DataAeLevelMaintainsSet, {
    type: T;
}>;
export declare let newServerToOcMessage: <T extends "AuthResponse" | "Task">(type: T, ...args: messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-oc").AuthResponse, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/server-to-oc").Task, {
    type: T;
}>> extends true ? [data: messageTypeMap.DataType<allMessageType.ServerToOc>[T], target: messageTypeMap.TargetType<allMessageType.ServerToOc>[T]] : [data: messageTypeMap.DataType<allMessageType.ServerToOc>[T]]) => Extract<import("../ws/server-to-oc").AuthResponse, {
    type: T;
}> | Extract<import("../ws/server-to-oc").Task, {
    type: T;
}>;
export declare let newOcToServerMessage: <T extends "AeOrderResult" | "DataCommonSet" | "DataEventSet" | "DataEventAdd" | "AuthRequest" | "DataAeItemList" | "DataAeCpuList" | "DataBotComponent" | "Log">(type: T, ...args: messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server").AuthRequest, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server").DataCommonSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server").DataAeItemList, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server").DataAeCpuList, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server").AeOrderResult, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server").DataEventAdd, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server").DataEventSet, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server").DataBotComponent, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/oc-to-server").Log, {
    type: T;
}>> extends true ? [data: messageTypeMap.DataType<allMessageType.OcToServer>[T], target: messageTypeMap.TargetType<allMessageType.OcToServer>[T]] : [data: messageTypeMap.DataType<allMessageType.OcToServer>[T]]) => Extract<import("../ws/oc-to-server").AuthRequest, {
    type: T;
}> | Extract<import("../ws/oc-to-server").DataCommonSet, {
    type: T;
}> | Extract<import("../ws/oc-to-server").DataAeItemList, {
    type: T;
}> | Extract<import("../ws/oc-to-server").DataAeCpuList, {
    type: T;
}> | Extract<import("../ws/oc-to-server").AeOrderResult, {
    type: T;
}> | Extract<import("../ws/oc-to-server").DataEventAdd, {
    type: T;
}> | Extract<import("../ws/oc-to-server").DataEventSet, {
    type: T;
}> | Extract<import("../ws/oc-to-server").DataBotComponent, {
    type: T;
}> | Extract<import("../ws/oc-to-server").Log, {
    type: T;
}>;
export declare let newGeneralMessage: <T extends "Info" | "Warning" | "Error">(type: T, ...args: messageTypeMap.IsOcMessage<Extract<import("../ws/general").Info, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/general").Warning, {
    type: T;
}>> | messageTypeMap.IsOcMessage<Extract<import("../ws/general").Error, {
    type: T;
}>> extends true ? [data: messageTypeMap.DataType<allMessageType.General>[T], target: messageTypeMap.TargetType<allMessageType.General>[T]] : [data: messageTypeMap.DataType<allMessageType.General>[T]]) => Extract<import("../ws/general").Info, {
    type: T;
}> | Extract<import("../ws/general").Warning, {
    type: T;
}> | Extract<import("../ws/general").Error, {
    type: T;
}>;
