import { createElement } from 'react'

import { TertiaryButton } from 'components/Button'
import { useBanner } from 'contexts/banner'
import tw from 'twin.macro'

const Banner = () => {
  const { show, title, subtitle, action, actionText, dismiss, icon } = useBanner()

  if (!show) {
    return null
  }

  return (
    <div css={tw`bg-brand2 mt-20 w-full fixed`}>
      <div css={tw`max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8`}>
        <div css={tw`flex items-center justify-between flex-wrap`}>
          <div css={tw`w-0 flex-1 flex items-center text-white`}>
            {icon && createElement(icon, { size: 30, 'aria-hidden': true })}
            <p css={tw`ml-3 font-medium text-white truncate`}>
              <span css={tw`md:hidden`}>{title}</span>
              <span css={tw`hidden md:inline`}>{subtitle}</span>
            </p>
          </div>
          {action && (
            <div css={tw`order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto`}>
              <TertiaryButton css={tw`text-brand2 mobile:w-full`} onClick={action}>
                {actionText}
              </TertiaryButton>
            </div>
          )}
          <div css={tw`order-2 flex-shrink-0 sm:order-3 sm:ml-3`}>
            <button
              type="button"
              css={tw`-mr-1 flex p-2 rounded-md hover:(bg-brand2 opacity-70) focus:outline-none focus:ring-2 focus:ring-brand2 sm:-mr-2`}
              onClick={dismiss}
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
