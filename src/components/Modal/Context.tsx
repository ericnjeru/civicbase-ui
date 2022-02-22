import { createContext } from 'react'
import { ModalContextType } from './types.d'

const ModalContext = createContext<ModalContextType>({
  ref: undefined,
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  toggleModal: () => {},
})

export default ModalContext
