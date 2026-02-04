export { unescape } from 'lodash-es'

export class Deferred {

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = reject
        })
    }
}

// 解析 JSON 字符串不引起报错
export const safeJson = (jsonStr = '{}', defaultVal = {}) => {
    try {
        return JSON.parse(jsonStr)
    } catch (error) {
        console.warn(`${jsonStr} is not valid json`)
        return defaultVal
    }
}

export const customRequestWithInput = (file, callback) => {
    const size = file.size //总大小
    const shardSize = 2 * 1024 * 1024 //以2MB为一个分片
    let shardCount = Math.ceil(size / shardSize) //总片数
    shardCount = shardCount === 0 ? 1 : shardCount

    for (let i = 0; i < shardCount; ++i) {
        //计算每一片的起始与结束位置
        let start = i * shardSize
        let end = Math.min(size, start + shardSize)

        const datafile = file.slice(start, end)
        const index = i + 1
        const total = shardCount
        const generateName = file.name;;
        (function (totalSize) {
            callback({ totalSize, datafile, index, total, generateName })
        })(end - start)
    }
}

export class CodeName {
    static parse(codeName = '') {
        return codeName.replace(/_\d+$/, '').toLocaleLowerCase()
    }

    static equal(c1, c2) {
        return CodeName.parse(c1) === CodeName.parse(c2)
    }

    static some(list = [], c2) {
        return list.some((c1) => CodeName.equal(c1, c2))
    }

    static getFromNode(node = {}) {
        const { codeName = '' } = node
        return CodeName.parse(codeName)
    }
}

export const isPromise = (obj) =>
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
