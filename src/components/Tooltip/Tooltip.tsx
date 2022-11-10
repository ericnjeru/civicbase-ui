import { ReactNode, cloneElement, isValidElement } from 'react'
import { Config, usePopperTooltip } from 'react-popper-tooltip'

import Tooltip from './styles'

const ToolTip: React.FC<{ label: ReactNode; variant?: 'dark' | 'light'; popperProps?: Config }> = ({
  children,
  label,
  variant,
  popperProps = {},
  ...props
}) => {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip(popperProps)
  return (
    <>
      {isValidElement(children) && cloneElement(children, { ref: setTriggerRef })}
      {visible && (
        <Tooltip ref={setTooltipRef} {...getTooltipProps()} variant={variant} {...props}>
          {label}
        </Tooltip>
      )}
    </>
  )
}

export default ToolTip
