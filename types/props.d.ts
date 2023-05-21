
export enum VerifyType { slide = "slide", check = "check" }
export enum TriggerType { hover = "hover", insert = "insert" }
export interface VerifyProps {
  [index: string]: any
  component: boolean,
  componentName: ComponentName,
  root: HTMLElement | null | string,
  width: number,
  height: number,
  image: string,
  type: VerifyType,
  loading: boolean,
  disabled: boolean,
  verifyX?: number,
  verifyY?: number,
  slideScale: number,
  slideLabel?: string,
  checkLabel?: string,
  deviation?: number,
  trigger?: TriggerType | undefined,
  verifyEnd?: verifyEnd | undefined,
}

export type verifyEnd = (next: (reset: boolean) => void, distance: number, duration: number) => boolean

export type ComponentName = string

export interface AppProps extends VerifyProps {
  ref: any,
  componentName?: never,
  root?: never
}
