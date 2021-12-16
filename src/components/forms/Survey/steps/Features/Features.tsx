import tw from 'twin.macro'
import { useFormContext, Controller } from 'react-hook-form'
import Switch from 'components/Switch'

const Features = () => {
  const { control } = useFormContext()

  return (
    <div>
      <div css={tw`grid grid-cols-1 gap-4`}>
        <Controller
          name="features.qualtrics"
          control={control}
          render={({ field }) => <Switch {...field}>Qualtrics Integration</Switch>}
        />

        <Controller
          name="features.userIdentification"
          control={control}
          render={({ field }) => <Switch {...field}>Require respondent Identification</Switch>}
        />

        {/* <Switch>Activate A/B test</Switch> */}
      </div>
    </div>
  )
}

export default Features
