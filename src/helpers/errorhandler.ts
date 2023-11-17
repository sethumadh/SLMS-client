import { AxiosError } from "axios"
import { toast } from "react-toastify"

export function handleAxiosError(error: unknown) {
  if (error instanceof AxiosError) {
    const errorData = error.response?.data as { message?: string }
    if (errorData && errorData.message) {
      if (error.status === 500) {
        toast.error("Cannot complete your request. Try again later")
      } else {
        toast.error(`${errorData.message}`)
      }
    } else {
      toast.error("Server error , please contact the Administrator")
    }
  } else {
    toast.error("An error occurred, please contact the Administrator")
  }
}
