import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, Card, Chip } from '@heroui/react';
import { 
  FaBrain, FaRocket, FaChartLine, FaArrowRight, FaFileAlt, FaSearch, FaCheck, FaStar, FaQuoteLeft 
} from 'react-icons/fa';

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

// --- Custom Count-Up Hook ---
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const animate = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return { count, ref };
};

const LandingPage = () => {
  const stats = [
    { value: 500, suffix: "+", label: "Resumes Analyzed" },
    { value: 10000, suffix: "+", label: "Jobs Matched" },
    { value: 92, suffix: "%", label: "Match Accuracy" }
  ];

  return (
    <div className="relative min-h-screen bg-[#030304] text-white font-['Inter'] overflow-hidden">
      
      {/* Global Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 [mask-image:radial-gradient(circle_at_center,black_40%,transparent_100%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(30, 41, 59, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(30, 41, 59, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Navbar */}
      <nav className="relative z-50 flex justify-between items-center px-6 md:px-16 py-5 bg-[#030304]/80 backdrop-blur-md border-b border-white/10 sticky top-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#EA580C] to-[#F7931A] rounded-lg flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(247,147,26,0.5)]">S</div>
            <span className="text-xl font-bold tracking-tight font-['Space_Grotesk'] text-white">SmartJob AI</span>
          </div>
          <Link to="/how-it-works" className="hidden md:block text-[#94A3B8] hover:text-[#F7931A] text-sm font-['JetBrains_Mono'] tracking-widest uppercase transition-colors">
            How it Works
          </Link>
        </div>
        <div className="space-x-4 flex items-center">
          <Link to="/login" className="text-[#94A3B8] hover:text-white text-sm font-['JetBrains_Mono'] tracking-widest uppercase transition-colors">Login</Link>
          <Link to="/signup">
            <Button variant="primary" size="sm" className="font-bold uppercase tracking-wider text-xs font-['Inter'] rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)] hover:scale-105 transition-transform">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 px-6 md:px-16 pt-20 pb-24 md:pt-12 md:pb-32">
        {/* Ambient Orange Glow Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F7931A] opacity-10 blur-[150px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#EA580C] opacity-10 blur-[150px] rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Text & CTA */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center md:text-left"
          >
            <motion.div variants={itemVariants}>
              <Chip className="mb-6 py-4 px-4 text-xs font-['JetBrains_Mono'] tracking-widest uppercase bg-[#F7931A]/10 border border-[#F7931A]/30 text-[#F7931A]">
                🚀 AI-Powered Job Search Platform
              </Chip>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight font-['Space_Grotesk'] text-white"
            >
              Find your dream job <br /> with <span className="bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent">AI Precision</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="mt-6 text-lg text-[#94A3B8] max-w-xl mx-auto md:mx-0 leading-relaxed font-['Inter']"
            >
              Upload your resume and let our AI match you with the perfect jobs, analyze your skills, and guide you to career success instantly.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Link to="/signup">
                <Button size="lg" variant="primary" className="w-full sm:w-auto font-bold uppercase tracking-widest text-sm font-['Inter'] h-14 px-8 rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)] hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(247,147,26,0.6)] transition-all">
                  Start Analyzing Now <FaArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-bold uppercase tracking-widest text-sm font-['Inter'] h-14 px-8 rounded-full border-2 border-white/20 text-white hover:bg-white/10 hover:border-white transition-all">
                  Login to Dashboard
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={itemVariants} className="mt-10 flex items-center gap-4 justify-center md:justify-start">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#030304] bg-[#0F1115] flex items-center justify-center text-[#F7931A] font-bold text-sm shadow-sm">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm font-['Inter']">
                <p className="font-semibold text-white">Trusted by students</p>
                <p className="text-[#94A3B8]">& job seekers globally</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Floating Glass UI Mockups */}
          <div className="relative h-[400px] md:h-[500px] hidden md:block">
            
            {/* Floating Card 1: Match Score (Glass Morphism) */}
            <motion.div 
              className="absolute top-10 right-10 w-64 p-6 bg-[#0F1115]/80 backdrop-blur-lg rounded-2xl shadow-[0_0_30px_-5px_rgba(247,147,26,0.2)] border border-white/10 z-20"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xs text-[#94A3B8] font-['JetBrains_Mono'] tracking-wider">Frontend Engineer</p>
                  <p className="text-sm font-bold text-white font-['Space_Grotesk']">TechCorp Ltd.</p>
                </div>
                <div className="w-12 h-12 bg-[#FFD600]/10 border border-[#FFD600]/30 rounded-full flex flex-col items-center justify-center">
                  <span className="text-lg font-extrabold text-[#FFD600] font-['Space_Grotesk']">92%</span>
                  <span className="text-[8px] text-[#FFD600] font-medium font-['JetBrains_Mono']">MATCH</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-[#EA580C] to-[#F7931A]" initial={{ width: 0 }} whileInView={{ width: "92%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} />
                </div>
                <div className="w-3/4 h-2 bg-black/50 rounded-full"></div>
              </div>
            </motion.div>

            {/* Floating Card 2: AI Resume (Glass Morphism) */}
            <motion.div 
              className="absolute bottom-20 left-0 w-56 p-5 bg-[#0F1115]/80 backdrop-blur-lg rounded-2xl shadow-[0_0_30px_-5px_rgba(247,147,26,0.2)] border border-white/10 z-10"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#EA580C]/20 border border-[#EA580C]/50 rounded-lg flex items-center justify-center text-[#F7931A]">
                  <FaBrain />
                </div>
                <div>
                  <p className="text-sm font-bold text-white font-['Space_Grotesk']">AI Parser</p>
                  <p className="text-xs text-[#FFD600] flex items-center gap-1 font-['JetBrains_Mono']"><FaCheck className="text-[10px]" /> Extracted</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {["React", "Node", "AWS"].map(skill => (
                  <span key={skill} className="px-2 py-1 bg-black/50 text-[#94A3B8] rounded-md text-[10px] font-medium border border-white/10 font-['JetBrains_Mono']">{skill}</span>
                ))}
              </div>
            </motion.div>

            {/* Floating Chat Bubble (Orange Gradient) */}
            <motion.div 
              className="absolute top-1/2 right-0 p-4 bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white rounded-2xl rounded-br-none shadow-[0_0_20px_rgba(247,147,26,0.4)] border border-white/10 z-30 max-w-[180px]"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <FaQuoteLeft className="text-white/50 mb-2" />
              <p className="text-xs font-medium leading-snug font-['Inter']">AI generated a tailored cover letter for you!</p>
            </motion.div>

          </div>
        </div>
      </header>

      {/* Social Proof Strip */}
      <section className="relative z-10 py-12 border-y border-white/10 bg-[#0F1115]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, idx) => <StatCounter key={idx} {...stat} />)}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight font-['Space_Grotesk'] text-white">Why choose SmartJob AI?</h2>
            <p className="text-[#94A3B8] mt-4 text-lg font-['Inter']">We don't just find jobs. We build careers.</p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: <FaBrain />, title: "AI Resume Parser", desc: "Our advanced AI reads your PDF resume, understands your context, and extracts your skills and experience instantly." },
              { icon: <FaRocket />, title: "Smart Matching", desc: "Get a precise 0-100 match score for every job. Our AI tells you exactly why you are a good fit (or where you lack)." },
              { icon: <FaChartLine />, title: "Skill Improvement", desc: "Find out what skills you're missing and get personalized study resources to close the gap and get hired." }
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="relative p-8 border border-white/10 rounded-2xl h-full bg-[#0F1115] hover:border-[#F7931A]/50 hover:shadow-[0_0_30px_-10px_rgba(247,147,26,0.2)] transition-all overflow-hidden group">
                  
                  {/* Corner Border Accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#F7931A] rounded-tl-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#F7931A] rounded-br-xl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>

                  {/* Background Icon Watermark */}
                  <div className="absolute -bottom-4 -right-4 text-7xl text-white/5 group-hover:text-[#F7931A]/10 transition-colors duration-300">
                    {feature.icon}
                  </div>

                  <Card.Header className="relative z-10">
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-[#EA580C]/20 border border-[#EA580C]/50 flex items-center justify-center mb-4 text-[#F7931A] text-3xl shadow-[0_0_15px_-5px_rgba(234,88,12,0.3)]"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <Card.Title className="text-2xl font-bold mb-2 font-['Space_Grotesk'] text-white">{feature.title}</Card.Title>
                    <Card.Description className="text-[#94A3B8] leading-relaxed text-base font-['Inter']">
                      {feature.desc}
                    </Card.Description>
                  </Card.Header>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Preview Strip */}
      <section className="relative z-10 py-20 px-6 md:px-16 bg-[#0F1115] border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight font-['Space_Grotesk'] text-white">A Simple 3-Step Process</h2>
          </motion.div>
          
          <div className="relative flex justify-between items-center">
            {/* Connecting Dashed Line */}
            <div className="absolute top-6 left-[16.66%] right-[16.66%] h-0.5 border-t-2 border-dashed border-[#F7931A]/30"></div>
            
            {[
              { icon: <FaFileAlt />, title: "Upload Resume" },
              { icon: <FaSearch />, title: "AI Matches Jobs" },
              { icon: <FaCheck />, title: "Apply & Track" }
            ].map((step, index) => (
              <motion.div 
                key={index} 
                className="relative z-10 flex flex-col items-center text-center w-1/3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-12 h-12 rounded-full bg-[#030304] border-2 border-[#F7931A] text-[#F7931A] flex items-center justify-center text-lg shadow-[0_0_15px_-5px_rgba(247,147,26,0.4)]">
                  {step.icon}
                </div>
                <p className="mt-3 font-semibold text-white text-sm md:text-base font-['JetBrains_Mono'] tracking-wider uppercase">{step.title}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/how-it-works" className="inline-flex items-center gap-2 text-[#F7931A] font-semibold hover:underline font-['Inter']">
              See full process <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Marquee */}
      <section className="relative z-10 py-20 overflow-hidden bg-[#030304]">
        <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight font-['Space_Grotesk'] text-white">Loved by Job Seekers</h2>
        </div>
        
        <div className="relative">
          {/* Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030304] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030304] to-transparent z-10"></div>

          <motion.div 
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(2)].map((_, set) => (
              <div key={set} className="flex gap-6">
                {[
                  { name: "Ayesha K.", role: "Software Engineer", text: "Got 3 interviews in the first week! The AI matching is scarily accurate.", stars: 5 },
                  { name: "Bilal A.", role: "Data Analyst", text: "The cover letter generator saved me hours. It actually sounded like me!", stars: 5 },
                  { name: "Sana M.", role: "UI/UX Designer", text: "Finally, a tool that tells me WHY I should apply. No more spam applications.", stars: 5 },
                  { name: "Usman T.", role: "Full Stack Dev", text: "The skill gap analysis helped me learn exactly what I needed for my dream job.", stars: 5 }
                ].map((t, i) => (
                  <Card key={`${set}-${i}`} className="w-80 p-6 shrink-0 rounded-2xl border border-white/10 bg-[#0F1115]/80 backdrop-blur-lg shadow-[0_0_30px_-10px_rgba(247,147,26,0.1)]">
                    <div className="flex gap-1 text-[#FFD600] mb-3">
                      {[...Array(t.stars)].map((_, i) => <FaStar key={i} className="text-sm" />)}
                    </div>
                    <p className="text-[#94A3B8] text-sm mb-6 leading-relaxed font-['Inter']">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white flex items-center justify-center font-bold text-sm shadow-md">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white font-['Space_Grotesk']">{t.name}</p>
                        <p className="text-xs text-[#94A3B8] font-['JetBrains_Mono']">{t.role}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-24 px-6 text-center overflow-hidden bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white border-y border-white/10">
        {/* Floating Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/20 rounded-full"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-['Space_Grotesk']"
          >
            Ready to accelerate your career?
          </motion.h2>
          <p className="text-white/80 mb-8 text-lg max-w-xl mx-auto font-['Inter']">
            Join SmartJob AI today and let AI handle the heavy lifting.
          </p>
          <Link to="/signup">
            <Button size="lg" className="font-bold uppercase tracking-widest text-sm font-['Inter'] rounded-full bg-[#030304] text-[#F7931A] hover:bg-[#0F1115] px-10 py-6 shadow-2xl hover:scale-105 transition-all">
              Get Started for Free <FaArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 py-10 text-center text-[#94A3B8] text-sm border-t border-white/10 bg-[#030304] font-['JetBrains_Mono'] tracking-wider"
      >
        <p>© 2026 Smart Job Analysis System. Final Year Project.</p>
      </motion.footer>

    </div>
  );
};

// --- Helper Component for Stats Counter ---
const StatCounter = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref}>
      <h3 className="text-4xl font-extrabold font-['Space_Grotesk'] bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent">
        {count.toLocaleString()}{suffix}
      </h3>
      <p className="text-[#94A3B8] mt-1 text-sm font-medium font-['JetBrains_Mono'] tracking-wider uppercase">{label}</p>
    </div>
  );
}

export default LandingPage;