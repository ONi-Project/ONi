"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yaml_1 = __importDefault(require("yaml"));
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("./global/index"));
const server_1 = __importDefault(require("./server"));
const logger_1 = __importDefault(require("./logger"));
const logger_2 = require("./logger");
const websocket_1 = __importDefault(require("./websocket"));
const mcServerStatus_1 = __importDefault(require("./task/mcServerStatus"));
logger_2.loggerMain.level = "TRACE";
logger_2.loggerMain.info("Starting ONi...");
var config;
try {
    config = yaml_1.default.parse(fs_1.default.readFileSync('./config.yml', 'utf8'));
}
catch (error) {
    if (!fs_1.default.existsSync('./config.yml')) {
        logger_2.loggerMain.warn("Config file not found, creating default config...");
        fs_1.default.copyFileSync('./config.yml.default', './config.yml');
        config = yaml_1.default.parse(fs_1.default.readFileSync('./config.yml', 'utf8'));
    }
    else {
        logger_2.loggerMain.error("Failed to load config file, check the file and try again.");
        logger_2.loggerMain.error(error);
        process.exit(1);
    }
}
logger_2.loggerMain.level = config.log_level;
logger_2.loggerMain.info("Config file loaded.");
logger_2.loggerMain.trace("config", config);
// 初始化模块
const initializeModule = (module, moduleName) => {
    try {
        module.init(config);
        logger_2.loggerMain.info(`${moduleName} module initialized.`);
    }
    catch (error) {
        logger_2.loggerMain.error(`Failed to initialize ${moduleName.toLowerCase()} module, please check the log.`);
        logger_2.loggerMain.error(error);
        process.exit(1);
    }
};
initializeModule(logger_1.default, 'Logger');
initializeModule(index_1.default, 'Global');
initializeModule(server_1.default, 'Server');
initializeModule(websocket_1.default, 'Websocket');
// 启动定时任务
mcServerStatus_1.default.init(config);
// setInterval(() => wsOcBroadcast("task", [{ "task": "component", "interval": -1, "config": {} }]), 5000)
