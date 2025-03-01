'use client';

import { useState } from 'react';
import { Link } from '@/types';
import LinkList from './LinkList';
import FilterPanel from './FilterPanel';
import SearchBar from './SearchBar';

interface ClientContentProps {
  initialLinks: Link[];
}

export default function ClientContent({ initialLinks }: ClientContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  // Filter links based on search query
  const filteredBySearch = searchQuery.trim() === '' 
    ? initialLinks 
    : initialLinks.filter(link => 
        link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const handleSourceSelect = (source: string) => {
    setSelectedSources(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source) 
        : [...prev, source]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedSources([]);
    setSearchQuery('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <div className="mb-4">
          <SearchBar 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
          />
        </div>
        <FilterPanel 
          links={initialLinks}
          selectedTags={selectedTags}
          selectedSources={selectedSources}
          onTagSelect={handleTagSelect}
          onSourceSelect={handleSourceSelect}
          onClearFilters={clearFilters}
        />
      </div>
      <div className="lg:col-span-3">
        <LinkList 
          links={filteredBySearch}
          selectedTags={selectedTags}
          selectedSources={selectedSources}
        />
      </div>
    </div>
  );
}
