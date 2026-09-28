import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Card, Chip } from '@heroui/react';
import { FaBriefcase, FaBrain, FaCheckCircle, FaChartLine } from 'react-icons/fa';

interface AnalyticsData {
  totalApplications: number;
  appliedCount: number;
  totalSkills: number;
  skills: string[];
}

const Analytics = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/analytics', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching analytics', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-[#F7931A] font-['JetBrains_Mono'] tracking-widest uppercase text-sm animate-pulse">
          Initializing Data...
        </div>
      </div>
    );
  }

  const stats = [
    { 
      title: "Total Applications", 
      value: data?.totalApplications || 0, 
      icon: <FaBriefcase className="text-2xl" />,
      desc: "Jobs Applied To"
    },
    { 
      title: "Skills Extracted", 
      value: data?.totalSkills || 0, 
      icon: <FaBrain className="text-2xl" />,
      desc: "AI Identified Skills"
    },
    { 
      title: "Active Applications", 
      value: data?.appliedCount || 0, 
      icon: <FaCheckCircle className="text-2xl" />,
      desc: "Currently In Review"
    },
  ];

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
          <span className="bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent">Analytics</span> Dashboard
        </h2>
        <p className="text-[#94A3B8] mt-2 text-sm font-['JetBrains_Mono'] tracking-wider uppercase">
          Track Your Job Search Progress
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="relative p-6 border border-white/10 rounded-2xl bg-[#0F1115] hover:border-[#F7931A]/50 hover:shadow-[0_0_30px_-10px_rgba(247,147,26,0.2)] transition-all duration-300 group overflow-hidden h-full flex flex-col gap-4">
              
              {/* Corner Border Accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#F7931A] rounded-tl-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#F7931A] rounded-br-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>

              {/* Icon Node */}
              <div className="w-12 h-12 rounded-lg bg-[#EA580C]/20 border border-[#EA580C]/50 flex items-center justify-center text-[#F7931A] shadow-[0_0_15px_-5px_rgba(234,88,12,0.3)]">
                {stat.icon}
              </div>

              {/* Data */}
              <div>
                <h3 className="text-4xl font-extrabold tracking-tight font-['Space_Grotesk'] bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent">
                  {stat.value}
                </h3>
                <p className="text-white font-semibold mt-2 text-sm font-['Space_Grotesk']">{stat.title}</p>
                <p className="text-[#94A3B8] text-xs mt-1 font-['JetBrains_Mono'] tracking-widest uppercase">{stat.desc}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Skills Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="relative p-8 border border-white/10 rounded-2xl bg-[#0F1115] hover:border-[#F7931A]/50 transition-all duration-300 overflow-hidden">
          
          {/* Background Icon Watermark */}
          <div className="absolute -bottom-4 -right-4 text-7xl text-white/5">
            <FaBrain />
          </div>

          <Card.Header className="relative z-10">
            <Card.Title className="text-2xl font-bold tracking-tight font-['Space_Grotesk'] text-white">Extracted Skills</Card.Title>
            <Card.Description className="text-[#94A3B8] mt-2 text-sm font-['Inter']">
              Core competencies identified by the AI parser.
            </Card.Description>
          </Card.Header>
          
          <Card.Content className="pt-6 relative z-10">
            {data?.skills && data.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <Chip 
                    key={index} 
                    className="bg-black/50 border border-white/10 text-[#94A3B8] rounded-md text-xs font-medium font-['JetBrains_Mono'] tracking-wider px-3 py-1"
                  >
                    {skill}
                  </Chip>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-10 border border-dashed border-white/10 rounded-xl">
                <FaChartLine className="text-3xl text-[#F7931A] mb-3" />
                <p className="text-sm text-[#94A3B8] font-['Inter']">No skills found. Please upload your resume.</p>
              </div>
            )}
          </Card.Content>
        </Card>
      </motion.div>
    </div>
  );
};

export default Analytics;