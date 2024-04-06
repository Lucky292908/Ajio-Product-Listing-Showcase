// import './ProductList.css';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Product from './Product';
// import ProductModal from './productmodel';

// // Define ProductData interface
// export interface ProductData {
//   id: number;
//   name: string;
//   brand: string;
//   category: string;
//   price: number;
//   image: string;
//   description: string;
//   sizes?: string[];
//   colors?: string[];
// }
// const ProductList: React.FC = () => {
//   const [products, setProducts] = useState<ProductData[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
//   const [showModal, setShowModal] = useState<boolean>(false);

//   useEffect(() => {
//     axios.get<ProductData[]>('http://localhost:3001/products')
//       .then(response => {
//         setProducts(response.data);
//       })
//       .catch(error => {
//         setError('Error fetching data. Please try again later.');
//       });
//   }, []);

//   const handleQuickView = (product: ProductData) => {
//     setSelectedProduct(product);
//     setShowModal(true);
//   };

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="product-list">
//       {products.map(product => (
//         <Product
//           key={product.id}
//           id={product.id}
//           name={product.name}
//           brand={product.brand}
//           // category={product.category}
//           price={product.price}
//           image={product.image}
//           description={product.description}
//         //   colors={product.colors}
//         //   sizes={product.sizes}
//           onQuickView={() => handleQuickView(product)} // Pass the handler function to the Product component
//         />
//       ))}
//       {selectedProduct && (
//         <ProductModal
//           product={selectedProduct}
//           showModal={showModal}
//           setShowModal={setShowModal}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductList;










import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product';
import ProductModal from './productmodel';
import './ProductList.css';

import ProductData from "./ProductList";

export interface ProductData {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  description: string;
  sizes?: string[];
  colors?: string[];
}


const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(8);

  useEffect(() => {
    axios.get<ProductData[]>('http://localhost:3001/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        setError('Error fetching data. Please try again later.');
      });
  }, []);

  const handleQuickView = (product: ProductData) => {
    setSelectedProduct(product);
    setShowModal(true);
  };



  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      
      <div className="product-list">
        {currentProducts.map(product => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            brand={product.brand}
            price={product.price}
            image={product.image}
            description={product.description}
            onQuickView={() => handleQuickView(product)}
          />
        ))}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
