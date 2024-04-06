// Product.tsx
import React from 'react';
import './Product.css';
interface ProductProps {
  id: number;
  name: string;
  brand: string;
  category?: string;
  price: number;
  image: string;
  description: string;
  sizes?: string[];
  colors?: string[];
  onQuickView: () => void; // Add the onQuickView prop
}

const Product: React.FC<ProductProps> = ({
  id,
  name,
  brand,
  category,
  price,
  image,
  description,
  sizes,
  colors,
  onQuickView, // Destructure the onQuickView prop
}) => {
  return (
    <div className="product">
      <img src={image} alt={name} className="product-image" />
      <div className="product-details">
        <button className="Quick" onClick={onQuickView}>QUICK VIEW</button>
        <h2 className="product-name">{name}</h2>
        <p className="product-brand">{brand}</p>
        <p className="product-category">{category}</p>
        <p className="product-description">{description}</p>
        <p className="product-price">Price: ${price}</p>
        {sizes && (
          <div className="product-sizes">
            <p>Sizes Available:</p>
            <ul>
              {sizes.map((size, index) => (
                <li key={index}>{size}</li>
              ))}
            </ul>
          </div>
        )}
        {colors && (
          <div className="product-colors">
            <p>Colors Available:</p>
            <ul>
              {colors.map((color, index) => (
                <li key={index}>{color}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
