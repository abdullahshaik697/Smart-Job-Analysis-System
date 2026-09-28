import { Router } from 'express';
import { protect } from '../middlewares/authMiddlewares';
import { applyToJobs, getMyApplications } from '../controllers/applicationControllers';

const router = Router();

router.post('/apply', protect, applyToJobs);
router.get('/', protect, getMyApplications);

export default router;