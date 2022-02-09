import tw from 'twin.macro'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import DynamicBar from 'components/DynamicBar'
import { SurveyRespondent } from '../../../../types/survey'
import { Headline } from 'components/Typography'
import Vote from 'components/Vote'
import { PrimaryButton } from 'components/Button'
import { useEffect, useState } from 'react'
import { useMetadata } from 'contexts/metadata'
import { Answer } from '../../../../types/answer'
import useAsync from 'hooks/use-async'
import { createAnswer } from 'services/survey'
import TextArea from 'components/Form/TextArea'
import useQuadratic from 'hooks/use-quadratic'
import 'draft-js/dist/Draft.css'

const Quadratic = ({ survey, handleNext }: { survey: SurveyRespondent; handleNext: () => void }) => {
  const { run, isSuccess } = useAsync()
  const { questions, availableCredits, vote, canVote } = useQuadratic(survey)
  const { metadata, params, pageLoad } = useMetadata()
  const [feedbackText, setFeedback] = useState('')
  const {
    setup: { credits, feedback },
    language: { thumbsDown, thumbsUp, token, customToken = '' },
  } = survey

  useEffect(() => {
    pageLoad()
  }, [pageLoad])

  useEffect(() => {
    if (isSuccess) {
      handleNext()
    }
  }, [isSuccess, handleNext])

  const handleSubmit = () => {
    const answer: Answer = {
      surveyId: survey.id,
      questions,
      researcherId: survey.uid,
      status: survey.status,
      time: {
        ...metadata,
        submitedAt: new Date().toISOString(),
      },
      leftCredits: availableCredits,
      ...params,
    }

    if (feedback?.active && feedbackText.length > 0) {
      answer.feedback = feedbackText
    }

    run(createAnswer(answer))
  }

  return (
    <div css={tw`container mx-auto`}>
      {credits && (
        <div css={tw`sticky z-50`} style={{ top: 70 }}>
          <DynamicBar
            total={credits}
            availableCredits={availableCredits}
            language={token === 'Custom' ? customToken : token}
          />
        </div>
      )}

      <div css={tw`flex flex-col items-center space-y-24 mt-20 pb-20`}>
        {questions.map((question, index) => {
          return (
            <div key={question.id} css={tw`flex w-full flex-col`}>
              <Headline css={tw`mb-4 flex`}>
                {index + 1}.{' '}
                <Editor
                  editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(question.statement)))}
                  onChange={() => {}}
                  readOnly
                />
              </Headline>

              <div css={tw`flex justify-center mt-12`}>
                <Vote
                  thumbsDown={thumbsDown}
                  thumbsUp={thumbsUp}
                  total={credits}
                  handleVote={(direction: number) => vote(index, direction)}
                  vote={question.vote}
                  creditSpent={question.credits}
                  canVoteUp={canVote(index, 1)}
                  canVoteDown={canVote(index, -1)}
                  token={token === 'Custom' ? customToken : token}
                />
              </div>
            </div>
          )
        })}

        {feedback?.active && (
          <div css={tw`flex flex-col w-full`}>
            <Headline>{feedback.question}</Headline>

            <TextArea
              value={feedbackText}
              onChange={({ target: { value } }) => {
                setFeedback(value)
              }}
              css={tw`mt-4`}
            />
          </div>
        )}

        <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
      </div>
    </div>
  )
}

export default Quadratic
