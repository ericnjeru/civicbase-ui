import 'twin.macro'
import styledImport, { CSSProp, css as cssImport } from 'styled-components'

declare global {
  namespace JSX {
    interface IntrinsicAttributes<T> extends DOMAttributes<T> {
      as?: string
    }
  }
}

declare module 'twin.macro' {
  const styled: typeof styledImport
  const css: typeof cssImport
}

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp
  }
  interface SVGProps<T> extends SVGProps<SVGSVGElement<T>> {
    css?: CSSProp
  }
}
