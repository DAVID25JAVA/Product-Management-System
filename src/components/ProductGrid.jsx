 
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default ProductGrid;