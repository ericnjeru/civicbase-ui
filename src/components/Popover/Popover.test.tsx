import { render, fireEvent } from '@testing-library/react'
import Popover from './Popover'

describe('Popover', () => {
  const customComponent = ({ action = <div>action</div> }) => {
    return render(<Popover action={action}>Popover Test</Popover>)
  }

  it('should render Popover', async () => {
    const { getByText, queryByText } = customComponent({})

    const actionButton = getByText(/action/i)

    expect(queryByText(/popover test/i)).not.toBeInTheDocument()

    fireEvent.click(actionButton)

    expect(getByText(/popover test/i)).toBeInTheDocument()
  })
})
