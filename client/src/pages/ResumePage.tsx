import { motion } from 'framer-motion';
import { Card } from '@heroui/react';
import { FaFilePdf } from 'react-icons/fa';

const ResumePage = () => {
  return (
    <div className="font-['Inter']">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold tracking-tight font-['Space_Grotesk'] text-white">
          <span className="bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent">Resume</span> Vault
        </h1>
        <p className="text-[#94A3B8] mt-2 text-sm font-['JetBrains_Mono'] tracking-widest uppercase">
          You Have 1 Resume Saved
        </p>
      </motion.div>

      {/* Resume Block Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="relative p-6 border border-white/10 rounded-2xl bg-[#0F1115] hover:border-[#F7931A]/50 hover:shadow-[0_0_30px_-10px_rgba(247,147,26,0.2)] transition-all duration-300 group overflow-hidden">
          
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#F7931A] rounded-tl-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#F7931A] rounded-br-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>

          <div className="flex justify-between items-center relative z-10">
            
            {/* Left Side: File Info */}
            <div className="flex items-center gap-4">
              
              {/* Glowing Icon Node */}
              <div className="w-12 h-12 rounded-lg bg-[#EA580C]/20 border border-[#EA580C]/50 flex items-center justify-center text-[#F7931A] shadow-[0_0_15px_-5px_rgba(234,88,12,0.3)]">
                <FaFilePdf className="text-xl" />
              </div>
              
              <div>
                <h3 className="font-bold text-lg font-['Space_Grotesk'] text-white">Abdullah Shaikh My CV.pdf</h3>
                <p className="text-xs text-[#94A3B8] font-['JetBrains_Mono'] tracking-widest uppercase mt-1 flex items-center gap-2">
                  Analysis Complete 
                  <span className="w-1 h-1 bg-[#FFD600] rounded-full shadow-[0_0_5px_rgba(255,214,0,0.5)]"></span>
                  Primary
                </p>
              </div>
            </div>

            {/* Right Side: Manage Button */}
            <button className="text-[#F7931A] hover:underline font-medium text-xs font-['JetBrains_Mono'] tracking-widest uppercase transition-colors">
              Manage
            </button>
            
          </div>
        </Card>
      </motion.div>

    </div>
  );
};

export default ResumePage;