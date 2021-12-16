import { Switch as SwitchHeadless } from '@headlessui/react'
import tw from 'twin.macro'

const Switch = ({
  value = false,
  onChange,
  children,
}: {
  value?: boolean
  onChange: (checked: boolean) => void
  children?: string
}) => {
  return (
    <SwitchHeadless.Group>
      <div css={tw`flex items-center`}>
        <SwitchHeadless
          checked={value}
          onChange={onChange}
          css={[tw`bg-gray-200 relative inline-flex items-center h-6 rounded-full w-11`, tw`focus:(outline-none)`]}
        >
          <span css={tw`sr-only`}>{children || 'Switch'}</span>
          <span
            css={[
              tw`inline-block w-4 h-4 transform bg-brand rounded-full shadow-lg transition ease-in-out duration-200`,
              value ? tw`bg-brand` : tw`bg-gray-400`,
              value ? tw`translate-x-6` : tw`translate-x-1`,
            ]}
          />
        </SwitchHeadless>
        {children && <SwitchHeadless.Label css={tw`ml-4`}>{children}</SwitchHeadless.Label>}
      </div>
    </SwitchHeadless.Group>
  )
}

export default Switch
