import { Editor, EditorState, convertFromRaw } from 'draft-js'
import { SurveyRespondent } from '../../../../types/survey'
import 'draft-js/dist/Draft.css'

const CompletionMessage = ({ survey }: { survey: SurveyRespondent }) => {
  if (!survey.message?.completion) {
    return null
  }

  return (
    <div>
      <Editor
        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(survey.message.completion)))}
        onChange={() => {}}
        readOnly
      />
    </div>
  )
}

export default CompletionMessage
