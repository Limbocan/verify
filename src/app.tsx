import { onMount } from 'solid-js'
import './style.css'

const App = () => {
  let canvasRef = {} as HTMLCanvasElement

  onMount(() => {
    const ctx = canvasRef.getContext('2d') as CanvasRenderingContext2D
    const fullWidth = canvasRef.width
    const fullHeight = canvasRef.height
    
    ctx.fillStyle = 'cyan'
    ctx.fillRect(0, 0, fullWidth, fullHeight)
  })

  return (
    <div class="verify-container">
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default App
