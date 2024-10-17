import { Content } from '../types';

let contents: Content[] = [];
let nextId = 1;

export const contentApi = {
  getContents: (): Promise<Content[]> => {
    return Promise.resolve(contents);
  },

  addContent: (content: Omit<Content, 'id'>): Promise<Content> => {
    const newContent = { ...content, id: `content_${nextId++}` };
    contents.push(newContent);
    return Promise.resolve(newContent);
  },

  updateContent: (id: string, updates: Partial<Content>): Promise<Content> => {
    const index = contents.findIndex(c => c.id === id);
    if (index === -1) {
      return Promise.reject(new Error('Content not found'));
    }
    contents[index] = { ...contents[index], ...updates };
    return Promise.resolve(contents[index]);
  },

  deleteContent: (id: string): Promise<void> => {
    contents = contents.filter(c => c.id !== id);
    return Promise.resolve();
  },
};