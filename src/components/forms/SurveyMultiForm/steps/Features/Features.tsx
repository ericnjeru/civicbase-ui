import { useFormContext, Controller } from 'react-hook-form'

import Switch from 'components/Switch'
import tw from 'twin.macro'

const Features = () => {
  const { control } = useFormContext()

  return (
    <div>
      <div css={tw`grid grid-cols-1 gap-4`}>
        {/* <Controller
          name="features.qualtrics"
          control={control}
          render={({ field }) => (
            <Switch value={field.value} onChange={field.onChange}>
              Qualtrics Integration
            </Switch>
          )}
        />

        <Controller
          name="features.userIdentification"
          control={control}
          render={({ field }) => (
            <Switch value={field.value} onChange={field.onChange}>
              Require respondent Identification
            </Switch>
          )}
        />

        <Controller
          name="features.randomQuestions"
          control={control}
          render={({ field }) => (
            <Switch value={field.value} onChange={field.onChange}>
              Random questions apresentation
            </Switch>
          )}
        /> */}

        <Controller
          name="features.multipleAnswerFromSameSource"
          control={control}
          render={({ field }) => (
            <Switch value={field.value} onChange={field.onChange}>
              Respondent can answer survey more than once
            </Switch>
          )}
        />

        {/* <Switch>Activate A/B test</Switch> */}
      </div>
    </div>
  )
}

export default Features
