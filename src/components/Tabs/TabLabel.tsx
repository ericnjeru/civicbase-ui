import { useContext } from 'react'
import tw from 'twin.macro'
import TabContext from './TabContext'
import Typography from 'components/Typography'

const TabLabel = ({ id, children }: { id: string; children: string }) => {
  const { active } = useContext(TabContext)

  return <Typography css={[active === id && tw`text-white`]}>{children}</Typography>
}

export default TabLabel
