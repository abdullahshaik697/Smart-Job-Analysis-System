import axios from 'axios';
import path from 'path';

// 1. Resume Parse karwana
export const parseResumeWithPython = async (filePath: string) => {
  try {
    const absolutePath = path.resolve(filePath);
    const response = await axios.post('http://localhost:8000/py/parse-resume', {
      pdf_path: absolutePath
    });
    return response.data.data; 
  } catch (error) {
    console.error('Error calling Python service:', error);
    return null;
  }
};

// 2. Single Job Match karwana
export const matchJobWithPython = async (skills: string[], jobDescription: string) => {
  try {
    const response = await axios.post('http://localhost:8000/py/match-job', {
      skills,
      job_description: jobDescription
    });
    return response.data.data; 
  } catch (error) {
    console.error('Error calling Python matcher:', error);
    return null;
  }
};

// 3. Multiple Jobs Match karwana
export const matchMultipleJobsWithPython = async (skills: string[], jobs: any[]) => {
  try {
    const response = await axios.post('http://localhost:8000/py/match-multiple-jobs', {
      skills,
      jobs
    });
    return response.data.results; 
  } catch (error) {
    console.error('Error calling Python batch matcher:', error);
    return [];
  }
};

// 4. Jobs Scrape karwana
export const getScrapedJobsFromPython = async (skills: string[], platforms: string[]) => {
  try {
    const response = await axios.post('http://localhost:8000/py/scrape-jobs', {
      skills: skills,
      platforms: platforms
    });
    return response.data.jobs;
  } catch (error) {
    console.error('Error calling Python scraper:', error);
    return [];
  }
};

// 5. Study Resources lana
export const getResourcesFromPython = async (skills: string[], jobDescription: string) => {
  try {
    const response = await axios.post('http://localhost:8000/py/suggest-resources', {
      skills,
      job_description: jobDescription
    });
    return response.data.resources; 
  } catch (error) {
    console.error('Error calling Python resource finder:', error);
    return [];
  }
};

// 6. Cover Letter Generate karwana (Naya Function)
export const getCoverLetterFromPython = async (skills: string[], jobDescription: string, userName: string) => {
  try {
    const response = await axios.post('http://localhost:8000/py/generate-cover-letter', {
      skills,
      job_description: jobDescription,
      user_name: userName
    });
    return response.data.cover_letter; 
  } catch (error) {
    console.error('Error calling Python cover letter generator:', error);
    return "";
  }
};