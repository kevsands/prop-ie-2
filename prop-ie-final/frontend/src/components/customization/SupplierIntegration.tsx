import React, { useState } from 'react';

interface Supplier {
  id: string;
  name: string;
  category: string;
  description: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  rating: number;
  products: SupplierProduct[];
}

interface SupplierProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  leadTime: string;
  inStock: boolean;
}

const SupplierIntegration: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [showContactForm, setShowContactForm] = useState<boolean>(false);
  
  // Mock supplier categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'flooring', name: 'Flooring' },
    { id: 'kitchen', name: 'Kitchen & Appliances' },
    { id: 'bathroom', name: 'Bathroom' },
    { id: 'lighting', name: 'Lighting' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'exterior', name: 'Exterior & Landscaping' }
  ];
  
  // Mock suppliers data
  const suppliers: Supplier[] = [
    {
      id: 's1',
      name: 'Premium Flooring Solutions',
      category: 'flooring',
      description: 'Leading supplier of premium flooring products including hardwood, laminate, and luxury vinyl.',
      contactPerson: 'John O\'Connor',
      email: 'john@premiumflooring.ie',
      phone: '01-234-5678',
      website: 'www.premiumflooring.ie',
      rating: 4.8,
      products: [
        {
          id: 'p1',
          name: 'Oak Hardwood Flooring',
          category: 'flooring',
          price: 65,
          leadTime: '2-3 weeks',
          inStock: true
        },
        {
          id: 'p2',
          name: 'Luxury Vinyl Tile',
          category: 'flooring',
          price: 45,
          leadTime: '1-2 weeks',
          inStock: true
        }
      ]
    },
    {
      id: 's2',
      name: 'Modern Kitchen Designs',
      category: 'kitchen',
      description: 'Specialized in modern kitchen cabinets, countertops, and appliances for new homes.',
      contactPerson: 'Sarah Murphy',
      email: 'sarah@modernkitchens.ie',
      phone: '01-345-6789',
      website: 'www.modernkitchens.ie',
      rating: 4.6,
      products: [
        {
          id: 'p3',
          name: 'Quartz Countertop',
          category: 'kitchen',
          price: 350,
          leadTime: '3-4 weeks',
          inStock: true
        },
        {
          id: 'p4',
          name: 'Kitchen Cabinet Set',
          category: 'kitchen',
          price: 4500,
          leadTime: '4-6 weeks',
          inStock: false
        }
      ]
    },
    {
      id: 's3',
      name: 'Luxury Bathroom Fittings',
      category: 'bathroom',
      description: 'Premium bathroom fixtures, fittings, and accessories for modern homes.',
      contactPerson: 'Michael Kelly',
      email: 'michael@luxurybathrooms.ie',
      phone: '01-456-7890',
      website: 'www.luxurybathrooms.ie',
      rating: 4.7,
      products: [
        {
          id: 'p5',
          name: 'Premium Shower System',
          category: 'bathroom',
          price: 850,
          leadTime: '2-3 weeks',
          inStock: true
        },
        {
          id: 'p6',
          name: 'Freestanding Bathtub',
          category: 'bathroom',
          price: 1200,
          leadTime: '3-4 weeks',
          inStock: true
        }
      ]
    },
    {
      id: 's4',
      name: 'Smart Lighting Systems',
      category: 'lighting',
      description: 'Innovative lighting solutions including smart systems and energy-efficient fixtures.',
      contactPerson: 'Emma Wilson',
      email: 'emma@smartlighting.ie',
      phone: '01-567-8901',
      website: 'www.smartlighting.ie',
      rating: 4.5,
      products: [
        {
          id: 'p7',
          name: 'Smart Home Lighting Package',
          category: 'lighting',
          price: 1800,
          leadTime: '2-3 weeks',
          inStock: true
        },
        {
          id: 'p8',
          name: 'LED Recessed Lighting Set',
          category: 'lighting',
          price: 450,
          leadTime: '1-2 weeks',
          inStock: true
        }
      ]
    },
    {
      id: 's5',
      name: 'Contemporary Furniture',
      category: 'furniture',
      description: 'Modern and contemporary furniture for all rooms in your new home.',
      contactPerson: 'David Brown',
      email: 'david@contemporaryfurniture.ie',
      phone: '01-678-9012',
      website: 'www.contemporaryfurniture.ie',
      rating: 4.4,
      products: [
        {
          id: 'p9',
          name: 'Living Room Set',
          category: 'furniture',
          price: 2500,
          leadTime: '3-4 weeks',
          inStock: true
        },
        {
          id: 'p10',
          name: 'Dining Table and Chairs',
          category: 'furniture',
          price: 1800,
          leadTime: '2-3 weeks',
          inStock: true
        }
      ]
    }
  ];
  
  // Filter suppliers based on selected category and search query
  const filteredSuppliers = suppliers.filter(supplier => {
    if (selectedCategory !== 'all' && supplier.category !== selectedCategory) {
      return false;
    }
    if (searchQuery && !supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !supplier.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });
  
  // Handle supplier selection
  const handleSupplierSelect = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
  };
  
  // Render star rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`h-4 w-4 ${
              i < fullStars 
                ? 'text-yellow-400' 
                : i === fullStars && hasHalfStar
                ? 'text-yellow-400' 
                : 'text-gray-300'
            }`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  return (
    <div className="card">
      <h2 className="section-title">Supplier Integration</h2>
      <p className="mb-6 text-gray-600">
        Connect with our trusted suppliers for your home customization needs.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Supplier List */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <h3 className="font-semibold text-lg mb-4">Find Suppliers</h3>
            
            {/* Search */}
            <div className="mb-4">
              <label className="form-label">Search</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Search suppliers..."
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
          </div>
          
          {/* Supplier List */}
          <div className="space-y-3">
            {filteredSuppliers.length === 0 ? (
              <div className="text-center py-6 bg-gray-50 rounded-md">
                <p className="text-gray-500">No suppliers found matching your criteria.</p>
              </div>
            ) : (
              filteredSuppliers.map(supplier => (
                <div 
                  key={supplier.id}
                  className={`border rounded-md p-4 cursor-pointer transition-all ${
                    selectedSupplier?.id === supplier.id 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleSupplierSelect(supplier)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{supplier.name}</h4>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                      {categories.find(c => c.id === supplier.category)?.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{supplier.description}</p>
                  <div className="mt-2">
                    {renderRating(supplier.rating)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Supplier Details */}
        <div className="lg:col-span-2">
          {selectedSupplier ? (
            <div>
              <div className="bg-gray-50 p-6 rounded-md mb-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-xl">{selectedSupplier.name}</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-800">
                    {categories.find(c => c.id === selectedSupplier.category)?.name}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{selectedSupplier.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Person</h4>
                    <p className="text-gray-900">{selectedSupplier.contactPerson}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Rating</h4>
                    <div>{renderRating(selectedSupplier.rating)}</div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                    <p className="text-gray-900">{selectedSupplier.email}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Phone</h4>
                    <p className="text-gray-900">{selectedSupplier.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Website</h4>
                    <a href={`https://${selectedSupplier.website}`} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800">
                      {selectedSupplier.website}
                    </a>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button 
                    className="btn-primary"
                    onClick={() => setShowContactForm(true)}
                  >
                    Contact Supplier
                  </button>
                  <button className="btn-outline">
                    Add to Favorites
                  </button>
                </div>
              </div>
              
              {/* Products */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Available Products</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedSupplier.products.map(product => (
                    <div key={product.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{product.name}</h4>
                        <span className="font-bold">€{product.price.toLocaleString()}{product.category === 'flooring' ? '/m²' : ''}</span>
                      </div>
                      
                      <div className="mt-3 flex justify-between items-center text-sm">
                        <span className="text-gray-500">Lead Time: {product.leadTime}</span>
                        <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      
                      <div className="mt-4">
                        <button className="btn-outline py-1 px-3 text-sm w-full">
                          Request Quote
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-md">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No supplier selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select a supplier from the list to view details and products.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Contact Form Modal */}
      {showContactForm && selectedSupplier && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Contact {selectedSupplier.name}
            </h3>
            
            <form className="space-y-4">
              <div>
                <label className="form-label">Your Name</label>
                <input type="text" className="input-field" />
              </div>
              
              <div>
                <label className="form-label">Your Email</label>
                <input type="email" className="input-field" />
              </div>
              
              <div>
                <label className="form-label">Your Phone</label>
                <input type="tel" className="input-field" />
              </div>
              
              <div>
                <label className="form-label">Message</label>
                <textarea 
                  className="input-field min-h-[100px]" 
                  defaultValue={`I'm interested in products for my new home at Prop.ie.`}
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setShowContactForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    alert('Message sent to supplier!');
                    setShowContactForm(false);
                  }}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierIntegration;
