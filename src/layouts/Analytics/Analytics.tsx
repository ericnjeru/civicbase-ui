import { ReactElement, ReactNode } from 'react'
import tw from 'twin.macro'
import Container from 'components/Container'
import { useAnalytics } from 'contexts/analytics'
import * as Analytics from 'features/Analytics'
import { surveyMethods } from 'utilities/constants'

const AnalyticsLayout = ({
  header,
  status,
  footer,
}: {
  header?: ReactElement
  status?: ReactElement
  footer?: ReactNode
}) => {
  const { isError, isLoading, survey } = useAnalytics()

  if (isError) {
    return <Analytics.Error />
  }

  return (
    <div id="analytics" css={tw`pb-24 h-full`}>
      {header && <Container id="header">{header}</Container>}
      {status && <Container id="status">{status}</Container>}

      <Container id="content">
        {!isLoading && survey?.setup?.method === surveyMethods.Quadratic && <Analytics.Quadratic />}

        {!isLoading && survey?.setup?.method === surveyMethods.Likert && <Analytics.Likert />}

        {!isLoading && survey?.setup?.method === surveyMethods.Conjoint && <Analytics.Conjoint />}

        {isLoading && <Analytics.Loader />}
      </Container>

      {footer && <Container id="footer">{footer}</Container>}
    </div>
  )
}

export default AnalyticsLayout
