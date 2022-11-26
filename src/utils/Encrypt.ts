import store from '@/store'
import _ from 'lodash'
import * as CryptoJS from 'crypto-js'

const iv = '0000000000000000'

// https://github.com/brix/crypto-js/issues/334
const decrypt = (encryptedText: string, sharedKey: string) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedText,
    CryptoJS.enc.Utf8.parse(sharedKey),
    {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: CryptoJS.enc.Utf8.parse(iv),
    }
  )
  const decryptedStr = CryptoJS.enc.Utf8.stringify(bytes)
  return decryptedStr.toString()
}

const encrypt = (plainText: string, sharedKey: string) => {
  const encryptKey = CryptoJS.enc.Utf8.parse(sharedKey)
  const encryptedStr = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(plainText),
    encryptKey,
    {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: CryptoJS.enc.Utf8.parse(iv),
    }
  )

  return encryptedStr.toString()
}

const getSharedKey = () => {
  const publicKey = localStorage.getItem('publicKey')
  const encryptedSharedKey = store.state?.user?.sharedKey

  if(_.isEmpty(encryptedSharedKey) || _.isEmpty(publicKey)) {
    throw new Error('clientToServer::required value is empty.')
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const hash = CryptoJS.SHA256(publicKey)
  const tokenKey = hash.toString(CryptoJS.enc.Hex).substring(0, 32)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return decrypt(encryptedSharedKey, tokenKey)
}

export const clientToServer = (plainText: string) => {
  return encrypt(plainText, getSharedKey())
}

export const serverToClient = (encryptedText: string) => {
  return decrypt(encryptedText, getSharedKey())
}
