import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface CustomizationOption {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface PropertyCustomizationProps {
  propertyId: string;
  propertyName: string;
  basePrice: number;
}

const flooringOptions: CustomizationOption[] = [
  { id: 'f1', name: 'Oak Hardwood', category: 'flooring', price: 3500, image: '/images/flooring/oak.jpg' },
  { id: 'f2', name: 'Walnut Hardwood', category: 'flooring', price: 4200, image: '/images/flooring/walnut.jpg' },
  { id: 'f3', name: 'Luxury Vinyl Tile', category: 'flooring', price: 2800, image: '/images/flooring/vinyl.jpg' },
  { id: 'f4', name: 'Ceramic Tile', category: 'flooring', price: 3000, image: '/images/flooring/ceramic.jpg' },
  { id: 'f5', name: 'Carpet', category: 'flooring', price: 2200, image: '/images/flooring/carpet.jpg' },
];

const kitchenOptions: CustomizationOption[] = [
  { id: 'k1', name: 'Standard Package', category: 'kitchen', price: 0, image: '/images/kitchen/standard.jpg' },
  { id: 'k2', name: 'Premium Package', category: 'kitchen', price: 8500, image: '/images/kitchen/premium.jpg' },
  { id: 'k3', name: 'Luxury Package', category: 'kitchen', price: 15000, image: '/images/kitchen/luxury.jpg' },
];

const bathroomOptions: CustomizationOption[] = [
  { id: 'b1', name: 'Standard Package', category: 'bathroom', price: 0, image: '/images/bathroom/standard.jpg' },
  { id: 'b2', name: 'Premium Package', category: 'bathroom', price: 6500, image: '/images/bathroom/premium.jpg' },
  { id: 'b3', name: 'Luxury Package', category: 'bathroom', price: 12000, image: '/images/bathroom/luxury.jpg' },
];

const PropertyCustomization: React.FC<PropertyCustomizationProps> = ({
  propertyId,
  propertyName,
  basePrice
}) => {
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: CustomizationOption}>({
    flooring: flooringOptions[0],
    kitchen: kitchenOptions[0],
    bathroom: bathroomOptions[0]
  });
  
  const [activeTab, setActiveTab] = useState('flooring');
  
  const handleOptionSelect = (option: CustomizationOption) => {
    const previousOption = selectedOptions[option.category];
    
    // Update selected options
    setSelectedOptions({
      ...selectedOptions,
      [option.category]: option
    });
    
    // Update total price
    setTotalPrice(totalPrice - previousOption.price + option.price);
  };
  
  return (
    <div className="card">
      <h2 className="section-title">Customize Your Home</h2>
      <p className="mb-4 text-gray-600">
        Personalize your new home with your preferred finishes and upgrades.
      </p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <h3 className="font-semibold text-lg mb-2">{propertyName}</h3>
        <div className="flex justify-between">
          <p className="text-gray-700">Base Price: <span className="font-medium">€{basePrice.toLocaleString()}</span></p>
          <p className="text-gray-700">Total Price: <span className="font-medium text-primary-700">€{totalPrice.toLocaleString()}</span></p>
        </div>
        <p className="text-gray-700 mt-1">Customization Cost: <span className="font-medium text-primary-700">€{(totalPrice - basePrice).toLocaleString()}</span></p>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('flooring')}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === 'flooring'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Flooring
          </button>
          <button
            onClick={() => setActiveTab('kitchen')}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === 'kitchen'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Kitchen
          </button>
          <button
            onClick={() => setActiveTab('bathroom')}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === 'bathroom'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Bathroom
          </button>
        </nav>
      </div>
      
      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {activeTab === 'flooring' && flooringOptions.map(option => (
          <div 
            key={option.id}
            onClick={() => handleOptionSelect(option)}
            className={`border rounded-md p-4 cursor-pointer transition-all ${
              selectedOptions.flooring.id === option.id 
                ? 'border-primary-500 ring-2 ring-primary-200' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="bg-gray-100 h-32 mb-3 rounded flex items-center justify-center">
              <span className="text-gray-400 text-sm">Image Placeholder</span>
            </div>
            <h4 className="font-medium">{option.name}</h4>
            <p className="text-sm text-gray-500 mt-1">
              {option.price === 0 
                ? 'Included in base price' 
                : `+€${option.price.toLocaleString()}`
              }
            </p>
          </div>
        ))}
        
        {activeTab === 'kitchen' && kitchenOptions.map(option => (
          <div 
            key={option.id}
            onClick={() => handleOptionSelect(option)}
            className={`border rounded-md p-4 cursor-pointer transition-all ${
              selectedOptions.kitchen.id === option.id 
                ? 'border-primary-500 ring-2 ring-primary-200' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="bg-gray-100 h-32 mb-3 rounded flex items-center justify-center">
              <span className="text-gray-400 text-sm">Image Placeholder</span>
            </div>
            <h4 className="font-medium">{option.name}</h4>
            <p className="text-sm text-gray-500 mt-1">
              {option.price === 0 
                ? 'Included in base price' 
                : `+€${option.price.toLocaleString()}`
              }
            </p>
          </div>
        ))}
        
        {activeTab === 'bathroom' && bathroomOptions.map(option => (
          <div 
            key={option.id}
            onClick={() => handleOptionSelect(option)}
            className={`border rounded-md p-4 cursor-pointer transition-all ${
              selectedOptions.bathroom.id === option.id 
                ? 'border-primary-500 ring-2 ring-primary-200' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="bg-gray-100 h-32 mb-3 rounded flex items-center justify-center">
              <span className="text-gray-400 text-sm">Image Placeholder</span>
            </div>
            <h4 className="font-medium">{option.name}</h4>
            <p className="text-sm text-gray-500 mt-1">
              {option.price === 0 
                ? 'Included in base price' 
                : `+€${option.price.toLocaleString()}`
              }
            </p>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-8">
        <button className="btn-outline">
          Reset Selections
        </button>
        <button className="btn-primary">
          Save Customizations
        </button>
      </div>
    </div>
  );
};

export default PropertyCustomization;
