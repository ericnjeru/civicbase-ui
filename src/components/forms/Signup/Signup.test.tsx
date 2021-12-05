import { render } from '@testing-library/react'
import Signup from './Signup'

describe('Signup Form', () => {
  it('should display signup fields', () => {
    const { getByText } = render(<Signup toggle={true} />)

    expect(getByText(/Name/i)).toBeInTheDocument()
    expect(getByText(/Email/i)).toBeInTheDocument()
    expect(getByText(/Password/i)).toBeInTheDocument()
    expect(getByText(/By proceeding I agree to Civicbase/i)).toBeInTheDocument()
  })

  it('should display sign up button', () => {
    const { getByText } = render(<Signup toggle={true} />)

    expect(getByText(/Sign up/i)).toBeInTheDocument()
  })
})
