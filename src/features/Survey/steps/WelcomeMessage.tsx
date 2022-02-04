import { Editor, EditorState, convertFromRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'
import tw from 'twin.macro'
import { PrimaryButton } from 'components/Button'
import { SurveyRespondent } from '../../../../types/survey'

const WelcomeMessage = ({ survey, handleNext }: { survey: SurveyRespondent; handleNext: () => void }) => {
  if (!survey.message?.welcome) {
    return null
  }

  const welcomeMessage = convertFromRaw(JSON.parse(survey.message.welcome))

  return (
    <div>
      <Editor editorState={EditorState.createWithContent(welcomeMessage)} onChange={() => {}} readOnly />

      <div css={tw`w-full flex justify-center mt-8`}>
        <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
      </div>
    </div>
  )
}

export default WelcomeMessage
