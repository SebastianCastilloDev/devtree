import { Router } from 'express';
import { createAccount } from './handlers/index';

const router = Router();

// Autenticación y registro
router.post('/auth/register', createAccount as any);

export default router;
