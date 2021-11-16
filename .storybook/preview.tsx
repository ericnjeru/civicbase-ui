import AppStyles from '../src/components/AppStyles'

export const decorators = [
  (Story) => (
    <>
      <AppStyles />
      <Story />
    </>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
  viewport: {
    defaultViewport: 'responsive',
  },
}
