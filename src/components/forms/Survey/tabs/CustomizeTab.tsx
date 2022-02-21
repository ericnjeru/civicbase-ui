import { FaCog } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import CustomTabItem from '../CustomTabItem'
import { surveyMethods } from 'utilities/constants'

const CustomizeTab = () => {
  const setup = useWatch({ name: 'setup' })
  const language = useWatch({ name: 'language' })
  const questions = useWatch({ name: ['quadratic', 'likert', 'conjoint'] })
  const [isDisabled, setDisabled] = useState(true)

  const {
    trigger,
    formState: { dirtyFields },
  } = useFormContext()

  useEffect(() => {
    const checkQuestions = () => {
      switch (setup?.method) {
        case surveyMethods.Quadratic:
          return trigger('quadratic').then((isValid) => setDisabled(!isValid))
        case surveyMethods.Likert:
          return trigger('likert').then((isValid) => setDisabled(!isValid))
        case surveyMethods.Conjoint:
          return trigger('conjoint').then((isValid) => setDisabled(!isValid))
      }
    }

    if (setup?.method === surveyMethods.Quadratic) {
      if (
        dirtyFields.setup &&
        dirtyFields.language &&
        (dirtyFields.quadratic || dirtyFields.conjoint || dirtyFields.likert)
      ) {
        trigger('setup').then((isValid) => setDisabled(!isValid))
        trigger('language').then((isValid) => setDisabled(!isValid))
        checkQuestions()
      }
    } else {
      if (dirtyFields.setup && (dirtyFields.quadratic || dirtyFields.conjoint || dirtyFields.likert)) {
        trigger('setup').then((isValid) => setDisabled(!isValid))
        checkQuestions()
      }
    }
  }, [dirtyFields, setup, language, questions, trigger])
  return (
    <CustomTabItem id="customize" icon={FaCog} disabled={isDisabled}>
      Customize
    </CustomTabItem>
  )
}

export default CustomizeTab
