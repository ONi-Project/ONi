import type { Message, OcMessage } from "./base.types"
import type { aeModel, botModel, eventModel, redstoneModel } from "../index"

export type AuthRequest = Message<"AuthRequest", {
    token: string
}>

export type OcTaskRunSingle = OcMessage<"OcTaskRunSingle", botModel.BotTask, string>

export type OcTaskAdd = OcMessage<"OcTaskAdd", botModel.BotTask, string>

export type OcTaskRemove = OcMessage<"OcTaskRemove", botModel.BotTask, string>

export type DataEventSet = Message<"DataEventSet", {
    uuid: string
    name?: string
    description?: string
    priority?: number
    status?: number
    timestamp?: number
}>

export type OcForward = OcMessage<"OcForward", unknown, string>

export type AeOrder = Message<"AeOrder", aeModel.AeOrder>

export type RedstoneTask = Message<"RedstoneTask", {
    uuid: string
    taskUuid: string
    value: number
}>

export type BotComponentUpdate = Message<"BotComponentUpdate", {
    uuid: string
    taskUuid: string
}>

export type DataAeLevelMaintainsSet = Message<"DataAeLevelMaintainsSet", {
    uuid: string,
    levelMaintains: aeModel.AeLevelMaintain[]
}>