import { styled } from 'twin.macro'

import Typography from './Typography'
import * as styles from './styles'

export default styled(Typography).attrs({ as: 'div' })(() => styles.caption)
