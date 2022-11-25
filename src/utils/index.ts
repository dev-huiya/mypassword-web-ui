import store from '@/store'
import { createToast, ToastType } from 'mosha-vue-toastify'

export const showToast = (text: string, type: ToastType = 'default', duration = 3000, options = {}) => {
  createToast(text, {
    type,
    timeout: duration,
    position: 'top-center',
    hideProgressBar: true,
    showCloseButton: false,
    transition: 'slide',
    ...options,
  })
}

export const getUser = () => {
  return store.getters.getUser
}

export const isLogined = () => {
  return store.getters.getUser != null
}

/**
 * 배경색에 대비되는 글자색 계산
 * @param backgroundColor
 * @return string #000 | #fff
 */
export const contrastColor = (backgroundColor: string) => {
  return (luma(backgroundColor) >= 165) ? '#000' : '#fff'
}

type Color = string | Array<number>
// color can be a hex string or an array of RGB values 0-255
const luma = (color: Color) => {
  const rgb = (typeof color === 'string') ? colorToRGBA(color) : color
  return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]) // SMPTE C, Rec. 709 weightings
}
const hexToRGBArray = (color: string) => {
  if(color.length === 3) {
    color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2)
  } else if(color.length !== 6) {
    throw new Error('Invalid hex color: ' + color)
  }
  const rgb = []
  for(let i = 0; i <= 2; i++) { rgb[i] = parseInt(color.substr(i * 2, 2), 16) }
  return rgb
}

export const getCSSColorVariable = (name: string) : string => {
  return getComputedStyle(document.body)
    .getPropertyValue(name).trim()
}

// https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
export const colorToRGBA = (color: string) => {
  // Returns the color as an array of [r, g, b, a] -- all range from 0 - 255
  // color must be a valid canvas fillStyle. This will cover most anything
  // you'd want to use.
  // Examples:
  // colorToRGBA('red')  # [255, 0, 0, 255]
  // colorToRGBA('#f00') # [255, 0, 0, 255]
  const cvs = document.createElement('canvas')
  cvs.height = 1
  cvs.width = 1
  const ctx = cvs.getContext('2d')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ctx.fillStyle = color
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ctx.fillRect(0, 0, 1, 1)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return ctx.getImageData(0, 0, 1, 1).data
}

export const byteToHex = (num: number) => {
  // Turns a number (0-255) into a 2-character hex number (00-ff)
  return ('0' + num.toString(16)).slice(-2)
}

export const colorToHex = (color: string) => {
  // Convert any CSS color to a hex representation
  // Examples:
  // colorToHex('red')            # '#ff0000'
  // colorToHex('rgb(255, 0, 0)') # '#ff0000'
  const rgba = colorToRGBA(color)
  const hex = [0, 1, 2].map(
    function (idx) { return byteToHex(rgba[idx]) }
  ).join('')
  return '#' + hex
}

export const isValidUrl = (urlString: string) => {
  const urlPattern = new RegExp('^(https?:\\/\\/)' + // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
    '(\\#[-a-z\\d_]*)?$', 'i') // validate fragment locator
  return !!urlPattern.test(urlString)
}
