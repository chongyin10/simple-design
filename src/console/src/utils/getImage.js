import {userId} from "./cookie"


// material
export function getMaterialImageUrl(fileName, path='user_audit') {
  const defaultPath = '/0/api/v1/files'
  return `${defaultPath}?filename=${fileName}&path=${path}`
}

// watermark

export function getWaterMarkImageUrl(fileName, path='user_audit') {
  const defaultPath = '/0/api/v1/files/image'
  return `${defaultPath}?filename=${fileName}&path=${path}&id=${userId}`
}


