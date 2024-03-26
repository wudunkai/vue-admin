import CryptoJS from 'crypto-js'
import _ from 'lodash'
const { VITE_CAPTCHA_ID } = import.meta.env

const encrypt = (data: string) => {
  const cipherText = CryptoJS.AES.encrypt(data, VITE_CAPTCHA_ID).toString()
  return cipherText
}

// // Decrypt
// var bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123')
// var originalText = bytes.toString(CryptoJS.enc.Utf8)

/*
  判断数据是否为空
  data    all    需要判断的数据
*/
const isEmpty = (data: any) => {
  if (data === null || data === undefined || data === '') {
    return true
  }
  return false
}

// 扁平化数组
const getTreeToArr = (data: any[], childName?: string) => {
  const result: any[] = []
  const childNames = childName || 'children'
  data.forEach((item) => {
    const loop = (data: { [x: string]: any }) => {
      const res = _.cloneDeep(data)
      delete res[childNames]
      result.push(res)
      const child = data[childNames]
      if (child) {
        for (let i = 0; i < child.length; i++) {
          loop(child[i])
        }
      }
    }
    loop(item)
  })
  return result
}

export { isEmpty, encrypt, getTreeToArr }
