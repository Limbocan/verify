import { mergeProps } from 'solid-js'
import { AppProps, TriggerType, VerifyType } from '../types/props.d'
import { TypeSlide } from './type-slide/type-slide'
import { TypeCheck } from './type-check/type-check'
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
      <div
        class={[
          'verify-container',
          (_props.loading || _props.disabled) ? 'verify-container-disabled' : '',
          _props.trigger === TriggerType.hover ? 'verify-container-trigger-hover' : '',
        ].join(' ')}
      >
        {
          _props.type === VerifyType.slide ? <TypeSlide
            ref={slideTypeRef}
            props={_props}
          /> : <TypeCheck props={_props} />
        }
      </div>
    </>
  )
}

export default App
