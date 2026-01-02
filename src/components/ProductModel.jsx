// src/components/ProductModal.js
import React from 'react';
import { X } from 'lucide-react';
import FormInput from './FormInput';
import FormTextarea from './FormTextArea';

const ProductModal = ({ 
  isOpen, 
  editingProduct, 
  formData, 
  errors, 
  onClose, 
  onSubmit, 
  onChange, 
  onKeyPress 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingProduct ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <FormInput
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={onChange}
            onKeyPress={onKeyPress}
            error={errors.name}
            required
          />

          <FormInput
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={onChange}
            onKeyPress={onKeyPress}
            error={errors.price}
            step="0.01"
            required
          />

          <FormInput
            label="Category"
            name="category"
            value={formData.category}
            onChange={onChange}
            onKeyPress={onKeyPress}
            error={errors.category}
            required
          />

          <FormInput
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={onChange}
            onKeyPress={onKeyPress}
            error={errors.stock}
          />

          <FormTextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={onChange}
            rows="3"
          />

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {editingProduct ? 'Update' : 'Add'} Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;