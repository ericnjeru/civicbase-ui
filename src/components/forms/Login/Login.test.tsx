import { render, fireEvent } from '@testing-library/react'

import Login from './Login'

describe('Login Form', () => {
  it('should display login fields', () => {
    const { container } = render(<Login handleForgotPassword={() => {}} next={() => {}} />)
    const passwordInput = container.querySelector(`input[name="password"]`)
    const emailInput = container.querySelector(`input[name="email"]`)

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
  })

  it('should show option to forgot password', () => {
    const handleForgotPassword = jest.fn()
    const { getByText } = render(<Login handleForgotPassword={handleForgotPassword} next={() => {}} />)

    const password = getByText(/forgot password/i)

    fireEvent.click(password)

    expect(handleForgotPassword).toBeCalled()
  })

  it('should show option to signup', () => {
    const handleNext = jest.fn()
    const { getByText } = render(<Login handleForgotPassword={() => {}} next={handleNext} />)

    const signup = getByText(/Do not have account/i)

    // debug(signup``)

    fireEvent.click(signup)

    expect(handleNext).toBeCalled()
  })

  it('should display login button', () => {
    const { getByText } = render(<Login handleForgotPassword={() => {}} next={() => {}} />)

    expect(getByText(/Login/i)).toBeInTheDocument()
  })
})
