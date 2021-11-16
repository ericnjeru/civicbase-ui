import { createGlobalStyle } from 'styled-components'
import { GlobalStyles } from 'twin.macro'
import { dmsans } from '../utilities/fonts'

const FontStyles = createGlobalStyle`
  ${dmsans.assets.map(
    (font) => `
      @font-face {
        font-family: ${dmsans.fontName};
        font-style: ${font.style};
        font-weight: ${font.weight};
        src: url(/assets/fonts/dmsans/${font.fileName}) format('${font.format}');
        font-display: swap;
      }
    `,
  )}
`

const BasePageStyles = createGlobalStyle`
  html,
  body,
  body > div:first-child,
  div#__next {
    height: 100%;
  }

  .grecaptcha-badge {
    visibility: hidden;
  }
  button, [type='button'], [type='reset'], [type='submit'] {
    appearance: none;
  }
`

const AppStyles = () => {
  return (
    <>
      <GlobalStyles />
      <FontStyles />
      <BasePageStyles />
    </>
  )
}

export default AppStyles
