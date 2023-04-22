import { filedErrorsType } from 'features/todolists-list/todolists-api'

export type ThunkErrorType = {
  rejectValue: { errors: string[]; fieldsErrors?: Array<filedErrorsType> }
}