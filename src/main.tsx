import { render } from 'solid-js/web'
import { customElement } from 'solid-element'
import { VerifyProps, ComponentName } from '../types'
import App from './app'

export class Verify {
  // 根节点
  root: HTMLElement | null | string
  // canvas宽度
  width: string | number
  // canvas 高度
  height: string | number

  #disposer: any = null

  constructor({
    component = false,
    componentName = 'cyanery-verify',
    root = null,
    width = 400,
    height = 200
  } : VerifyProps) {
    this.root = root
    this.width = width
    this.height = height
    if (component) this.#componentVerify(componentName)
  }
  
  // Verify渲染
  public renderVerify = (): Error | undefined => {

    if (!this.root) return new Error('Verify need root Element')

    if (this.#disposer) this.#disposer()

    this.#disposer = render(() => <App component={false} />, this.root as HTMLElement)

    return this.#disposer
  }

  // 注册web-component
  #componentVerify = (name: ComponentName) => {
    customElement(name, {}, () => <App component={true} />)
  }
}

export default Verify
