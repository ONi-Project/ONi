import { is } from "ts-runtime-checks"

import type { All } from "../ws/map"

export function validate<T extends All>(object: any) {
    return is<T>(object)
}