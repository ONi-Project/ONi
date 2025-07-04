import fs from "fs";
import { loggerGlobal as logger } from "../logger";
import { wsWebBroadcast } from "../websocket";
var data = {
    // 通用数据
    list: [],
    set(data) {
        this.list.forEach((item, index) => {
            if (item.uuid == data.uuid) {
                this.list[index] = data;
                wsWebBroadcast("update/common", [data]);
                return;
            }
        });
    },
    init(config) {
        try {
            this.list = JSON.parse(fs.readFileSync('./data/common/common.tson', 'utf8'));
            logger.debug("data", "Json initialized successfully.");
            logger.trace("data", this.list);
        }
        catch (e) {
            logger.error("data", "Json initialization failed.");
            logger.error("data", e);
        }
    }
};
export default data;
