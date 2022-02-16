import { useWatch } from 'react-hook-form'
import { IoLanguageOutline } from 'react-icons/io5'
import { surveyMethods } from 'utilities/constants'
import CustomTabItem from '../CustomTabItem'

const LanguageTab = () => {
  const method = useWatch({ name: 'setup.method' })

  if (method === surveyMethods.Quadratic) {
    return (
      <CustomTabItem id="language" icon={IoLanguageOutline}>
        Language Designation
      </CustomTabItem>
    )
  }

  return null
}

export default LanguageTab
