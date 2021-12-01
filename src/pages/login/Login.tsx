import { useState, FC } from 'react'
import tw from 'twin.macro'
import { RouteComponentProps } from '@reach/router'
import { OutlinedButton } from 'components/Button'
import Card from 'components/Card'
import Typography, { Title, Caption } from 'components/Typography'
import Label from 'components/Form/Label'
import Input from 'components/Form/Input'

// This idea is coming from: https://dribbble.com/shots/5311359-Diprella-Login

const SignupForm = () => {
  return (
    <div css={tw`p-5`}>
      <Title css={tw`text-center`}>Create Account</Title>

      <div css={tw`grid grid-cols-1 gap-4 align-middle`}>
        <div>
          <Label>Name</Label>
          <Input />
        </div>

        <div>
          <Label>Email</Label>
          <Input />
        </div>

        <div>
          <Label>Password</Label>
          <Input />
        </div>

        <OutlinedButton onClick={() => {}}>Sign Up</OutlinedButton>
      </div>
    </div>
  )
}

const LoginForm = () => {
  return (
    <div css={tw`p-5`}>
      <Title css={tw`text-center`}>Sign in to QVSR</Title>

      <div css={tw`grid grid-cols-1 gap-4 align-middle`}>
        <div>
          <Label>Email</Label>
          <Input />
        </div>

        <div>
          <Label>Password</Label>
          <Input />
        </div>

        <Caption css={tw`text-center`}>Forgot your password?</Caption>

        <OutlinedButton onClick={() => {}}>Sign In</OutlinedButton>
      </div>
    </div>
  )
}

const LoginBanner = ({ handleToggle }: { handleToggle: () => void }) => {
  return (
    <div css={tw`p-5 flex justify-between flex-col h-full`}>
      <div>
        <Title>Hello, Friend!</Title>
        <Typography css={tw`text-center max-w-xs`}>Enter your personal details and start a journey with us.</Typography>
      </div>
      <OutlinedButton onClick={handleToggle}>Login</OutlinedButton>
    </div>
  )
}
const SignupBanner = ({ handleToggle }: { handleToggle: () => void }) => {
  return (
    <div css={tw`p-5 flex justify-between flex-col h-full`}>
      <div>
        <Title>Welcome Back!</Title>
        <Typography css={tw`text-center max-w-xs`}>
          To keep connected with us please login with your personal info.{' '}
        </Typography>
      </div>
      <OutlinedButton onClick={handleToggle}>Sign up</OutlinedButton>
    </div>
  )
}

const Login: FC<RouteComponentProps> = () => {
  const [clicked, setClicked] = useState(false)

  return (
    <div css={tw`flex justify-center`}>
      <Card css={tw`max-w-screen-md w-full h-96 relative`}>
        <div
          style={{ top: '-1px', right: '-1px', width: clicked ? '24.5rem' : '28rem' }}
          css={[
            tw`h-96 w-96 absolute border-0`,
            clicked && tw`rounded-l-md transition-all ease-in-out duration-700 transform -translate-x-96 `,
            !clicked && tw` rounded-r-md transition-all ease-in-out duration-700`,
          ]}
        >
          {clicked ? <SignupForm /> : <LoginForm />}
        </div>

        <div
          style={{ top: '-1px', left: '-1px' }}
          css={[
            tw`h-96 w-96 absolute border-0 z-10`,
            tw`bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500`,
            clicked && tw`rounded-r-md transition-all ease-in-out duration-700 transform translate-x-96 `,
            !clicked && tw` rounded-l-md w-80 transition-all ease-in-out duration-700`,
          ]}
        >
          {clicked ? (
            <LoginBanner handleToggle={() => setClicked(!clicked)} />
          ) : (
            <SignupBanner handleToggle={() => setClicked(!clicked)} />
          )}
        </div>
      </Card>
    </div>
  )
}

export default Login
