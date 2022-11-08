import { render } from '@testing-library/react'

import Card from './Card'

describe('Card', () => {
  it('renders a styled Card', async () => {
    const { container } = render(<Card>This is a card</Card>)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="sc-bdnxRM YHPbv"
        >
          This is a card
        </div>
      </div>
    `)
  })
})
