import { FC, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { RouteComponentProps } from '@reach/router'
import Card from 'components/Card'
import tw, { theme } from 'twin.macro'
import { Title } from 'components/Typography'
import { IconButton } from 'components/Button'
import LoginForm from 'components/forms/Login'
import SignupForm from 'components/forms/Signup'

const Login: FC<RouteComponentProps> = () => {
  const [toggle, setToggle] = useState(true)

  return (
    <div css={tw`flex justify-center h-full mobile:items-start items-center`}>
      <Card
        css={[
          tw`rounded-3xl p-0 relative border-0 overflow-hidden w-96`,
          tw`bg-gradient-to-tr from-blue-300 via-blue-500 to-pink-400`,
        ]}
        style={{ height: 800 }}
      >
        <div css={tw`text-center mt-8`}>
          <div css={[tw`opacity-0`, toggle && tw`transition-all ease-in-out duration-700 opacity-100`]}>
            {toggle && <Title css={tw`text-white`}>Civicbase</Title>}
          </div>

          <div
            css={[
              tw`flex justify-between items-center opacity-0 mx-2`,
              !toggle && tw`transition-all ease-in-out duration-700 opacity-100`,
            ]}
          >
            <IconButton onClick={() => setToggle(true)}>
              <BsArrowLeft size={28} color={theme`colors.white`} />
            </IconButton>
            <div css={tw`w-full`}>
              <Title css={tw`text-white m-0`}>Sign Up</Title>
            </div>
          </div>
        </div>

        <Card
          css={[
            tw`absolute top-60 w-full h-auto bottom-0 rounded-none border-0`,
            tw`flex flex-col pt-12`,
            !toggle && tw`transition-all ease-in-out duration-700 transform translate-y-full opacity-0`,
            toggle && tw`transition-all ease-in-out duration-700 transform -translate-y-0 opacity-100`,
          ]}
          style={{ borderTopLeftRadius: toggle ? 56 : 0 }}
        >
          <LoginForm handleToggle={() => setToggle(false)} toggle={toggle} />
        </Card>

        <Card
          css={[
            tw`absolute top-32 w-full h-auto bottom-0 rounded-tr-none rounded-none border-0`,
            tw`flex flex-col transform translate-y-full pt-12`,
            !toggle && tw`transition-all ease-in-out duration-700 transform -translate-y-0 opacity-100`,
            toggle && tw`transition-all ease-in-out duration-700 transform translate-y-full opacity-0`,
          ]}
          style={{ borderTopLeftRadius: !toggle ? 56 : 0 }}
        >
          <SignupForm toggle={toggle} />
        </Card>
      </Card>
    </div>
  )
}

export default Login
