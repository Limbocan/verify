import { createSignal, onMount } from 'solid-js'

export const VerifySlide = (
  {
    ref, width, update
  }: {
    ref: any,
    width: number,
    update: (x: number) => void
  }
) => {

  let slideRef = {} as any,
    [slideWidth, updateSlideWidth] = createSignal(0),
    [startX, updateStartX] = createSignal(0),
    [activeX, updateActiveX] = createSignal(0),
    [isFirst, updateIsFirst] = createSignal(true)
  
  onMount(() => {
    updateSlideWidth(() => slideRef ? slideRef.getBoundingClientRect().width : 0)
  })

  // 滑动中事件
  const slideMove = (e: MouseEvent) => {
    let _distance = e.screenX - startX()
    let _max_distance = width - slideWidth()
    _distance = _distance <= 0 ? 0 : _distance >= _max_distance ? _max_distance : _distance
    updateActiveX(() => _distance)
    update(_distance)
  }

  // 滑动结束事件
  const slideEnd = (_e: MouseEvent) => {
    updateIsFirst(() => false)
    window.removeEventListener('mouseup', slideEnd)
    window.removeEventListener('mousemove', slideMove)
  }

  // 滑动开始事件
  const slideStart = (e: MouseEvent) => {
    if (isFirst()) updateStartX(() => e.screenX)
    window.addEventListener('mouseup', slideEnd)
    window.addEventListener('mousemove', slideMove)
  }

  // 重置状态
  const resetSlide = () => {
    updateStartX(() => 0)
    updateActiveX(() => 0)
    updateIsFirst(() => true)
  }

  ref({ resetSlide })

  return (
    <div class="verify-slide-box">
      <div
        ref={slideRef}
        class="verify-slide-control"
        onmousedown={slideStart}
        style={`transform: translate(${activeX()}px, 0)`}
      ></div>
    </div>
  )

}
