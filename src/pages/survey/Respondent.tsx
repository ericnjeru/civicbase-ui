import { FC, useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import useSurvey from 'hooks/use-survey'
import * as Survey from 'features/Survey'
import { MetadataProvider } from 'contexts/metadata'

type Step = 'welcome' | 'questions' | 'completion'

const Respondent: FC<RouteComponentProps & { surveyId?: string }> = ({ surveyId }) => {
  const survey = useSurvey(surveyId)
  const [step, setStep] = useState<Step>('welcome')

  useEffect(() => {
    if (survey?.data && !survey.data?.message?.welcome) {
      console.log('survey.data?.message?.welcome', survey.data?.message?.welcome)
      setStep('questions')
    }
  }, [survey])

  const hasMessage = (message: 'welcome' | 'completion') => survey.data?.message && !!survey.data.message[message]

  if (survey.isLoading) {
    return <Survey.Loading />
  }

  if (survey.data?.id) {
    return (
      <MetadataProvider>
        {step === 'welcome' && hasMessage('welcome') && (
          <Survey.WelcomeMessage survey={survey.data} handleNext={() => setStep('questions')} />
        )}
        {step === 'questions' && <Survey.Questions survey={survey.data} handleNext={() => setStep('completion')} />}
        {step === 'completion' && hasMessage('completion') && <Survey.CompletionMessage survey={survey.data} />}
      </MetadataProvider>
    )
  }

  return <Survey.NotFound />
}

export default Respondent
