import { CorsOptions } from "cors";


export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    const whiteList = [process.env.FRONTEND_URL]

    //capturando un flag del npm script
    if (process.argv[2] === '--api') {
      whiteList.push(undefined)
    }
    
    if (whiteList.includes(origin) ) {
      console.log("Permitir");
      callback(null, true)
    } else {
      console.log("Denegar");
      callback(new Error('Error de CORS'))
    }

  }
}