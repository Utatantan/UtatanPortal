import { Link } from '@/types';
import { FC } from 'react';

interface LinkCardProps {
  link: Link;
}

const sourceIcons: Record<string, string> = {
  note: '📝',
  google_scholar: '📚',
  twitter: '🐦',
  default: '🔗'
};

const LinkCard: FC<LinkCardProps> = ({ link }) => {
  const { title, url, source, date, tags } = link;
  const icon = sourceIcons[source] || sourceIcons.default;
  
  // Format date to be more readable
  const formattedDate = new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg font-medium text-blue-600 hover:underline"
          >
            {title}
          </a>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <span className="mr-2">{icon}</span>
            <span className="mr-4">{source}</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span 
            key={tag} 
            className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LinkCard;
