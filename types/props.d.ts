
export interface VerifyProps {
  component: boolean,
  componentName: ComponentName,
  root: HTMLElement | null | string,
  width: string | number,
  height: string | number,
  verifyX?: number,
  verifyY?: number,
}

export type ComponentName = string

export interface AppProps extends VerifyProps {
  ref: any,
  componentName?: never,
  root?: never
}
