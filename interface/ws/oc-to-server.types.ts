import type { Message } from "./base.types"
import { aeModel, botModel, commonModel, eventModel } from "../index"

export type AuthRequest = Message<"AuthRequest", {
    token: string
}>

export type DataCommonSet = Message<"DataCommonSet", {
    uuid: string
    name?: string
    description?: string
    unit?: string
    min?: number
    max?: number
    value?: number
    avgIO?: number
}>

export type DataAeItemList = Message<"DataAeItemList", {
    uuid: string
    items: {
        type: "item" | "fluid" | "vis"
        craftable: boolean
        name: string
        damage?: number
        amount: number
    }[]
}>

export type DataAeCpuList = Message<"DataAeCpuList", {
    uuid: string
    cpus: aeModel.AeCpu[]
}>

export type AeOrderResult = Message<"AeOrderResult", aeModel.AeOrderResult>

export type DataEventAdd = Message<"DataEventAdd", eventModel.Event>

export type DataEventSet = Message<"DataEventSet", {
    uuid: string
    name?: string
    description?: string
    priority?: number
    status?: number
    timestamp?: number
}>

export type DataBotComponent = Message<"DataBotComponent", {
    uuid: string
    components: botModel.BotComponent[]
}>

export type Log = Message<"Log", {
    level: string
    message: string
    file: string
    location: string
    taskUuid: string
}>
