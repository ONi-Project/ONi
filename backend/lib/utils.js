"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepEqual = deepEqual;
exports.performanceTimer = performanceTimer;
exports.send = send;
const logger_1 = require("./logger");
function deepEqual(obj1, obj2) {
    if (obj1 === obj2)
        return true;
    if (obj1 == null || obj2 == null || typeof obj1 !== 'object' || typeof obj2 !== 'object')
        return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length)
        return false;
    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key]))
            return false;
    }
    return true;
}
function performanceTimer(funcName, func) {
    const startTime = performance.now();
    const result = func();
    const endTime = performance.now();
    const duration = endTime - startTime;
    logger_1.loggerPerformance.log(`Function ${funcName} took ${duration} milliseconds.`);
    return result;
}
function send(session, message) {
    session.send(JSON.stringify(message));
}
