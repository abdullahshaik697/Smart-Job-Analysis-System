import { Router } from 'express';
import { protect } from '../middlewares/authMiddlewares';
import { getAllJobs, getMatchScore, getStudyResources, generateCoverLetter } from '../controllers/jobControllers';

const router = Router();

// Yahan .get ki jagah .post likhna hai
router.post('/', protect, getAllJobs); 

router.get('/:jobId/match', protect, getMatchScore);
router.post('/resources', protect, getStudyResources);
router.post('/cover-letter', protect, generateCoverLetter);

export default router;