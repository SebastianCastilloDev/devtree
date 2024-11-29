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
    console.log({data})
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}