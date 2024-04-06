import React from 'react';
import { ProductData } from './ProductList';
import './ProductModal.css'; // Import CSS styles

interface ProductModalProps {
  product: ProductData;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, showModal, setShowModal }) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>&times;</span>
        <img src={product.image} alt={product.name} />
        <div>
          <h2>{product.name}</h2>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          {product.sizes && (
            <div>
              <p><strong>Sizes Available:</strong></p>
              <ul>
                {product.sizes.map((size, index) => (
                  <li key={index}>{size}</li>
                ))}
              </ul>
            </div>
          )}
          {product.colors && (
            <div>
              <p><strong>Colors Available:</strong></p>
              <ul>
                {product.colors.map((color, index) => (
                  <li key={index}>{color}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
