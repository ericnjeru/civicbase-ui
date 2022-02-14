import { useState, createRef, cloneElement, ReactElement } from 'react'
import tw from 'twin.macro'
import { createPopper } from '@popperjs/core'

type Placement = 'left' | 'right' | 'top' | 'bottom'

const Tooltip = ({ children, placement, tip }: { children: ReactElement; placement: Placement; tip: string }) => {
  const [popoverShow, setPopoverShow] = useState(false)
  const childrenRef = createRef<HTMLElement>()
  const popoverRef = createRef<HTMLDivElement>()

  const openTooltip = () => {
    if (popoverRef.current && childrenRef.current) {
      createPopper(childrenRef.current, popoverRef.current, { placement })
      setPopoverShow(true)
    }
  }

  const closeTooltip = () => {
    setPopoverShow(false)
  }

  return (
    <>
      <div css={tw`flex flex-wrap`}>
        <div css={tw`w-full text-center`}>
          {cloneElement(children, {
            onMouseEnter: openTooltip,
            onMouseLeave: closeTooltip,
            ref: childrenRef,
          })}

          <div
            css={[
              tw`border-0 block z-50 leading-normal text-sm max-w-xs text-left no-underline break-words `,
              popoverShow ? tw`visible` : tw`hidden`,
            ]}
            ref={popoverRef}
          >
            <div css={tw`bg-dark-700 text-white p-2 rounded-lg m-2`}>{tip}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tooltip
