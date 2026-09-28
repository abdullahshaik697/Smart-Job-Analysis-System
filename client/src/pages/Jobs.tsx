import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Card, Chip } from '@heroui/react';
import { FaArrowLeft, FaSearch, FaBuilding, FaMapMarkerAlt, FaExternalLinkAlt, FaCheckCircle, FaRocket, FaGraduationCap } from 'react-icons/fa';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string | null;
  jobUrl: string;
  source: string;
  description: string;
  score: number;
  reasoning: string;
}

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [resources, setResources] = useState<Record<string, any[]>>({});
  const [loadingResources, setLoadingResources] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState<string[]>(["RemoteOK", "WeWorkRemotely", "Remotive"]);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [generatingCover, setGeneratingCover] = useState(false);

  const handleFetchJobs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/jobs', {
        platforms: platforms
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const jobsWithIds = response.data.map((job: any, index: number) => ({
        ...job,
        id: `job-${index}`,
        score: job.score || 0,
        reasoning: job.reasoning || ""
      }));

      jobsWithIds.sort((a: any, b: any) => b.score - a.score);
      setJobs(jobsWithIds);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error fetching jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedJobs(jobs.map(job => job.id));
    } else {
      setSelectedJobs([]);
    }
  };

  const handleSelectOne = (e: React.ChangeEvent<HTMLInputElement>, jobId: string) => {
    if (e.target.checked) {
      setSelectedJobs([...selectedJobs, jobId]);
    } else {
      setSelectedJobs(selectedJobs.filter(id => id !== jobId));
    }
  };

  const handleApplySelected = async () => {
    if (selectedJobs.length === 0) {
      alert("Please select at least one job to apply.");
      return;
    }

    const jobsToApply = jobs.filter(job => selectedJobs.includes(job.id));

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/applications/apply', {
        jobs: jobsToApply
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(`Successfully applied to ${jobsToApply.length} jobs! Check your tracker.`);
      setSelectedJobs([]);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to apply');
    }
  };

  const handleGetResources = async (jobId: string, jobDescription: string) => {
    setLoadingResources(jobId);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/jobs/resources',
        { jobDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResources((prev) => ({ ...prev, [jobId]: response.data }));
    } catch (error) {
      alert('Failed to fetch resources');
    } finally {
      setLoadingResources(null);
    }
  };

  // Updated to use Bitcoin DeFi colors (Gold for high, Orange for medium, Red for low)
  const getScoreColor = (score: number) => {
    if (score >= 70) return { text: 'text-[#FFD600]', border: 'border-[#FFD600]/50', glow: 'shadow-[0_0_15px_-5px_rgba(255,214,0,0.3)]' };
    if (score >= 40) return { text: 'text-[#F7931A]', border: 'border-[#F7931A]/50', glow: 'shadow-[0_0_15px_-5px_rgba(247,147,26,0.3)]' };
    return { text: 'text-red-500', border: 'border-red-500/50', glow: 'shadow-[0_0_15px_-5px_rgba(239,68,68,0.3)]' };
  };

  return (
    <div className="font-['Inter']">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-['Space_Grotesk'] text-white">
            Find Latest <span className="bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent">Jobs</span>
          </h2>
          <p className="text-[#94A3B8] mt-2 text-sm font-['JetBrains_Mono'] tracking-widest uppercase">
            Click Below To Let AI Find And Score Jobs
          </p>
        </div>
        <Button
          onClick={handleFetchJobs}
          disabled={loading} 
          size="lg"
          className="font-bold uppercase tracking-widest text-sm font-['Inter'] rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)] hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(247,147,26,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
        >
          {!loading && <FaSearch />}
          {loading ? 'Analyzing...' : 'Search Jobs'}
        </Button>
      </div>

      {/* Platform Checkboxes Section (Glass Morphism) */}
      <div className="flex flex-wrap gap-4 mb-10 p-4 border border-white/10 rounded-2xl bg-[#0F1115]/80 backdrop-blur-lg shadow-[0_0_30px_-10px_rgba(247,147,26,0.1)]">
        <span className="font-medium text-[#94A3B8] mr-2 font-['JetBrains_Mono'] text-xs tracking-widest uppercase self-center">Select Networks:</span>
        {["RemoteOK", "WeWorkRemotely", "Remotive"].map((p) => (
          <label key={p} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={platforms.includes(p)}
              onChange={(e) => {
                if (e.target.checked) {
                  setPlatforms((prev) => [...prev, p]);
                } else {
                  setPlatforms((prev) => prev.filter((plat: string) => plat !== p));
                }
              }}
              className="w-4 h-4 accent-[#F7931A] bg-black/50 border border-white/20 rounded"
            />
            <span className="text-sm text-[#94A3B8] group-hover:text-white transition-colors font-['JetBrains_Mono']">{p}</span>
          </label>
        ))}
      </div>

      {/* Select All Bar (Glass Morphism) */}
      {jobs.length > 0 && (
        <Card className="p-4 mb-6 flex flex-row items-center justify-between bg-[#0F1115]/80 backdrop-blur-lg border border-white/10 rounded-2xl shadow-[0_0_30px_-10px_rgba(247,147,26,0.1)]">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectedJobs.length === jobs.length && jobs.length > 0}
              className="w-5 h-5 accent-[#F7931A] bg-black/50 border border-white/20 rounded"
            />
            <span className="font-medium text-white text-sm font-['JetBrains_Mono'] tracking-wider uppercase">Select All Blocks</span>
          </label>
          <Button
            onClick={handleApplySelected}
            disabled={selectedJobs.length === 0} 
            className="font-bold uppercase tracking-widest text-xs font-['Inter'] rounded-full bg-transparent border-2 border-[#FFD600]/50 text-[#FFD600] hover:bg-[#FFD600]/10 hover:border-[#FFD600] transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
          >
            <FaCheckCircle /> Apply Selected ({selectedJobs.length})
          </Button>
        </Card>
      )}

      {/* Jobs List */}
      <div className="flex flex-col gap-6">
        {jobs.map((job, index) => {
          const colors = getScoreColor(job.score);
          return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="relative p-6 border border-white/10 rounded-2xl bg-[#0F1115] hover:border-[#F7931A]/50 hover:shadow-[0_0_30px_-10px_rgba(247,147,26,0.2)] transition-all duration-300 group flex flex-row gap-6 items-stretch overflow-hidden">
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#F7931A] rounded-tl-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#F7931A] rounded-br-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>

                {/* Left Side: Job Details */}
                <div className="flex-1 flex flex-col gap-2 relative z-10">
                  <div className="flex items-center gap-3 mb-1">
                    <input
                      type="checkbox"
                      checked={selectedJobs.includes(job.id)}
                      onChange={(e) => handleSelectOne(e, job.id)}
                      className="w-5 h-5 accent-[#F7931A] bg-black/50 border border-white/20 rounded"
                    />
                    <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">{job.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-4 text-[#94A3B8] text-sm ml-8 mb-2 font-['JetBrains_Mono']">
                    <span className="flex items-center gap-1.5"><FaBuilding className="text-[#F7931A]" /> {job.company}</span>
                    <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-[#F7931A]" /> {job.location || 'Remote'}</span>
                    
                    {/* Platform Source Chip */}
                    <Chip 
                      size="sm" 
                      variant="flat" 
                      className="bg-black/50 border border-white/10 text-[#F7931A] rounded-md text-xs font-medium font-['JetBrains_Mono'] tracking-wider px-3 py-1"
                    >
                      {job.source}
                    </Chip>
                  </div>
                  
                  <p className="text-[#94A3B8] text-sm mt-2 ml-8 leading-relaxed line-clamp-2 font-['Inter']">{job.description}</p>
                  <a href={job.jobUrl} target="_blank" rel="noopener noreferrer" className="text-[#F7931A] text-sm flex items-center gap-1.5 mt-3 ml-8 hover:underline font-medium font-['JetBrains_Mono'] tracking-wider uppercase">
                    <FaExternalLinkAlt /> View Original Post
                  </a>
                </div>

                {/* Right Side: Match Score & Resources */}
                <div className="w-1/3 border-l border-white/10 pl-6 flex flex-col items-center text-center justify-start pt-2 relative z-10">
                  
                  {/* Glowing Score Node */}
                  <div className={`w-20 h-20 rounded-full ${colors.border} border-2 bg-black/50 flex items-center justify-center mb-2 ${colors.glow}`}>
                    <span className={`text-2xl font-extrabold ${colors.text} font-['Space_Grotesk']`}>{job.score}%</span>
                  </div>
                  
                  <p className="text-xs text-[#94A3B8] mb-3 leading-snug font-['Inter']">{job.reasoning}</p>

                  <Button
                    size="sm"
                    disabled={loadingResources === job.id} 
                    onClick={() => handleGetResources(job.id, job.description)}
                    className="font-bold uppercase tracking-widest text-xs font-['Inter'] rounded-full bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                  >
                    {!loadingResources && <FaGraduationCap />}
                    {loadingResources === job.id ? 'Finding...' : 'Improve Skills'}
                  </Button>

                  {resources[job.id] && (
                    <div className="mt-4 w-full text-left border-t border-white/10 pt-4">
                      {resources[job.id].length === 0 ? (
                        <p className="text-xs text-[#FFD600] font-medium text-center font-['JetBrains_Mono'] tracking-wider uppercase">Perfect Match</p>
                      ) : (
                        resources[job.id].map((res: any, idx: number) => (
                          <div key={idx} className="mb-3 last:mb-0">
                            <Chip size="sm" variant="flat" className="bg-black/50 border border-[#FFD600]/30 text-[#FFD600] rounded-md text-xs font-medium font-['JetBrains_Mono'] mb-1">{res.skill_name}</Chip> 
                            <p className="text-[11px] text-[#94A3B8] mb-1 font-['Inter']">{res.reason}</p>
                            <a href={res.resource_url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#F7931A] font-medium hover:underline flex items-center gap-1 font-['JetBrains_Mono']">
                              <FaRocket /> Learn Here
                            </a>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Jobs;