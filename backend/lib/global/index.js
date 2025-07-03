"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const bot_1 = __importDefault(require("./bot"));
const ae_1 = __importDefault(require("./ae"));
const common_1 = __importDefault(require("./common"));
const redstone_1 = __importDefault(require("./redstone"));
const event_1 = __importDefault(require("./event"));
const mcServerStatus_1 = __importDefault(require("./mcServerStatus"));
const staticResources_1 = __importDefault(require("./staticResources"));
let Global = {
    user: user_1.default,
    bot: bot_1.default,
    ae: ae_1.default,
    common: common_1.default,
    redstone: redstone_1.default,
    event: event_1.default,
    mcServerStatus: mcServerStatus_1.default,
    staticResources: staticResources_1.default,
    init(config) {
        user_1.default.init(config);
        bot_1.default.init(config);
        ae_1.default.init(config);
        common_1.default.init(config);
        redstone_1.default.init(config);
        event_1.default.init(config);
        mcServerStatus_1.default.init(config);
        staticResources_1.default.init(config);
    }
};
exports.default = Global;
