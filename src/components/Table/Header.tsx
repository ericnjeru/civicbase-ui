import tw, { styled } from 'twin.macro'

export default styled.th.attrs(({ scope = 'col' }) => ({ scope }))(() => [
  tw`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`,
  tw`dark:(bg-gray-700 text-gray-400)`,
])
