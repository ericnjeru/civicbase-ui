import { useState } from 'react'
import tw from 'twin.macro'
import { useNavigate } from '@reach/router'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { FiEdit2, FiEye } from 'react-icons/fi'
import { BiCog, BiArrowBack } from 'react-icons/bi'
import { IoAnalyticsOutline } from 'react-icons/io5'
import Card from 'components/Card'
import { Subtitle } from 'components/Typography'
import Badge from 'components/Badge'
import { IconButton } from 'components/Button'
import Ping from './Ping'
import PublishSurvey from './PublishSurvey'
import FinishSurvey from './FinishSurvey'
import { SurveyState } from 'contexts/surveys'
import useSurveyAnalytics from 'hooks/use-survey-analytics'
import InlineMenu from './InlineMenu'
import Tooltip from 'components/Tooltip'

const SurveyCard = ({ survey }: { survey: SurveyState }) => {
  const {
    id,
    status,
    isLoading = false,
    setup: { topic, method },
  } = survey
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { respondentsIncrement } = useSurveyAnalytics(survey)

  const handleMouseLeave = () => {
    setHovered(false)
    setOpenMenu(false)
  }

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
      onMouseLeave={handleMouseLeave}
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

          <Tooltip placement="left" tip={openMenu ? 'Back' : 'Actions'}>
            <div
              css={[
                tw`absolute top-0 right-0`,
                hovered && tw`transition-all ease-in-out duration-700 opacity-100`,
                !hovered && tw`opacity-0`,
              ]}
            >
              <IconButton onClick={() => setOpenMenu(!openMenu)}>
                {openMenu ? <BiArrowBack size={28} /> : <BiCog size={28} />}
              </IconButton>
            </div>
          </Tooltip>
        </div>

        <div
          css={[
            tw`absolute bottom-0 left-0`,
            !hovered && tw`flex transition-all ease-in-out duration-700 opacity-100`,
            hovered && tw`opacity-0`,
            openMenu && hovered && tw`hidden`,
          ]}
        >
          <Badge>{status}</Badge>
          <Badge css={tw`mx-2`}>{method?.toLowerCase()}</Badge>
          {respondentsIncrement && respondentsIncrement > 0 ? (
            <Badge style={{ height: 'min-content' }} css={tw`bg-green-200 flex items-center text-green-900`}>
              <AiOutlineArrowUp css={tw`mr-1 text-green-600`} />
              {respondentsIncrement}%
            </Badge>
          ) : null}
        </div>

        <div css={[openMenu && tw`transition-all ease-out hidden opacity-0 `]}>
          <div
            css={[
              tw`justify-around absolute bottom-0 left-0 bg-transparent w-full`,
              hovered && tw`flex transition-all ease-in-out duration-700 opacity-100`,
              !hovered && tw`opacity-0`,
            ]}
          >
            {status !== 'finished' && (
              <Tooltip placement="bottom" tip="Edit">
                <IconButton onClick={() => navigate('/edit-survey', { state: survey })}>
                  <FiEdit2 size={28} />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip placement="bottom" tip="Analytics">
              <IconButton onClick={() => navigate(`/analytics/${id}`)}>
                <IoAnalyticsOutline size={28} />
              </IconButton>
            </Tooltip>

            <Tooltip placement="bottom" tip="Preview">
              <IconButton onClick={() => navigate(`/survey/${id}`)}>
                <FiEye size={28} />
              </IconButton>
            </Tooltip>

            {status !== 'finished' && <FinishSurvey surveyId={id} />}

            {status === 'pilot' && <PublishSurvey surveyId={id} />}
          </div>
        </div>

        <div css={[openMenu && tw`transition-all ease-out opacity-100`, !openMenu && tw`hidden opacity-0`]}>
          <InlineMenu surveyId={id} />
        </div>
      </div>
    </Card>
  )
}

export default SurveyCard
