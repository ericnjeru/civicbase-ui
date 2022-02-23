import Container from 'components/Container'
import { cloneElement, ReactElement, ReactNode } from 'react'
import tw from 'twin.macro'

const AnalyticsLayout = ({
  header,
  status,
  children,
  footer,
  ...props
}: {
  header?: ReactElement
  status?: ReactElement
  children?: ReactNode
  footer?: ReactNode
  isLoading: boolean
  survey: any
  answers: any
}) => {
  return (
    <div id="analytics" css={tw`pb-24 h-full`}>
      {header && <Container id="header">{cloneElement(header, { ...props })}</Container>}
      {status && <Container id="status">{cloneElement(status, { ...props })}</Container>}
      {children && <Container id="children">{children}</Container>}
      {footer && <Container id="footer">{footer}</Container>}
    </div>
  )
}

export default AnalyticsLayout
