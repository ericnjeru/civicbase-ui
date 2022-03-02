import { useWatch } from 'react-hook-form'
import { IoMdChatboxes } from 'react-icons/io'
import CustomTabItem from '../CustomTabItem'
import useValidation from '../use-validation'

const QuestionTab = ({ isEditing, defaultMethod }: { isEditing: boolean; defaultMethod?: string }) => {
  const method = useWatch({ name: 'setup.method', defaultValue: defaultMethod })
  const { isSetup, isLanguage } = useValidation()

  return (
    <CustomTabItem id={method?.toLowerCase()} icon={IoMdChatboxes} disabled={(!isSetup || !isLanguage) && !isEditing}>
      Questions
    </CustomTabItem>
  )
}

export default QuestionTab
