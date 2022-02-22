import tw from 'twin.macro'
import { ModalProps } from './types.d'

const Modal = ({ open, icon, close, header, children, footer, size = 'lg' }: ModalProps) => {
  if (!open) return null

  return (
    <div
      css={tw`fixed h-screen w-screen max-h-screen max-w-full bg-white bg-opacity-50 top-0 z-50 flex justify-center items-center`}
    >
      <div
        css={[
          tw`fixed w-full h-full max-w-full overflow-hidden bg-white sm:(h-auto max-w-lg rounded-2xl shadow-card)`,
          tw`sm:(maxHeight[600px])`,
          size === 'xl' && tw`lg:max-w-xl`,
          size === '2xl' && tw`lg:max-w-2xl`,
        ]}
        role="dialog"
        aria-modal="true"
      >
        <div css={[tw`flex flex-col items-stretch py-8 overflow-hidden`, tw`maxHeight[600px]`]}>
          {(header || icon || close) && (
            <div css={[tw`px-8 mb-6`, tw`relative flex flex-row justify-between items-center`]}>
              {icon && <div css={tw`absolute left-8 flex justify-center items-center w-8`}>{icon}</div>}
              <div css={tw`flex-auto px-10`}>{header}</div>
              {close && <div css={tw`absolute right-8 flex justify-center items-center w-8`}>{close}</div>}
            </div>
          )}
          <div css={tw`flex-auto px-8 py-1 min-h-0 overflow-scroll`}>{children}</div>
          {footer && <div css={[tw`px-8 mt-6`, tw`flex justify-end items-center`]}>{footer}</div>}
        </div>
      </div>
    </div>
  )
}

export default Modal
