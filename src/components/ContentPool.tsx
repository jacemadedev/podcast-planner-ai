import React, { useState } from 'react';
import { Plus, Zap } from 'lucide-react';
import { Content } from '../types';
import { contentApi } from '../api/contentApi';
import { aiService } from '../services/aiService';

interface ContentPoolProps {
  contents: Content[];
  setContents: React.Dispatch<React.SetStateAction<Content[]>>;
}

const ContentPool: React.FC<ContentPoolProps> = ({ contents, setContents }) => {
  const [newContent, setNewContent] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newContent.trim()) {
      const content = await contentApi.addContent({ text: newContent.trim(), status: 'pool' });
      setContents(prevContents => [...prevContents, content]);
      setNewContent('');
    }
  };

  const handleAnalyze = async (content: Content) => {
    const result = await aiService.analyzeContent(content);
    setAnalysis(result);
  };

  return (
    <div className="w-1/4 bg-white p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">Content Pool</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Add new content..."
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-2 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Plus size={20} />
          </button>
        </div>
      </form>
      <ul className="space-y-2">
        {contents.filter(content => content.status === 'pool').map(content => (
          <li key={content.id} className="p-2 bg-gray-100 rounded flex justify-between items-center">
            <span>{content.text}</span>
            <button
              onClick={() => handleAnalyze(content)}
              className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <Zap size={16} />
            </button>
          </li>
        ))}
      </ul>
      {analysis && (
        <div className="mt-4 p-2 bg-blue-100 rounded">
          <h3 className="font-bold">AI Analysis:</h3>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default ContentPool;