import { render } from '@testing-library/react'
import Status from './Status'
import { survey } from 'test/sample'

describe('Analytics Status', () => {
  const customComponent = ({ ...props } = {}) => {
    return render(<Status survey={{ ...survey, ...props }} />)
  }

  it('should show access', () => {
    const { container } = customComponent()

    expect(container).toMatchSnapshot()
  })
})
