import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddlewares';
import prisma from '../config/prisma';
import path from 'path';
import { parseResumeWithPython } from '../services/pythonService';

export const uploadResume = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF file' });
    }

    const userId = req.user.id;
    const fileUrl = `/uploads/${req.file.filename}`;
    
    // Python ko bhejne ke liye full path
    const fullPath = path.join(__dirname, '../../uploads', req.file.filename);

    // Python API call karna (Agar Python band hua toh bhi error nahi aayega)
    const extractedData = await parseResumeWithPython(fullPath);
    
    let skills: string[] = [];
    let extractedJson: any = null;

    if (extractedData) {
      skills = extractedData.skills || [];
      extractedJson = extractedData;
    }

    // Database mein resume save/update karna
    const resume = await prisma.resume.upsert({
      where: { userId },
      update: { 
        fileUrl, 
        skills,
        extractedJson 
      },
      create: { 
        userId, 
        fileUrl, 
        skills,
        extractedJson 
      },
    });

    res.status(200).json({
      message: 'Resume uploaded and parsed successfully!',
      resume,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error during resume upload' });
  }
};