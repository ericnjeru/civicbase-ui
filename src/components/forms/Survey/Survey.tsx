import { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { EditorState, convertFromRaw } from 'draft-js'
import { BiCog, BiMessageRoundedCheck, BiMessageRoundedDetail } from 'react-icons/bi'
import { zodResolver } from '@hookform/resolvers/zod'
import { GiTerror } from 'react-icons/gi'
import { useNavigate } from '@reach/router'
import { IoLanguageOutline } from 'react-icons/io5'
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
import { Survey as SurveyType } from '../../../../types/survey.d'
import { useSurveys, SurveyActionKind } from 'contexts/surveys'
import ConjointTab from './tabs/ConjointTab'
import QuestionTab from './tabs/QuestionTab'

const Survey = ({ survey }: { survey?: SurveyType }) => {
  const getDefaultValues = (): any => {
    if (survey?.id) {
      const welcomeMessage = survey.message?.welcome && convertFromRaw(JSON.parse(survey.message?.welcome))
      const completionMEssage = survey.message?.completion && convertFromRaw(JSON.parse(survey.message?.completion))

      return {
        ...survey,
        message: {
          welcome: survey.message?.welcome
            ? EditorState.createWithContent(welcomeMessage)
            : (EditorState.createEmpty() as any),
          completion: survey.message?.completion
            ? EditorState.createWithContent(completionMEssage)
            : (EditorState.createEmpty() as any),
        },
        questions: survey.questions.map((question) => {
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
          method: 'Quadratic',
          topic: '',
          feedback: {
            active: false,
            question: 'Please let us know if you have any feedback about this survey?',
          },
        },
        language: {
          jargon: 'Agree/Disagree',
          token: 'Credits',
        },
        message: {
          welcome: EditorState.createEmpty() as any,
          completion: EditorState.createEmpty() as any,
        },
        questions: [],
        features: {},
      }
    }
  }
  const [newSurvey, setNewSurvey] = useState<SurveyType | undefined>()
  const navigate = useNavigate()
  const { trigger } = useBanner()
  const { dispatch } = useSurveys()
  const { run, isLoading, isSuccess, isError } = useAsync()
  const methods = useForm({
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
    const transformedSurvey = transform(values)
    setNewSurvey({ ...transformedSurvey, id: survey?.id } as any)

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

              <ConjointTab />

              <CustomTabItem id="language" icon={IoLanguageOutline}>
                Language Designation
              </CustomTabItem>

              <CustomTabItem id="welcome" icon={BiMessageRoundedDetail}>
                Welcome Message
              </CustomTabItem>

              <QuestionTab />

              <CustomTabItem id="completion" icon={BiMessageRoundedCheck}>
                Completion Message
              </CustomTabItem>

              <CustomTabItem id="features" icon={IoFlagSharp}>
                Features
              </CustomTabItem>

              <SubmitSurvey isLoading={isLoading} isEditing={!!survey?.id} />
            </div>

            <div css={tw`w-full bg-white rounded-md p-4 pt-0`}>
              <TabPanel value="setup">
                <Forms.Setup />
              </TabPanel>

              <TabPanel value="language">
                <Forms.Language />
              </TabPanel>

              <TabPanel value="welcome">
                <Forms.Welcome />
              </TabPanel>

              <TabPanel value="questions">
                <Forms.Questions />
              </TabPanel>

              <TabPanel value="completion">
                <Forms.Completion />
              </TabPanel>

              <TabPanel value="features">
                <Forms.Features />
              </TabPanel>

              <TabPanel value="conjoint">
                <Forms.Conjoint />
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </form>
    </FormProvider>
  )
}

export default Survey
