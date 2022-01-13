import { useState } from 'react'
import tw from 'twin.macro'
import { useNavigate } from '@reach/router'
import { FiEdit2, FiEye } from 'react-icons/fi'
import { BiCog } from 'react-icons/bi'
import { IoAnalyticsOutline } from 'react-icons/io5'
import Card from 'components/Card'
import { Subtitle } from 'components/Typography'
import Badge from 'components/Badge'
import { IconButton } from 'components/Button'
import Menu from './Menu'
import Ping from './Ping'
import PublishSurvey from './PublishSurvey'
import FinishSurvey from './FinishSurvey'
import { SurveyState } from 'contexts/surveys'

const SurveyCard = ({ survey }: { survey: SurveyState }) => {
  const {
    id,
    status,
    isLoading = false,
    setup: { topic, method },
  } = survey
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <Card
      css={[
        tw`w-full h-40 border-l-4 border-t-0 border-r-0 border-b-0`,
        status === 'published' && tw`border-published`,
        status === 'pilot' && tw`border-pilot`,
        status === 'finished' && tw`border-finished`,
        isLoading && tw`animate-pulse`,
      ]}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div css={tw`flex flex-col justify-between h-full relative`}>
        <div css={tw`flex justify-between items-center`}>
          <Subtitle css={tw`line-clamp-1 mr-12`}>{topic}</Subtitle>

          <div
            css={[
              tw`absolute top-4 right-4`,
              !hovered && tw`flex transition-all ease-in-out duration-700 opacity-100`,
              hovered && tw`opacity-0`,
            ]}
          >
            <Ping status={status} />
          </div>

          <div
            css={[
              tw`absolute top-0 right-0`,
              hovered && tw`transition-all ease-in-out duration-700 opacity-100`,
              !hovered && tw`opacity-0`,
            ]}
          >
            <Menu onMenuClose={() => setHovered(false)} surveyId={id}>
              <IconButton>
                <BiCog size={28} />
              </IconButton>
            </Menu>
          </div>
        </div>

        <div
          css={[
            tw`absolute bottom-0 left-0`,
            !hovered && tw`flex transition-all ease-in-out duration-700 opacity-100`,
            hovered && tw`opacity-0`,
          ]}
        >
          <Badge css={tw`mr-2`}>{status}</Badge>
          <Badge>{method?.toLowerCase()}</Badge>
        </div>

        <div
          css={[
            tw` justify-around absolute bottom-0 left-0 bg-transparent w-full`,
            hovered && tw`flex transition-all ease-in-out duration-700 opacity-100`,
            !hovered && tw`opacity-0`,
          ]}
        >
          {status !== 'finished' && (
            <IconButton onClick={() => navigate('/edit-survey', { state: survey })}>
              <FiEdit2 size={28} />
            </IconButton>
          )}

          <IconButton onClick={() => navigate(`/analytics/${id}`)}>
            <IoAnalyticsOutline size={28} />
          </IconButton>

          <IconButton onClick={() => navigate(`/survey/${id}`)}>
            <FiEye size={28} />
          </IconButton>

          {status !== 'finished' && <FinishSurvey surveyId={id} />}

          {status === 'pilot' && <PublishSurvey surveyId={id} />}
        </div>
      </div>
    </Card>
  )
}

export default SurveyCard
