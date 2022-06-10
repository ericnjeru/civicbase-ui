import { render } from '@testing-library/react'
import RadioButton from './RadioButton'

describe('RadioButton', () => {
  it('renders a styled RadioButton', async () => {
    const { container } = render(<RadioButton />)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <input
          class="RadioButton___StyledInput-sc-18uwl95-0 kxoxAR"
          type="radio"
        />
      </div>
    `)
  })
})
