import { mergeProps, createSignal, createEffect } from 'solid-js'
import { VerifySvgDefs } from './verify-svg-defs'
import { VerifySlide } from './verify-slide'
import { VerifyImage } from './verify-image'
import { getNumber, animateX } from '../utils'
import type { AppProps } from '../../types/props'

export const TypeSlide = (props: { props: AppProps }) => {

  const _props = mergeProps(props)
  
  const getVerifyX = () => getNumber(_props.props.verifyX)
  const getVerifyY = () => getNumber(_props.props.verifyY)

  let slideRef = {} as {
    resetSlide: () => void,
    slideEndAfter: (reset: boolean) => void,
    setSlideBoxClass: (methode: string, className: string) => void
  }
  const [X, updateX] = createSignal(-getVerifyX())

  createEffect(() => {
    updateX(() => -getVerifyX())
  })

  // 滑动事件
  const updatePosition = (x: number) => {
    updateX(() => x - getVerifyX())
  }

  // 滑动结束事件
  const verifyEnd = (x: number, duration: number): void => {
    const margin = Math.abs(x - getVerifyX())
    const isFaile = margin > getNumber(_props.props.deviation)
    if (isFaile) slideRef.setSlideBoxClass('add', 'verify-slide-faile')
    else slideRef.setSlideBoxClass('add', 'verify-slide-success')
    const nextFn = (reset: boolean = true) => {
      if (isFaile && reset) {
        slideRef.resetSlide()
        animateX(_props.props.width, X, updateX, -getVerifyX())
      }
      slideRef.slideEndAfter(reset)
    }
    if (_props.props.verifyEnd instanceof Function) {
      _props.props.verifyEnd(nextFn, margin, duration)
    } else nextFn(true)

  }

  return (
    <VerifySlide
      ref={slideRef}
      width={_props.props.width}
      height={_props.props.height}
      update={updatePosition}
      end={verifyEnd}
      slideLabel={_props.props.slideLabel}
      trigger={_props.props.trigger}
    >
      <svg
        width={_props.props.width}
        height={_props.props.height}
        class="verify-slide-svg"
      >
        {/* svg变量 */}
        <VerifySvgDefs
          x={getVerifyX()}
          y={getVerifyY()}
          scale={_props.props.slideScale}
        />
        {/* 背景图 */}
        <VerifyImage
          src={_props.props.image}
          width={_props.props.width}
          height={_props.props.height}
          loading={_props.props.loading}
        />
        {/* 裁剪空缺占位 */}
        <rect
          x={0}
          width={_props.props.width}
          height={_props.props.height}
          clip-path="url(#verify-clip-path)"
          fill="#FFF"
        ></rect>
        {/* 裁剪图 */}
        <g
          transform={`translate(${X()}, 0)`}
          filter="url(#verify-clip-filter)"
        >
          <VerifyImage
            src={_props.props.image}
            width={_props.props.width}
            height={_props.props.height}
            loading={_props.props.loading}
            clip="url(#verify-clip-path)"
          />
        </g>
      </svg>
    </VerifySlide>
  )
}
