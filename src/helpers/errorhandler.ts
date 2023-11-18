import { AxiosError } from "axios"
import { toast } from "react-toastify"

export function handleAxiosError(error: unknown) {
  const isProduction = import.meta.env.MODE === "production"
  if (error instanceof AxiosError) {
    const errorData = error.response?.data as { message?: string }
    if (errorData && errorData.message) {
      if (error.status === 500) {
        const message = isProduction
          ? "Cannot complete your request. Try again later"
          : errorData.message
        toast.error(message)
      } else {
        toast.error(`${errorData.message}`)
      }
    } else {
      if (!isProduction) {
        console.error(error)
        toast.error(`${errorData.message}`)
      }
      toast.error("Server error , please contact the Administrator")
    }
  } else {
    if (!isProduction) {
      console.error(error)
    }
    toast.error("An unknown error occurred, please contact the Administrator")
  }
}
