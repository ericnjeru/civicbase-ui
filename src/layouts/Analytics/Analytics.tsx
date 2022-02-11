import Container from 'components/Container'
import { ReactNode } from 'react'
import tw from 'twin.macro'

const AnalyticsLayout = ({
  header,
  status,
  children,
  footer,
}: {
  header?: ReactNode
  status?: ReactNode
  children?: ReactNode
  footer?: ReactNode
}) => {
  return (
    <div id="analytics" css={tw`pb-24`}>
      {header && <Container id="header">{header}</Container>}
      {status && <Container id="status">{status}</Container>}
      {children && <Container id="status">{children}</Container>}
      {footer && <Container id="status">{footer}</Container>}
    </div>
  )
}

export default AnalyticsLayout
