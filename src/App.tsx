import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ContentPool from './components/ContentPool';
import KanbanBoard from './components/KanbanBoard';
import { Content } from './types';
import { contentApi } from './api/contentApi';

function App() {
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      const fetchedContents = await contentApi.getContents();
      setContents(fetchedContents);
    };
    fetchContents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <ContentPool contents={contents} setContents={setContents} />
        <KanbanBoard contents={contents} setContents={setContents} />
      </div>
    </div>
  );
}

export default App;