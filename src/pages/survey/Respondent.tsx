import { FC, useState, useEffect, useCallback } from 'react'
import { RouteComponentProps } from '@reach/router'
import useSurvey from 'hooks/use-survey'
import * as Survey from 'features/Survey'
import { MetadataProvider } from 'contexts/metadata'

// TODO: move the next step to a upper state
type Step = 'welcome' | 'questions' | 'completion'

const Respondent: FC<RouteComponentProps & { surveyId?: string }> = ({ surveyId }) => {
  const survey = useSurvey(surveyId)
  const [step, setStep] = useState<Step>('welcome')

  useEffect(() => {
    if (survey?.data && !survey.data?.message?.welcome && step === 'welcome') {
      setStep('questions')
    }
  }, [survey, step])

  const hasMessage = (message: 'welcome' | 'completion') => survey.data?.message && !!survey.data.message[message]

  const onNext = useCallback((step: Step) => {
    setStep(step)
  }, [])

  if (survey.isLoading) {
    return <Survey.Loading />
  }

  if (survey.data?.id) {
    const { method } = survey.data.setup

    const getQuestions = () => {
      switch (method) {
        case 'Conjoint':
          return <Survey.Conjoint survey={survey.data} handleNext={() => onNext('completion')} />
        case 'Quadratic':
          return <Survey.Quadratic survey={survey.data} handleNext={() => onNext('completion')} />
        case 'Likert':
          return <Survey.Likert survey={survey.data} handleNext={() => onNext('completion')} />
        default:
          return <div>error</div>
      }
    }

    return (
      <MetadataProvider>
        {step === 'welcome' && hasMessage('welcome') && (
          <Survey.WelcomeMessage survey={survey.data} handleNext={() => onNext('questions')} />
        )}
        {step === 'questions' && getQuestions()}
        {step === 'completion' && hasMessage('completion') && <Survey.CompletionMessage survey={survey.data} />}
      </MetadataProvider>
    )
  }

  return <Survey.NotFound />
}

export default Respondent
