 
import { Edit2 } from 'lucide-react';

const ProductCard = ({ product, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
        <button
          onClick={() => onEdit(product)}
          className="text-orange-500 hover:text-orange-700"
        >
          <Edit2 className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-2xl font-bold text-orange-600">${product.price}</p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Category:</span> {product.category}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Stock:</span> {product.stock} units
        </p>
        {product.description && (
          <p className="text-sm text-gray-500 mt-2">{product.description}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;