import { filedErrorsType } from 'features/todolists-list/todolists-api'

export type ThunkErrorType = {
  rejectValue: { errors: string[]; fieldsErrors?: Array<filedErrorsType> }
}

type FieldErrorType = {
  error: string
  field: string
}

export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
  fieldsErrors: FieldErrorType[]
}
