import { ReactNode } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { BiCopy } from 'react-icons/bi'
import { IoDuplicateOutline } from 'react-icons/io5'

import { Menu } from '@headlessui/react'
import { FadeInOut } from 'components/Transition'
import Typography from 'components/Typography'
import tw from 'twin.macro'

export default function Example({ children }: { children: ReactNode }) {
  return (
    <div css={tw``}>
      <Menu as="div">
        <div css={tw`relative inline-block text-left bg-white z-10`}>
          <Menu.Button>{children}</Menu.Button>

          <FadeInOut>
            <Menu.Items
              css={tw`absolute -right-60 top-0 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-1 focus:outline-none`}
            >
              <Menu.Item>
                {({ active }) => (
                  <button
                    css={[
                      active ? tw`bg-blue-500 text-white` : tw`text-gray-900`,
                      tw`flex rounded-md items-center w-full px-2 py-2 text-sm`,
                    ]}
                  >
                    <BiCopy size={20} css={tw`mr-2`} aria-hidden="true" />
                    <Typography css={[active && tw`text-white`]}>Copy ID</Typography>
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    css={[
                      active ? tw`bg-blue-500 text-white` : tw`text-gray-900`,
                      tw`flex rounded-md items-center w-full px-2 py-2 text-sm`,
                    ]}
                  >
                    <IoDuplicateOutline size={20} css={tw`mr-2`} aria-hidden="true" />
                    <Typography css={[active && tw`text-white`]}>Duplicate</Typography>
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    css={[
                      active ? tw`bg-red-500 text-white` : tw`text-gray-900`,
                      tw`flex rounded-md items-center w-full px-2 py-2 text-sm`,
                    ]}
                  >
                    <AiOutlineDelete size={20} css={tw`mr-2`} aria-hidden="true" />
                    <Typography css={[active && tw`text-white`]}>Delete</Typography>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </FadeInOut>
        </div>
      </Menu>
    </div>
  )
}
