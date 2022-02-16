import { FC, useState, useEffect, useCallback } from 'react'
import { RouteComponentProps } from '@reach/router'
import useSurvey from 'hooks/use-survey'
import * as Survey from 'features/Survey'
import { MetadataProvider } from 'contexts/metadata'
import { surveyMethods } from 'utilities/constants'

// TODO: move the next step to a upper state
type Step = 'welcome' | 'questions' | 'completion'

const Respondent: FC<RouteComponentProps & { surveyId?: string }> = ({ surveyId }) => {
  const { survey, isLoading, isTaken } = useSurvey(surveyId)
  const [step, setStep] = useState<Step>('welcome')

  useEffect(() => {
    if (!survey?.message?.welcome && step === 'welcome') {
      setStep('questions')
    }
  }, [survey, step])

  const hasMessage = (message: 'welcome' | 'completion') => survey?.message && !!survey.message[message]

  const onNext = useCallback((step: Step) => {
    setStep(step)
  }, [])

  if (isLoading) {
    return <Survey.Loading />
  }

  if (isTaken) {
    return <Survey.Taken />
  }

  if (survey?.id) {
    const { method } = survey.setup

    const getQuestions = () => {
      switch (method) {
        case surveyMethods.Conjoint:
          return <Survey.Conjoint survey={survey} handleNext={() => onNext('completion')} />
        case surveyMethods.Quadratic:
          return <Survey.Quadratic survey={survey} handleNext={() => onNext('completion')} />
        case surveyMethods.Likert:
          return <Survey.Likert survey={survey} handleNext={() => onNext('completion')} />
        default:
          return <div>error</div>
      }
    }

    return (
      <MetadataProvider>
        {step === 'welcome' && hasMessage('welcome') && (
          <Survey.WelcomeMessage survey={survey} handleNext={() => onNext('questions')} />
        )}
        {step === 'questions' && getQuestions()}
        {step === 'completion' && hasMessage('completion') && <Survey.CompletionMessage survey={survey} />}
      </MetadataProvider>
    )
  }

  return <Survey.NotFound />
}

export default Respondent
