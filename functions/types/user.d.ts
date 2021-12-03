export type SignupRequest = {
  body: {
    name: string
    email: string
    password: string
  }
  params: { entryId: string }
}

export type ResetPasswordRequest = {
  body: {
    email: string
  }
  params: { entryId: string }
}

export type LoginRequest = {
  body: {
    email: string
    password: string
  }
  params: { entryId: string }
}

export type AuthRequest = {
  user: {
    uid: string
    email?: string
    token: string
  }
}
