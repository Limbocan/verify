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
  // 校验X位置
  verifyX: number
  // 校验Y位置
  verifyY: number

  #disposer: any = null

  constructor({
    component = false,
    componentName = 'cyanery-verify',
    root = null,
    width = 300,
    height = 200,
    verifyX = 200,
    verifyY = 80,
  } : VerifyProps) {
    this.root = root
    this.width = width
    this.height = height
    this.verifyX = verifyX
    this.verifyY = verifyY
    if (component) this.#componentVerify(componentName)
    else this.#renderVerify()
  }
  
  // Verify渲染
  #renderVerify = (): Error | undefined => {

    if (!this.root) return new Error('Verify need root Element')

    if (this.#disposer) this.#disposer()

    this.#disposer = render(
      this.#renderVerifyApp,
      this.root as HTMLElement
    )

    return this.#disposer
  }

  // 注册web-component
  #componentVerify = (name: ComponentName) => {
    customElement(
      name,
      {},
      this.#renderVerifyApp
    )
  }

  #renderVerifyApp = () => {
    return (<App
      ref={this.appRef}
      component={true}
      width={this.width}
      height={this.height}
      verifyX={this.verifyX}
      verifyY={this.verifyY}
    />)
  }

  public fillImage = () => {
    // this.appRef.fillImage()
  }

  public moveClip = (_x: number, _y: number) => {
    // this.appRef.moveClip(x, y)
  }
}

export default Verify
