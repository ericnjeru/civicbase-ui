import { render, fireEvent } from '@testing-library/react'
import Dropdown from './Dropdown'

describe('Dropdown', () => {
  const customComponent = ({
    error = false,
    modified = false,
    options = ['Black', 'White', 'Orange'],
    onChange = () => {},
    value = '',
    placeholder = ' Placeholder test',
    disabled = false,
  }) => {
    return render(
      <Dropdown
        error={error}
        modified={modified}
        options={options}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />,
    )
  }

  it('should render Dropdown', async () => {
    const { getByText, queryByText } = customComponent({})

    const dropdown = getByText(/placeholder test/i)

    expect(queryByText(/black/i)).not.toBeInTheDocument()
    expect(queryByText(/white/i)).not.toBeInTheDocument()
    expect(queryByText(/orange/i)).not.toBeInTheDocument()

    fireEvent.click(dropdown)

    expect(getByText(/black/i)).toBeInTheDocument()
    expect(getByText(/white/i)).toBeInTheDocument()
    expect(getByText(/orange/i)).toBeInTheDocument()
  })
})
