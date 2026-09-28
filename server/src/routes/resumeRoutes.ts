import { Router } from 'express';
import multer from 'multer';
import { protect } from '../middlewares/authMiddlewares';
import { uploadResume } from '../controllers/resumeControllers';

const router = Router();

// Multer setup: Sirf PDF files allow karenge
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // uploads folder mein save hogi
  },
  filename: (req, file, cb) => {
    cb(null, `resume-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'));
    }
  },
});

router.post('/upload', protect, upload.single('resume'), uploadResume);

export default router;