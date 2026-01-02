 
import { Plus } from 'lucide-react';

const AddProductButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
    >
      <Plus className="w-5 h-5" />
      <span>Add Product</span>
    </button>
  );
};

export default AddProductButton;