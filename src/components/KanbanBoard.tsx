import React from 'react';
import { FileText } from 'lucide-react';
import { Content } from '../types';
import { contentApi } from '../api/contentApi';
import { aiService } from '../services/aiService';

interface KanbanBoardProps {
  contents: Content[];
  setContents: React.Dispatch<React.SetStateAction<Content[]>>;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ contents, setContents }) => {
  const columns = ['To Discuss', 'In Progress', 'Recorded'];

  const moveContent = async (contentId: string, newStatus: string) => {
    const updatedContent = await contentApi.updateContent(contentId, { status: newStatus });
    setContents(contents.map(content =>
      content.id === contentId ? updatedContent : content
    ));
  };

  const generateScript = async () => {
    const script = await aiService.generateScript(contents);
    alert("Generated Script:\n\n" + script);
  };

  return (
    <div className="flex-1 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Episode Planning</h2>
        <button
          onClick={generateScript}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <FileText size={20} />
          <span>Generate Script</span>
        </button>
      </div>
      <div className="flex space-x-4">
        {columns.map(column => (
          <div key={column} className="flex-1 bg-gray-200 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">{column}</h3>
            <ul className="space-y-2">
              {contents.filter(content => content.status === column.toLowerCase().replace(' ', '-')).map(content => (
                <li
                  key={content.id}
                  className="p-2 bg-white rounded shadow cursor-move"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', content.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const contentId = e.dataTransfer.getData('text');
                    moveContent(contentId, column.toLowerCase().replace(' ', '-'));
                  }}
                >
                  {content.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;