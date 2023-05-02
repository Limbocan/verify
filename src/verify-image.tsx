
import { getNumber } from './utils'

export const VerifyImage = ({
  src, width, height, clip = ""
}: {
  src: string,
  width: string | number
  height: string | number
  clip?: string
}) => {
  return (
    <image
      href={src}
      width={getNumber(width)}
      height={getNumber(height)}
      x={0}
      y={0}
      preserveAspectRatio={"none meet" as any}
      clip-path={clip}>
    </image>
  )
}
