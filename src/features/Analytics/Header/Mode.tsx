import Tooltip from 'components/Tooltip'
import { useAnalytics } from 'contexts/analytics'
import tw from 'twin.macro'

const Mode = () => {
  const { mode, toggle, survey } = useAnalytics()

  const handleMode = (m: 'pilot' | 'published') => {
    if (survey?.status === 'published' && mode !== m) {
      toggle()
    }
  }

  return (
    <Tooltip label="Select the data status you want to see" popperProps={{ delayShow: 2000 }}>
      <div css={tw`inline-flex rounded-md shadow-sm`} role="group">
        <button
          type="button"
          css={[
            tw`py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100  focus:(outline-none ring-2 ring-red-300 border-red-300 z-10)`,
            mode === 'pilot' && tw`bg-brand2 text-white hover:(opacity-90 bg-brand2)`,
          ]}
          onClick={() => handleMode('pilot')}
        >
          Pilot
        </button>

        <button
          type="button"
          css={[
            tw`py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100  focus:(outline-none ring-2 ring-red-300 border-red-300 z-10)`,
            mode === 'published' && tw`bg-brand2 text-white hover:(opacity-90 bg-brand2)`,
            survey?.status === 'pilot' && tw`disabled:(bg-gray-200 hover:bg-gray-200 focus:bg-gray-200)`,
          ]}
          disabled={survey?.status === 'pilot'}
          onClick={() => handleMode('published')}
        >
          Published
        </button>
      </div>
    </Tooltip>
  )
}

export default Mode
