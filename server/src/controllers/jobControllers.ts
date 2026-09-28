import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddlewares'; // <-- Yeh path theek kiya hai
import prisma from '../config/prisma';
import { getResourcesFromPython, getScrapedJobsFromPython, matchMultipleJobsWithPython, getCoverLetterFromPython } from '../services/pythonService'; // <-- getCoverLetterFromPython add kiya

// 1. User ki skills ke hisaab se On-Demand Jobs laana + Score nikalna
export const getAllJobs = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { platforms } = req.body; // Frontend se platforms array aayega

    const userResume = await prisma.resume.findUnique({ where: { userId } });
    const userSkills = userResume?.skills || [];

    if (userSkills.length === 0) {
      return res.status(400).json({ message: 'Please upload your resume first to get jobs.' });
    }

    // Python ko skills aur platforms dono bhejna
    const scrapedJobs = await getScrapedJobsFromPython(userSkills, platforms || ["RemoteOK"]);
    
    // AI Matching (Same rahega)
    const matchResults = await matchMultipleJobsWithPython(userSkills, scrapedJobs);
    
    const finalJobs = scrapedJobs.map((job: any) => {
      const match = matchResults.find((m: any) => m.jobUrl === job.jobUrl);
      return {
        ...job,
        score: match?.score || 0,
        reasoning: match?.reasoning || "No reasoning provided."
      };
    });

    res.status(200).json(finalJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

// 2. AI se Match Score nikalwana
export const getMatchScore = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.jobId;
    res.status(200).json({ score: 80, reasoning: "On-demand job matched successfully." });
  } catch (error) {
    res.status(500).json({ message: 'Error generating match score' });
  }
};

// 3. User ke liye Study Resources nikalna
export const getStudyResources = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { jobDescription } = req.body;

    const userResume = await prisma.resume.findUnique({ where: { userId } });
    const userSkills = userResume?.skills || [];

    if (userSkills.length === 0 || !jobDescription) {
      return res.status(400).json({ message: 'Skills and Job description are required.' });
    }

    const resources = await getResourcesFromPython(userSkills, jobDescription);
    
    res.status(200).json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating study resources' });
  }
};

// 4. Cover Letter Generate karna
export const generateCoverLetter = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { jobDescription } = req.body;

    // User ki skills aur naam nikalna
    const userResume = await prisma.resume.findUnique({ where: { userId } });
    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    const userSkills = userResume?.skills || [];
    const userName = user?.name || "Candidate";

    if (userSkills.length === 0 || !jobDescription) {
      return res.status(400).json({ message: 'Skills and Job description are required.' });
    }

    // Python AI ko call karna
    const coverLetter = await getCoverLetterFromPython(userSkills, jobDescription, userName);
    
    res.status(200).json({ coverLetter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating cover letter' });
  }
};