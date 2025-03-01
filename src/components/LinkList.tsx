import { FC } from 'react';
import { Link } from '@/types';
import LinkCard from './LinkCard';

interface LinkListProps {
  links: Link[];
  selectedTags: string[];
  selectedSources: string[];
}

const LinkList: FC<LinkListProps> = ({ links, selectedTags, selectedSources }) => {
  // Filter links based on selected tags and sources
  const filteredLinks = links.filter(link => {
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => link.tags.includes(tag));
    
    const matchesSource = selectedSources.length === 0 || 
      selectedSources.includes(link.source);
    
    return matchesTags && matchesSource;
  });

  // Sort links by date (newest first)
  const sortedLinks = [...filteredLinks].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sortedLinks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">該当するコンテンツがありません</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedLinks.map((link, index) => (
        <LinkCard key={`${link.url}-${index}`} link={link} />
      ))}
    </div>
  );
};

export default LinkList;
