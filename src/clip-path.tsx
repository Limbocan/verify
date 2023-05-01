import { onMount } from 'solid-js'
import image from './bg.jpg'

export const ClipCanvas = (
  {
    size = 40
  }: {
    size: number
  }
) => {
  // canvasDom
  let clipRef = {} as HTMLCanvasElement
  // canvasContext
  let ctx = {} as CanvasRenderingContext2D

  onMount(() => {
    ctx = clipRef.getContext('2d') as CanvasRenderingContext2D

    const img = new Image()
    img.src = image
    img.onload = () => {
      ctx.drawImage(img, 400, 300, size, size, 0, 0, size, size)
      createMask(ctx)
    }
  })
  return (
    <canvas
      ref={clipRef}
      width={size}
      height={size}
      class="verify-clip-content"
    >
    </canvas>
  )
}

export const createMask = (ctx: CanvasRenderingContext2D) => {
  const p = getClipPath()
  // ctx.scale(0.2, 0.2)
  ctx.clip(p)
}

export const getClipPath = () => new Path2D('m 169.9333 98.1347 h -12.5588 v -33.8851 c 0 -9.2414 -7.5827 -16.8241 -16.8241 -16.8241 h -33.8851 v -12.7958 c 0 -11.611 -9.4784 -21.0894 -21.0894 -21.0894 s -21.0894 9.4784 -21.0894 21.0894 v 12.5588 h -33.8851 c -9.2414 0 -16.8241 7.5827 -16.8241 16.8241 v 32.2264 h 12.5588 c 12.5588 0 22.7481 10.1892 22.7481 22.7481 s -10.1892 22.7481 -22.7481 22.7481 h -12.5588 v 32.2264 c 0 9.2414 7.5827 16.8241 16.8241 16.8241 h 32.2264 v -12.7958 c 0 -12.5588 10.1892 -22.7481 22.7481 -22.7481 s 22.7481 10.1892 22.7481 22.7481 v 12.7958 h 31.9895 c 9.2414 0 16.8241 -7.5827 16.8241 -16.8241 v -33.8851 h 12.7958 c 11.611 0 21.0894 -9.4784 21.0894 -21.0894 s -9.2414 -20.8524 -21.0894 -20.8524 z m 0 0')
