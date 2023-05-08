
import { getNumber } from '../utils'

export const VerifyImage = ({
  src, width, height, repeat = true, clip = ""
}: {
  src: string,
  width: string | number
  height: string | number
  repeat?: boolean
  clip?: string
}) => {
  return (
    <foreignObject
      x={0}
      y={0}
      width={getNumber(width)}
      height={getNumber(height)}
      clip-path={clip}
    >
      <div
        class="verify-background-image"
        style={
          `background-image: url(${src});${repeat === false ? 'background-repeat: no-repeat' : ''}`
        }
      ></div>
    </foreignObject>
  )
}
