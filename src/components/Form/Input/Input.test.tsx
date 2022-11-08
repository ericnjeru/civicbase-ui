import { render } from '@testing-library/react'

import Input from './Input'

describe('Input', () => {
  test('renders a styled input', async () => {
    const { container } = render(<Input />)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <input
          class="sc-bdnxRM WGycf"
        />
      </div>
    `)
  })
})
