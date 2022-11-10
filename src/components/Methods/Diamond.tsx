import { useFormContext } from 'react-hook-form'

import Button from 'components/Button'
import { DiamondSVG } from 'components/Diamond/Diamond'
import { Hint } from 'components/Typography'
import tw from 'twin.macro'

const DiamondMethod = ({ onSelect }: { onSelect: () => void }) => {
  const { getValues } = useFormContext()

  const methodPreference = getValues('setup.methodPreference')

  return (
    <div css={tw`w-full`}>
      <Button
        css={[
          tw`rounded border-gray-100 border-2 p-0 w-full`,
          tw`hover:(ring-brand2 ring-2 cursor-pointer)`,
          methodPreference === 'diamond' && tw`focus:(ring-brand ring-2) ring-brand ring-2`,
        ]}
        onClick={onSelect}
      >
        <div css={tw`bg-gray-100 rounded-t p-2 text-center`}>Diamond </div>
        <div css={tw`flex justify-center`}>
          <DiamondSVG index="#" />
        </div>
      </Button>

      <Hint css={tw`text-red-400`}>* This feature is for test purpose only</Hint>
    </div>
  )
}

export default DiamondMethod
