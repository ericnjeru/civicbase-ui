import { useFormContext } from 'react-hook-form'

import Button from 'components/Button'
import { Display } from 'components/Vote'
import tw from 'twin.macro'

const RadiusMethod = ({ onSelect }: { onSelect: () => void }) => {
  const { getValues } = useFormContext()

  const methodPreference = getValues('setup.methodPreference')

  return (
    <Button
      css={[
        tw`rounded border-gray-100 border-2 h-full flex flex-col p-0`,
        tw`hover:(ring-brand2 ring-2 cursor-pointer)`,
        methodPreference === 'radius' && tw`focus:(ring-brand ring-2) ring-brand ring-2`,
      ]}
      onClick={onSelect}
    >
      <div css={tw`bg-gray-100 rounded-t p-2 text-center`}>Radius </div>

      <div css={tw`flex justify-center items-center flex-1`}>
        <Display total={100} vote={5} creditSpent={25} token="Credits" />
      </div>
    </Button>
  )
}

export default RadiusMethod
