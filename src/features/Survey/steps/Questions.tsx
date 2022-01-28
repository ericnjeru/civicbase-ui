import tw from 'twin.macro'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import DynamicBar from 'components/DynamicBar'
import { Survey as SurveyProps } from '../../../../types/survey'
import { Headline } from 'components/Typography'
import Vote from 'components/Vote'
import { PrimaryButton } from 'components/Button'
import { useEffect, useState } from 'react'
import useMethod from 'hooks/use-method'
import { useMetadata } from 'contexts/metadata'
import { Answer } from '../../../../types/answer'
import useAsync from 'hooks/use-async'
import { createAnswer } from 'services/survey'
import Dialog from 'components/Dialog'
import 'draft-js/dist/Draft.css'

const Survey = ({ survey, handleNext }: { survey: SurveyProps; handleNext: () => void }) => {
  const { run, isSuccess } = useAsync()
  const { questions, availableCredits, vote, canVote } = useMethod(survey)
  const { metadata, params, pageLoad } = useMetadata()
  const [openDialog, setOpenDialog] = useState(false)
  const {
    setup: { credits },
    language: { thumbsDown, thumbsUp, token },
  } = survey

  useEffect(() => {
    pageLoad()
  }, [])

  useEffect(() => {
    if (isSuccess) {
      handleNext()
    }
  }, [isSuccess, handleNext])

  useEffect(() => {
    if (availableCredits === 0) {
      setOpenDialog(true)
    }
  }, [availableCredits])

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

    run(createAnswer(answer))
  }

  return (
    <div css={tw`container mx-auto`}>
      <Dialog
        open={openDialog}
        handleOpen={setOpenDialog}
        title="Credits"
        text="You run out of credits."
        buttonText="Ok, I got it!"
      />

      <div css={tw`sticky z-50`} style={{ top: 76 }}>
        <DynamicBar total={credits} availableCredits={availableCredits} language={token} />
      </div>

      <div css={tw`flex flex-col items-center space-y-24 mt-20`}>
        {questions.map((question, index) => (
          <div key={question.id}>
            <Headline css={tw`mb-4 flex`}>
              {index + 1}.{' '}
              <Editor
                editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(question.statement)))}
                onChange={() => {}}
                readOnly
              />
            </Headline>

            <Vote
              thumbsDown={thumbsDown}
              thumbsUp={thumbsUp}
              total={credits}
              handleVote={(direction: number) => vote(index, direction)}
              vote={question.vote}
              creditSpent={question.credits}
              canVoteUp={canVote(index, 1)}
              canVoteDown={canVote(index, -1)}
            />
          </div>
        ))}

        <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
      </div>
    </div>
  )
}

export default Survey
