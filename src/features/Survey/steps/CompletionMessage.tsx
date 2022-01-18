import { Editor, EditorState, convertFromRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { Survey } from '../../../../types/survey'

const CompletionMessage = ({ survey }: { survey: Survey }) => {
  console.log('survey', survey)
  const completionMessage = survey.message?.completion && convertFromRaw(JSON.parse(survey.message?.completion))

  return (
    <div>
      <Editor editorState={EditorState.createWithContent(completionMessage)} onChange={() => {}} readOnly />
    </div>
  )
}

export default CompletionMessage
