import { useDispatch } from 'react-redux';
import { addItem } from '../store/artSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      {/* Product Image Placeholder */}
      <div className="w-full h-40 bg-gradient-to-br from-indigo-300 to-indigo-600 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
        <div className="text-white text-5xl">📦</div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Premium quality product for your needs
        </p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-indigo-600">
            ${product.price}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => dispatch(addItem(product))}
          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
