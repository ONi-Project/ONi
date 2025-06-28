import { Message, OcMessage, } from "../ws/base.types.js"

export type DataType<T extends Message<string, any>> = {
    [K in T["type"]]:
        Extract<T, { type: K }> extends Message<K, infer D>
            ? D
            : never
}

export type TargetType<T extends Message<string, any>> = {
    [K in T["type"]]:
        Extract<T, { type: K }> extends OcMessage<K, any, infer Target>
            ? Target
            : never
}

export type IsOcMessage<T> = T extends OcMessage<string, any, any> ? true : false