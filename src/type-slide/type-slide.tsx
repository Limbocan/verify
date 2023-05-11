import { mergeProps, createSignal, createEffect } from 'solid-js'
import { VerifySvgDefs } from './verify-svg-defs'
import { VerifySlide } from './verify-slide'
import { VerifyImage } from './verify-image'
import { getNumber } from '../utils'
import type { AppProps } from '../../types/props'
import image from '../assets/verify.png'

export const TypeSlide = (props: { props: AppProps }) => {

  const _props = mergeProps(props)
  
  const getVerifyX = () => getNumber(_props.props.verifyX)
  const getVerifyY = () => getNumber(_props.props.verifyY)

  let slideRef = {} as { resetSlide: () => void }
  const [X, updateX] = createSignal(-getVerifyX())

  createEffect(() => {
    updateX(() => -getVerifyX())
  })

  // 滑动事件
  const updatePosition = (x: number) => {
    updateX(() => x - getVerifyX())
  }

  // 滑动结束时间
  const verifyEnd = (x: number, _duration: number) => {
    if (Math.abs(x - getVerifyX()) > getNumber(_props.props.deviation)) {
      slideRef.resetSlide()
      updateX(() => -getVerifyX())
    }
  }

  return (
    <>
      <VerifySlide
        ref={slideRef}
        width={_props.props.width}
        height={_props.props.height}
        update={updatePosition}
        end={verifyEnd}
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
            scale={1.5}
          />
          {/* 背景图 */}
          <VerifyImage
            src={image}
            width={_props.props.width}
            height={_props.props.height}
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
              src={image}
              width={_props.props.width}
              height={_props.props.height}
              clip="url(#verify-clip-path)"
            />
          </g>
        </svg>
      </VerifySlide>
    </>
  )
}
