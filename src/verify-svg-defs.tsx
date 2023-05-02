

export const VerifySvgDefs = ({ x = 0, y = 0, scale = 1 }) => {
  return (
    <defs>
      <clipPath id="verify-clip-path" transform={`translate(${x},${y}) scale(${scale})`}>
        <path d="m23.84 13.2202h-1.8838v-5.0828c0-1.3862-1.1374-2.5236-2.5236-2.5236h-5.0828v-1.9194c0-1.7417-1.4218-3.1634-3.1634-3.1634s-3.1634 1.4218-3.1634 3.1634v1.8838h-5.0828c-1.3862 0-2.5236 1.1374-2.5236 2.5236v4.834h1.8838c1.8838 0 3.4122 1.5284 3.4122 3.4122s-1.5284 3.4122-3.4122 3.4122h-1.8838v4.834c0 1.3862 1.1374 2.5236 2.5236 2.5236h4.834v-1.9194c0-1.8838 1.5284-3.4122 3.4122-3.4122s3.4122 1.5284 3.4122 3.4122v1.9194h4.7984c1.3862 0 2.5236-1.1374 2.5236-2.5236v-5.0828h1.9194c1.7417 0 3.1634-1.4218 3.1634-3.1634s-1.3862-3.1279-3.1634-3.1279zm0 0" />
      </clipPath >
      <filter id="verify-clip-filter">
        <feFlood flood-color="#FFF"/>
        <feComposite in2="SourceAlpha" operator="out"/>
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feComposite operator="atop" in2="SourceGraphic"/>
        <feDropShadow dx={2 as any} dy={2 as any} flood-opacity="0.5" />
      </filter>
    </defs>
  )
}
