import { createSignal } from 'solid-js'
import { VerifySvgDefs } from './verify-svg-defs'
import { VerifySlide } from './verify-slide'
import { VerifyImage } from './verify-image'
import { getNumber } from '../utils'
import image from '../assets/verify.png'

export const TypeSlide = (
  {
    width, height, verifyX, verifyY, deviation
  }: {
    width: number | string, height: number | string, verifyX: number, verifyY: number, deviation: number
  }
) => {

  let slideRef = {} as { resetSlide: () => void }

  const [X, updateX] = createSignal(-verifyX)

  // 滑动事件
  const updatePosition = (x: number) => {
    updateX(() => x - verifyX)
  }

  // 滑动结束时间
  const verifyEnd = (x: number, _duration: number) => {
    if (Math.abs(x - verifyX) > deviation) {
      slideRef.resetSlide()
      updateX(() => -verifyX)
    }
  }

  return (
    <>
      <svg width={width} height={height}>
        {/* svg变量 */}
        <VerifySvgDefs x={verifyX} y={verifyY} scale={1.5} />
        {/* 背景图 */}
        <VerifyImage src={image} width={width} height={height} />
        {/* 裁剪空缺占位 */}
        <rect x={0} width={width} height={height} clip-path="url(#verify-clip-path)" fill="#FFF"></rect>
        {/* 裁剪图 */}
        <g transform={`translate(${X()}, 0)`} filter="url(#verify-clip-filter)">
          <VerifyImage src={image} width={width} height={height} clip="url(#verify-clip-path)" />
        </g>
      </svg>
      <VerifySlide ref={slideRef} width={getNumber(width)} update={updatePosition} end={verifyEnd} />
    </>
  )
}
