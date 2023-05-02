import { createSignal } from 'solid-js'
import type { AppProps } from '../types/props'
import { ClipPathImage } from './clip-path'
import { VerifySlide } from './verify-slide'
import { VerifyImage } from './verify-image'
import { getNumber } from './utils'
import './style.scss'
import style from './style.scss?inline'
import image from './assets/bg.jpg'

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
          <ClipPathImage x={verifyX} y={verifyY} scale={1.5} />
          <VerifyImage src={image} width={width} height={height} />
          <rect x={0} width={width} height={height} clip-path="url(#verify-clip-path)" fill="#FFF"></rect>
          <g transform={`translate(${X()}, 0)`}>
            <VerifyImage src={image} width={width} height={height} clip="url(#verify-clip-path)" />
          </g>
        </svg>
        <VerifySlide ref={slideRef} width={getNumber(width)} update={updatePosition} />
      </div>
    </>
  )
}

export default App
