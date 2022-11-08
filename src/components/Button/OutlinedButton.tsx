import { styled } from 'twin.macro'

import Button from './Button'
import * as styles from './styles'

export default styled(Button)<{ variant?: 'light' | 'default' }>(({ variant = 'default' }) => [
  ...styles.outlined.DEFAULT,
  ...(variant === 'light' ? styles.outlined.light : []),
])
