import { useWatch } from 'react-hook-form'
import CustomTabItem from '../CustomTabItem'
import { BsListCheck } from 'react-icons/bs'

const QuestionTab = () => {
  const method = useWatch({ name: 'setup.method' })

  if (method === 'Conjoint') {
    return null
  }

  return (
    <CustomTabItem id="questions" icon={BsListCheck}>
      Questions
    </CustomTabItem>
  )
}

export default QuestionTab
