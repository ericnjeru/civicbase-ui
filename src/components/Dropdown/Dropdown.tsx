import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { BsCheck } from 'react-icons/bs'
import { HiOutlineSelector } from 'react-icons/hi'
import { FadeInOut } from 'components/Transition'
import tw from 'twin.macro'

function Dropdown({ error, modified, values }: { error?: boolean; modified?: boolean; values: string[] }) {
  const [selected, setSelected] = useState(values[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div css={tw`relative mt-1`}>
        <Listbox.Button
          css={[
            tw`h-10 w-full px-2 text-sm `,
            tw`border-2 rounded-md border-gray-200 placeholder-gray-400`,
            tw`focus:outline-none focus:ring focus:border-blue-300`,
            modified && tw`border-indigo-600 border-opacity-60`,
            error && tw`border-error-600 border-opacity-60`,
          ]}
        >
          <span css={tw`block text-left truncate`}>{selected}</span>
          <span css={tw`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none`}>
            <HiOutlineSelector size={20} aria-hidden="true" />
          </span>
        </Listbox.Button>
        <FadeInOut>
          <Listbox.Options
            css={tw`absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
          >
            {values.map((value) => (
              <Listbox.Option key={value} css={tw`cursor-default select-none relative`} value={value}>
                {({ selected, active }) => (
                  <div css={[tw`py-2 pl-10 pr-4`, active && tw`bg-brand text-white`]}>
                    <span css={[selected ? tw`font-medium` : tw`font-normal`, tw`block truncate`]}>{value}</span>
                    {selected ? (
                      <span
                        css={[
                          tw`absolute inset-y-0 left-0 flex items-center pl-3 text-brand`,
                          active && tw`text-white`,
                        ]}
                      >
                        <BsCheck size={20} aria-hidden="true" />
                      </span>
                    ) : null}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </FadeInOut>
      </div>
    </Listbox>
  )
}

export default Dropdown
