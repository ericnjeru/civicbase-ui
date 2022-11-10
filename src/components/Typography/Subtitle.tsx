import { styled } from 'twin.macro'

import Typography from './Typography'
import * as styles from './styles'

export default styled(Typography).attrs<{ as?: string }>(({ as }) => ({ as: as ?? 'h2' }))(() => styles.subtitle)
