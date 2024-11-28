import { Router } from 'express';
import { createAccount, getUser, login } from './handlers/index';
import { body } from 'express-validator'
import { handleInputErrors } from './middleware/validation';

const router = Router();

// Autenticación y registro
router.post('/auth/register', 
            body('handle')
              .notEmpty()
              .withMessage("El handle no puede ir vacio"),
            body('name')
              .notEmpty()
              .withMessage("El nombre no puede ir vacio"),
            body('password')
              .isLength({
                min:8
              })
              .withMessage("El password debe tener al menos 8 caracteres"),
            body('email')
              .isEmail()
              .withMessage("El formato de email es incorrecto"),
            handleInputErrors as any,
            createAccount as any
          );

router.post('/auth/login',
            body('password')
              .notEmpty()
              .withMessage("El password es obligatorio"),
            body('email')
              .isEmail()
              .withMessage("El formato de email es incorrecto"),
              handleInputErrors as any, 
              login as any
            )


router.get('/user', getUser as any)

export default router;
