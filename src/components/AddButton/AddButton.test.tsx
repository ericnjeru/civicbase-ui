import { render, fireEvent } from '@testing-library/react'

import AddButton from './AddButton'

describe('Add Button', () => {
  it('should display Add button', () => {
    const handleClick = jest.fn()

    const { getByText } = render(<AddButton onClick={handleClick}>Button Test</AddButton>)

    const button = getByText(/Button Test/i)
    fireEvent.click(button)

    expect(handleClick).toBeCalled()
  })

  it('should display Add button with children as component', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <AddButton onClick={handleClick}>
        <div>Pamonha</div>
      </AddButton>,
    )
    const button = getByText(/Pamonha/i)

    fireEvent.click(button)

    expect(handleClick).toBeCalled()
  })

  it('should display disabled Add button', () => {
    const handleClick = jest.fn()

    const { getByText } = render(
      <AddButton onClick={handleClick} disabled={true}>
        Button Test
      </AddButton>,
    )

    const button = getByText(/Button Test/i).parentElement

    expect(button).toHaveAttribute('disabled')
  })
})
