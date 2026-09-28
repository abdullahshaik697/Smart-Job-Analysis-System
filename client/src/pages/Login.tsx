import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Card } from '@heroui/react';
import { FaArrowLeft } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#030304] px-4 overflow-hidden font-['Inter']">
      
      {/* Background Grid Pattern */}
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

      {/* Ambient Orange Glow Blob */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#F7931A] opacity-10 blur-[150px] rounded-full z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glass Morphism Card with Orange Glow Shadow */}
        <Card className="p-8 border border-white/10 rounded-2xl bg-[#0F1115]/80 backdrop-blur-lg shadow-[0_0_50px_-10px_rgba(247,147,26,0.1)]">
          
          <Card.Header className="flex flex-col items-start pb-6">
            <Link 
              to="/" 
              className="text-[#94A3B8] hover:text-[#F7931A] mb-8 flex items-center gap-2 text-xs font-['JetBrains_Mono'] tracking-widest uppercase transition-colors"
            >
              <FaArrowLeft /> Back to Home
            </Link>
            
            <h1 className="text-4xl font-bold tracking-tight text-white font-['Space_Grotesk']">
              Welcome <span className="bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent">Back</span>
            </h1>
            
            <p className="text-[#94A3B8] mt-3 text-base">
              Login to access your AI job dashboard
            </p>
          </Card.Header>

          <Card.Content className="pt-2">
            <form onSubmit={handleLogin} className="flex flex-col gap-8">
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm text-center font-medium font-['Inter']">
                  {error}
                </div>
              )}

              {/* Minimalist Input 1 (Bottom Border) */}
              <div className="flex flex-col gap-2">
                <label className="text-[#94A3B8] font-['JetBrains_Mono'] text-xs tracking-widest uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@crypto.com"
                  className="w-full bg-black/50 border-b-2 border-white/20 px-1 py-3 h-12 text-white text-sm font-['Inter'] placeholder:text-white/30 focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none transition-all duration-200"
                />
              </div>

              {/* Minimalist Input 2 (Bottom Border) */}
              <div className="flex flex-col gap-2">
                <label className="text-[#94A3B8] font-['JetBrains_Mono'] text-xs tracking-widest uppercase">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-black/50 border-b-2 border-white/20 px-1 py-3 h-12 text-white text-sm font-['Inter'] placeholder:text-white/30 focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none transition-all duration-200"
                />
              </div>

              {/* Gradient Pill Button with Glow */}
              <Button
                type="submit"
                size="lg"
                isDisabled={loading}
                className="mt-4 font-bold uppercase tracking-widest text-sm font-['Inter'] rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)] hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(247,147,26,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? 'Authenticating...' : 'Login'}
              </Button>
            </form>

            <p className="text-center text-[#94A3B8] text-sm mt-8 font-['Inter']">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#F7931A] font-semibold hover:underline transition-colors">
                Sign up here
              </Link>
            </p>
          </Card.Content>
        </Card>
      </motion.div>
    </div>
  );
}

export default Login;