"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ejs_1 = __importDefault(require("ejs"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
const websocket_1 = require("./websocket");
const logger_1 = require("./logger");
const interface_1 = require("@oni/interface");
let Server = {
    init(config) {
        const app = (0, express_1.default)();
        const server = http_1.default.createServer(app);
        server.on("upgrade", (request, socket, head) => {
            if (request.url === "/ws/web") {
                websocket_1.wssWeb.handleUpgrade(request, socket, head, (ws) => {
                    websocket_1.wssWeb.emit("connection", ws, request);
                });
            }
            else if (request.url === "/ws/oc") {
                websocket_1.wssOc.handleUpgrade(request, socket, head, (ws) => {
                    websocket_1.wssOc.emit("connection", ws, request);
                });
            }
            else {
                socket.destroy();
            }
        });
        app.get("/", (req, res) => {
            ejs_1.default.renderFile("views/index/index.ejs", { debugMode: config.debug }, (err, str) => {
                if (err) {
                    logger_1.loggerServer.error(err);
                    res.sendStatus(500);
                }
                else {
                    res.send(str);
                }
            });
        });
        // 以 http 请求的方式上传数据，并以 ws 的格式解析
        // 为了解决 oc websocket 大小较大的数据无法分片的问题而设计的临时解决方案
        // {
        //     "token": "XXX",
        //     "data": {...}
        // }
        app.use(express_1.default.json({ limit: '200mb' }));
        app.post("/api/oc/wsSend", express_1.default.json(), (req, res) => {
            logger_1.loggerServer.trace(req.body);
            if (Object.keys(req.body).length == 0) {
                logger_1.loggerServer.error("/api/oc/wsSend received empty body");
                res.sendStatus(400);
            }
            else {
                const ws = new ws_1.default(`ws://localhost:${config.port}/ws/oc`);
                ws.on("open", () => {
                    ws.send(JSON.stringify((0, interface_1.newWebToServerMessage)("AuthRequest", { token: req.body.token })));
                    ws.send(JSON.stringify(req.body.data));
                    ws.close();
                });
                res.sendStatus(200);
            }
        });
        app.use(express_1.default.static("public"));
        server.listen(config.port, () => {
            logger_1.loggerServer.info(`ONi server started on port ${config.port}.`);
        });
    }
};
exports.default = Server;
