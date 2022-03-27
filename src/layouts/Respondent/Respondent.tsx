import Container from 'components/Container'
import { ReactNode } from 'react'
import tw from 'twin.macro'

const RespondentLayout = ({
  header,
  main,
  feedback,
  footer,
}: {
  header?: ReactNode
  main?: ReactNode
  feedback?: ReactNode
  footer: ReactNode
}) => {
  return (
    <div id="respondent" style={{ paddingTop: 70 }}>
      {header && <>{header}</>}

      {main && <Container id="main">{main}</Container>}

      {feedback && <Container id="feedback">{feedback}</Container>}

      {footer && (
        <div css={tw`text-center pb-20`}>
          <Container id="footer">{footer}</Container>
        </div>
      )}
    </div>
  )
}

export default RespondentLayout
