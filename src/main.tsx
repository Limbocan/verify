import { createSignal, Signal } from 'solid-js'
import { render } from 'solid-js/web'
import { customElement } from 'solid-element'
import { VerifyType, TriggerType } from '../types/props.d'
import type { VerifyProps, verifyEnd, ComponentName } from '../types/props'
import App from './app'

// 参数列表以及默认参数
const PROP_LIST = {
  root: null,
  width: 300,
  height: 200,
  image: '',
  loading: false,
  disabled: false,
  component: false,
  componentName: 'cyanery-verify',
  type: VerifyType.slide,
  verifyX: 200,
  verifyY: 80,
  slideLabel: '向右拖动滑块',
  checkLabel: '点击进行验证',
  slideScale: 1.4,
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
  // 背景图片
  image!: Signal<string>[0]
  // 校验类型
  type!: Signal<VerifyType>[0]
  // loading
  loading!: Signal<boolean>[0]
  // disabled
  disabled!: Signal<boolean>[0]
  // 校验X位置
  verifyX!: Signal<number>[0]
  // 校验Y位置
  verifyY!: Signal<number>[0]
  // 滑动校验文字
  slideLabel!: Signal<string>[0]
  // 裁剪区域缩放比例
  slideScale!: Signal<number>[0]
  // check文字提示
  checkLabel!: Signal<string>[0]
  // 校验偏差值
  deviation!: Signal<number>[0]
  // 触发方式
  trigger!: Signal<TriggerType>[0]
  // 校验结束拦截方法
  verifyEnd!: verifyEnd | undefined
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
    this.verifyEnd = props.verifyEnd
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
      image={this.image()}
      type={this.type()}
      loading={this.loading()}
      disabled={this.disabled()}
      verifyX={this.verifyX()}
      verifyY={this.verifyY()}
      slideLabel={this.slideLabel()}
      slideScale={this.slideScale()}
      checkLabel={this.checkLabel()}
      deviation={this.deviation()}
      trigger={this.trigger()}
      verifyEnd={this.verifyEnd}
    />)
  }

  // 更新状态
  public updateSlide = (props: {
    verifyX: number,
    verifyY: number,
    width: number,
    height: number,
    image: string,
    scale: number,
  }) => {
    this.update_verifyX(() => props.verifyX || this.verifyX())
    this.update_verifyY(() => props.verifyY || this.verifyY())
    this.update_width(() => props.width || this.width())
    this.update_height(() => props.height || this.height())
    this.update_image(() => props.image || this.image())
    this.update_slideScale(() => props.scale || this.slideScale())
  }

  // 设置loading
  public setLoading = (loading: boolean) => {
    this.update_loading(() => loading)
  }

  // 设置滑动Label
  public setLabel = (label: string) => {
    this.update_slideLabel(() => label)
  }

  // 重置状态
  public resetSlide = () => {
    this.#appRef.resetSlide()
  }
}

export default Verify
