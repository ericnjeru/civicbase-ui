import tw from 'twin.macro'
import { EditorState } from 'draft-js'
import { BiCog, BiMessageRoundedCheck, BiMessageRoundedDetail } from 'react-icons/bi'
import { zodResolver } from '@hookform/resolvers/zod'
import { IoLanguageOutline } from 'react-icons/io5'
import { BsListCheck } from 'react-icons/bs'
import { IoFlagSharp } from 'react-icons/io5'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import Tabs, { TabPanel } from 'components/Tabs'
import * as Forms from './steps'
import { validationSchema } from './validation'
import SubmitSurvey from './Submit'
import CustomTabItem from './CustomTabItem'
import { SurveyForm } from '../../../../types/forms'

const Survey = () => {
  const methods = useForm({
    defaultValues: {
      setup: {
        credits: 1,
        function: 'Quadratic',
        topic: '',
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
    },
    resolver: zodResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<SurveyForm> = (data) => console.log(data)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div css={tw`w-full flex p-4 rounded`}>
          <Tabs initial="setup">
            <div css={tw`w-72 mr-4`}>
              <CustomTabItem id="setup" icon={BiCog}>
                Setup
              </CustomTabItem>

              <CustomTabItem id="language" icon={IoLanguageOutline}>
                Language Designation
              </CustomTabItem>

              <CustomTabItem id="welcome" icon={BiMessageRoundedDetail}>
                Welcome Message
              </CustomTabItem>

              <CustomTabItem id="questions" icon={BsListCheck}>
                Questions
              </CustomTabItem>

              <CustomTabItem id="completion" icon={BiMessageRoundedCheck}>
                Completion Message
              </CustomTabItem>

              <CustomTabItem id="features" icon={IoFlagSharp}>
                Features
              </CustomTabItem>

              <SubmitSurvey />
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
            </div>
          </Tabs>
        </div>
      </form>
    </FormProvider>
  )
}

export default Survey
