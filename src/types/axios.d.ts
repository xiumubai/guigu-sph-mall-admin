export interface ResponseType<T> {
  code: number
  message: string
  data: T
}
