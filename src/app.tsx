import { onMount } from 'solid-js'
import type { AppProps } from '../types/props'
import { getNumber } from './utils'
import { ClipCanvas, createMask } from './clip-path'
import './style.css'
import style from './style.css?inline'
import image from './bg.jpg'

const App = (
  {
    ref,
    component,
    width,
    height,
  }: AppProps
) => {
  // canvasDom
  let canvasRef = {} as HTMLCanvasElement
  // canvasContext
  let ctx = {} as CanvasRenderingContext2D

  onMount(() => {
    ctx = canvasRef.getContext('2d') as CanvasRenderingContext2D
    // 填充默认背景
    ctx.fillStyle = 'cyan'
    fillImage()
    createMask(ctx)
  })

  // 填充图像
  const fillImage = () => {
    const img = new Image()
    img.src = image
    img.onload = () => {
      ctx.drawImage(img, 0, 0, getNumber(width), getNumber(height))
    }
  }

  // 移动clip
  const moveClip = (_x: number, _y: number) => {
    ctx.fillRect(0, 0, getNumber(width), getNumber(height))
    // renderClipPath(ctx, 40, x, y)
  }

  ref({
    fillImage,
    moveClip,
  })

  return (
    <>
      { component ? <style>{style}</style> : null }
      <div class="verify-container">
        <canvas ref={canvasRef} width={width} height={height}></canvas>
        <ClipCanvas size={40} />
      </div>
    </>
  )
}

export default App
