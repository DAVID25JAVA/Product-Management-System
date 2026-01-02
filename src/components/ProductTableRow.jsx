 
import { Edit2 } from 'lucide-react';

const ProductTableRow = ({ product, onEdit }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
        {product.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-orange-600 font-semibold">
        ${product.price}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
        {product.category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
        {product.stock}
      </td>
      <td className="px-6 py-4 text-gray-500">
        {product.description || '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => onEdit(product)}
          className="text-orange-500 cursor-pointer hover:text-orange-700"
        >
          <Edit2 className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

export default ProductTableRow;