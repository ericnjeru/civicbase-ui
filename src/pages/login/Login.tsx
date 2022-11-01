import { FC, useCallback, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import Card from 'components/Card'
import tw from 'twin.macro'
import Typography from 'components/Typography'
import LoginForm from 'components/forms/Login'
import SignupForm from 'components/forms/Signup'
import ForgotPasswordForm from 'components/forms/ForgotPassword'
import Step from './Step'
import Header from './Header'

type Steps = 'login' | 'signup' | 'verification' | 'forgot' | 'forgotConfirmation'

const Login: FC<RouteComponentProps> = () => {
  const [step, setStep] = useState<Steps>('login')

  const isLogin = step === 'login'
  const isSignup = step === 'signup'
  const isVerification = step === 'verification'
  const isForgot = step === 'forgot'
  const isForgotConfirmation = step === 'forgotConfirmation'

  const handleNext = useCallback((step) => {
    setStep(step)
  }, [])

  const handleVerification = useCallback(() => {
    setStep('verification')
  }, [])

  return (
    <>
      <div css={tw`flex justify-center h-full mobile:items-start items-center overflow-hidden`}>
        <Card
          css={[
            tw`rounded-3xl p-0 relative border-0 w-96 overflow-visible mobile:rounded-none`,
            tw`bg-gradient-to-tr from-brand via-brand to-brand2`,
          ]}
          style={{ maxHeight: 700, width: 528, height: '100%' }}
        >
          <div css={tw`text-center mt-4`}>
            <Header isActive={isLogin}>
              <div css={tw`flex justify-center`}>
                <img
                  css={tw`mobile:w-[150px] w-[250px]`}
                  src={`${process.env.PUBLIC_URL}/civicbase_logo_white.svg`}
                  alt="logo"
                />
              </div>
            </Header>

            <Header isActive={isSignup} handleBack={() => setStep('login')}>
              Sign Up
            </Header>

            {(isLogin || isSignup) && (
              <Typography css={tw`text-white h-40 flex items-center mobile:(h-auto mt-4)`}>
                Civicbase is a survey platform that enables rapid deployment of Quadratic Voting for Survey Research
                (QVSR)
              </Typography>
            )}

            <Header isActive={isVerification} handleBack={() => setStep('login')}>
              Email Verification
            </Header>

            <Header isActive={isForgot || isForgotConfirmation} handleBack={() => handleNext('login')}>
              Reset Password
            </Header>
          </div>

          <Step isActive={isLogin} css={tw`top-60 mobile:top-40`}>
            <LoginForm next={() => setStep('signup')} handleForgotPassword={() => setStep('forgot')} />
          </Step>

          <Step isActive={isSignup} css={tw`top-52`}>
            <SignupForm shouldReset={!isSignup} next={handleVerification} handleBack={() => setStep('login')} />
          </Step>

          <Step isActive={isForgot}>
            <ForgotPasswordForm next={() => handleNext('forgotConfirmation')} />
          </Step>

          <Step isActive={isForgotConfirmation}>
            <Typography>We sent you an email so you can reset your password.</Typography>
          </Step>

          <Step isActive={isVerification}>
            <Typography>
              Thank you for signing up to Civicbase! We have sent you a confirmation email, please verify your address.
            </Typography>
          </Step>
        </Card>
      </div>
    </>
  )
}

export default Login
