// 将数字转换成 GTNH 风格的显示方式
export function numberDisplayConvert(number: number) {
    const unitList = ["", "K", "M", "G", "T", "P"]

    let digit = Math.floor(Math.log10(number))
    let grade = (digit - digit % 3) / 3

    if (number < 10000) {
        return String(number)
    }

    if (digit % 3 == 0) {
        return String((number / Math.pow(10, digit)).toFixed(1) + unitList[grade])
    }

    return String((number / Math.pow(10, grade * 3)).toFixed(0) + unitList[grade])
}

// 将数字转换成带逗号的显示方式
export function commaNumberDisplayConvert(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// 将时间戳转换成 xxx 秒前、xxx 分钟前、xxx 小时前 的显示风格
export function timePassedDisplayConvert(timestamp: number) {
    const now = new Date().getTime()
    const passed = now - timestamp
    const minute = 60 * 1000
    const hour = 60 * minute
    const day = 24 * hour
    const month = 30 * day
    const year = 365 * day

    if (timestamp == 0) {
        return "无数据"
    } else if (passed < 10 * 1000) {
        return "刚刚"
    } else if (passed < minute) {
        return Math.floor(passed / 1000) + " 秒前"
    } else if (passed < hour) {
        return Math.floor(passed / minute) + " 分钟前"
    } else if (passed < day) {
        return Math.floor(passed / hour) + " 小时前"
    } else if (passed < month) {
        return Math.floor(passed / day) + " 天前"
    } else if (passed < year) {
        return Math.floor(passed / month) + " 月前"
    } else {
        return "很久以前"
    }
}

// 将时间长度转换成 xxx 秒、xxx 分钟、xxx 小时、xxx 天、xxx 月、xxx 年 的显示风格
export function timeLengthDisplayConvert(timestamp: number) {
    const now = new Date().getTime()
    const passed = now - timestamp
    const minute = 60 * 1000
    const hour = 60 * minute
    const day = 24 * hour
    const month = 30 * day
    const year = 365 * day

    if (timestamp == 0) {
        return "无数据"
    } else if (passed < 10 * 1000) {
        return "刚刚"
    } else if (passed < minute) {
        return Math.floor(passed / 1000) + " 秒"
    } else if (passed < hour) {
        return Math.floor(passed / minute) + " 分钟"
    } else if (passed < day) {
        return Math.floor(passed / hour) + " 小时"
    } else if (passed < month) {
        return Math.floor(passed / day) + " 天"
    } else if (passed < year) {
        return Math.floor(passed / month) + " 月"
    } else {
        return "很久"
    }
}

// 将时间戳转换成 yyyy-mm-dd hh:mm:ss 的显示风格
export function timeDisplayConvert(timestamp: number) {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`
}

// 生成随机 UUID
export function randomUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

export function isMobileDevice() {
    const ua = navigator.userAgent.toLowerCase()
    const kw = ['iphone', 'ipod', 'android', 'windows phone', 'blackberry', 'mobile']
    return kw.some(keyword => ua.includes(keyword))
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}