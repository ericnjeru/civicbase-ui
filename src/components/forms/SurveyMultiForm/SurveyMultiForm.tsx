import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiMessageDetail } from 'react-icons/bi'
import { BsQuestionSquare } from 'react-icons/bs'
import { MdOutlineDashboardCustomize, MdOutlineLanguage } from 'react-icons/md'

import { PrimaryButton } from 'components/Button'
import Secondary from 'components/Button/Secondary'
import Spinner from 'components/Spinner'
import Typography from 'components/Typography'
import tw from 'twin.macro'

import { EditSurvey } from '../../../../types/survey'
import Tab from './Tab'
import * as Forms from './steps'

enum Steps {
  SETUP = 'setup',
  QUADRATIC = 'quadratic',
  CONJOINT = 'conjoint',
  LIKERT = 'likert',
  LANGUAGE = 'language',
  MESSAGE = 'message',
  CUSTOMIZE = 'customize',
}

const SurveyMultiForm = ({ survey, isLoading }: { survey: EditSurvey; isLoading: boolean }) => {
  const [active, setActive] = useState<Steps>(Steps.SETUP)
  const [isFinal, setFinal] = useState(!!survey?.id)
  const {
    trigger,
    watch,
    formState: { errors, isDirty },
  } = useFormContext()
  let method = watch('setup.method')

  if (method) {
    method = method.toLowerCase()
  }

  console.log('errors', errors)

  const handleSelection = (step: Steps) => {
    trigger(active).then((isValid) => {
      if (isValid) {
        setActive(step)

        if (active === Steps.CONJOINT || active === Steps.LIKERT || active === Steps.QUADRATIC) {
          setFinal(true)
        }
      }
    })
  }

  const handlePrevious = () => {
    switch (active) {
      case Steps.QUADRATIC: {
        setActive(Steps.LANGUAGE)
        break
      }

      case Steps.LANGUAGE:
      case Steps.LIKERT:
      case Steps.CONJOINT: {
        setActive(Steps.SETUP)
        break
      }
      case Steps.MESSAGE: {
        setActive(method?.toLowerCase())
        break
      }
      case Steps.CUSTOMIZE: {
        setActive(Steps.MESSAGE)
        break
      }
      default:
        break
    }
  }

  const handleNext = () => {
    switch (active) {
      case Steps.SETUP: {
        trigger(Steps.SETUP).then((isValid) => {
          if (isValid) {
            if (method === Steps.QUADRATIC) {
              setActive(Steps.LANGUAGE)
            } else {
              setActive(method?.toLowerCase())
            }
          }
        })
        break
      }

      case Steps.LANGUAGE: {
        trigger(Steps.LANGUAGE).then((isValid) => {
          if (isValid) {
            setActive(Steps.QUADRATIC)
          }
        })
        break
      }

      case Steps.QUADRATIC:
      case Steps.LIKERT:
      case Steps.CONJOINT: {
        trigger(active).then((isValid) => {
          if (isValid) {
            setFinal(true)
            setActive(Steps.MESSAGE)
          }
        })
        break
      }

      case Steps.MESSAGE: {
        trigger(Steps.MESSAGE).then((isValid) => {
          if (isValid) {
            setActive(Steps.CUSTOMIZE)
          }
        })

        break
      }

      default:
        break
    }
  }

  const isEnabled = isDirty && isFinal

  return (
    <div css={tw`w-full flex p-4 rounded`}>
      <div css={tw`w-72 mr-4 space-y-4`}>
        <Tab error={!!errors.setup} active={active === Steps.SETUP} onClick={() => handleSelection(Steps.SETUP)}>
          <AiOutlineSetting size={20} />
          <Typography>Setup</Typography>
        </Tab>
        {method === Steps.QUADRATIC && (
          <Tab active={active === Steps.LANGUAGE} onClick={() => handleSelection(Steps.LANGUAGE)}>
            <MdOutlineLanguage size={20} />
            <Typography>Language</Typography>
          </Tab>
        )}
        <Tab error={!!errors[method]} active={active === method} onClick={() => handleSelection(method)}>
          <BsQuestionSquare size={20} />
          <Typography>Questions</Typography>
        </Tab>
        <Tab active={active === Steps.MESSAGE} onClick={() => handleSelection(Steps.MESSAGE)}>
          <BiMessageDetail size={20} />
          <Typography>Messages</Typography>
        </Tab>
        <Tab
          error={!!errors.customize}
          active={active === Steps.CUSTOMIZE}
          onClick={() => handleSelection(Steps.CUSTOMIZE)}
        >
          <MdOutlineDashboardCustomize size={20} />
          <Typography>Customize</Typography>
        </Tab>

        <Tab
          type="submit"
          disabled={!isEnabled}
          css={[
            // isFinal && Object.keys(errors).length === 0 && tw`bg-brand2 text-gray-100`,
            // isLoading && tw`bg-opacity-40`,
            tw`bg-brand2 text-gray-100`,
            (!isEnabled || isLoading) && tw`bg-brand2 text-gray-100 bg-opacity-40`,
          ]}
        >
          {isLoading && <Spinner variant="primary" />}
          <Typography>{survey?.id ? 'Update' : 'Create'}</Typography>
        </Tab>
      </div>

      <div css={tw`w-full rounded-md p-4 pt-0`}>
        {active === Steps.SETUP && <Forms.Setup isEditing={!!survey?.id} />}

        {active === Steps.LANGUAGE && <Forms.Language />}

        {active === Steps.QUADRATIC && <Forms.Quadratic isPublished={survey?.status === 'published'} />}

        {active === Steps.CONJOINT && <Forms.Conjoint isPublished={survey?.status === 'published'} />}

        {active === Steps.LIKERT && <Forms.Likert isPublished={survey?.status === 'published'} />}

        {active === Steps.MESSAGE && <Forms.Messages />}

        {active === Steps.CUSTOMIZE && <Forms.Features />}

        <div css={tw`flex space-x-4 mt-4`}>
          {active !== Steps.SETUP && (
            <Secondary
              onClick={handlePrevious}
              css={[
                tw`bg-transparent text-gray-700 border-brand border-2`,
                tw`focus:(ring ring-brand ring-opacity-50 bg-transparent)`,
              ]}
            >
              Previus
            </Secondary>
          )}
          {active !== Steps.CUSTOMIZE && (
            <PrimaryButton onClick={handleNext} css={tw`focus:(ring ring-brand ring-opacity-50)`}>
              Next
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  )
}

export default SurveyMultiForm
