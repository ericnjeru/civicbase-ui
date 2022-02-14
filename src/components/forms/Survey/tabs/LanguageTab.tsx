import { useWatch } from 'react-hook-form'
import { IoLanguageOutline } from 'react-icons/io5'
import CustomTabItem from '../CustomTabItem'

const LanguageTab = () => {
  const method = useWatch({ name: 'setup.method' })

  if (method === 'Quadratic') {
    return (
      <CustomTabItem id="language" icon={IoLanguageOutline}>
        Language Designation
      </CustomTabItem>
    )
  }

  return null
}

export default LanguageTab
