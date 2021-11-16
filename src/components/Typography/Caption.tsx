import { styled } from 'twin.macro'
import * as styles from './styles'
import Typography from './Typography'

export default styled(Typography).attrs({ as: 'div' })(() => styles.caption)
