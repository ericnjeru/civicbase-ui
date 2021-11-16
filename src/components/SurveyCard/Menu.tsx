import { Menu } from '@headlessui/react'
import { ReactNode } from 'react'
import tw from 'twin.macro'
import { FadeInOut } from 'components/Transition'
import { BiCopy } from 'react-icons/bi'
import { IoDuplicateOutline } from 'react-icons/io5'
import { AiOutlineDelete } from 'react-icons/ai'
import Typography from 'components/Typography'

export default function Example({ children, onMenuClose }: { children: ReactNode; onMenuClose: () => void }) {
  const handleCopyId = () => {
    onMenuClose()
  }
  const handleDuplicate = () => {
    onMenuClose()
  }
  const handleDelete = () => {
    onMenuClose()
  }

  return (
    <Menu as="div">
      <div css={tw`relative inline-block text-left bg-transparent z-10`}>
        <Menu.Button>{children}</Menu.Button>

        <FadeInOut>
          <Menu.Items
            css={tw`absolute -right-3 top-0 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-1 focus:outline-none`}
          >
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleCopyId}
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
                  onClick={handleDuplicate}
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
                  onClick={handleDelete}
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
  )
}
