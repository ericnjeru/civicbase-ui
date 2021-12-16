import { Survey } from '../../types/survey'

export type CreateRequest = {
  body: Survey
  [key: string]: any // not happy with this, but the only way I found so far to add user to the request
}

export type UpdateRequest = {
  body: Survey
}
