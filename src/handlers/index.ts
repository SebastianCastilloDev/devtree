import { Request, Response } from "express"
import User from "../models/User"
import { hashPassword } from '../utils/auth';
import slugify from 'slugify'

export const createAccount = async (req: Request, res: Response)=> {

  const {email, password} = req.body

  const userExists = await User.findOne({email})
  if (userExists) {
    const error = new Error('El usuario ya está registrado')
    return res.status(409).json({error: error.message})
  } 

  const handle = slugify(req.body.handle, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    trim: true,
  })

  const handleExists = await User.findOne({handle})
  if (handleExists) {
    const error = new Error("Nombre de usuario no disponible")
    return res.status(409).json({error: error.message})
  }


  const user = new User(req.body)
  user.password = await hashPassword(password)
  user.handle = handle


  
  await user.save()
  res.status(201).send('Registro Creado Correctamente')

}

