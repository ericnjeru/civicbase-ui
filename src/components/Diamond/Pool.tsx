import Button from 'components/Button'
import Typography from 'components/Typography'
import tw from 'twin.macro'

import { circles } from './utils'

const PoolSVG = () => {
  return (
    <svg width="100" height="300" viewBox="0 -10 70 300" xmlns="http://www.w3.org/2000/svg" overflow="inherit">
      <g fill="none" fillRule="evenodd">
        {circles.map((c) => (
          <circle id={c.id} key={c.id} cx={c.cx} cy={c.cy} r={5} style={{ fill: '#cbd5e1' }} />
        ))}

        {circles.map((c) => (
          <circle
            id={c.animatedId}
            key={c.animatedId}
            cx={c.cx}
            cy={c.cy}
            r={5}
            style={{ fill: '#374151', zIndex: 10 }}
          />
        ))}
      </g>
    </svg>
  )
}

const Pool = ({ availableCredits, reset }: { availableCredits: number; reset: () => void }) => {
  return (
    <div css={tw`flex flex-col items-center`}>
      <Typography>{availableCredits}</Typography>
      <PoolSVG />
      <Button css={tw`border-2 rounded-3xl border-black`} style={{ height: 'min-content' }} onClick={reset}>
        Reset
      </Button>
    </div>
  )
}

export default Pool
