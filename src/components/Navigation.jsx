import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Newspaper, Brain, FileText, Download, Scale } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Newspaper, label: 'Dashboard' },
    { path: '/analyzer', icon: Brain, label: 'Analyzer' },
    { path: '/generator', icon: FileText, label: 'Generator' },
    { path: '/export', icon: Download, label: 'Export' }
  ];

  return (
    <nav className="bg-white shadow-lg border-b-2 border-blue-500">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Scale className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">RTI News Monitor</span>
            <span className="text-sm text-gray-500">by FileMyRTI</span>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  location.pathname === path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:block">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
