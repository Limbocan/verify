
export enum TriggerType { hover = "hover", insert = "insert" }
export interface VerifyProps {
  [index: string]: any
  component: boolean,
  componentName: ComponentName,
  root: HTMLElement | null | string,
  width: number,
  height: number,
  image: string,
  verifyX?: number,
  verifyY?: number,
  deviation?: number,
  trigger?: TriggerType | undefined,
  verifyEnd?: verifyEnd | undefined,
}

export type verifyEnd = (next: () => void, distance: number, duration: number) => boolean

export type ComponentName = string

export interface AppProps extends VerifyProps {
  ref: any,
  componentName?: never,
  root?: never
}
