import { isOcMessage } from "../ws/base.types.guard"

describe("isOcMessage", () => {
    test("returns true for valid OcMessage", () => {
        const validOcMessage = {
            type: "validType",
            data: {},
            target: "validTarget"
        }
        expect(isOcMessage(validOcMessage)).toBe(true)
    })

    test("returns false for null", () => {
        expect(isOcMessage(null)).toBe(false)
    })

    test("returns false for undefined", () => {
        expect(isOcMessage(undefined)).toBe(false)
    })

    test("returns false for non-object", () => {
        expect(isOcMessage("string")).toBe(false)
        expect(isOcMessage(123)).toBe(false)
        expect(isOcMessage(true)).toBe(false)
        expect(isOcMessage([])).toBe(false)
        expect(isOcMessage(new Date())).toBe(false)
    })

    test("returns false for missing type property", () => {
        const missingType = {
            data: {},
            target: "validTarget"
        }
        expect(isOcMessage(missingType)).toBe(false)
    })

    test("returns false for non-string type property", () => {
        const nonStringType = {
            type: 123,
            data: {},
            target: "validTarget"
        }
        expect(isOcMessage(nonStringType)).toBe(false)
    })

    test("returns false for missing data property", () => {
        const missingData = {
            type: "validType",
            target: "validTarget"
        }
        expect(isOcMessage(missingData)).toBe(false)
    })

    test("returns false for missing target property", () => {
        const missingTarget = {
            type: "validType",
            data: {}
        }
        expect(isOcMessage(missingTarget)).toBe(false)
    })

    test("returns false for non-string target property", () => {
        const nonStringTarget = {
            type: "validType",
            data: {},
            target: 123
        }
        expect(isOcMessage(nonStringTarget)).toBe(false)
    })

    test("returns true for OcMessage with additional properties", () => {
        const additionalProperties = {
            type: "validType",
            data: {},
            target: "validTarget",
            extra: "extraData"
        }
        expect(isOcMessage(additionalProperties)).toBe(true)
    })
})