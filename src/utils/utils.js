

// 补0函数
export function addZero(s) {
    return s < 10 ? '0' + s : s
}

// 时间格式化
export function format(value) {
    let minute = Math.floor(value / 60)
    let second = Math.floor(value % 60)
    return `${addZero(minute)}:${addZero(second)}`
}

// 歌词解析
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g
export function parseLyric(lrc) {
    const lines = lrc.split('\n')
    const lyric = []
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const result = timeExp.exec(line)
        if (!result) {
            continue
        }
        const text = line.replace(timeExp, '').trim()
        if (text) {
            lyric.push({
                time: (result[1] * 6e4 + result[2] * 1e3 + (result[3] || 0) * 1) / 1e3,
                text
            })
        }
    }
    return lyric
}

//验证手机号码
export function checkPhone(num) {
    if (/^1\d{10}$/.test(num)) {
        return true;
    } else {
        return false;
    }
}

//取两个整数之间，不包括某个整数的随机数
export function getRandom(min, max, notInclude) {
    let random = Math.floor(Math.random() * (max - min + 1)) + min
    if (random != notInclude) {
        return random
    } else {
        return getRandom(min, max, notInclude)
    }

}