import { render, fireEvent } from '@testing-library/react'
import Login from './Login'

describe('Login Form', () => {
  it('should display login fields', () => {
    const { getByText } = render(<Login handleToggle={() => {}} toggle={true} />)

    expect(getByText(/Email/i)).toBeInTheDocument()
    expect(getByText(/Password/i)).toBeInTheDocument()
  })

  it('should show option to signup', () => {
    const handleToggle = jest.fn()
    const { getByText } = render(<Login handleToggle={handleToggle} toggle={true} />)

    const signup = getByText(/Do not have account/i)

    fireEvent.click(signup)

    expect(handleToggle).toBeCalled()
  })

  it('should display login button', () => {
    const { getByText } = render(<Login handleToggle={() => {}} toggle={true} />)

    expect(getByText(/Login/i)).toBeInTheDocument()
  })
})
