import { Router } from 'express';
import { loginAdmin, verifySession } from '../controllers/authController';
import { requireAdminAuth } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', loginAdmin);
router.get('/verify', requireAdminAuth, verifySession);

export default router;
