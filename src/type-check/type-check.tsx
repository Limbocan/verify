
import { mergeProps, createSignal, onMount } from 'solid-js'
import { TriggerType, AppProps } from '../../types/props.d'

export const TypeCheck = (props: { props: AppProps }) => {

  const _props = mergeProps(props)

  let checkRef = {} as any
  let canvasRef = {} as HTMLCanvasElement
  let ctx = {} as CanvasRenderingContext2D

  // trigger为hover时显示/隐藏box
  const showBox = () => checkRef.classList.add('verify-content-box-hover-active')
  const hiddenBox = () => checkRef.classList.remove('verify-content-box-hover-active')

  onMount(() => {

    if (_props.props.trigger === TriggerType.hover) {
      checkRef.addEventListener('mouseenter', showBox)
      checkRef.addEventListener('mouseleave', hiddenBox)
    }

    ctx = canvasRef.getContext('2d') as CanvasRenderingContext2D
    const fullWidth = canvasRef.width
    const fullHeight = canvasRef.height

    canvasRef.addEventListener('click', checkClick)
    // 填充默认背景
    ctx.fillStyle = '#FFF'
    ctx.fillRect(0, 0, fullWidth, fullHeight)
    fillImage()
  })

  const fillImage = () => {
    const img = new Image()
    img.src = _props.props.image
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvasRef.width, canvasRef.height)
    }
  }

  const checkClick = (e: MouseEvent) => {
    console.log(e, '====')
  }

  return (
    <div
      ref={checkRef}
      class={`verify-content-box ${_props.props.trigger === TriggerType.insert ? 'verify-content-box-insert' : 'verify-content-box-hover'}`}
      style={{
        '--verify-content-box-width': _props.props.width + 'px',
        '--verify-content-box-height': _props.props.height + 'px'
      }}
    >
      <canvas
        ref={canvasRef}
        width={_props.props.width}
        height={_props.props.height}
        class="verify-conent-view"
      ></canvas>
      {
        _props.props.trigger === TriggerType.hover ? 
        <div class="verify-slide-label">
          <slot name="label">
            { _props.props.checkLabel }
          </slot>
        </div> : null
      }
    </div>
  )

}
