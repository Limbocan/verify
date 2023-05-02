import { createSignal } from 'solid-js'
import type { AppProps } from '../types/props'
import { VerifySvgDefs } from './verify-svg-defs'
import { VerifySlide } from './verify-slide'
import { VerifyImage } from './verify-image'
import { getNumber } from './utils'
import './style.scss'
import style from './style.scss?inline'
import image from './assets/verify.png'

const App = (
  {
    ref,
    component,
    width,
    height,
    verifyX = 0,
    verifyY = 0
  }: AppProps
) => {

  let slideRef = {}

  const [X, updateX] = createSignal(-verifyX)

  const updatePosition = (x: number) => {
    updateX(() => x - verifyX)
  }

  ref({
  })

  return (
    <>
      { component ? <style>{style}</style> : null }
      <div class="verify-container">
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
        <VerifySlide ref={slideRef} width={getNumber(width)} update={updatePosition} />
      </div>
    </>
  )
}

export default App
