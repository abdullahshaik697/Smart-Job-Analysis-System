import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap } from 'react-icons/fa';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
};

const ProfilePage = () => {
  const profileData = [
    { icon: <FaUser />, label: "Full Name", value: "Abdullah Shaikh" },
    { icon: <FaEnvelope />, label: "Email Address", value: "abdullah@test.com" },
    { icon: <FaPhone />, label: "Phone Number", value: "0312-6600460" },
    { icon: <FaGraduationCap />, label: "Education", value: "BS Software Engineering" },
  ];

  return (
    <div className="font-['Inter'] max-w-4xl">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold tracking-tight font-['Space_Grotesk'] text-white">
          Personal <span className="bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent">Information</span>
        </h1>
        <p className="text-[#94A3B8] mt-2 text-sm font-['JetBrains_Mono'] tracking-widest uppercase">
          Your Core Identity Data
        </p>
      </motion.div>

      {/* Profile Data Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {profileData.map((item, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className="relative p-6 border border-white/10 rounded-2xl bg-[#0F1115] hover:border-[#F7931A]/50 hover:shadow-[0_0_30px_-10px_rgba(247,147,26,0.2)] transition-all duration-300 group overflow-hidden"
          >
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#F7931A] rounded-tl-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#F7931A] rounded-br-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>

            <div className="relative z-10">
              
              {/* Icon Node and Label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#EA580C]/20 border border-[#EA580C]/50 flex items-center justify-center text-[#F7931A] shadow-[0_0_15px_-5px_rgba(234,88,12,0.3)] text-sm">
                  {item.icon}
                </div>
                <label className="text-xs text-[#94A3B8] font-['JetBrains_Mono'] tracking-widest uppercase">
                  {item.label}
                </label>
              </div>

              {/* Data Value */}
              <div className="text-white text-lg font-['Space_Grotesk'] break-words">
                {item.value}
              </div>
            </div>
            
          </motion.div>
        ))}
      </motion.div>
      
    </div>
  );
};

export default ProfilePage;