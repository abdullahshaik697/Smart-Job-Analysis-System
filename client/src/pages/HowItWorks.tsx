import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@heroui/react';
import { FaUpload, FaBrain, FaSearch, FaUserShield, FaFileAlt, FaBolt, FaEye, FaHandPaper } from 'react-icons/fa';

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUpload className="text-2xl text-blue-600" />,
      title: "Upload Your Resume",
      desc: "Create your profile and securely upload your PDF resume. It takes less than a minute to get started."
    },
    {
      icon: <FaBrain className="text-2xl text-purple-600" />,
      title: "AI Parses Your Skills",
      desc: "Our Groq-powered AI instantly reads your resume, extracting key skills, experience, and qualifications."
    },
    {
      icon: <FaSearch className="text-2xl text-green-600" />,
      title: "Smart Job Matching",
      desc: "We scrape multiple platforms (RemoteOK, WeWorkRemotely, etc.) to find jobs and score them against your profile."
    },
    {
      icon: <FaUserShield className="text-2xl text-orange-600" />,
      title: "You Stay in Control",
      desc: "AI recommends, but you decide. Review match scores and reasoning, then select exactly where you want to apply."
    },
    {
      icon: <FaFileAlt className="text-2xl text-red-600" />,
      title: "AI Cover Letters",
      desc: "With one click, generate a perfectly tailored cover letter for your selected job and track your application."
    }
  ];

  const benefits = [
    {
      icon: <FaBolt className="text-3xl text-blue-600" />,
      title: "Lightning Fast",
      desc: "Powered by Groq LPU, resume parsing and job matching happen in milliseconds, not minutes."
    },
    {
      icon: <FaEye className="text-3xl text-purple-600" />,
      title: "Transparent AI",
      desc: "No black boxes. Always know exactly why a job is a good match with our clear reasoning scores."
    },
    {
      icon: <FaHandPaper className="text-3xl text-green-600" />,
      title: "No Spam Applying",
      desc: "Quality over quantity. We help you apply only to the roles where you actually have a chance."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Hero Section */}
      <header className="relative flex flex-col items-center text-center pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-blue-100/50 to-transparent dark:from-blue-900/20 rounded-full blur-3xl -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter max-w-3xl mx-auto leading-tight">
            How <span className="text-blue-600">SmartJob AI</span> Works
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            From resume upload to landing interviews, powered by AI, but controlled by you.
          </p>
        </motion.div>
      </header>

      {/* Step-by-Step Process Section */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical Connecting Line (Desktop) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-16"
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row items-center gap-6 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content Card */}
                <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{step.desc}</p>
                </div>

                {/* Number Badge (Center) */}
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex w-12 h-12 bg-blue-600 text-white font-bold rounded-full items-center justify-center z-10 border-4 border-gray-50 dark:border-gray-900">
                  {index + 1}
                </div>
                
                {/* Spacer for the other half */}
                <div className="hidden md:block w-1/2"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why It's Different Section */}
      <section className="py-20 px-6 md:px-16 bg-white dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why It's Different</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">Built for smart job seekers who value time and quality.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all bg-white dark:bg-gray-800"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-gray-700 flex items-center justify-center mb-5">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Ready to find your dream job?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg max-w-xl mx-auto">Join SmartJob AI today and let AI accelerate your job search.</p>
          <Link to="/signup">
            <Button size="lg" className="font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 px-10 py-6 text-base">
              Get Started for Free
            </Button>
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default HowItWorks;