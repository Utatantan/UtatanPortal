import { Link } from '@/types';
import fs from 'fs';
import path from 'path';

export async function getLinks(): Promise<Link[]> {
  try {
    const dataDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDirectory, 'links.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading links data:', error);
    return [];
  }
}
