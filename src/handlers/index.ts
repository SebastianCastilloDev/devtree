import { Request, Response } from "express"
import User from "../models/User"
import { hashPassword } from '../utils/auth';
import slugify from 'slugify'

export const createAccount = async (req: Request, res: Response)=> {

  const {email, password, handle} = req.body

  const userExists = await User.findOne({email})
  if (userExists) {
    const error = new Error('El usuario ya está registrado')
    return res.status(409).json({error: error.message})
  } 

  const user = new User(req.body)
  user.password = await hashPassword(password)

  console.log(slugify(handle, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    trim: true,
  }))
  
  await user.save()
  res.status(201).send('Registro Creado Correctamente')

}

