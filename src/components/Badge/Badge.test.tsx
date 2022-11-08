import { render } from '@testing-library/react'

import Badge from './Badge'

describe('Badge', () => {
  it('renders a styled Badge', async () => {
    const { container } = render(<Badge />)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          class="sc-bdnxRM jpieZy"
        />
      </div>
    `)
  })
})
