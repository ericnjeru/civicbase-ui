import { useWatch } from 'react-hook-form'
import { IoMdChatboxes } from 'react-icons/io'
import CustomTabItem from '../CustomTabItem'
import useValidation from '../use-validation'

const QuestionTab = () => {
  const method = useWatch({ name: 'setup.method', defaultValue: '' })
  const { isSetup, isLanguage } = useValidation()

  return (
    <CustomTabItem id={method.toLowerCase()} icon={IoMdChatboxes} disabled={!isSetup || !isLanguage}>
      Questions
    </CustomTabItem>
  )
}

export default QuestionTab
