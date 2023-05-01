
/**
 * @param node any
 * @returns boolean
 */
export const isElement = (node: any): boolean => !!(node && node?.nodeName && node?.nodeType === 1)

/**
 * @param el HTMLElement | string | undefined
 * @returns boolean
 */
export const getElement = (el: HTMLElement | string | undefined) => isElement(el) ? el : typeof el === 'string' ? document.querySelector(el) : document.createElement('div')

/**
 * @param value number | string
 * @returns number
 */
export const getNumber = (value: number | string, def_num: number = 0): number => {
  if (typeof value === 'number') return value
  else {
    const number = Number(value.replace(/[^0-9.]/g, ''))
    return isNaN(number) ? def_num : number
  }
}
