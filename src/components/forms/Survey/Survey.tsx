import { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { EditorState, convertFromRaw } from 'draft-js'
import { zodResolver } from '@hookform/resolvers/zod'
import { GiTerror } from 'react-icons/gi'
import { useNavigate } from '@reach/router'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import Tabs, { TabPanel as Step } from 'components/Tabs'
import * as Forms from './steps'
import * as Tab from './tabs'
import { validationSchema } from './validation'
import { SurveyForm } from '../../../../types/forms'
import { createSurvey, editSurvey } from 'services/survey'
import useAsync from 'hooks/use-async'
import transform from './transform'
import { useBanner } from 'contexts/banner'
import { EditSurvey } from '../../../../types/survey'
import { useSurveys, SurveyActionKind } from 'contexts/surveys'
import { SurveyRequest } from '../../../../types/survey-request'

const Survey = ({ survey }: { survey?: EditSurvey }) => {
  const getDefaultValues = (): SurveyForm => {
    if (survey?.id) {
      const welcomeMessage = survey.message?.welcome && convertFromRaw(JSON.parse(survey?.message?.welcome))
      const completionMessage = survey.message?.completion && convertFromRaw(JSON.parse(survey?.message?.completion))

      return {
        ...survey,
        message: {
          welcome: welcomeMessage ? EditorState.createWithContent(welcomeMessage) : EditorState.createEmpty(),
          completion: completionMessage ? EditorState.createWithContent(completionMessage) : EditorState.createEmpty(),
        },
        quadratic: survey.quadratic?.map((question) => {
          const statement = EditorState.createWithContent(convertFromRaw(JSON.parse(question.statement)))

          return {
            ...question,
            statement,
          }
        }),
        conjoint: survey.conjoint?.map((question) => {
          const statement = EditorState.createWithContent(convertFromRaw(JSON.parse(question.statement)))

          return {
            ...question,
            statement,
          }
        }),
        likert: survey.likert?.map((question) => {
          const statement = EditorState.createWithContent(convertFromRaw(JSON.parse(question.statement)))

          return {
            ...question,
            statement,
          }
        }),
      }
    } else {
      return {
        setup: {
          credits: 1,
          method: null,
          topic: '',
          feedback: {
            active: false,
            questions: [],
          },
        },
        language: null,
        message: {
          welcome: EditorState.createEmpty(),
          completion: EditorState.createEmpty(),
        },
      }
    }
  }
  const [newSurvey, setNewSurvey] = useState<SurveyRequest | undefined>()
  const navigate = useNavigate()
  const { trigger } = useBanner()
  const { dispatch } = useSurveys()
  const { run, isLoading, isSuccess, isError } = useAsync()
  const methods = useForm<any>({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(validationSchema),
  })

  useEffect(() => {
    if (isSuccess) {
      if (survey?.id && newSurvey?.id) {
        dispatch({ type: SurveyActionKind.UPDATE, payload: newSurvey })
        navigate('/', { replace: true })
      } else {
        window.location.assign('/')
      }
    }
  }, [survey?.id, isSuccess, navigate, newSurvey, dispatch])

  useEffect(() => {
    if (isError) {
      trigger({
        title: `We couldn't create this survey `,
        subtitle: 'Sorry, something must have gone wrong with our server, you can try again!',
        icon: GiTerror,
      })
    }
  }, [isError, trigger])

  const onSubmit: SubmitHandler<SurveyForm> = (values) => {
    const transformedSurvey = transform(values as SurveyForm)

    setNewSurvey({ ...transformedSurvey, id: survey?.id })

    if (survey?.id) {
      run(editSurvey(transformedSurvey, survey.id))
    } else {
      run(createSurvey(transformedSurvey))
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div css={tw`w-full flex p-4 rounded`}>
          <Tabs initial="setup">
            <div css={tw`w-72 mr-4`}>
              <Tab.Setup />
              <Tab.Language />
              <Tab.Question />
              <Tab.Messages />
              <Tab.Customize />
              <Tab.Submit isLoading={isLoading} isEditing={!!survey?.id} />
            </div>

            <div css={tw`w-full bg-white rounded-md p-4 pt-0`}>
              <Step value="setup">
                <Forms.Setup isEditing={!!survey?.id} />
              </Step>

              <Step value="language">
                <Forms.Language />
              </Step>

              <Step value="quadratic">
                <Forms.Quadratic isPublished={survey?.status === 'published'} />
              </Step>

              <Step value="conjoint">
                <Forms.Conjoint isPublished={survey?.status === 'published'} />
              </Step>

              <Step value="likert">
                <Forms.Likert isPublished={survey?.status === 'published'} />
              </Step>

              <Step value="messages">
                <Forms.Messages />
              </Step>

              <Step value="customize">
                <Forms.Features />
              </Step>
            </div>
          </Tabs>
        </div>
      </form>
    </FormProvider>
  )
}

export default Survey
