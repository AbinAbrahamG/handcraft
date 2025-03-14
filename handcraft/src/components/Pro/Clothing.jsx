import React from "react";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Handwoven Cotton Kurta",
    price: 45.0,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQq_X4aud--fBjJFe2uxDvh6IHft9aCcb6cL4kyEfN0PmBoLXYthmUZQ_mfcdhblKeoyCzMzc_s9Rnnl2nZ-u9YEnFYo7Zh4B5DXKNDLDs&usqp=CAE",
    tag: "New",
  },
  {
    id: 2,
    name: "Hand-Embroidered Saree",
    price: 120.0,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTiy2DKDuxqbY47FPm0blZaZZFpnC9YP4308-2j3MK1xcp_Dol4uVsG2vXUzEGzSYGdX7vkdjPs8Gfw6-AfzzQkWSBtNMLB7jy8zQODV6wk&usqp=CAE",
    tag: "Bestseller",
  },
  {
    id: 3,
    name: "Block Print Dupatta",
    price: 30.0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe_PwG2P7gmKV5NvH2PSYyEWkdFSPeEnTdTg&s",
    tag: "Trending",
  },
];

const Sidebar = () => {
  return (
    <div className="w-1/4 p-6 border-r bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
      <ul className="space-y-3 text-gray-700 font-medium">
        <li className="cursor-pointer hover:text-black">All Clothing</li>
        <li className="cursor-pointer hover:text-black">Kurtas</li>
        <li className="cursor-pointer hover:text-black">Sarees</li>
        <li className="cursor-pointer hover:text-black">Dupattas</li>
        <li className="cursor-pointer hover:text-black">Handwoven Fabrics</li>
        <li className="cursor-pointer hover:text-black">Embroidered Apparel</li>
      </ul>
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition duration-300">
      <div className="relative">
        {product.tag && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-full">
            {product.tag}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md"
        />
      </div>
      <h3 className="font-semibold mt-3 text-lg">{product.name}</h3>
      <p className="text-black font-bold text-xl">${product.price}</p>
      <button className="mt-3 bg-black text-white flex items-center justify-center px-5 py-2 rounded-lg w-full hover:bg-gray-800 transition">
        <ShoppingCart className="w-5 h-5 mr-2" />
        Add to Cart
      </button>
    </div>
  );
};

const Clothing = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="w-3/4 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Clothing</h1>
          <div className="flex space-x-4">
            <select className="border p-2 rounded">
              <option>Sort by: Best Sellers</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <select className="border p-2 rounded">
              <option>Show: 12</option>
              <option>24</option>
              <option>36</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clothing;
