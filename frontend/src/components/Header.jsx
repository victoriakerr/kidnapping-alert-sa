import { Link, useLocation } from "react-router-dom";
import { AlertTriangle, Home, FileText, Eye, Brain } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/alerts", label: "Alerts", icon: Eye },
    { path: "/report", label: "Report", icon: FileText },
    { path: "/facial-recognition", label: "AI Match", icon: Brain },
  ];

  return (
    <header className="bg-emergency text-white shadow-lg">
      <div className="container px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <AlertTriangle className="h-8" style={{ width: '2rem' }} />
            <div>
              <h1 className="text-xl font-bold">Kidnapping Alert SA</h1>
              <p className="text-sm" style={{ opacity: '0.9' }}>Emergency Response System</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex gap-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`btn ${location.pathname === path ? 'btn-outline' : 'btn-ghost'} text-white`}
                style={{ 
                  backgroundColor: location.pathname === path ? 'rgba(255,255,255,0.2)' : 'transparent',
                  border: location.pathname === path ? '1px solid rgba(255,255,255,0.3)' : 'none'
                }}
              >
                <Icon className="h-4" style={{ width: '1rem' }} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
          
          <button className="btn btn-outline md:hidden" style={{ backgroundColor: 'var(--accent-gold)', color: 'white', borderColor: 'var(--accent-gold)' }}>
            Menu
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;