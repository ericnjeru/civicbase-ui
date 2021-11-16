import { Meta } from '@storybook/react'
import Badge from 'components/Badge'
import tw from 'twin.macro'
import Stat from './Stat'
import Stats from './Stats'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'

export default {
  title: 'Components/Stats',
  component: Stats,
} as Meta

export const Basic = () => (
  <div style={{ width: 1200 }}>
    <Stats>
      <Stat title="Total Respondents" metric="82">
        <Badge style={{ height: 'min-content' }} css={tw`bg-green-200 flex items-center text-green-900`}>
          <AiOutlineArrowUp css={tw`mr-1 text-green-600`} />
          12%
        </Badge>
      </Stat>
      <Stat title="Total Access" metric="104">
        <Badge style={{ height: 'min-content' }} css={tw`bg-green-200 flex items-center text-green-900`}>
          <AiOutlineArrowUp css={tw`mr-1 text-green-600`} />
          25%
        </Badge>
      </Stat>
      <Stat title="Convertion Rate" metric="87%">
        <Badge style={{ height: 'min-content' }} css={tw`bg-red-200 flex items-center text-red-900`}>
          <AiOutlineArrowDown css={tw`mr-1 text-red-600`} />
          1.07%
        </Badge>
      </Stat>
    </Stats>
  </div>
)
