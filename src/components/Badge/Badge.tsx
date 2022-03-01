import tw, { styled } from 'twin.macro'

const Badge = styled.span(({ variant = 'default' }: { variant?: 'default' | 'dark' }) => [
  tw`font-bold px-2 py-0.5 rounded-md text-sm`,
  variant === 'default' && tw`bg-gray-100 text-black`,
  variant === 'dark' && tw`bg-gray-900 text-white`,
])

export default Badge
