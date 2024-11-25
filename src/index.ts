import colors from 'colors'
import server from "./server"

const port : number | string = process.env.PORT || 3000

server.listen(port, () => {
    console.log(colors.bgBlue.italic.bold( "Servidor funcionando en el puerto: "), port);
    console.log("http://localhost:3000")
})