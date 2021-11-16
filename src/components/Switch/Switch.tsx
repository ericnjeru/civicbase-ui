import { Dispatch, SetStateAction } from 'react'
import { Switch as SwitchHeadless } from '@headlessui/react'
import tw from 'twin.macro'

const Switch = ({
  enabled,
  setEnabled,
  children,
}: {
  enabled: boolean
  setEnabled: Dispatch<SetStateAction<boolean>>
  children?: string
}) => {
  return (
    <SwitchHeadless.Group>
      <div css={tw`flex items-center`}>
        <SwitchHeadless
          checked={enabled}
          onChange={setEnabled}
          css={[tw`bg-gray-200 relative inline-flex items-center h-6 rounded-full w-11`, tw`focus:(outline-none)`]}
        >
          <span css={tw`sr-only`}>{children || 'Switch'}</span>
          <span
            css={[
              tw`inline-block w-4 h-4 transform bg-brand rounded-full shadow-lg transition ease-in-out duration-200`,
              enabled ? tw`bg-brand` : tw`bg-gray-400`,
              enabled ? tw`translate-x-6` : tw`translate-x-1`,
            ]}
          />
        </SwitchHeadless>
        {children && <SwitchHeadless.Label css={tw`ml-4`}>{children}</SwitchHeadless.Label>}
      </div>
    </SwitchHeadless.Group>
  )
}

export default Switch
