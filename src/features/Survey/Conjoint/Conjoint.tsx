import { Editor, EditorState, convertFromRaw } from 'draft-js'
import { useEffect, useState } from 'react'
import tw, { theme } from 'twin.macro'
import Card from 'components/Card'
import Typography, { Headline } from 'components/Typography'
import { ConjointItems } from '../../../../types/survey-base'
import { AiFillCheckCircle } from 'react-icons/ai'
import { SurveyRespondent } from '../../../../types/survey'
import useConjoint from 'hooks/use-conjoint'
import TextArea from 'components/Form/TextArea'
import { PrimaryButton } from 'components/Button'
import { ConjointAnswer } from '../../../../types/answer'
import { useMetadata } from 'contexts/metadata'
import useAsync from 'hooks/use-async'
import { createAnswer } from 'services/survey'
import 'draft-js/dist/Draft.css'

const Conjoint = ({ survey, handleNext }: { survey: SurveyRespondent; handleNext: () => void }) => {
  const { metadata, params, pageLoad } = useMetadata()
  const { questions, vote } = useConjoint(survey)
  const [feedbackText, setFeedback] = useState('')
  const { run, isSuccess } = useAsync()

  useEffect(() => {
    pageLoad()
  }, [pageLoad])

  useEffect(() => {
    if (isSuccess) {
      handleNext()
    }
  }, [isSuccess, handleNext])

  const handleSelect = (questionIndex: number, id: string) => {
    vote(questionIndex, id)
  }

  const handleSubmit = () => {
    const answer: ConjointAnswer = {
      surveyId: survey.id,
      questions,
      researcherId: survey.uid,
      status: survey.status,
      time: {
        ...metadata,
        submitedAt: new Date().toISOString(),
      },
      ...params,
    }

    if (survey.setup.feedback?.active && feedbackText.length > 0) {
      answer.feedback = feedbackText
    }

    run(createAnswer(answer))
  }

  return (
    <div>
      {questions.map((question, index) => (
        <div css={tw`grid grid-cols-5 gap-4`} key={question.statement}>
          <div css={tw`mt-20`}>
            {question.attributes.map((attr) => (
              <Typography css={tw`mb-6 text-right`} key={attr.key}>
                {attr.name}
              </Typography>
            ))}
          </div>

          <div css={tw`col-span-4`}>
            <Headline css={tw`mb-4 flex`}>
              {index + 1}.{' '}
              <Editor
                editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(question.statement)))}
                onChange={() => {}}
                readOnly
              />
            </Headline>

            <div css={tw`grid grid-cols-3 gap-4`}>
              {question.items.map((item: ConjointItems) => (
                <Card
                  key="1"
                  css={[
                    tw`mt-4 hover:(ring-brand2 ring-inset ring-2 cursor-pointer) relative`,
                    question.selected === item.id && tw`ring-brand2 ring-inset ring-2 border-none`,
                  ]}
                  onClick={() => handleSelect(index, item.id)}
                >
                  {question.selected === item.id && (
                    <AiFillCheckCircle
                      size={24}
                      color={theme`colors.brand2`}
                      css={[tw`absolute right-4 top-4 opacity-100`, tw`transition-all ease-in-out duration-1000`]}
                    />
                  )}

                  {Object.values(item).map((a, index: number) => (
                    <Typography
                      key={item[`attibute${index}`]}
                      css={[tw`mb-6 last:mb-0 text-center`, index === 0 && tw`font-bold`]}
                    >
                      {item[`attribute${index}`]}
                    </Typography>
                  ))}
                </Card>
              ))}
            </div>

            <div css={tw`mt-16`}>
              {survey.setup.feedback?.active && (
                <div>
                  <Headline>{survey.setup.feedback.question}</Headline>

                  <TextArea
                    value={feedbackText}
                    onChange={({ target: { value } }) => {
                      setFeedback(value)
                    }}
                    css={tw`mt-4`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <div css={tw`flex justify-center mt-16`}>
        <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
      </div>
    </div>
  )
}

export default Conjoint
