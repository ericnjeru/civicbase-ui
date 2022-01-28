import { useWatch } from 'react-hook-form'
import CustomTabItem from '../CustomTabItem'
import { BiCog } from 'react-icons/bi'

const ConjointTab = () => {
  const method = useWatch({ name: 'setup.method' })

  if (method !== 'Conjoint') {
    return null
  }

  return (
    <CustomTabItem id="conjoint" icon={BiCog}>
      Conjoint
    </CustomTabItem>
  )
}

export default ConjointTab
