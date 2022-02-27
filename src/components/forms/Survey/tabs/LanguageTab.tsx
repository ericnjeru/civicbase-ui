import { useWatch } from 'react-hook-form'
import { MdLanguage } from 'react-icons/md'
import { surveyMethods } from 'utilities/constants'
import CustomTabItem from '../CustomTabItem'
import useValidation from '../use-validation'

const LanguageTab = ({ isEditing }: { isEditing: boolean }) => {
  const method = useWatch({ name: 'setup.method' })
  const { isSetup } = useValidation()

  if (method === surveyMethods.Quadratic) {
    return (
      <CustomTabItem id="language" icon={MdLanguage} disabled={!isSetup && !isEditing}>
        Language Designation
      </CustomTabItem>
    )
  }

  return null
}

export default LanguageTab
