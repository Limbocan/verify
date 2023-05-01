import { render } from 'solid-js/web'
import { customElement } from 'solid-element'
import type { VerifyProps, ComponentName } from '../types/props'
import App from './app'

export class Verify {
  // 根节点
  root: HTMLElement | null | string
  // App
  appRef: any
  // canvas宽度
  width: string | number
  // canvas 高度
  height: string | number

  #disposer: any = null

  constructor({
    component = false,
    componentName = 'cyanery-verify',
    root = null,
    width = 300,
    height = 200
  } : VerifyProps) {
    this.root = root
    this.width = width
    this.height = height
    if (component) this.#componentVerify(componentName)
    else this.#renderVerify()
  }
  
  // Verify渲染
  #renderVerify = (): Error | undefined => {

    if (!this.root) return new Error('Verify need root Element')

    if (this.#disposer) this.#disposer()

    this.#disposer = render(
      () => <App
        ref={this.appRef}
        component={false}
        width={this.width}
        height={this.height}
      />,
      this.root as HTMLElement
    )

    return this.#disposer
  }

  // 注册web-component
  #componentVerify = (name: ComponentName) => {
    customElement(
      name,
      {},
      () => <App
        ref={this.appRef}
        component={true}
        width={this.width}
        height={this.height}
      />
    )
  }

  public fillImage = () => {
    this.appRef.fillImage()
  }

  public moveClip = (x: number, y: number) => {
    this.appRef.moveClip(x, y)
  }
}

export default Verify
