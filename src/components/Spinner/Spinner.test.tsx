import { render } from '@testing-library/react'
import Spinner from './Spinner'

describe('Spinner', () => {
  it('renders a styled Spinner', async () => {
    const { container } = render(<Spinner />)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="Spinner___StyledDiv-sc-1727hth-0 jjloUy"
        >
          <div
            class="Spinner___StyledDiv2-sc-1727hth-1 kGhTFL"
          />
        </div>
      </div>
    `)
  })
})
