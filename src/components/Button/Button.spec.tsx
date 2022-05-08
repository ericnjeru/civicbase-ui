import React from 'react'
import { render } from '@testing-library/react'
import PrimaryButton from './Primary'

describe('Button', () => {
  test('renders a styled button', async () => {
    const { container } = render(<PrimaryButton>Click Me</PrimaryButton>)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          class="sc-bdnxRM sc-gtsrHT gnLWFF cQBObs"
          type="button"
        >
          Click Me
        </button>
      </div>
    `)
  })
})
