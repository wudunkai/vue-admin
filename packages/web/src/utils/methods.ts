import CryptoJS from 'crypto-js'
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

export { isEmpty, encrypt }
