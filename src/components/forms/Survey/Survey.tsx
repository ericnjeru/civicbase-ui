import { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { EditorState, convertFromRaw } from 'draft-js'
import { BiCog, BiMessageRoundedDetail } from 'react-icons/bi'
import { zodResolver } from '@hookform/resolvers/zod'
import { GiTerror } from 'react-icons/gi'
import { useNavigate } from '@reach/router'
import { IoFlagSharp } from 'react-icons/io5'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import Tabs, { TabPanel } from 'components/Tabs'
import * as Forms from './steps'
import { validationSchema } from './validation'
import SubmitSurvey from './Submit'
import CustomTabItem from './CustomTabItem'
import { SurveyForm } from '../../../../types/forms'
import { createSurvey, editSurvey } from 'services/survey'
import useAsync from 'hooks/use-async'
import transform from './transform'
import { useBanner } from 'contexts/banner'
import { EditSurvey } from '../../../../types/survey'
import { useSurveys, SurveyActionKind } from 'contexts/surveys'
import QuestionTab from './tabs/QuestionTab'
import { SurveyRequest } from '../../../../types/survey-request'
import LanguageTab from './tabs/LanguageTab'

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
        language: {
          jargon: 'Agree/Disagree',
          token: 'Credits',
        },
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
              <CustomTabItem id="setup" icon={BiCog}>
                Setup
              </CustomTabItem>

              <LanguageTab />

              <CustomTabItem id="messages" icon={BiMessageRoundedDetail}>
                Messages
              </CustomTabItem>

              <QuestionTab />

              <CustomTabItem id="features" icon={IoFlagSharp}>
                Features
              </CustomTabItem>

              <SubmitSurvey isLoading={isLoading} isEditing={!!survey?.id} />
            </div>

            <div css={tw`w-full bg-white rounded-md p-4 pt-0`}>
              <TabPanel value="setup">
                <Forms.Setup isEditing={!!survey?.id} />
              </TabPanel>

              <TabPanel value="language">
                <Forms.Language />
              </TabPanel>

              <TabPanel value="quadratic">
                <Forms.Quadratic isPublished={survey?.status === 'published'} />
              </TabPanel>

              <TabPanel value="conjoint">
                <Forms.Conjoint isPublished={survey?.status === 'published'} />
              </TabPanel>

              <TabPanel value="likert">
                <Forms.Likert isPublished={survey?.status === 'published'} />
              </TabPanel>

              <TabPanel value="messages">
                <Forms.Messages />
              </TabPanel>

              <TabPanel value="features">
                <Forms.Features />
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </form>
    </FormProvider>
  )
}

export default Survey
