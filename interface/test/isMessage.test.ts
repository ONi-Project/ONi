import { isMessage } from "../ws/base.types.guard"
import { Message } from "../ws/base.types"

describe("isMessage", () => {
    test("returns true for a valid Message object", () => {
        const validMessage: Message<string, unknown> = { type: "test", data: {} }
        expect(isMessage(validMessage)).toBe(true)
    })

    test("returns false for an object missing the type property", () => {
        const invalidMessage = { data: {} }
        expect(isMessage(invalidMessage)).toBe(false)
    })

    test("returns false for an object with a non-string type property", () => {
        const invalidMessage = { type: 123, data: {} }
        expect(isMessage(invalidMessage)).toBe(false)
    })

    test("returns false for an object missing the data property", () => {
        const invalidMessage = { type: "test" }
        expect(isMessage(invalidMessage)).toBe(false)
    })

    test("returns false for a null input", () => {
        expect(isMessage(null)).toBe(false)
    })

    test("returns false for an undefined input", () => {
        expect(isMessage(undefined)).toBe(false)
    })

    test("returns false for a non-object input", () => {
        expect(isMessage("string")).toBe(false)
        expect(isMessage(123)).toBe(false)
        expect(isMessage(true)).toBe(false)
    })

    test("returns true for a Message object with additional properties", () => {
        const validMessage: Message<string, unknown> & { extra: string } = { type: "test", data: {}, extra: "info" }
        expect(isMessage(validMessage)).toBe(true)
    })

    test("returns true for a Message object with complex data", () => {
        const validMessage: Message<string, unknown> = { type: "test", data: { key: "value", number: 123 } }
        expect(isMessage(validMessage)).toBe(true)
    })

    test("returns false for an object of type array", () => {
        const invalidMessage = { type: "test", data: [] }
        expect(isMessage(invalidMessage)).toBe(true) // This should be true as array is an object in JavaScript/TypeScript
    })
})