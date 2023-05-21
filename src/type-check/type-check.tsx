
import { mergeProps, createSignal, onMount } from 'solid-js'
import { TriggerType, AppProps } from '../../types/props.d'

export const TypeCheck = (props: { props: AppProps }) => {

  const _props = mergeProps(props)

  let checkRef = {} as any

  return (
    <div
      class={`verify-content-box ${_props.props.trigger === TriggerType.insert ? 'verify-content-box-insert' : 'verify-content-box-hover'}`}
      style={{
        '--verify-content-box-width': _props.props.width + 'px',
        '--verify-content-box-height': _props.props.height + 'px'
      }}
    >
      <canvas
        ref={checkRef}
        width={_props.props.width}
        height={_props.props.height}
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
