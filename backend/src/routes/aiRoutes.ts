import { Router } from 'express';
import { askSumanAI } from '../controllers/aiController';

const router = Router();

router.post('/chat', askSumanAI);

export default router;
