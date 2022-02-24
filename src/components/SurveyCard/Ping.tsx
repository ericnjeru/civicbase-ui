import tw from 'twin.macro'

const Ping = ({ status }: { status?: string }) => (
  <div
    css={[
      tw`w-3 h-3 rounded-full`,
      status === 'published' && tw`bg-published`,
      status === 'pilot' && tw`bg-pilot`,
      status === 'finished' && tw`bg-finished`,
      !status && tw`bg-gray-200 animate-pulse`,
    ]}
  >
    <div
      css={[
        tw`w-3 h-3 animate-ping rounded-full`,
        status === 'published' && tw`bg-published`,
        status === 'pilot' && tw`bg-pilot`,
        status === 'finished' && tw`bg-finished`,
        !status && tw`bg-gray-200`,
      ]}
    />
  </div>
)

export default Ping
