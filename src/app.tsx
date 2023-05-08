import type { AppProps } from '../types/props'
import { TypeSlide } from './type-slide/type-slide'
import './style.scss'
import style from './style.scss?inline'

const App = (
  {
    ref,
    component,
    width,
    height,
    verifyX = 0,
    verifyY = 0,
    deviation = 10,
  }: AppProps
) => {

  ref({})

  return (
    <>
      { component ? <style>{style}</style> : null }
      <div class="verify-container">
        <TypeSlide width={width} height={height} verifyX={verifyX} verifyY={verifyY} deviation={deviation} />
      </div>
    </>
  )
}

export default App
