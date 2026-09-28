import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Card, Chip } from '@heroui/react';
import { FaBuilding, FaMapMarkerAlt, FaExternalLinkAlt, FaCalendarAlt, FaTasks, FaSearch, FaFilePdf } from 'react-icons/fa';

interface Application {
  id: string;
  status: string;
  appliedAt: string;
  coverLetter: string | null;
  job: {
    title: string;
    company: string;
    location: string | null;
    jobUrl: string;
  }
}

function Tracker() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewCoverLetter, setViewCoverLetter] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/applications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Status styles using Bitcoin DeFi colors
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'APPLIED': return 'text-[#FFD600] border-[#FFD600]/50 bg-[#FFD600]/10';
      case 'INTERVIEW': return 'text-green-400 border-green-500/50 bg-green-500/10';
      case 'REJECTED': return 'text-red-400 border-red-500/50 bg-red-500/10';
      case 'OFFER': return 'text-[#F7931A] border-[#F7931A]/50 bg-[#F7931A]/10';
      default: return 'text-[#94A3B8] border-white/10 bg-black/50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-[#F7931A] font-['JetBrains_Mono'] tracking-widest uppercase text-sm animate-pulse">
          Fetching Blockchain Data...
        </div>
      </div>
    );
  }

  return (
    <div className="font-['Inter']">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h2 className="text-3xl font-bold tracking-tight font-['Space_Grotesk'] text-white">
          Application <span className="bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent">Tracker</span>
        </h2>
        <p className="text-[#94A3B8] mt-2 text-sm font-['JetBrains_Mono'] tracking-widest uppercase">
          Track Your Job Applications And Status
        </p>
      </motion.div>

      {applications.length === 0 ? (
        /* Empty State (Glass Morphism Block) */
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="relative p-10 border border-white/10 rounded-2xl bg-[#0F1115]/80 backdrop-blur-lg shadow-[0_0_30px_-10px_rgba(247,147,26,0.1)] flex flex-col items-center justify-center text-center group overflow-hidden">
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#F7931A] rounded-tl-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#F7931A] rounded-br-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>

            <div className="w-16 h-16 rounded-xl bg-[#EA580C]/20 border border-[#EA580C]/50 flex items-center justify-center mb-6 text-[#F7931A] shadow-[0_0_15px_-5px_rgba(234,88,12,0.3)]">
              <FaTasks className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-2 font-['Space_Grotesk'] text-white">No Applications Yet</h3>
            <p className="text-[#94A3B8] mb-6 max-w-sm text-sm">You haven't applied to any jobs yet. Let our AI find the perfect matches for you.</p>
            <Link to="/jobs">
              <Button size="lg" className="font-bold uppercase tracking-widest text-sm font-['Inter'] rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)] hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(247,147,26,0.6)] transition-all duration-300 flex items-center gap-2">
                <FaSearch /> Find Jobs Now
              </Button>
            </Link>
          </Card>
        </motion.div>
      ) : (
        /* Applications List */
        <div className="flex flex-col gap-6">
          {applications.map((app, index) => (
            <motion.div 
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="relative p-6 border border-white/10 rounded-2xl bg-[#0F1115] hover:border-[#F7931A]/50 hover:shadow-[0_0_30px_-10px_rgba(247,147,26,0.2)] transition-all duration-300 group overflow-hidden">
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#F7931A] rounded-tl-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#F7931A] rounded-br-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                  
                  {/* Left Side: Job Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white">{app.job.title}</h3>
                      <Chip 
                        variant="flat" 
                        size="sm"
                        className={`font-['JetBrains_Mono'] tracking-widest uppercase text-xs px-3 py-1 rounded-md ${getStatusStyles(app.status)}`}
                      >
                        {app.status.toLowerCase()}
                      </Chip>
                    </div>
                    <div className="flex flex-wrap gap-4 text-[#94A3B8] text-sm mb-4 font-['JetBrains_Mono']">
                      <span className="flex items-center gap-1.5"><FaBuilding className="text-[#F7931A]" /> {app.job.company}</span>
                      <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-[#F7931A]" /> {app.job.location || 'Remote'}</span>
                      <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-[#F7931A]" /> {new Date(app.appliedAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <a href={app.job.jobUrl} target="_blank" rel="noopener noreferrer" className="text-[#F7931A] text-xs flex items-center gap-1.5 hover:underline font-medium font-['JetBrains_Mono'] tracking-wider uppercase">
                        <FaExternalLinkAlt /> View Post
                      </a>
                      {app.coverLetter && (
                        <Button 
                          size="sm" 
                          className="font-bold uppercase tracking-widest text-xs font-['Inter'] rounded-full bg-transparent border-2 border-[#FFD600]/50 text-[#FFD600] hover:bg-[#FFD600]/10 hover:border-[#FFD600] transition-all duration-300 flex items-center gap-2"
                          onClick={() => setViewCoverLetter(app.coverLetter)}
                        >
                          <FaFilePdf /> View Cover Letter
                        </Button>
                      )}
                    </div>
                  </div>

                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Cover Letter Viewer Modal (Glass Morphism) */}
      {viewCoverLetter && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="relative bg-[#0F1115]/90 backdrop-blur-lg border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-[0_0_50px_-10px_rgba(247,147,26,0.2)]">
            
            {/* Corner Accents for Modal */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#F7931A] rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#F7931A] rounded-br-2xl"></div>

            <h3 className="text-2xl font-bold mb-6 font-['Space_Grotesk'] text-white">
              AI Generated <span className="bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent">Cover Letter</span>
            </h3>
            
            <p className="text-[#94A3B8] whitespace-pre-wrap text-sm leading-relaxed font-['Inter'] mb-8">{viewCoverLetter}</p>
            
            <div className="flex justify-end gap-4">
              <Button 
                variant="ghost" 
                onClick={() => setViewCoverLetter(null)} 
                className="font-bold uppercase tracking-widest text-xs font-['Inter'] rounded-full bg-transparent border-2 border-white/20 text-white hover:bg-white/10 transition-all"
              >
                Close
              </Button>
              <Button 
                size="lg"
                className="font-bold uppercase tracking-widest text-xs font-['Inter'] rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)] hover:scale-105 transition-all duration-300"
                onClick={() => {
                  navigator.clipboard.writeText(viewCoverLetter);
                  alert('Copied to clipboard!');
                }}
              >
                Copy to Clipboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tracker;