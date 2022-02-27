import { MdChat } from 'react-icons/md'
import CustomTabItem from '../CustomTabItem'
import useValidation from '../use-validation'

const MessagesTab = ({ isEditing }: { isEditing: boolean }) => {
  const { isSetup, isLanguage, isConjoint, isLikert, isQuadratic } = useValidation()

  return (
    <CustomTabItem
      id="messages"
      icon={MdChat}
      disabled={(!isSetup || !isLanguage || !isConjoint || !isLikert || !isQuadratic) && !isEditing}
    >
      Messages
    </CustomTabItem>
  )
}

export default MessagesTab
