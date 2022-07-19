import { EditorState, convertFromRaw } from 'draft-js'
import TextEditor from 'components/TextEditor'
import { SurveyRespondent } from '../../../../types/survey'
import 'draft-js/dist/Draft.css'

const CompletionMessage = ({ survey }: { survey: SurveyRespondent }) => {
  if (!survey.message?.completion) {
    return null
  }

  return (
    <div>
      <TextEditor
        value={EditorState.createWithContent(convertFromRaw(JSON.parse(survey.message.completion)))}
        onChange={() => {}}
        readOnly
        enableImage
      />
    </div>
  )
}

export default CompletionMessage
