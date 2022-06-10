import { render } from '@testing-library/react'
import DynamicBar from './DynamicBar'

describe('DynamicBar', () => {
  const customComponent = ({ total = 222, availableCredits = 123, language = 'test' }) => {
    return render(<DynamicBar total={total} availableCredits={availableCredits} language={language} />)
  }

  it('should render DynamicBar', async () => {
    const { getByText } = customComponent({})

    expect(getByText('123/222 test')).toBeInTheDocument()
  })
})
