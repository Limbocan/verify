import { mergeProps } from 'solid-js'
import type { AppProps } from '../types/props'
import { TypeSlide } from './type-slide/type-slide'
import './style.scss'
import style from './style.scss?inline'

const App = (
  props: AppProps
) => {

  const _props = mergeProps(props)
  let slideTypeRef = {} as any

  return (
    <>
      { _props.component ? <style>{style}</style> : null }
      <div class={`verify-container ${(_props.loading || _props.disabled) ? 'verify-container-disabled' : ''}`}>
        <TypeSlide
          ref={slideTypeRef}
          props={_props}
        />
      </div>
    </>
  )
}

export default App
