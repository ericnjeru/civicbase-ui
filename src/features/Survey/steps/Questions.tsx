import tw from 'twin.macro'
import DynamicBar from 'components/DynamicBar'
import { Survey as SurveyProps } from '../../../../types/survey'
import { Headline } from 'components/Typography'
import Vote from 'components/Vote'
import { PrimaryButton } from 'components/Button'
import { useEffect } from 'react'
import useMethod from 'hooks/use-method'
import { useMetadata } from 'contexts/metadata'
import { Answer } from '../../../../types/answer'
import useAsync from 'hooks/use-async'
import { createAnswer } from 'services/survey'

const Survey = ({ survey, handleNext }: { survey: SurveyProps; handleNext: () => void }) => {
  const { run, isSuccess } = useAsync()
  const { questions, availableCredits, vote, canVote } = useMethod(survey)
  const { metadata, pageLoad } = useMetadata()
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
    }

    run(createAnswer(answer))
  }

  return (
    <div css={tw`container mx-auto`}>
      <div css={tw`sticky z-50`} style={{ top: 76 }}>
        <DynamicBar total={credits} availableCredits={availableCredits} language={token} />
      </div>

      <div css={tw`flex flex-col items-center space-y-24 mt-20`}>
        {questions.map((question, index) => (
          <div key={question.id}>
            <Headline css={tw`mb-4`}>
              {index + 1}. {question.statement}
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
