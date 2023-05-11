import { createSignal, Signal } from 'solid-js'
import { render } from 'solid-js/web'
import { customElement } from 'solid-element'
import { TriggerType } from '../types/props.d'
import type { VerifyProps, ComponentName } from '../types/props'
import App from './app'

// 参数列表以及默认参数
const PROP_LIST = {
  root: null,
  width: 300,
  height: 200,
  component: false,
  componentName: 'cyanery-verify',
  verifyX: 200,
  verifyY: 80,
  deviation: 5,
  trigger: TriggerType.insert,
} as VerifyProps

export class Verify {
  [key: string]: any
  // 根节点
  root!: Signal<any>[0]
  // 是否componetns
  component!: Signal<boolean>[0]
  // components名称
  componentName!: Signal<string>[0]
  // 宽度
  width!: Signal<number>[0]
  // 高度
  height!: Signal<number>[0]
  // 校验X位置
  verifyX!: Signal<number>[0]
  // 校验Y位置
  verifyY!: Signal<number>[0]
  // 校验偏差值
  deviation!: Signal<number>[0]
  // 触发方式
  trigger!: Signal<TriggerType>[0]

  // AppRef
  #appRef: any
  // AppInstance
  #disposer: any = null

  constructor(props: VerifyProps) {
    let _prop = null as any
    Object.keys(PROP_LIST).forEach((key: string): void => {
      _prop = props[key] !== undefined ? props[key] : PROP_LIST[key];
      [this[key], this[`update_${key}`]] = createSignal(_prop)
    })
    if (this.component()) this.#componentVerify(this.componentName())
    else this.#renderVerify()
  }
  
  // Verify渲染
  #renderVerify = (): Error | undefined => {

    if (!this.root()) return new Error('Verify need root Element')

    if (this.#disposer) this.#disposer()

    this.#disposer = render(
      this.#renderVerifyApp,
      this.root() as HTMLElement
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
      ref={this.#appRef}
      component={true}
      width={this.width()}
      height={this.height()}
      verifyX={this.verifyX()}
      verifyY={this.verifyY()}
      deviation={this.deviation()}
      trigger={this.trigger()}
    />)
  }

  public updateSlide = (props: { verifyX: number, verifyY: number }) => {
    // this.verifyX = props.verifyX
    // this.verifyY = props.verifyY
    this.update_verifyX(() => props.verifyX)
    this.update_verifyY(props.verifyY)
    // this.#appRef.updateSlide(props)
  }
}

export default Verify
