import { useWatch } from 'react-hook-form'
import CustomTabItem from '../CustomTabItem'
import { BsQuestion } from 'react-icons/bs'

const ConjointTab = () => {
  const method = useWatch({ name: 'setup.method' })

  if (method !== 'Conjoint') {
    return null
  }

  return (
    <CustomTabItem id="conjoint" icon={BsQuestion}>
      Questions
    </CustomTabItem>
  )
}

export default ConjointTab
