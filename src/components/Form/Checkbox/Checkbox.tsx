import tw, { css, styled, theme } from 'twin.macro'

const checkedStyles = css`
  background-color: ${theme`colors.brand`};
  border-color: ${theme`colors.brand`};
  transition-property: background-color, border-color;
  transition-duration: 75ms;
  background-image: url("data:image/svg+xml,<svg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'><path d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/></svg>");
`

const Checkbox = styled.input.attrs({ type: 'checkbox' })(({ checked }) => [
  tw`appearance-none h-5 w-5 inline-block bg-white border-2 border-gray-200 rounded bg-no-repeat bg-center dark:text-white`,
  checked && checkedStyles,
  css`
    &:checked {
      ${checkedStyles}
    }
  `,
])

export default Checkbox
