import { mergeProps } from 'solid-js'
import { getNumber } from '../utils'

export const VerifyImage = (
  props : {
  src: string,
  width: string | number
  height: string | number
  repeat?: boolean
  clip?: string
  loading?: boolean
  }) => {
  
  const _props = mergeProps(props)

  return (
    <foreignObject
      x={0}
      y={0}
      width={getNumber(_props.width)}
      height={getNumber(_props.height)}
      clip-path={_props.clip}
    >
      <div
        class={[
          'verify-background-image',
          _props.loading === true ? 'verify-image-loading' : '',
          _props.clip ? 'verify-image-clip' : '',
        ].join(' ')}
        style={[
          `background-image: url("${_props.src}")`,
          _props.repeat === false ? 'background-repeat: no-repeat' : '',
        ].join(';')}
      ></div>
    </foreignObject>
  )
}
