import React from 'react'
import { render } from '@testing-library/react'
import Label from './Label'

describe('Label', () => {
  test('renders a styled label', async () => {
    const { container } = render(<Label>Did you just assume my label?</Label>)

    expect(container).toMatchInlineSnapshot(`
      .c0 {
        display: block;
        font-weight: 600;
        --tw-text-opacity: 1;
        color: rgba(17,24,39,var(--tw-text-opacity));
        font-size: 0.875rem;
        line-height: 1.25rem;
        margin-top: 0.375rem;
        margin-bottom: 0.375rem;
      }

      <div>
        <label
          class="c0"
        >
          Did you just assume my label?
        </label>
      </div>
    `)
  })
})
