import { styled } from 'twin.macro'
import Button from './Button'
import * as styles from './styles'

export default styled(Button)<{ variant?: 'danger' }>(({ variant }) => [
  ...styles.secondary.DEFAULT,
  ...(variant === 'danger' ? styles.secondary.danger : []),
])
