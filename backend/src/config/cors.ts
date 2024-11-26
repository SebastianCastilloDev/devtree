import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    console.log(origin)
    if (origin === 'http://localhost:5173') {
      console.log("Permitir");
      callback(null, true)
    } else {
      console.log("Denegar");
      callback(new Error('Error de CORS'))
    }

  }
}