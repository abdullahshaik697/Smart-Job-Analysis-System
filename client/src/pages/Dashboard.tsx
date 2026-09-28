import { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Card, Chip } from '@heroui/react';
import { FaUpload, FaBriefcase, FaTasks, FaChartLine, FaFilePdf, FaBrain } from 'react-icons/fa';

const Dashboard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage('');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    setUploading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      
      if (response.data.resume.skills) {
        setSkills(response.data.resume.skills);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const navCards = [
    { icon: <FaBriefcase className="text-2xl" />, title: "Find Jobs", desc: "Search & Match", path: "/jobs" },
    { icon: <FaTasks className="text-2xl" />, title: "Tracker", desc: "Application Status", path: "/tracker" },
    { icon: <FaChartLine className="text-2xl" />, title: "Analytics", desc: "Your Stats", path: "/analytics" },
  ];

  return (
    <div className="font-['Inter']">
      
      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {navCards.map((item, index) => (
          <motion.div key={index} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link to={item.path}>
              <Card className="relative p-6 border border-white/10 rounded-2xl bg-[#0F1115] hover:border-[#F7931A]/50 hover:shadow-[0_0_30px_-10px_rgba(247,147,26,0.2)] transition-all duration-300 group cursor-pointer h-full flex flex-row items-center gap-4 overflow-hidden">
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#F7931A] rounded-tl-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#F7931A] rounded-br-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>

                {/* Icon Node */}
                <div className="w-12 h-12 rounded-lg bg-[#EA580C]/20 border border-[#EA580C]/50 flex items-center justify-center text-[#F7931A] shadow-[0_0_15px_-5px_rgba(234,88,12,0.3)]">
                  {item.icon}
                </div>
                
                {/* Text */}
                <div>
                  <h3 className="font-bold text-lg font-['Space_Grotesk'] text-white">{item.title}</h3>
                  <p className="text-xs text-[#94A3B8] font-['JetBrains_Mono'] tracking-widest uppercase mt-1">{item.desc}</p>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Upload Resume Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="relative p-8 border border-white/10 rounded-2xl bg-[#0F1115] hover:border-[#F7931A]/50 transition-all duration-300 h-full overflow-hidden">
            
            <Card.Header>
              <Card.Title className="text-2xl font-bold tracking-tight font-['Space_Grotesk'] text-white">
                Upload <span className="bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent">Resume</span>
              </Card.Title>
              <Card.Description className="text-[#94A3B8] mt-2 text-sm font-['Inter']">
                Upload your PDF resume to let AI extract your skills instantly.
              </Card.Description>
            </Card.Header>

            <Card.Content className="pt-6">
              <form onSubmit={handleUpload} className="flex flex-col gap-6">
                
                {/* Dashed Drop Zone */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-[#F7931A] hover:bg-black/50 transition-all duration-200"
                >
                  <input 
                    type="file" 
                    accept="application/pdf" 
                    onChange={handleFileChange} 
                    ref={fileInputRef}
                    className="hidden" 
                  />
                  {file ? (
                    <div className="flex flex-col items-center gap-2 text-[#FFD600]">
                      <FaFilePdf className="text-4xl" />
                      <span className="font-medium text-sm font-['JetBrains_Mono']">{file.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-[#94A3B8]">
                      <FaUpload className="text-3xl" />
                      <span className="font-medium text-sm font-['JetBrains_Mono'] tracking-wider uppercase">Click to Select PDF</span>
                    </div>
                  )}
                </div>

                {message && <p className="text-sm text-[#F7931A] font-medium text-center font-['JetBrains_Mono'] tracking-wider">{message}</p>}
                
                {/* Crypto Pill Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  isDisabled={uploading}
                  className="mt-4 font-bold uppercase tracking-widest text-sm font-['Inter'] rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)] hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(247,147,26,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {uploading ? 'Parsing Data...' : 'Analyze Resume'}
                </Button>
              </form>
            </Card.Content>
          </Card>
        </motion.div>

        {/* Extracted Skills Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="relative p-8 border border-white/10 rounded-2xl bg-[#0F1115] hover:border-[#F7931A]/50 transition-all duration-300 h-full overflow-hidden">
            
            {/* Background Watermark Icon */}
            <div className="absolute -bottom-4 -right-4 text-7xl text-white/5">
              <FaBrain />
            </div>

            <Card.Header className="relative z-10">
              <Card.Title className="text-2xl font-bold tracking-tight font-['Space_Grotesk'] text-white">
                Extracted <span className="bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent">Skills</span>
              </Card.Title>
              <Card.Description className="text-[#94A3B8] mt-2 text-sm font-['Inter']">
                These skills will be used to find the perfect job matches for you.
              </Card.Description>
            </Card.Header>
            
            <Card.Content className="pt-6 relative z-10">
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Chip 
                      key={index} 
                      className="bg-black/50 border border-white/10 text-[#94A3B8] rounded-md text-xs font-medium font-['JetBrains_Mono'] tracking-wider px-3 py-1"
                    >
                      {skill}
                    </Chip>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-[#94A3B8] py-10 border border-dashed border-white/10 rounded-xl">
                  <FaChartLine className="text-3xl text-[#F7931A] mb-3" />
                  <p className="text-sm font-['Inter']">Your extracted skills will appear here.</p>
                </div>
              )}
            </Card.Content>
          </Card>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;