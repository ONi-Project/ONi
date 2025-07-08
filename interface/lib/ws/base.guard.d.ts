import { Message, OcMessage } from "./base";
export declare function isMessage(obj: unknown): obj is Message<string, unknown>;
export declare function isOcMessage(obj: unknown): obj is OcMessage<string, unknown, string>;
