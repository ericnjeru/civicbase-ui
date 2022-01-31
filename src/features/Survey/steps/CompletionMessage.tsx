import { Editor, EditorState, convertFromRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { Survey } from '../../../../types/survey'

const CompletionMessage = ({ survey }: { survey: Survey }) => {
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
