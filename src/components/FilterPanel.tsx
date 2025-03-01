import { FC } from 'react';
import { Link } from '@/types';

interface FilterPanelProps {
  links: Link[];
  selectedTags: string[];
  selectedSources: string[];
  onTagSelect: (tag: string) => void;
  onSourceSelect: (source: string) => void;
  onClearFilters: () => void;
}

const FilterPanel: FC<FilterPanelProps> = ({
  links,
  selectedTags,
  selectedSources,
  onTagSelect,
  onSourceSelect,
  onClearFilters
}) => {
  // Extract all unique tags and sources
  const allTags = Array.from(new Set(links.flatMap(link => link.tags))).sort();
  const allSources = Array.from(new Set(links.map(link => link.source))).sort();

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">フィルター</h3>
          {(selectedTags.length > 0 || selectedSources.length > 0) && (
            <button
              onClick={onClearFilters}
              className="text-sm text-blue-600 hover:underline"
            >
              クリア
            </button>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">ソース</h4>
        <div className="flex flex-wrap gap-1">
          {allSources.map(source => (
            <button
              key={source}
              onClick={() => onSourceSelect(source)}
              className={`text-xs px-2 py-1 rounded-full ${
                selectedSources.includes(source)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {source}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">タグ</h4>
        <div className="flex flex-wrap gap-1">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => onTagSelect(tag)}
              className={`text-xs px-2 py-1 rounded-full ${
                selectedTags.includes(tag)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
