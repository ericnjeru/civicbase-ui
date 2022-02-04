import { Editor, EditorState, convertFromRaw } from 'draft-js'
import { SurveyRespondent } from '../../../../types/survey'
import 'draft-js/dist/Draft.css'

const CompletionMessage = ({ survey }: { survey: SurveyRespondent }) => {
  if (!survey.message?.completion) {
    return null
  }

  const completionMessage = convertFromRaw(JSON.parse(survey.message.completion))

  return (
    <div>
      <Editor editorState={EditorState.createWithContent(completionMessage)} onChange={() => {}} readOnly />
    </div>
  )
}

export default CompletionMessage
