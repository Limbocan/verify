
export interface VerifyProps {
  component: boolean,
  componentName: ComponentName,
  root: HTMLElement | null | string,
  width: string | number,
  height: string | number
}

export type ComponentName = string

export interface AppProps {
  ref: any,
  component: boolean,
  width: string | number,
  height: string | number,
}
