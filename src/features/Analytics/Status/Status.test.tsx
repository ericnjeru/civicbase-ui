import { render } from '@testing-library/react'
import { survey } from 'test/sample'

import Status from './Status'

describe('Analytics Status', () => {
  const customComponent = ({ ...props } = {}) => {
    return render(<Status survey={{ ...survey, ...props }} />)
  }

  it('should show access', () => {
    const { container } = customComponent()

    expect(container).toMatchSnapshot()
  })
})
