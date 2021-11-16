import { useState } from 'react'
import tw from 'twin.macro'
import Card from 'components/Card'
import { Subtitle } from 'components/Typography'
import Badge from 'components/Badge'
import { FadeInOut } from 'components/Transition'
import { BiCog, BiPaperPlane } from 'react-icons/bi'
import { FiEdit2, FiEye, FiPower } from 'react-icons/fi'
import { IoAnalyticsOutline } from 'react-icons/io5'
import { IconButton } from 'components/Button'
import Menu from './Menu'

const Ping = ({ status }: { status: string }) => (
  <div
    css={[
      tw`w-3 h-3 rounded-full`,
      status === 'published' && tw`bg-published`,
      status === 'pilot' && tw`bg-pilot`,
      status === 'finished' && tw`bg-finished`,
    ]}
  >
    <div
      css={[
        tw`w-3 h-3 animate-ping rounded-full`,
        status === 'published' && tw`bg-published`,
        status === 'pilot' && tw`bg-pilot`,
        status === 'finished' && tw`bg-finished`,
      ]}
    />
  </div>
)

const SurveyCard = ({ status, title, method }: { status: string; title: string; method: string }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Card
      css={[
        tw`w-full h-40 border-l-4 border-t-0 border-r-0 border-b-0`,
        status === 'published' && tw`border-published`,
        status === 'pilot' && tw`border-pilot`,
        status === 'finished' && tw`border-finished`,
      ]}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div css={tw`flex flex-col justify-between h-full relative`}>
        <div css={tw`flex justify-between items-center`}>
          <Subtitle css={tw`line-clamp-1 mr-12`}>{title}</Subtitle>

          <div css={tw`absolute top-4 right-4 `}>
            <FadeInOut show={!hovered}>
              <Ping status={status} />
            </FadeInOut>
          </div>

          <div css={tw`absolute top-0 right-0`}>
            <FadeInOut show={hovered}>
              <Menu onMenuClose={() => setHovered(false)}>
                <IconButton>
                  <BiCog size={28} />
                </IconButton>
              </Menu>
            </FadeInOut>
          </div>
        </div>

        <div css={tw`flex absolute bottom-0 left-0`}>
          <FadeInOut show={!hovered}>
            <Badge css={tw`mr-2`}>{status}</Badge>
            <Badge>{method}</Badge>
          </FadeInOut>
        </div>

        <FadeInOut show={hovered}>
          <div css={tw`flex justify-around absolute bottom-0 left-0 bg-transparent w-full`}>
            {status !== 'finished' && (
              <IconButton>
                <FiEdit2 size={28} />
              </IconButton>
            )}

            <IconButton>
              <IoAnalyticsOutline size={28} />
            </IconButton>

            <IconButton>
              <FiEye size={28} />
            </IconButton>

            {status !== 'finished' && (
              <IconButton>
                <FiPower size={28} />
              </IconButton>
            )}

            {status === 'pilot' && (
              <IconButton>
                <BiPaperPlane size={28} />
              </IconButton>
            )}
          </div>
        </FadeInOut>
      </div>
    </Card>
  )
}

export default SurveyCard
