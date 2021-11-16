import { ReactElement, useState, useEffect, cloneElement } from 'react'
import tw from 'twin.macro'
import { createPopper } from '@popperjs/core'

type Placement = 'left' | 'right' | 'top' | 'bottom'

const Tooltip = ({
  children,
  placement = 'right',
  id,
}: {
  children: ReactElement
  placement?: Placement
  id: string
}) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (show) {
      const button = document.querySelector(`#${id}-container`)

      const tooltip = document.querySelector(`#${id}-tooltip`)

      if (button && tooltip) {
        createPopper(button, tooltip as HTMLElement, {
          placement,
        })
      }
    }
  }, [show, placement, id])

  return (
    <div css={tw`flex flex-wrap`}>
      <div css={tw`w-full text-center`}>
        {cloneElement(children, {
          onMouseEnter: () => setShow(true),
          onMouseLeave: () => setShow(false),
          id: `${id}-container`,
        })}

        <div
          id={`${id}-tooltip`}
          css={[
            !show && tw`invisible`,
            tw`hidden bg-white border-0 mb-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg`,
          ]}
        >
          <div>
            <div css={tw`opacity-75 p-1.5 mb-0 border border-solid uppercase rounded`}>Hi. I am tooltip.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tooltip
