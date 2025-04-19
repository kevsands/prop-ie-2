import React, { useState } from 'react';

interface FurnitureItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  supplier: string;
  inStock: boolean;
  deliveryTime: string;
}

const FurnitureMarketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSupplier, setSelectedSupplier] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartItems, setCartItems] = useState<{item: FurnitureItem, quantity: number}[]>([]);
  
  // Mock furniture data
  const furnitureItems: FurnitureItem[] = [
    {
      id: 'f1',
      name: 'Modern Sofa',
      category: 'living',
      price: 1299,
      description: 'Contemporary 3-seater sofa with premium fabric upholstery.',
      image: '/images/furniture/sofa.jpg',
      supplier: 'Premium Home',
      inStock: true,
      deliveryTime: '2-3 weeks'
    },
    {
      id: 'f2',
      name: 'Dining Table Set',
      category: 'dining',
      price: 899,
      description: 'Solid oak dining table with 6 matching chairs.',
      image: '/images/furniture/dining-table.jpg',
      supplier: 'Oak Designs',
      inStock: true,
      deliveryTime: '3-4 weeks'
    },
    {
      id: 'f3',
      name: 'King Size Bed',
      category: 'bedroom',
      price: 1499,
      description: 'Luxurious king size bed with upholstered headboard.',
      image: '/images/furniture/bed.jpg',
      supplier: 'Sleep Haven',
      inStock: true,
      deliveryTime: '2-3 weeks'
    },
    {
      id: 'f4',
      name: 'Kitchen Island',
      category: 'kitchen',
      price: 1899,
      description: 'Freestanding kitchen island with marble countertop and storage.',
      image: '/images/furniture/kitchen-island.jpg',
      supplier: 'Modern Kitchens',
      inStock: false,
      deliveryTime: '4-6 weeks'
    },
    {
      id: 'f5',
      name: 'Bathroom Vanity',
      category: 'bathroom',
      price: 799,
      description: 'Double sink bathroom vanity with mirrors and storage.',
      image: '/images/furniture/bathroom-vanity.jpg',
      supplier: 'Bath Essentials',
      inStock: true,
      deliveryTime: '2-3 weeks'
    },
    {
      id: 'f6',
      name: 'Wardrobe',
      category: 'bedroom',
      price: 1199,
      description: 'Spacious wardrobe with sliding doors and internal organization.',
      image: '/images/furniture/wardrobe.jpg',
      supplier: 'Storage Solutions',
      inStock: true,
      deliveryTime: '3-4 weeks'
    }
  ];
  
  // Categories and suppliers for filters
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'living', name: 'Living Room' },
    { id: 'dining', name: 'Dining Room' },
    { id: 'bedroom', name: 'Bedroom' },
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'bathroom', name: 'Bathroom' }
  ];
  
  const suppliers = [
    { id: 'all', name: 'All Suppliers' },
    { id: 'Premium Home', name: 'Premium Home' },
    { id: 'Oak Designs', name: 'Oak Designs' },
    { id: 'Sleep Haven', name: 'Sleep Haven' },
    { id: 'Modern Kitchens', name: 'Modern Kitchens' },
    { id: 'Bath Essentials', name: 'Bath Essentials' },
    { id: 'Storage Solutions', name: 'Storage Solutions' }
  ];
  
  // Filter furniture items based on selected filters
  const filteredItems = furnitureItems.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (selectedSupplier !== 'all' && item.supplier !== selectedSupplier) {
      return false;
    }
    if (item.price < priceRange[0] || item.price > priceRange[1]) {
      return false;
    }
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });
  
  // Add item to cart
  const addToCart = (item: FurnitureItem) => {
    const existingItem = cartItems.find(cartItem => cartItem.item.id === item.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(cartItem => 
        cartItem.item.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { item, quantity: 1 }]);
    }
  };
  
  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter(cartItem => cartItem.item.id !== itemId));
  };
  
  // Update item quantity in cart
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(cartItems.map(cartItem => 
        cartItem.item.id === itemId 
          ? { ...cartItem, quantity } 
          : cartItem
      ));
    }
  };
  
  // Calculate cart total
  const cartTotal = cartItems.reduce((total, cartItem) => 
    total + (cartItem.item.price * cartItem.quantity), 0
  );
  
  return (
    <div className="card">
      <h2 className="section-title">Furniture & Fittings Marketplace</h2>
      <p className="mb-6 text-gray-600">
        Browse and select furniture and fittings to customize your new home.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold text-lg mb-4">Filters</h3>
            
            {/* Search */}
            <div className="mb-4">
              <label className="form-label">Search</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Search furniture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Category Filter */}
            <div className="mb-4">
              <label className="form-label">Category</label>
              <select 
                className="input-field"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            
            {/* Supplier Filter */}
            <div className="mb-4">
              <label className="form-label">Supplier</label>
              <select 
                className="input-field"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
              >
                {suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                ))}
              </select>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-4">
              <label className="form-label">Price Range</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  className="input-field w-1/2" 
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                />
                <span>to</span>
                <input 
                  type="number" 
                  className="input-field w-1/2" 
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
                />
              </div>
            </div>
            
            {/* Reset Filters */}
            <button 
              className="btn-outline w-full"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSupplier('all');
                setPriceRange([0, 5000]);
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
          
          {/* Shopping Cart */}
          <div className="bg-gray-50 p-4 rounded-md mt-4">
            <h3 className="font-semibold text-lg mb-4">Your Selection</h3>
            
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-sm">Your selection is empty. Add items to customize your home.</p>
            ) : (
              <div>
                <div className="space-y-3 mb-4">
                  {cartItems.map(({ item, quantity }) => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-gray-500 text-xs">€{item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => updateQuantity(item.id, quantity - 1)}
                        >
                          -
                        </button>
                        <span className="text-sm">{quantity}</span>
                        <button 
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => updateQuantity(item.id, quantity + 1)}
                        >
                          +
                        </button>
                        <button 
                          className="text-red-500 hover:text-red-700 ml-2"
                          onClick={() => removeFromCart(item.id)}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between font-medium mb-4">
                  <span>Total:</span>
                  <span>€{cartTotal.toLocaleString()}</span>
                </div>
                
                <button className="btn-primary w-full">
                  Save Selection
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Furniture Items Grid */}
        <div className="lg:col-span-2">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-md">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No items found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map(item => (
                <div key={item.id} className="border rounded-md overflow-hidden">
                  {/* Image Placeholder */}
                  <div className="bg-gray-100 h-48 flex items-center justify-center">
                    <span className="text-gray-400">Image Placeholder</span>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <span className="font-bold">€{item.price.toLocaleString()}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    
                    <div className="mt-3 flex justify-between items-center text-sm">
                      <span className="text-gray-500">Supplier: {item.supplier}</span>
                      <span className={item.inStock ? 'text-green-600' : 'text-red-600'}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    
                    <div className="mt-1 text-sm text-gray-500">
                      Delivery: {item.deliveryTime}
                    </div>
                    
                    <div className="mt-4 flex justify-between">
                      <button className="btn-outline py-1 px-3 text-sm">
                        View Details
                      </button>
                      <button 
                        className="btn-primary py-1 px-3 text-sm"
                        onClick={() => addToCart(item)}
                        disabled={!item.inStock}
                      >
                        {item.inStock ? 'Add to Selection' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FurnitureMarketplace;
