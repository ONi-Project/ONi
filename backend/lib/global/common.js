import fs from "fs";
import { loggerGlobal as logger } from "../logger.js";
import { wsWebBroadcast } from "../websocket.js";
import { commonModelGuard, newServerToWebMessage } from "@oni/interface";
let common = {
    // 通用数据
    list: [],
    get(uuid) {
        return this.list.find(item => item.uuid == uuid);
    },
    set(common) {
        return this.list.some((item, index) => {
            if (item.uuid == common.uuid) {
                this.list[index] = common;
                wsWebBroadcast(newServerToWebMessage("DataCommonSet", common));
                return true;
            }
            return false;
        });
    },
    add(common) {
        this.list.push(common);
        wsWebBroadcast(newServerToWebMessage("DataCommonAdd", common));
    },
    remove(uuid) {
        let index = this.list.findIndex(item => item.uuid == uuid);
        if (index >= 0) {
            let data = this.list[index];
            this.list.splice(index, 1);
            wsWebBroadcast(newServerToWebMessage("DataCommonRemove", uuid));
        }
        else {
            logger.error("common.remove", "Bot not found.");
        }
    },
    save() {
        const MODULE_NAME = "common.save";
        const FILE_PATH = "./data/common/common.json";
        try {
            fs.writeFileSync(FILE_PATH, JSON.stringify(this.list), 'utf8');
            logger.debug(MODULE_NAME, "Json saved successfully.");
        }
        catch (e) {
            logger.error(MODULE_NAME, "Json save failed.");
            logger.error(MODULE_NAME, e);
        }
    },
    init(config) {
        const MODULE_NAME = "common.init";
        const FILE_PATH = "./data/common/common.json";
        try {
            let json = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
            if (commonModelGuard.isCommonArray(json)) {
                this.list = json;
                logger.debug(MODULE_NAME, "Json initialized successfully.");
                logger.trace(MODULE_NAME, this.list);
            }
            else {
                logger.error(MODULE_NAME, "Json initialization failed. Invalid data format.");
            }
        }
        catch (e) {
            logger.error(MODULE_NAME, "Json initialization failed.");
            logger.error(MODULE_NAME, e);
        }
    }
};
export default common;
