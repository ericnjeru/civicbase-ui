import { createElement, FunctionComponent, useEffect, useState } from 'react'
import tw from 'twin.macro'
import { IconBaseProps } from 'react-icons'
import { FaCheck } from 'react-icons/fa'
import { useFormContext, useWatch } from 'react-hook-form'
import { TabItem, TabLabel } from 'components/Tabs'

const CustomTabItem = ({
  children,
  id,
  icon,
  disabled = false,
}: {
  children: string
  id: string
  icon: FunctionComponent<IconBaseProps>
  disabled?: boolean
}) => {
  const {
    trigger,
    control,
    formState: { errors, isDirty, dirtyFields },
  } = useFormContext()
  const [isValid, setValid] = useState(false)
  const observable = useWatch({
    control,
    name: id,
    defaultValue: false,
  })

  const hasError = !!errors[id] && isDirty

  useEffect(() => {
    if (observable && !!dirtyFields[id]) {
      trigger(id).then((val) => setValid(val))
    }
  }, [setValid, trigger, observable, id, dirtyFields])

  return (
    <TabItem
      id={id}
      css={[
        (isValid || hasError) && tw`text-white transition-all ease-in-out duration-300`,
        isValid && tw`!bg-green-400  focus:!ring-green-300 hover:!bg-green-400`,
        hasError && tw`!bg-red-400 focus:!ring-red-300 hover:!bg-red-400`,
        disabled && tw`bg-brand opacity-50 text-white focus:(ring-brand ring-opacity-50) hover:bg-brand`,
      ]}
      disabled={disabled}
    >
      <div css={tw`mr-2`}>{createElement(isValid ? FaCheck : icon, { size: 20, 'aria-hidden': true })}</div>
      <TabLabel id={id} css={[(isValid || hasError || disabled) && tw`text-white`]}>
        {children}
      </TabLabel>
    </TabItem>
  )
}

export default CustomTabItem
