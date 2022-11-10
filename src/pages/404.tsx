import { FC } from 'react'

import { RouteComponentProps } from '@reach/router'
import { PrimaryButton } from 'components/Button'
import Typography, { Title } from 'components/Typography'
import tw from 'twin.macro'

const NotFound: FC<RouteComponentProps> = () => {
  return (
    <div css={tw`container mx-auto h-full flex justify-center items-center pb-44 flex-col`}>
      <div css={tw`flex divide-x-2 divide-gray-100`}>
        <Title css={tw`mr-4`}> 404 </Title>

        <div css={tw`flex flex-col pl-4`}>
          <Title css={tw`leading-6 mt-1.5`}> Page not Found</Title>
          <Typography css={tw`text-gray-500`}>Please check the URL in the address bar and try again</Typography>
        </div>
      </div>
      <div css={tw`mt-10`}>
        <PrimaryButton>Go back home</PrimaryButton>
      </div>
    </div>
  )
}

export default NotFound
