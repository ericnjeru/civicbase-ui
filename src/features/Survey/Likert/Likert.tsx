import { useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import tw from 'twin.macro'
import { convertFromRaw, Editor, EditorState } from 'draft-js'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import RadioButton from 'components/Form/RadioButton'
import Typography, { Headline } from 'components/Typography'
import { PrimaryButton } from 'components/Button'
import { SurveyRespondent } from '../../../../types/survey'
import { useMetadata } from 'contexts/metadata'
import { Answer } from '../../../../types/answer'
import useAsync from 'hooks/use-async'
import { createAnswer } from 'services/survey'

type LikertAnswer = {
  questions: {
    id: string
    item: {
      vote: number
    }[]
  }[]
}

const Likert = ({ survey, handleNext }: { survey: SurveyRespondent; handleNext: () => void }) => {
  const { run, isSuccess } = useAsync()
  const { metadata, params, pageLoad } = useMetadata()
  const { control, handleSubmit } = useForm<LikertAnswer>({
    defaultValues: {
      questions: survey.likert?.map((question) => ({ id: question.id, item: [] })),
    },
  })

  useEffect(() => {
    pageLoad()
  }, [pageLoad])

  useEffect(() => {
    if (isSuccess) {
      handleNext()
    }
  }, [isSuccess, handleNext])

  const onSubmit: SubmitHandler<LikertAnswer> = ({ questions }) => {
    const answer: Answer = {
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

    run(createAnswer(answer))
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {survey?.likert?.map((question, questionIndex) => (
          <div key={question.id} css={tw`mb-32`}>
            <Headline css={tw`mb-4 flex`}>
              {questionIndex + 1}.{' '}
              <Editor
                editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(question.statement)))}
                onChange={() => {}}
                readOnly
              />
            </Headline>

            <div css={tw`grid grid-cols-2 gap-4 border-b-2`}>
              <div css={tw`col-span-1`} />
              <div css={tw`flex space-x-16 mb-2`}>
                {[1, 2, 3, 4, 5].map((item) => (
                  <Typography key={item}>{item}</Typography>
                ))}
              </div>
            </div>

            {question.items.map((item, itemIndex) => (
              <div css={tw`grid grid-cols-2 gap-4 mt-2 mb-6`} key={item.description}>
                <div>
                  <Typography>{item.description}</Typography>
                </div>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name={`questions.${questionIndex}.item.${itemIndex}.vote`}
                  render={({ field }) => (
                    <RadioGroup {...field} id={`questions.${questionIndex}.item.${itemIndex}.vote`}>
                      <RadioGroup.Option value={1}>
                        {({ ...props }) => <RadioButton {...props} css={tw`mr-14`} />}
                      </RadioGroup.Option>
                      <RadioGroup.Option value={2}>
                        {({ ...props }) => <RadioButton {...props} css={tw`mr-14`} />}
                      </RadioGroup.Option>
                      <RadioGroup.Option value={3}>
                        {({ ...props }) => <RadioButton {...props} css={tw`mr-14`} />}
                      </RadioGroup.Option>
                      <RadioGroup.Option value={4}>
                        {({ ...props }) => <RadioButton {...props} css={tw`mr-14`} />}
                      </RadioGroup.Option>
                      <RadioGroup.Option value={5}>
                        {({ ...props }) => <RadioButton {...props} css={tw`mr-14`} />}
                      </RadioGroup.Option>
                    </RadioGroup>
                  )}
                />
              </div>
            ))}
          </div>
        ))}
        <div css={tw`flex justify-center mt-32`}>
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </div>
      </form>
    </>
  )
}

export default Likert
