import { render } from '@testing-library/react'

import Checkbox from './Checkbox'

describe('Checkbox', () => {
  it('renders a styled Checkbox', async () => {
    const { container } = render(<Checkbox />)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <input
          class="sc-bdnxRM fmTfid"
          type="checkbox"
        />
      </div>
    `)
  })
})
