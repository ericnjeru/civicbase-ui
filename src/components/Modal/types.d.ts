import { ReactNode } from 'react'

export interface ModalContextType {
  ref: any
  isOpen: boolean
  openModal: (event: MouseEvent<HTMLElement>) => void
  closeModal: () => void
  toggleModal: () => void
}

export interface ModalProps {
  open?: boolean
  icon?: ReactNode
  close?: ReactNode
  header?: ReactNode
  children: ReactNode
  footer?: ReactNode
  size?: 'lg' | 'xl' | '2xl'
}
