import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddlewares'; // Agar ye path aapke server mein chal raha hai toh waisa hi rakhein
import prisma from '../config/prisma';
import { getCoverLetterFromPython } from '../services/pythonService';

// 1. Selected Jobs pe Auto Apply karna (AI Cover Letter ke sath)
export const applyToJobs = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { jobs } = req.body; // Frontend se selected jobs ka array aayega

    if (!jobs || jobs.length === 0) {
      return res.status(400).json({ message: 'No jobs selected for application.' });
    }

    // User ki skills aur naam nikalna
    const userResume = await prisma.resume.findUnique({ where: { userId } });
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const userSkills = userResume?.skills || [];
    const userName = user?.name || "Candidate";

    // Har job ke liye process karna
    for (const jobData of jobs) {
      // 1. Job ko DB mein save karna (agar pehle se nahi hai)
      const job = await prisma.job.upsert({
        where: { jobUrl: jobData.jobUrl },
        update: { title: jobData.title, company: jobData.company, description: jobData.description, location: jobData.location, source: jobData.source },
        create: {
          title: jobData.title,
          company: jobData.company,
          description: jobData.description,
          location: jobData.location,
          jobUrl: jobData.jobUrl,
          source: jobData.source
        },
      });

      // 2. AI se Cover Letter generate karna
      let coverLetter = await getCoverLetterFromPython(userSkills, jobData.description, userName);
      
      // Safety check: Agar AI object return kare toh usko string mein convert kar do
      if (typeof coverLetter === 'object' && coverLetter !== null) {
        coverLetter = JSON.stringify(coverLetter);
      }

      // 3. Application table mein entry karna "APPLIED" status aur Cover Letter ke sath
      await prisma.application.upsert({
        where: { userId_jobId: { userId, jobId: job.id } },
        update: { status: "APPLIED", coverLetter: coverLetter }, 
        create: {
          userId,
          jobId: job.id,
          status: "APPLIED",
          coverLetter: coverLetter
        }
      });
    }

    res.status(200).json({ message: `Successfully auto-applied to ${jobs.length} jobs with AI Cover Letters!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during automated application' });
  }
};

// 2. User ke applications laana (Tracker ke liye)
export const getMyApplications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const applications = await prisma.application.findMany({
      where: { userId },
      include: { job: true }
    });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
};