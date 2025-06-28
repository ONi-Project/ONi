import * as serverToOcGuard from "../ws/server-to-oc.types.guard"
import * as baseGuard from "../ws/base.types.guard"

console.log(serverToOcGuard.isAuthResponse({
    type: "AuthResponse",
    data: {
        uuid: "1234",
        name: "bot",
        token: "111",
        timeCreated: 114514,
        components: [],
        tasks: []
    }
})) // true

console.log(serverToOcGuard.isAuthResponse({
    type: "AuthResponse1",
    data: {
        uuid: "1234",
        name: "bot",
        token: "111",
        timeCreated: 114514,
        components: [],
        tasks: []
    }
})) // false

console.log(serverToOcGuard.isAuthResponse({
    type: "AuthResponse",
    data: {
        uuid: "1234",
        name: "bot",
        token: "111",
        timeCreated: 114514,
        components: [{
            description: "string",
            class: "string",
            uuid: "string",
            aaa: 111
        }],
        tasks: []
    }
})) // true

console.log(serverToOcGuard.isAuthResponse({
    type: "AuthResponse",
    data: {
        uuid: "1234",
        name: "bot",
        token: "111",
        timeCreated: 114514,
        components: [{
            description: "string",
            class: "string",
            aaa: 111
        }],
        tasks: []
    }
})) // false

