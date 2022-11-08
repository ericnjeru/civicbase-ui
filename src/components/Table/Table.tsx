import { ReactNode } from 'react'

import tw from 'twin.macro'

const Table = ({ children }: { children: ReactNode[] | ReactNode }) => {
  return (
    <div css={tw`flex flex-col`}>
      <div css={tw`-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8`}>
        <div css={tw`py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8`}>
          <div css={tw`shadow overflow-hidden border-gray-200 sm:rounded-lg`}>
            <table css={[tw`min-w-full divide-y divide-gray-200`, tw`dark:text-gray-400`]}>{children}</table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
