import tw from 'twin.macro'
import { ReactNode, useContext } from 'react'
import TabContext from './TabContext'

const Tab = ({ children, id }: { children: ReactNode; id: string }) => {
  const { active, onChange } = useContext(TabContext)

  return (
    <button
      onClick={() => onChange(id)}
      css={[
        active === id ? tw`bg-brand text-white` : tw`bg-gray-100 text-gray-900 `,
        tw`flex rounded-md items-center w-full px-2 py-2 text-sm mb-4 outline-none`,
        active !== id && tw`hover:bg-gray-200`,
        // TODO: we need to think about this outline thing
        tw`focus:outline-none focus:ring focus:border-blue-300`,
      ]}
    >
      {children}
    </button>
  )
}

export default Tab
