import { render } from '@testing-library/react'

import TextArea from './TextArea'

describe('TextArea', () => {
  it('renders a styled TextArea', async () => {
    const { container } = render(<TextArea />)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <textarea
          class="sc-bdnxRM ersBGX"
        />
      </div>
    `)
  })
})
