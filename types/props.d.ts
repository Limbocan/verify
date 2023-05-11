
export enum TriggerType { hover = "hover", insert = "insert" }
export interface VerifyProps {
  [index: string]: any
  component: boolean,
  componentName: ComponentName,
  root: HTMLElement | null | string,
  width: number,
  height: number,
  verifyX?: number,
  verifyY?: number,
  deviation?: number,
  trigger?: TriggerType | undefined,
}

export type ComponentName = string

export interface AppProps extends VerifyProps {
  ref: any,
  componentName?: never,
  root?: never
}
