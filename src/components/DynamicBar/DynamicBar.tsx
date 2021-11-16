import tw from 'twin.macro'

const DynamicBar = ({ total }: { total: number }) => {
  if (total < 0 || total > 100) {
    return null
  }

  return (
    <div css={[tw`h-6 w-full rounded-md overflow-hidden flex bg-blue-200`]}>
      <div
        css={[
          tw`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand`,
          tw`transition-all ease-in-out duration-700`,
        ]}
        style={{ width: `${total}%` }}
      />
    </div>
  )
}

export default DynamicBar
