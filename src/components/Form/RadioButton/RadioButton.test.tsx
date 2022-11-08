import { render } from '@testing-library/react'

import RadioButton from './RadioButton'

describe('RadioButton', () => {
  it('renders a styled RadioButton', async () => {
    const { container } = render(<RadioButton />)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <input
          class="RadioButton___StyledInput-sc-1p3b5s4-0 bcKCTg"
          type="radio"
        />
      </div>
    `)
  })
})
