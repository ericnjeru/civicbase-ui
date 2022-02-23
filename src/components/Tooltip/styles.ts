import tw, { styled } from 'twin.macro'

const Tooltip = styled.div<{ variant?: 'light' | 'dark' }>(({ variant = 'dark' }) => [
  tw`py-3 px-5 rounded-md text-xs font-medium z-20`,
  variant === 'dark' && tw`bg-gray-600 text-white`,
  variant === 'light' && tw`shadow-lg bg-white text-black`,
])

export default Tooltip
