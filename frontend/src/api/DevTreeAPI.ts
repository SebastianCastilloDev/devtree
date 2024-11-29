import { isAxiosError } from "axios"
import api from "../config/axios"
import { toast } from "sonner"

export async function getUser() {
  try {

    const {data} = await api('/user')
    console.log(data)
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      toast.error(error.response.data.error)
    }
  }
}