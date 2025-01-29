import express from "express"
import ejs from "ejs"
import http from "http"
import WebSocket from 'ws'
import { wssWeb, wssOc } from "./websocket.js"
import { loggerServer as logger } from "./logger.js"
import { Config } from "./interface.js"

var Server = {
    init(config: Config) {

        const app = express()
        const server = http.createServer(app)

        server.on("upgrade", (request, socket, head) => {
            if (request.url === "/ws/web") {
                wssWeb.handleUpgrade(request, socket, head, (ws) => {
                    wssWeb.emit("connection", ws, request)
                })
            } else if (request.url === "/ws/oc") {
                wssOc.handleUpgrade(request, socket, head, (ws) => {
                    wssOc.emit("connection", ws, request)
                })
            } else {
                socket.destroy()
            }
        })

        app.get("/", (req, res) => {
            ejs.renderFile("views/index/index.ejs", { debugMode: config.debug }, (err, str) => {
                if (err) {
                    logger.error(err)
                    res.sendStatus(500)
                }
                else {
                    res.send(str)
                }
            })
        })

        // 以 http 请求的方式上传数据，并以 ws 的格式解析
        // 为了解决 oc websocket 大小较大的数据无法分片的问题而设计的临时解决方案
        // {
        //     "token": "XXX",
        //     "data": {...}
        // }
        app.post("/api/oc/wsSend", express.json(), (req, res) => {
            logger.trace(req.body)
            if (Object.keys(req.body).length == 0) {
                logger.error("/api/oc/wsSend received empty body")
                res.sendStatus(400)
            } else {
                const ws = new WebSocket(`ws://localhost:${config.port}/ws/oc`)
                ws.on("open", () => {
                    ws.send(JSON.stringify({
                        type: "auth/request",
                        data: { token: req.body.token }
                    }))
                    ws.send(JSON.stringify(req.body.data))
                    ws.close()
                })
                res.sendStatus(200)
            }
        })

        app.use(express.static("public"))

        server.listen(config.port, () => {
            logger.info(`ONi server started on port ${config.port}.`)
        })

    }
}

export default Server

