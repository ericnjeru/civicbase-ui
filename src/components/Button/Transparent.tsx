import { styled } from 'twin.macro'

import * as styles from './styles'

export default styled.button.attrs(({ type = 'button' }) => ({ type }))(() => styles.transparent)
