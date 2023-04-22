export type ThunkErrorType = {
  rejectValue: { errors: string[]; fieldsErrors?: Array<FieldErrorType> }
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
