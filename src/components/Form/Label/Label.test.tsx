import React from 'react'
import { render } from '@testing-library/react'
import Label from './Label'

describe('Label', () => {
  test('renders a styled label', async () => {
    const { container } = render(<Label>Did you just assume my label?</Label>)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <label
          class="sc-bdnxRM eDHam"
        >
          Did you just assume my label?
        </label>
      </div>
    `)
  })
})
