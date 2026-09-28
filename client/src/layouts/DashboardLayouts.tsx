import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBriefcase, FaTasks, FaChartLine, FaFilePdf, FaUser, FaCog, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaTachometerAlt /> },
    { name: 'Jobs', path: '/jobs', icon: <FaBriefcase /> },
    { name: 'Tracker', path: '/tracker', icon: <FaTasks /> },
    { name: 'Analytics', path: '/analytics', icon: <FaChartLine /> },
    { name: 'Resume', path: '/resume', icon: <FaFilePdf /> },
    { name: 'Profile', path: '/profile', icon: <FaUser /> },
    { name: 'Settings', path: '/settings', icon: <FaCog /> },
  ];

  return (
    <div className="relative min-h-screen flex bg-[#030304] text-white font-['Inter'] overflow-hidden">
      
      {/* Ambient Orange Glow Blob for Sidebar */}
      <div className="fixed top-1/4 left-0 w-[400px] h-[400px] bg-[#F7931A] opacity-5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* Sidebar */}
      <aside className="w-64 fixed h-screen p-4 flex flex-col justify-between border-r border-white/10 bg-[#0F1115] z-20">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12 px-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#EA580C] to-[#F7931A] rounded-lg flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(247,147,26,0.5)]">S</div>
            <span className="text-lg font-bold tracking-tight font-['Space_Grotesk'] text-white">SmartJob AI</span>
          </div>
          
          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-xs font-['JetBrains_Mono'] tracking-widest uppercase ${
                    isActive
                      ? 'bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-[0_0_20px_-5px_rgba(247,147,26,0.4)]'
                      : 'text-[#94A3B8] hover:bg-white/5 hover:text-[#F7931A]'
                  }`}
                >
                  {item.icon} {item.name}
                  {/* Active Indicator Bar */}
                  {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-[#FFD600] rounded-r-full shadow-[0_0_10px_rgba(255,214,0,0.5)]"></span>}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-2">
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-300 text-xs font-['JetBrains_Mono'] tracking-widest uppercase text-red-400/80 hover:bg-red-500/10 hover:text-red-400 border border-white/10 hover:border-red-500/30"
          >
            <FaSignOutAlt /> Disconnect
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 relative z-10">
        
        {/* Global Background Grid Pattern */}
        <div 
          className="absolute inset-0 z-0 [mask-image:radial-gradient(circle_at_center,black_40%,transparent_100%)] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(30, 41, 59, 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(30, 41, 59, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Topbar */}
        <header className="relative z-10 h-16 border-b border-white/10 bg-[#0F1115]/80 backdrop-blur-md flex items-center justify-end px-8 sticky top-0">
          {/* User Avatar / Profile Icon can go here */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-white/10 bg-[#030304] flex items-center justify-center text-[#F7931A] font-bold text-sm font-['Space_Grotesk']">
              U
            </div>
          </div>
        </header>

        {/* Page Content (Outlet renders the current route's component) */}
        <main className="relative z-10 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;