import { styled } from 'twin.macro'
import * as styles from './styles'
import Typography from './Typography'

export default styled(Typography).attrs<{ as?: string }>(({ as }) => ({ as: as ?? 'h2' }))(() => styles.subtitle)
