
import { TriggerType } from '../../types/props.d'
import { mergeProps, createSignal, onMount } from 'solid-js'
import { animateX } from '../utils'

export const VerifySlide = (props: {
  ref: any,
  width: number,
  height: number,
  update: (x: number) => void,
  end: (x: number, d: number) => void,
  trigger: TriggerType | undefined,
  loading: boolean,
  disabled: boolean,
  slideLabel: string,
  children: any
}) => {
  const _props = mergeProps(props)

  let slidBoxRef = {} as HTMLDivElement,
    slideRef = {} as any,
    duration = 0 as number, startTime = 0 as number,
    [slideWidth, updateSlideWidth] = createSignal(0),
    [startX, updateStartX] = createSignal(0),
    [activeX, updateActiveX] = createSignal(0),
    [isFirst, updateIsFirst] = createSignal(true)
  
  onMount(() => {
    updateSlideWidth(() => slideRef ? slideRef.getBoundingClientRect().width : 0)

    slidBoxRef.addEventListener('mouseenter', showBox)
    slidBoxRef.addEventListener('mouseleave', hiddenBox)
  })

  // trigger为hover时显示/隐藏box
  const showBox = () => slidBoxRef.classList.add('verify-slide-box-hover-active')
  const hiddenBox = () => { if (startTime === 0) slidBoxRef.classList.remove('verify-slide-box-hover-active') }

  // 滑动中事件
  const slideMove = (e: MouseEvent) => {
    const _distance = getDistance(e)
    updateActiveX(() => _distance)
    _props.update(_distance)
  }

  // 滑动结束事件
  const slideEnd = (e: MouseEvent) => {
    updateIsFirst(() => false)
    window.removeEventListener('mouseup', slideEnd)
    window.removeEventListener('mousemove', slideMove)
    duration = new Date().getTime() - startTime
    _props.end(getDistance(e), duration)
  }

  // 滑动结束后还原状态
  const slideEndAfter = (reset: boolean = true): void => {
    if (!reset) return
    startTime = 0
    slidBoxRef.classList.remove('verify-slide-box-slide-active')
    slidBoxRef.classList.remove('verify-slide-box-hover-active')
  }

  // 滑动开始事件
  const slideStart = (e: MouseEvent) => {
    startTime = new Date().getTime()
    if (isFirst()) updateStartX(() => e.screenX)
    slidBoxRef.classList.add('verify-slide-box-slide-active')
    window.addEventListener('mouseup', slideEnd)
    window.addEventListener('mousemove', slideMove)
  }

  // 获取滑动距离
  const getDistance = (e: MouseEvent): number => {
    let _distance = e.screenX - startX()
    let _max_distance = _props.width - slideWidth()
    _distance = _distance <= 0 ? 0 : _distance >= _max_distance ? _max_distance : _distance
    return _distance
  }

  // 设置box样式class
  const setSlideBoxClass = (method: number | string = 'add', className: string) => {
    if (method === 'add') slidBoxRef.classList.add(className)
    else if (method === 'remove') slidBoxRef.classList.remove(className)
  }

  let timeout = null as any
  // 重置状态
  const resetSlide = () => {
    timeout = setTimeout(() => {
      setSlideBoxClass('remove', 'verify-slide-failed')
      setSlideBoxClass('remove', 'verify-slide-success')
      timeout = null
    }, 300) as any
    updateStartX(() => 0)
    animateX(_props.width, activeX, updateActiveX)
    updateIsFirst(() => true)
  }

  _props.ref({ resetSlide, slideEndAfter, setSlideBoxClass })

  return (
    <div
      ref={slidBoxRef}
      class={`verify-slide-box ${_props.trigger === TriggerType.insert ? 'verify-slide-box-insert' : 'verify-slide-box-hover'}`}
      style={{
        '--verify-slide-box-width': _props.width + 'px',
        '--verify-slide-svg-height': _props.height + 'px'
      }}
    >
      { _props.children }
      <div
        ref={slideRef}
        class="verify-slide-control"
        onmousedown={slideStart}
        style={`--verify-slide-control-x: ${activeX()}px`}
      >
        <svg viewBox="0 0 1024 1024" width="60%" height="60%" class="verify-slide-control-icon verify-slide-control-normal">
          <path d="M273.344 941.248c25.088 24.96 65.792 24.96 90.88 0l386.432-384.064 0 0c0 0 0 0 0 0 18.816-18.688 23.552-46.144 14.144-69.184-3.136-7.68-7.872-14.912-14.144-21.12L364.224 82.752c-25.152-24.96-65.792-24.96-90.88 0-25.088 24.96-25.088 65.408 0 90.368L614.336 512l-340.992 338.88C248.256 875.904 248.256 916.288 273.344 941.248z">
          </path>
        </svg>
        <svg viewBox="0 0 1024 1024" width="60%" height="60%" class="verify-slide-control-icon verify-slide-control-success">
          <path d="M843.693959 293.609061 425.255869 712.056362 186.145026 472.947566 66.579883 592.504522 425.255869 951.165158 963.260126 413.174204Z">
          </path>
        </svg>
        <svg viewBox="0 0 1024 1024" width="60%" height="60%" class="verify-slide-control-icon verify-slide-control-failed">
          <path d="M899.499963 262.219143 759.090073 121.815393 513.401418 367.506095 267.714809 121.815393 127.310036 262.22426 373.000737 507.910868 127.314129 753.5985 267.712763 893.996111 513.401418 648.307456 759.095189 893.998157 899.488707 753.5985 653.804145 507.910868Z">
          </path>
        </svg>
      </div>
      <div class="verify-slide-label">
        <slot name="label">
          { _props.slideLabel }
        </slot>
      </div>
    </div>
  )

}
