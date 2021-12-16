import tw from 'twin.macro'
import { createElement, useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { useFormContext, useWatch } from 'react-hook-form'
import { TabItem, TabLabel } from 'components/Tabs'

const CustomTabItem = ({ children, id, icon }: { children: string; id: string; icon: any }) => {
  const {
    trigger,
    control,
    formState: { errors, isDirty },
  } = useFormContext()
  const [isValid, setValid] = useState(false)
  const observable = useWatch({
    control,
    name: id,
    defaultValue: false,
  })
  const hasError = !!errors[id] && isDirty

  useEffect(() => {
    if (observable) {
      trigger(id).then((val) => setValid(val))
    }
  }, [setValid, trigger, observable, id])

  return (
    <TabItem
      id={id}
      css={[
        (isValid || hasError) && tw`text-white transition-all ease-in-out duration-700`,
        isValid && tw`bg-green-400  focus:ring-green-300 hover:bg-green-400`,
        hasError && tw`bg-red-400 focus:ring-red-300 hover:bg-red-400`,
      ]}
    >
      <div css={tw`mr-2`}>{createElement(isValid ? FaCheck : icon, { size: 20, ariaHidden: true })}</div>
      <TabLabel id={id} css={[(isValid || hasError) && tw`text-white`]}>
        {children}
      </TabLabel>
    </TabItem>
  )
}

export default CustomTabItem
