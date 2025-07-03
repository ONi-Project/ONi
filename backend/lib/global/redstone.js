import fs from "fs";
import { loggerGlobal as logger } from "../logger.js";
import { newServerToWebMessage, redstoneModelGuard } from "@oni/interface";
import { wsWebBroadcast } from "src/websocket.js";
let redstone = {
    // 红石控制组件
    list: [],
    get(uuid) {
        return this.list.find(redstone => redstone.uuid == uuid);
    },
    set(redstone) {
        return this.list.some((item, index) => {
            if (item.uuid == redstone.uuid) {
                this.list[index] = redstone;
                wsWebBroadcast(newServerToWebMessage("DataRedstoneSet", redstone));
                return true;
            }
            return false;
        });
    },
    add(redstone) {
        this.list.push(redstone);
        wsWebBroadcast(newServerToWebMessage("DataRedstoneAdd", redstone));
    },
    remove(uuid) {
        let index = this.list.findIndex(redstone => redstone.uuid == uuid);
        if (index >= 0) {
            let redstone = this.list[index];
            this.list.splice(index, 1);
            wsWebBroadcast(newServerToWebMessage("DataRedstoneRemove", uuid));
        }
        else {
            logger.error("redstone.remove", "Redstone not found.");
        }
    },
    save() {
        const MODULE_NAME = "redstone.save";
        const FILE_PATH = "./data/redstone/redstone.json";
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
        const MODULE_NAME = "redstone.init";
        const FILE_PATH = "./data/redstone/redstone.json";
        try {
            let json = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
            if (redstoneModelGuard.isRedstoneArray(json)) {
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
export default redstone;
