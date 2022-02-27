import { FaCog } from 'react-icons/fa'
import CustomTabItem from '../CustomTabItem'
import useValidation from '../use-validation'

const CustomizeTab = ({ isEditing }: { isEditing: boolean }) => {
  const { isSetup, isLanguage, isConjoint, isLikert, isQuadratic } = useValidation()

  return (
    <CustomTabItem
      id="customize"
      icon={FaCog}
      disabled={(!isSetup || !isLanguage || !isConjoint || !isLikert || !isQuadratic) && !isEditing}
    >
      Customize
    </CustomTabItem>
  )
}

export default CustomizeTab
