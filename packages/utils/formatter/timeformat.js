/**
 * 计算时间差
 * @param {*} time 
 * @returns 
 */
export function timeDiff(time) {
    let nt = new Date().getTime() // 当前时间
    try {
        let timeEnd = new Date(time.replace(/-/g, '/') + ' 23:59:59').getTime()
        let diff = timeEnd - nt
        let day = 24 * 3600 * 1000
        let hours = 60 * 60 * 1000
        let times = 60 * 1000
        if (diff < 0) {
            return ''
        } else {
            if (diff / day > 1) {
                return Math.floor(diff / day) + '天'
            } else if (diff / hours > 1) {
                return Math.floor(diff / hours) + '小时'
            } else if (diff / times > 1) {
                return Math.floor(diff / times) + '分钟'
            } else {
                return Math.floor(diff / 1000) + '秒'
            }
        }
    } catch (e) {
        return ''
    }
}
/**
 * 格式化时间日期
 *
 * @export
 * @param {*} [time=new Date()]
 * @param {string} [format='{y}-{m}-{d} {h}:{i}:{s}']
 * @returns
 */
export function formatTime(time = new Date(), format = '{y}-{m}-{d} {h}:{i}:{s}') {
    var date = new Date(time)
    var o = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    var replaceTime = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        var value = o[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return replaceTime
}
/**
 * 回复或发布于时间反推
 * @param {*} date 
 * @param {*} name 
 * @returns 
 */
export function getTimer(date, name = '发布') {
    let nName = name ? name + '于：' : ''
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    let week = day * 7
    let month = day * 30
    let nt = new Date().getTime()
    let sd = new Date(date).getTime()
    let ct = nt - sd
    let result = ''
    if (ct < 0) {
        result = ''
    } else if (ct / month >= 1) {
        result = nName + Math.floor(ct / month) + '月前'
    } else if (ct / week >= 1) {
        result = nName + Math.floor(ct / week) + '周前'
    } else if (ct / day >= 1) {
        result = nName + Math.floor(ct / day) + '天前'
    } else if (ct / hour >= 1) {
        result = nName + Math.floor(ct / hour) + '小时前'
    } else if (ct / minute >= 1) {
        result = nName + Math.floor(ct / minute) + '分钟前'
    } else {
        result = '刚刚' + name
    }
    return result
}