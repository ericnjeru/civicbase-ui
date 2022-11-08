import TextEditor from 'components/TextEditor'
import { EditorState, convertFromRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'

import { SurveyRespondent } from '../../../../types/survey'

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
