import { FC, memo } from 'react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import FocusLock from 'react-focus-lock'
import usePortal from 'react-useportal'
import useUnmount from 'hooks/use-unmount'
import Modal from './Modal'
import { ModalProps } from './types'

const useModal = (Component: FC<ModalProps> = Modal) => {
  const { ref, isOpen, openPortal, togglePortal, closePortal, Portal } = usePortal({
    onOpen: (event) => disableBodyScroll(event.targetEl.current),
    onClose: (event) => enableBodyScroll(event.targetEl.current),
  })

  useUnmount(() => clearAllBodyScrollLocks())

  const PortalModal = memo((props: ModalProps) => (
    <Portal>
      <FocusLock>
        <Component {...props} />
      </FocusLock>
    </Portal>
  ))

  PortalModal.displayName = 'PortalModal'

  return {
    ref,
    Modal: PortalModal,
    openModal: openPortal,
    toggleModal: togglePortal,
    closeModal: closePortal,
    isOpen,
  }
}

export default useModal
