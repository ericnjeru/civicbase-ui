import { render } from '@testing-library/react'
import Spinner from './Spinner'

describe('Spinner', () => {
  it('renders a styled Spinner', async () => {
    const { container } = render(<Spinner />)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="Spinner___StyledDiv-sc-16d6pxi-0 gLAAcl"
        >
          <div
            class="Spinner___StyledDiv2-sc-16d6pxi-1 gGyVQk"
          />
        </div>
      </div>
    `)
  })
})
