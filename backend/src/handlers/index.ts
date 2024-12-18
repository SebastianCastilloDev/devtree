import  jwt from 'jsonwebtoken';
import { Request, Response } from "express"
import User from "../models/User"
import { checkPassword, hashPassword } from '../utils/auth';
import slugify from 'slugify'
import {validationResult} from 'express-validator'
import { generateJWT } from "../utils/jwt";


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
  console.log("desde crear cuenta")
  res.status(201).send('Registro Creado Correctamente')
}

export const login = async (req: Request, res: Response) => {

  // errores
  let errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  const {email, password} = req.body

  const user = await User.findOne({email})
  if (!user) {
    const error = new Error('El usuario no existe')
    return res.status(404).json({error: error.message})
  } 

  // Comprobar el password
  const isPasswordCorrect = await checkPassword(password, user.password)
  if (!isPasswordCorrect) {
    const error = new Error('Password Incorrecto')
    return res.status(401).json({error: error.message})
  }

  const token = generateJWT({id: user._id})

  res.send(token)
}

export const getUser = async (req: Request, res: Response) => {
  res.json(req.user)
  console.log('Desde Get User')
}