import { FC, useEffect, useMemo } from 'react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { RouteComponentProps, useNavigate } from '@reach/router'
import { useActor } from '@xstate/react'
import SurveyMultiForm, { validationSchema, transform } from 'components/forms/SurveyMultiForm'
import { useBanner } from 'contexts/banner'
import { useDashboard } from 'contexts/dashboard'
import useAsync from 'hooks/use-async'
import { createSurvey, editSurvey } from 'services/survey'
import getSurveyFormDefaultValues from 'utilities/getSurveyFormDefaultValues'

import { SurveyForm as SurveyFormProps } from '../../../types/forms'
import { EditSurvey } from '../../../types/survey'

const SurveyForm: FC<RouteComponentProps> = ({ location }) => {
  const { run, isLoading, isSuccess, isError } = useAsync()
  const { trigger } = useBanner()
  const navigate = useNavigate()
  const survey = location?.state as EditSurvey
  const dashboardService = useDashboard()
  const [_, send] = useActor(dashboardService)
  const methods = useForm<any>({
    defaultValues: useMemo(() => getSurveyFormDefaultValues(survey), [survey]),
    resolver: zodResolver(validationSchema),
  })

  useEffect(() => {
    if (isSuccess || isError) {
      send('FETCH')
      navigate('/')
    }
  }, [isSuccess, isError, trigger, send, navigate])

  const onSubmit: SubmitHandler<SurveyFormProps> = (values) => {
    const transformedSurvey = transform(values as SurveyFormProps)

    if (survey?.id) {
      run(editSurvey(transformedSurvey, survey.id))
    } else {
      run(createSurvey(transformedSurvey))
    }
  }
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <SurveyMultiForm survey={survey} isLoading={isLoading} />
        </form>
      </FormProvider>
    </>
  )
}

export default SurveyForm
