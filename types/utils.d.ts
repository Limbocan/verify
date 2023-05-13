/**
 * @param node any
 * @returns boolean
 */
export declare const isElement: (node: any) => boolean;
/**
 * @param el HTMLElement | string | undefined
 * @returns boolean
 */
export declare const getElement: (el: HTMLElement | string | undefined) => string | Element | null | undefined;
/**
 * @param value number | string
 * @returns number
 */
export declare const getNumber: (value: number | string | undefined, def_num?: number) => number;
export declare const animateX: (width: number, x: any, update: any, end?: number) => void;
