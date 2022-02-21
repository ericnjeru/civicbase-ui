import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { surveyMethods } from 'utilities/constants'

const useValidation = () => {
  const [isSetup, setSetup] = useState(false)
  const [isLanguage, setLanguage] = useState(false)
  const [isQuadratic, setQuadratic] = useState(false)
  const [isConjoint, setConjoint] = useState(false)
  const [isLikert, setLikert] = useState(false)

  const setup = useWatch({ name: 'setup' })
  const language = useWatch({ name: 'language' })
  const quadratic = useWatch({ name: 'quadratic' })
  const conjoint = useWatch({ name: 'conjoint' })
  const likert = useWatch({ name: 'likert' })

  const {
    trigger,
    formState: { dirtyFields },
  } = useFormContext()

  useEffect(() => {
    if (setup && dirtyFields.setup) {
      trigger('setup').then((isValid) => setSetup(isValid))
    }
  }, [trigger, dirtyFields.setup, setup])

  useEffect(() => {
    if (setup.method === surveyMethods.Quadratic) {
      if (dirtyFields.language) {
        trigger('language').then((isValid) => setLanguage(isValid))
      }
    }
  }, [trigger, dirtyFields.language, language, setup.method])

  useEffect(() => {
    if (dirtyFields.quadratic && quadratic?.length > 0) {
      trigger('quadratic').then((isValid) => setQuadratic(isValid))
    }
  }, [trigger, dirtyFields.quadratic, quadratic])

  useEffect(() => {
    if (dirtyFields.conjoint && conjoint?.length > 0) {
      trigger('conjoint').then((isValid) => setConjoint(isValid))
    }
  }, [trigger, dirtyFields.conjoint, conjoint])

  useEffect(() => {
    if (dirtyFields.likert && likert?.length > 0) {
      trigger('likert').then((isValid) => setLikert(isValid))
    }
  }, [trigger, dirtyFields.likert, likert])

  useEffect(() => {
    if (setup?.method === surveyMethods.Quadratic) {
      setConjoint(true)
      setLikert(true)
    }

    if (setup?.method === surveyMethods.Likert) {
      setConjoint(true)
      setQuadratic(true)
      setLanguage(true)
    }

    if (setup?.method === surveyMethods.Conjoint) {
      setQuadratic(true)
      setLikert(true)
      setLanguage(true)
    }
  }, [setup.method])

  return {
    isSetup,
    isLanguage,
    isQuadratic,
    isConjoint,
    isLikert,
  }
}

export default useValidation
