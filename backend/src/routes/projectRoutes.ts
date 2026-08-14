import { Router } from 'express';
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  seedProjects,
} from '../controllers/projectController';
import { requireAdminAuth } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

// Protected Admin routes (Requires JWT Authorization header)
router.post('/', requireAdminAuth, createProject);
router.put('/:id', requireAdminAuth, updateProject);
router.delete('/:id', requireAdminAuth, deleteProject);
router.post('/seed', requireAdminAuth, seedProjects);

export default router;
