import { ReactNode, useImperativeHandle, forwardRef, ForwardedRef } from 'react'

import { isFunction } from 'utilities/isFunction'

import Close from './Close'
import ModalContext from './Context'
import { ModalContextType, ModalProps } from './types.d'
import useModal from './useModal'

const ModalContainer = (
  {
    action,
    close,
    children,
    ...props
  }: {
    action: ReactNode | ((args: ModalContextType) => ReactNode)
    close?: ReactNode
    children: ReactNode | ((args: ModalContextType) => ReactNode)
  } & ModalProps,
  imperativeRef: ForwardedRef<
    Pick<ModalContextType, 'isOpen' | 'openModal' | 'closeModal' | 'toggleModal'> | undefined
  >,
) => {
  const { ref, isOpen, openModal, closeModal, toggleModal, Modal } = useModal()

  useImperativeHandle(imperativeRef, () => {
    return {
      isOpen,
      openModal,
      closeModal,
      toggleModal,
    }
  })

  return (
    <ModalContext.Provider value={{ ref, isOpen, openModal, closeModal, toggleModal }}>
      {isFunction(action) ? action({ ref, isOpen, openModal, closeModal, toggleModal }) : action}
      <Modal {...props} open={isOpen} close={close ?? <Close onClick={closeModal} />}>
        {isFunction(children) ? children({ ref, isOpen, openModal, closeModal, toggleModal }) : children}
      </Modal>
    </ModalContext.Provider>
  )
}

export default forwardRef(ModalContainer)
