import { render, fireEvent } from '@testing-library/react'
import Banner from './Banner'
import { BannerProvider } from 'contexts/banner'

describe('Banner', () => {
  const customComponent = ({
    show = false,
    title = 'Supreme',
    subtitle = 'Master',
    actionText = 'action',
    action = () => {},
  }) => {
    const value = {
      show,
      title,
      subtitle,
      actionText,
      action,
    }

    return render(
      <BannerProvider value={value}>
        <Banner />
      </BannerProvider>,
    )
  }

  it('should not render a Banner', () => {
    const { container } = customComponent({})

    expect(container).toMatchInlineSnapshot(`<div />`)
  })

  it('should render a Banner', () => {
    const handleAction = jest.fn()
    const { getByText } = customComponent({ show: true, action: handleAction })

    const actionButton = getByText(/action/i)

    expect(getByText(/supreme/i)).toBeInTheDocument()
    expect(getByText(/master/i)).toBeInTheDocument()

    fireEvent.click(actionButton)

    expect(handleAction).toBeCalled()
  })
})
