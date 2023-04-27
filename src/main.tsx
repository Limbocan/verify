import { render } from 'solid-js/web'
import App from './app'

export class Verify {
  root: HTMLElement | null | string
  width: string | number
  height: string | number

  private disposer: any

  constructor(
    root: HTMLElement | null | string,
    width: string | number = 400,
    height: string | number = 200
  ) {
    this.root = root
    this.width = width
    this.height = height
  }
  
  public renderVerify = (): Error | undefined => {

    if (!this.root) return new Error('Verify need root Element')

    this.disposer = render(() => <App />, this.root as HTMLElement)

    return this.disposer
  }
}

export default Verify
