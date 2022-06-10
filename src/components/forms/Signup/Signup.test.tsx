import { render } from '@testing-library/react'
import Signup from './Signup'

describe('Signup Form', () => {
  const customComponent = ({ shouldReset = false, next = () => {}, handleBack = () => {} }) => {
    return render(<Signup shouldReset={shouldReset} next={next} handleBack={handleBack} />)
  }

  it('should display signup fields', () => {
    const { getByText } = customComponent({})

    expect(getByText(/Name/i)).toBeInTheDocument()
    expect(getByText(/Email/i)).toBeInTheDocument()
    expect(getByText(/Password/i)).toBeInTheDocument()
    // expect(getByText(/By proceeding I agree to Civicbase/i)).toBeInTheDocument()
  })

  it('should display sign up button', () => {
    const { getByText } = customComponent({})

    expect(getByText(/Sign up/i)).toBeInTheDocument()
  })
})
