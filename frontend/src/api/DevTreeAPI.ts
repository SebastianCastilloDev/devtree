import { isAxiosError } from "axios"
import api from "../config/axios"
import { toast } from "sonner"

export async function getUser() {

  const token = localStorage.getItem('AUTH_TOKEN')
  
  try {

    const {data} = await api('/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      toast.error(error.response.data.error)
    }
  }
}