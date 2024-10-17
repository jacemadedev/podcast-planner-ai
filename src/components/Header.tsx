import React from 'react';
import { Mic } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Mic size={24} />
          <h1 className="text-2xl font-bold">PodcastPlanner</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-indigo-200">Dashboard</a></li>
            <li><a href="#" className="hover:text-indigo-200">My Episodes</a></li>
            <li><a href="#" className="hover:text-indigo-200">Settings</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;