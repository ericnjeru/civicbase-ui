import { FC, useState, useEffect, useCallback } from 'react'

import { RouteComponentProps } from '@reach/router'
import { MetadataProvider } from 'contexts/metadata'
import * as Survey from 'features/Survey'
import useSurvey from 'hooks/use-survey'
import { surveyMethods } from 'utilities/constants'

// TODO: move the next step to a upper state
type Step = 'welcome' | 'questions' | 'completion' | 'identifier'

const Respondent: FC<RouteComponentProps & { surveyId?: string; preview?: boolean }> = ({ surveyId, preview }) => {
  const { survey, isLoading, isTaken } = useSurvey(surveyId)
  const [step, setStep] = useState<Step>('welcome')
  const [identifier, setIdentifier] = useState<string>('')

  useEffect(() => {
    if (survey && !survey.message?.welcome && step === 'welcome') {
      setStep('questions')
    }
  }, [survey, step])

  useEffect(() => {
    if (survey?.id) {
      const { method } = survey.setup
      console.log(method)
      if (method === surveyMethods.Priced) {
        setStep('identifier')
      }
    }
  }, [survey])

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
    const { method, methodPreference } = survey.setup

    const getQuestions = () => {
      switch (method) {
        case surveyMethods.Conjoint:
          return <Survey.Conjoint survey={survey} handleNext={() => onNext('completion')} preview={preview} />
        case surveyMethods.Quadratic:
          return methodPreference === 'diamond' ? (
            <Survey.Quadratic.Diamond survey={survey} handleNext={() => onNext('completion')} preview={preview} />
          ) : (
            <Survey.Quadratic.Radius survey={survey} handleNext={() => onNext('completion')} preview={preview} />
          )
        case surveyMethods.Priced:
          return (
            <Survey.Priced.Radius
              survey={survey}
              identifier={identifier}
              handleNext={() => onNext('completion')}
              preview={preview}
            />
          )

        case surveyMethods.Likert:
          return <Survey.Likert survey={survey} handleNext={() => onNext('completion')} preview={preview} />
        default:
          return <div>error</div>
      }
    }

    return (
      <MetadataProvider>
        {step === 'identifier' && method === surveyMethods.Priced && (
          <Survey.Identifier
            setIdentifier={setIdentifier}
            identifier={identifier}
            handleNext={() => onNext('welcome')}
          />
        )}
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
