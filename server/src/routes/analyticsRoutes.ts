import { Router } from 'express';
import { protect } from '../middlewares/authMiddlewares';
import { getAnalytics } from '../controllers/analyticsControllers';

const router = Router();

router.get('/', protect, getAnalytics);

export default router;