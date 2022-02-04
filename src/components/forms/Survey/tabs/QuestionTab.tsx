import { useWatch } from 'react-hook-form'
import CustomTabItem from '../CustomTabItem'
import { BsQuestion } from 'react-icons/bs'

const QuestionTab = () => {
  const method = useWatch({ name: 'setup.method' })

  return (
    <CustomTabItem id={method ? method.toLowerCase() : ''} icon={BsQuestion} disabled={!method}>
      Questions
    </CustomTabItem>
  )
}

export default QuestionTab
