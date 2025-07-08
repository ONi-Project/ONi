import { allMessageType } from "@oni/interface"
import { loggerPerformance } from "./logger.js"
import { SessionOc, SessionWeb } from "./interface.js"

export function deepEqual(obj1: any, obj2: any) {
    if (obj1 === obj2) return true
    if (obj1 == null || obj2 == null || typeof obj1 !== 'object' || typeof obj2 !== 'object') return false

    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) return false

    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false
    }

    return true
}

export function performanceTimer<T>(funcName: string, func: () => T): T {
    const startTime = performance.now()
    const result = func()
    const endTime = performance.now()
    const duration = endTime - startTime
    loggerPerformance.log(`Function ${funcName} took ${duration} milliseconds.`)
    return result
}

export function send(session: SessionWeb | SessionOc, message: allMessageType.All) {
    session.send(JSON.stringify(message))
}