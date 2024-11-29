import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config: any): any =>{
  console.log('REQUEST')
})

export default api