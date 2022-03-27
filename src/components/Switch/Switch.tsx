import { Switch as SwitchHeadless } from '@headlessui/react'
import { useTheme } from 'contexts/theme'
import { ReactNode } from 'react'
import tw from 'twin.macro'

const Switch = ({
  value = false,
  onChange,
  children,
}: {
  value?: boolean
  onChange: (checked: boolean) => void
  children?: string | ReactNode
}) => {
  const { theme } = useTheme()
  return (
    <SwitchHeadless.Group>
      <div css={tw`flex items-start`}>
        <SwitchHeadless
          checked={value}
          onChange={onChange}
          css={[
            tw`relative inline-flex items-center h-6 rounded-full w-11`,
            tw`focus:(outline-none)`,
            tw`dark:(border-gray-600 border-2)`,
            theme === 'light' && value && tw`bg-brand`,
            theme === 'dark' && value && tw`bg-brandDark`,
            !value && theme === 'light' && tw`bg-gray-200`,
            !value && theme === 'dark' && tw`bg-gray-700`,
          ]}
        >
          <span css={tw`sr-only`}>{children || 'Switch'}</span>
          <span
            css={[
              tw`inline-block w-4 h-4 transform bg-white rounded-full shadow-lg transition ease-in-out duration-200`,
              value ? tw`translate-x-5` : tw`translate-x-1`,
            ]}
          />
        </SwitchHeadless>
        {children && <SwitchHeadless.Label css={tw`ml-4`}>{children}</SwitchHeadless.Label>}
      </div>
    </SwitchHeadless.Group>
  )
}

export default Switch
