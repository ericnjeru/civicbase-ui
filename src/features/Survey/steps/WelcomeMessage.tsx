import { EditorState, convertFromRaw } from 'draft-js'
import TextEditor from 'components/TextEditor'
import 'draft-js/dist/Draft.css'
import tw from 'twin.macro'
import { PrimaryButton } from 'components/Button'
import { SurveyRespondent } from '../../../../types/survey'
import { useMetadata } from 'contexts/metadata'

const WelcomeMessage = ({ survey, handleNext }: { survey: SurveyRespondent; handleNext: () => void }) => {
  const { onStart } = useMetadata()
  if (!survey.message?.welcome) {
    return null
  }

  const onNext = () => {
    onStart()
    handleNext()
  }
  const welcomeMessage = convertFromRaw(JSON.parse(survey.message.welcome))

  return (
    <div>
      <TextEditor value={EditorState.createWithContent(welcomeMessage)} onChange={() => {}} readOnly enableImage />
      <div css={tw`w-full flex justify-center mt-8`}>
        <PrimaryButton onClick={onNext}>Next</PrimaryButton>
      </div>
    </div>
  )
}

export default WelcomeMessage
