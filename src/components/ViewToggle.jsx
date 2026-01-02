 
import { Grid, List } from 'lucide-react';

const ViewToggle = ({ viewMode, onViewChange }) => {
  return (
    <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 ${viewMode === 'grid' ? 'bg-orange-500 cursor-pointer text-white' : 'text-gray-600 hover:bg-gray-50'}`}
      >
        <Grid className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 ${viewMode === 'list' ? 'bg-orange-500 text-white cursor-pointer' : 'text-gray-600 hover:bg-gray-50'}`}
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ViewToggle;