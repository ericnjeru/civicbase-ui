import { TertiaryButton } from 'components/Button'
import tw from 'twin.macro'

const Banner = () => {
  return (
    <div css={tw`bg-brand2`}>
      <div css={tw`max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8`}>
        <div css={tw`flex items-center justify-between flex-wrap`}>
          <div css={tw`w-0 flex-1 flex items-center`}>
            <span css={tw`flex p-2`}>
              <svg
                css={tw`h-6 w-6 text-white`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </span>
            <p css={tw`ml-3 font-medium text-white truncate`}>
              <span css={tw`md:hidden`}>We announced a new product!</span>
              <span css={tw`hidden md:inline`}>Big news! We are excited to announce a brand new product.</span>
            </p>
          </div>
          <div css={tw`order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto`}>
            <TertiaryButton css={tw`text-brand2 mobile:w-full`}>Learn more </TertiaryButton>
          </div>
          <div css={tw`order-2 flex-shrink-0 sm:order-3 sm:ml-3`}>
            <button
              type="button"
              css={tw`-mr-1 flex p-2 rounded-md hover:(bg-brand2 opacity-70) focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2`}
            >
              <span css={tw`sr-only`}>Dismiss</span>

              <svg
                css={tw`h-6 w-6 text-white`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
