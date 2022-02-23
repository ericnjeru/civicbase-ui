import Typography from 'components/Typography'
import tw from 'twin.macro'

const DynamicBar = ({
  total,
  availableCredits,
  language,
}: {
  total: number
  availableCredits: number
  language: string
}) => {
  if (total < 0 || availableCredits > total || availableCredits < 0) {
    return null
  }

  const progress = Math.floor((availableCredits / total) * 100)

  return (
    <div css={[tw`h-6 w-full rounded-md overflow-hidden flex bg-brand bg-opacity-50 relative`]}>
      <div
        css={[
          tw`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand`,
          tw`transition-all ease-in-out duration-700`,
        ]}
        style={{ width: `${progress}%` }}
      />
      <div css={tw`absolute inset-x-1/2 w-full`}>
        <Typography css={tw`text-white`}>
          {availableCredits}/{total} {language}
        </Typography>
      </div>
    </div>
  )
}

export default DynamicBar
