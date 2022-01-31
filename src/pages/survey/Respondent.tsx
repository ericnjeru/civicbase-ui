import { FC, useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import useSurvey from 'hooks/use-survey'
import * as Survey from 'features/Survey'
import { MetadataProvider } from 'contexts/metadata'

// TODO: move the next step to a upper state
type Step = 'welcome' | 'questions' | 'completion'

const Respondent: FC<RouteComponentProps & { surveyId?: string }> = ({ surveyId }) => {
  const survey = useSurvey(surveyId)
  const [step, setStep] = useState<Step>('welcome')

  console.log('came here')

  useEffect(() => {
    if (survey?.data && !survey.data?.message?.welcome) {
      setStep('questions')
    }
  }, [survey])

  const hasMessage = (message: 'welcome' | 'completion') => survey.data?.message && !!survey.data.message[message]

  if (survey.isLoading) {
    return <Survey.Loading />
  }

  if (survey.data?.id) {
    const { method } = survey.data.setup

    return (
      <MetadataProvider>
        {step === 'welcome' && hasMessage('welcome') && (
          <Survey.WelcomeMessage survey={survey.data} handleNext={() => setStep('questions')} />
        )}

        {step === 'questions' && method !== 'Conjoint' && (
          <Survey.Questions survey={survey.data} handleNext={() => setStep('completion')} />
        )}

        {step === 'questions' && method === 'Conjoint' && <Survey.Conjoint survey={survey.data} />}

        {step === 'completion' && hasMessage('completion') && <Survey.CompletionMessage survey={survey.data} />}
      </MetadataProvider>
    )
  }

  return <Survey.NotFound />
}

export default Respondent
