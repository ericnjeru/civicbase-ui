import { styled } from 'twin.macro'
import Button from './Button'
import * as styles from './styles'

export default styled(Button)<{ variant?: 'danger' }>(({ variant }) => [
  ...styles.primary.DEFAULT,
  ...(variant === 'danger' ? styles.primary.danger : []),
])
