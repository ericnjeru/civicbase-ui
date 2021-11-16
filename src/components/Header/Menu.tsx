import { Menu } from '@headlessui/react'
import { ReactNode } from 'react'
import tw from 'twin.macro'
import { FadeInOut } from 'components/Transition'
import Typography from 'components/Typography'

export default function Example({ children }: { children: ReactNode }) {
  return (
    <div css={tw`h-full`}>
      <Menu as="div">
        <div css={tw`relative inline-block text-left`}>
          <Menu.Button>{children}</Menu.Button>

          <FadeInOut>
            <Menu.Items
              css={[
                tw`fixed w-56 origin-top-right right-10 top-20 bg-white divide-y light:divide-gray-100 dark:divide-gray-800 rounded-md shadow-xl ring-2 ring-white ring-opacity-5 p-1 focus:outline-none`,
              ]}
            >
              <Menu.Item>
                {({ active }) => (
                  <button
                    css={[
                      active ? tw`bg-blue-500 text-white` : tw`text-primary`,
                      tw`flex rounded-md items-center w-full px-2 py-2 text-sm justify-center`,
                      tw`sm:hidden`,
                    ]}
                  >
                    <Typography css={[active && tw`text-white`]}>Blog</Typography>
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    css={[
                      active ? tw`bg-blue-500 text-white` : tw`text-primary`,
                      tw`flex rounded-md items-center w-full px-2 py-2 text-sm justify-center`,
                      tw`sm:hidden`,
                    ]}
                  >
                    <Typography css={[active && tw`text-white`]}>FAQ</Typography>
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    css={[
                      active ? tw`bg-blue-500 text-white` : tw`text-primary`,
                      tw`flex rounded-md items-center w-full px-2 py-2 text-sm justify-center`,
                      tw`sm:hidden`,
                    ]}
                  >
                    <Typography css={[active && tw`text-white`]}>About</Typography>
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    css={[
                      active ? tw`bg-red-500 text-white` : tw`text-primary`,
                      tw`flex rounded-md items-center w-full px-2 py-2 text-sm justify-center`,
                    ]}
                  >
                    <Typography css={[active && tw`text-white`]}>Logout</Typography>
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
