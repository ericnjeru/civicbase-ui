import tw from 'twin.macro'

const Tab = ({ ...props }) => {
  return (
    <button
      css={[
        tw`flex justify-center items-center rounded-md w-full px-2 py-2 text-sm outline-none bg-gray-100`,
        tw`focus:(ring ring-brand ring-opacity-50)`,
        props.active && tw`bg-brand text-gray-100`,
        props.error && tw`bg-red-300 text-gray-700`,
      ]}
      type="button"
      {...props}
    >
      <div css={tw`flex items-center space-x-2`}>{props.children}</div>
    </button>
  )
}

export default Tab
