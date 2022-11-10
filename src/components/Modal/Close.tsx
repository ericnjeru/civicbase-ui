import { FiX } from 'react-icons/fi'

import tw, { styled } from 'twin.macro'

const Close = styled.button.attrs({ type: 'button', tabIndex: -1, children: <FiX size={20} /> })(() => [
  tw`p-1 rounded-md text-gray-500 bg-gray-100 hover:(text-gray-800 bg-gray-200) focus:(outline-none ring-2 ring-brand)`,
])

export default Close
