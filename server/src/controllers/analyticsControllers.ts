import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddlewares';
import prisma from '../config/prisma';

export const getAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;

    // 1. Total Applications
    const applications = await prisma.application.findMany({ where: { userId } });
    const totalApplications = applications.length;

    // 2. Status Breakdown
    const appliedCount = applications.filter(app => app.status === 'APPLIED').length;
    
    // 3. Total Skills
    const resume = await prisma.resume.findUnique({ where: { userId } });
    const totalSkills = resume?.skills.length || 0;

    res.status(200).json({
      totalApplications,
      appliedCount,
      totalSkills,
      skills: resume?.skills || []
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching analytics' });
  }
};