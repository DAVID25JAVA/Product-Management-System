// src/App.js
import React, { useState, useEffect, useMemo } from 'react';
import { DUMMY_PRODUCTS } from './assets/assets';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ViewToggle from './components/ViewToggle';
import AddProductButton from './components/AddProductButton';
import ProductGrid from './components/ProductGrid';
import ProductTable from './components/ProductTable';
import EmptyState from './components/EmptyState';
import Pagination from './components/Pagination';
import ProductModal from './components/ProductModel';

const App = () => {
  const [products, setProducts] = useState(DUMMY_PRODUCTS);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const itemsPerPage = 6;

  // Debounce search with 500ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [products, debouncedSearch]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (formData.stock && (isNaN(formData.stock) || Number(formData.stock) < 0)) {
      newErrors.stock = 'Stock must be a valid number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) return;

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: formData.stock ? Number(formData.stock) : 0,
      id: editingProduct ? editingProduct.id : Date.now()
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
    } else {
      setProducts([...products, productData]);
    }

    handleCloseModal();
  };

  // Open modal for add/edit
  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
        description: product.description || ''
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: '',
        category: '',
        stock: '',
        description: ''
      });
    }
    setErrors({});
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      category: '',
      stock: '',
      description: ''
    });
    setErrors({});
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and View Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          
          <div className="flex gap-3">
            <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
            <AddProductButton onClick={() => handleOpenModal()} />
          </div>
        </div>

        {/* Products Display */}
        {paginatedProducts.length === 0 ? (
          <EmptyState />
        ) : viewMode === 'grid' ? (
          <ProductGrid products={paginatedProducts} onEdit={handleOpenModal} />
        ) : (
          <ProductTable products={paginatedProducts} onEdit={handleOpenModal} />
        )}

        {/* Pagination */}
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </div>

      {/* Add/Edit Product Modal */}
      <ProductModal
        isOpen={showModal}
        editingProduct={editingProduct}
        formData={formData}
        errors={errors}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default App;