import tw, { styled } from 'twin.macro'

import Subtitle from './Subtitle'
import Typography from './Typography'
import * as styles from './styles'

export default styled(Typography).attrs<{ as?: string }>(({ as }) => ({ as: as ?? 'h1' }))`
  ${styles.title}
  ${tw`mb-4`}

  ~ ${Subtitle} {
    ${tw`-mt-4`}
  }
`
