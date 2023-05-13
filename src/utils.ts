
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
export const getNumber = (value: number | string | undefined, def_num: number = 0): number => {
  if (typeof value === 'number') return value
  else {
    const _val = [undefined, 0, '0', 'false'].includes(value) ? '0' as string : value as string
    const number = Number(_val.replace(/[^0-9.]/g, ''))
    return isNaN(number) ? def_num : number
  }
}


export const animateX = (width: number, x: any, update: any, end: number = 0) => {
  const step = width / 20
  const position = x()
  if ((position - step) < end) {
    update(() => end)
    return
  }
  window.requestAnimationFrame(() => {
    update(() => position - step)
    animateX(width, x, update, end)
  })
}
