import Button from 'components/Button'
import Typography, { Hint } from 'components/Typography'
import tw from 'twin.macro'

export const DiamondSVG = ({ index }: { index: string }) => {
  return (
    <svg width={220} height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: -10 }}>
      <g transform="translate(220,110)">
        <circle r="5" cx="-20" cy="0" fill="#cbd5e1" id={`diamond-${index}10`}></circle>
        <circle r="5" cx="-40" cy="0" fill="#cbd5e1" id={`diamond-${index}21`}></circle>
        <circle r="5" cx="-30" cy="-10" fill="#cbd5e1" id={`diamond-${index}20`}></circle>
        <circle r="5" cx="-30" cy="10" fill="#cbd5e1" id={`diamond-${index}22`}></circle>
        <circle r="5" cx="-60" cy="0" fill="#cbd5e1" id={`diamond-${index}32`}></circle>
        <circle r="5" cx="-50" cy="-10" fill="#cbd5e1" id={`diamond-${index}31`}></circle>
        <circle r="5" cx="-50" cy="10" fill="#cbd5e1" id={`diamond-${index}33`}></circle>
        <circle r="5" cx="-40" cy="-20" fill="#cbd5e1" id={`diamond-${index}30`}></circle>
        <circle r="5" cx="-40" cy="20" fill="#cbd5e1" id={`diamond-${index}34`}></circle>
        <circle r="5" cx="-80" cy="0" fill="#cbd5e1" id={`diamond-${index}43`}></circle>
        <circle r="5" cx="-70" cy="-10" fill="#cbd5e1" id={`diamond-${index}42`}></circle>
        <circle r="5" cx="-70" cy="10" fill="#cbd5e1" id={`diamond-${index}44`}></circle>
        <circle r="5" cx="-60" cy="-20" fill="#cbd5e1" id={`diamond-${index}41`}></circle>
        <circle r="5" cx="-60" cy="20" fill="#cbd5e1" id={`diamond-${index}45`}></circle>
        <circle r="5" cx="-50" cy="-30" fill="#cbd5e1" id={`diamond-${index}40`}></circle>
        <circle r="5" cx="-50" cy="30" fill="#cbd5e1" id={`diamond-${index}46`}></circle>
        <circle r="5" cx="-100" cy="0" fill="#cbd5e1" id={`diamond-${index}54`}></circle>
        <circle r="5" cx="-90" cy="-10" fill="#cbd5e1" id={`diamond-${index}53`}></circle>
        <circle r="5" cx="-90" cy="10" fill="#cbd5e1" id={`diamond-${index}55`}></circle>
        <circle r="5" cx="-80" cy="-20" fill="#cbd5e1" id={`diamond-${index}52`}></circle>
        <circle r="5" cx="-80" cy="20" fill="#cbd5e1" id={`diamond-${index}56`}></circle>
        <circle r="5" cx="-70" cy="-30" fill="#cbd5e1" id={`diamond-${index}51`}></circle>
        <circle r="5" cx="-70" cy="30" fill="#cbd5e1" id={`diamond-${index}57`}></circle>
        <circle r="5" cx="-60" cy="-40" fill="#cbd5e1" id={`diamond-${index}50`}></circle>
        <circle r="5" cx="-60" cy="40" fill="#cbd5e1" id={`diamond-${index}58`}></circle>
        <circle r="5" cx="-120" cy="0" fill="#cbd5e1" id={`diamond-${index}65`}></circle>
        <circle r="5" cx="-110" cy="-10" fill="#cbd5e1" id={`diamond-${index}64`}></circle>
        <circle r="5" cx="-110" cy="10" fill="#cbd5e1" id={`diamond-${index}66`}></circle>
        <circle r="5" cx="-100" cy="-20" fill="#cbd5e1" id={`diamond-${index}63`}></circle>
        <circle r="5" cx="-100" cy="20" fill="#cbd5e1" id={`diamond-${index}67`}></circle>
        <circle r="5" cx="-90" cy="-30" fill="#cbd5e1" id={`diamond-${index}62`}></circle>
        <circle r="5" cx="-90" cy="30" fill="#cbd5e1" id={`diamond-${index}68`}></circle>
        <circle r="5" cx="-80" cy="-40" fill="#cbd5e1" id={`diamond-${index}61`}></circle>
        <circle r="5" cx="-80" cy="40" fill="#cbd5e1" id={`diamond-${index}69`}></circle>
        <circle r="5" cx="-70" cy="-50" fill="#cbd5e1" id={`diamond-${index}60`}></circle>
        <circle r="5" cx="-70" cy="50" fill="#cbd5e1" id={`diamond-${index}610`}></circle>
        <circle r="5" cx="-140" cy="0" fill="#cbd5e1" id={`diamond-${index}76`}></circle>
        <circle r="5" cx="-130" cy="-10" fill="#cbd5e1" id={`diamond-${index}75`}></circle>
        <circle r="5" cx="-130" cy="10" fill="#cbd5e1" id={`diamond-${index}77`}></circle>
        <circle r="5" cx="-120" cy="-20" fill="#cbd5e1" id={`diamond-${index}74`}></circle>
        <circle r="5" cx="-120" cy="20" fill="#cbd5e1" id={`diamond-${index}78`}></circle>
        <circle r="5" cx="-110" cy="-30" fill="#cbd5e1" id={`diamond-${index}73`}></circle>
        <circle r="5" cx="-110" cy="30" fill="#cbd5e1" id={`diamond-${index}79`}></circle>
        <circle r="5" cx="-100" cy="-40" fill="#cbd5e1" id={`diamond-${index}72`}></circle>
        <circle r="5" cx="-100" cy="40" fill="#cbd5e1" id={`diamond-${index}710`}></circle>
        <circle r="5" cx="-90" cy="-50" fill="#cbd5e1" id={`diamond-${index}71`}></circle>
        <circle r="5" cx="-90" cy="50" fill="#cbd5e1" id={`diamond-${index}711`}></circle>
        <circle r="5" cx="-80" cy="-60" fill="#cbd5e1" id={`diamond-${index}70`}></circle>
        <circle r="5" cx="-80" cy="60" fill="#cbd5e1" id={`diamond-${index}712`}></circle>
        <circle r="5" cx="-160" cy="0" fill="#cbd5e1" id={`diamond-${index}87`}></circle>
        <circle r="5" cx="-150" cy="-10" fill="#cbd5e1" id={`diamond-${index}86`}></circle>
        <circle r="5" cx="-150" cy="10" fill="#cbd5e1" id={`diamond-${index}88`}></circle>
        <circle r="5" cx="-140" cy="-20" fill="#cbd5e1" id={`diamond-${index}85`}></circle>
        <circle r="5" cx="-140" cy="20" fill="#cbd5e1" id={`diamond-${index}89`}></circle>
        <circle r="5" cx="-130" cy="-30" fill="#cbd5e1" id={`diamond-${index}84`}></circle>
        <circle r="5" cx="-130" cy="30" fill="#cbd5e1" id={`diamond-${index}810`}></circle>
        <circle r="5" cx="-120" cy="-40" fill="#cbd5e1" id={`diamond-${index}83`}></circle>
        <circle r="5" cx="-120" cy="40" fill="#cbd5e1" id={`diamond-${index}811`}></circle>
        <circle r="5" cx="-110" cy="-50" fill="#cbd5e1" id={`diamond-${index}82`}></circle>
        <circle r="5" cx="-110" cy="50" fill="#cbd5e1" id={`diamond-${index}812`}></circle>
        <circle r="5" cx="-100" cy="-60" fill="#cbd5e1" id={`diamond-${index}81`}></circle>
        <circle r="5" cx="-100" cy="60" fill="#cbd5e1" id={`diamond-${index}813`}></circle>
        <circle r="5" cx="-90" cy="-70" fill="#cbd5e1" id={`diamond-${index}80`}></circle>
        <circle r="5" cx="-90" cy="70" fill="#cbd5e1" id={`diamond-${index}814`}></circle>
        <circle r="5" cx="-180" cy="0" fill="#cbd5e1" id={`diamond-${index}98`}></circle>
        <circle r="5" cx="-170" cy="-10" fill="#cbd5e1" id={`diamond-${index}97`}></circle>
        <circle r="5" cx="-170" cy="10" fill="#cbd5e1" id={`diamond-${index}99`}></circle>
        <circle r="5" cx="-160" cy="-20" fill="#cbd5e1" id={`diamond-${index}96`}></circle>
        <circle r="5" cx="-160" cy="20" fill="#cbd5e1" id={`diamond-${index}910`}></circle>
        <circle r="5" cx="-150" cy="-30" fill="#cbd5e1" id={`diamond-${index}95`}></circle>
        <circle r="5" cx="-150" cy="30" fill="#cbd5e1" id={`diamond-${index}911`}></circle>
        <circle r="5" cx="-140" cy="-40" fill="#cbd5e1" id={`diamond-${index}94`}></circle>
        <circle r="5" cx="-140" cy="40" fill="#cbd5e1" id={`diamond-${index}912`}></circle>
        <circle r="5" cx="-130" cy="-50" fill="#cbd5e1" id={`diamond-${index}93`}></circle>
        <circle r="5" cx="-130" cy="50" fill="#cbd5e1" id={`diamond-${index}913`}></circle>
        <circle r="5" cx="-120" cy="-60" fill="#cbd5e1" id={`diamond-${index}92`}></circle>
        <circle r="5" cx="-120" cy="60" fill="#cbd5e1" id={`diamond-${index}914`}></circle>
        <circle r="5" cx="-110" cy="-70" fill="#cbd5e1" id={`diamond-${index}91`}></circle>
        <circle r="5" cx="-110" cy="70" fill="#cbd5e1" id={`diamond-${index}915`}></circle>
        <circle r="5" cx="-100" cy="-80" fill="#cbd5e1" id={`diamond-${index}90`}></circle>
        <circle r="5" cx="-100" cy="80" fill="#cbd5e1" id={`diamond-${index}916`}></circle>
        <circle r="5" cx="-200" cy="0" fill="#cbd5e1" id={`diamond-${index}109`}></circle>
        <circle r="5" cx="-190" cy="-10" fill="#cbd5e1" id={`diamond-${index}108`}></circle>
        <circle r="5" cx="-190" cy="10" fill="#cbd5e1" id={`diamond-${index}1010`}></circle>
        <circle r="5" cx="-180" cy="-20" fill="#cbd5e1" id={`diamond-${index}107`}></circle>
        <circle r="5" cx="-180" cy="20" fill="#cbd5e1" id={`diamond-${index}1011`}></circle>
        <circle r="5" cx="-170" cy="-30" fill="#cbd5e1" id={`diamond-${index}106`}></circle>
        <circle r="5" cx="-170" cy="30" fill="#cbd5e1" id={`diamond-${index}1012`}></circle>
        <circle r="5" cx="-160" cy="-40" fill="#cbd5e1" id={`diamond-${index}105`}></circle>
        <circle r="5" cx="-160" cy="40" fill="#cbd5e1" id={`diamond-${index}1013`}></circle>
        <circle r="5" cx="-150" cy="-50" fill="#cbd5e1" id={`diamond-${index}104`}></circle>
        <circle r="5" cx="-150" cy="50" fill="#cbd5e1" id={`diamond-${index}1014`}></circle>
        <circle r="5" cx="-140" cy="-60" fill="#cbd5e1" id={`diamond-${index}103`}></circle>
        <circle r="5" cx="-140" cy="60" fill="#cbd5e1" id={`diamond-${index}1015`}></circle>
        <circle r="5" cx="-130" cy="-70" fill="#cbd5e1" id={`diamond-${index}102`}></circle>
        <circle r="5" cx="-130" cy="70" fill="#cbd5e1" id={`diamond-${index}1016`}></circle>
        <circle r="5" cx="-120" cy="-80" fill="#cbd5e1" id={`diamond-${index}101`}></circle>
        <circle r="5" cx="-120" cy="80" fill="#cbd5e1" id={`diamond-${index}1017`}></circle>
        <circle r="5" cx="-110" cy="-90" fill="#cbd5e1" id={`diamond-${index}100`}></circle>
        <circle r="5" cx="-110" cy="90" fill="#cbd5e1" id={`diamond-${index}1018`}></circle>
      </g>
    </svg>
  )
}

const Diamond = ({
  index,
  text,
  vote,
  canVote,
  array, // temporary
}: {
  index: string
  text?: string
  vote: (v: number) => void
  canVote: (v: number) => boolean
  array: number[]
}) => {
  const canVoteUp = canVote(1)
  const canVoteDown = canVote(-1)

  return (
    <div css={tw`flex flex-col items-center`}>
      {text && (
        <div css={tw`flex items-center`}>
          <Hint css={tw`text-red-300 mr-2`}>(Question {index})</Hint>
          <Typography>{text}</Typography>
        </div>
      )}

      <div css={tw`flex items-center mobile:flex-col tablet:flex-row`}>
        <Button
          css={[
            tw`border-2 rounded-3xl border-green-400 text-green-400`,
            !canVoteUp && tw`border-gray-400 text-gray-500`,
            tw`mobile:hidden`,
          ]}
          style={{ height: 'min-content' }}
          onClick={() => vote(1)}
          disabled={!canVoteUp}
        >
          Agree
        </Button>
        <DiamondSVG index={index} />
        <Button
          css={[
            tw`border-2 rounded-3xl border-red-300 text-red-300`,
            !canVoteDown && tw`border-gray-400 text-gray-500`,
            tw`mobile:hidden`,
          ]}
          style={{ height: 'min-content' }}
          onClick={() => vote(-1)}
          disabled={!canVoteDown}
        >
          Disagree
        </Button>

        <div css={tw`hidden space-x-4 mobile:(flex justify-between)`}>
          <Button
            css={[
              tw`border-2 rounded-3xl border-green-400 text-green-400`,
              !canVoteUp && tw`border-gray-400 text-gray-500`,
            ]}
            style={{ height: 'min-content' }}
            onClick={() => vote(1)}
            disabled={!canVoteUp}
          >
            Agree
          </Button>
          <Button
            css={[
              tw`border-2 rounded-3xl border-red-300 text-red-300`,
              !canVoteDown && tw`border-gray-400 text-gray-500`,
            ]}
            style={{ height: 'min-content' }}
            onClick={() => vote(-1)}
            disabled={!canVoteDown}
          >
            Disagree
          </Button>
        </div>
      </div>

      <div css={tw`max-w-xs`}>
        <Hint>{array.join(', ')}</Hint>
      </div>
    </div>
  )
}

export default Diamond
