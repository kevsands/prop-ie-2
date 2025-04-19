import React, { useState } from 'react';

interface Upgrade {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  description: string;
  options: UpgradeOption[];
}

interface UpgradeOption {
  id: string;
  name: string;
  priceAdjustment: number;
  description: string;
  image: string;
  isDefault: boolean;
}

const UpgradeManagement: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedUpgrades, setSelectedUpgrades] = useState<{[key: string]: string}>({});
  
  // Mock upgrade categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'flooring', name: 'Flooring' },
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'bathroom', name: 'Bathroom' },
    { id: 'lighting', name: 'Lighting' },
    { id: 'exterior', name: 'Exterior' }
  ];
  
  // Mock upgrade options
  const upgrades: Upgrade[] = [
    {
      id: 'u1',
      name: 'Flooring Type',
      category: 'flooring',
      basePrice: 0,
      description: 'Choose your preferred flooring type for the living areas.',
      options: [
        {
          id: 'u1-o1',
          name: 'Standard Laminate',
          priceAdjustment: 0,
          description: 'Durable laminate flooring in a choice of finishes.',
          image: '/images/upgrades/laminate.jpg',
          isDefault: true
        },
        {
          id: 'u1-o2',
          name: 'Engineered Hardwood',
          priceAdjustment: 3500,
          description: 'Premium engineered hardwood with natural wood finish.',
          image: '/images/upgrades/hardwood.jpg',
          isDefault: false
        },
        {
          id: 'u1-o3',
          name: 'Luxury Vinyl Tile',
          priceAdjustment: 2200,
          description: 'Waterproof luxury vinyl tiles with stone or wood effect.',
          image: '/images/upgrades/vinyl.jpg',
          isDefault: false
        }
      ]
    },
    {
      id: 'u2',
      name: 'Kitchen Countertops',
      category: 'kitchen',
      basePrice: 0,
      description: 'Select your kitchen countertop material.',
      options: [
        {
          id: 'u2-o1',
          name: 'Standard Laminate',
          priceAdjustment: 0,
          description: 'Durable laminate countertops in a range of colors.',
          image: '/images/upgrades/laminate-counter.jpg',
          isDefault: true
        },
        {
          id: 'u2-o2',
          name: 'Granite',
          priceAdjustment: 4500,
          description: 'Natural granite countertops with unique patterns.',
          image: '/images/upgrades/granite.jpg',
          isDefault: false
        },
        {
          id: 'u2-o3',
          name: 'Quartz',
          priceAdjustment: 5200,
          description: 'Engineered quartz countertops with consistent patterns.',
          image: '/images/upgrades/quartz.jpg',
          isDefault: false
        }
      ]
    },
    {
      id: 'u3',
      name: 'Bathroom Fixtures',
      category: 'bathroom',
      basePrice: 0,
      description: 'Choose your bathroom fixture package.',
      options: [
        {
          id: 'u3-o1',
          name: 'Standard Package',
          priceAdjustment: 0,
          description: 'Quality standard bathroom fixtures and fittings.',
          image: '/images/upgrades/standard-bath.jpg',
          isDefault: true
        },
        {
          id: 'u3-o2',
          name: 'Premium Package',
          priceAdjustment: 3200,
          description: 'Premium fixtures with enhanced features and finishes.',
          image: '/images/upgrades/premium-bath.jpg',
          isDefault: false
        },
        {
          id: 'u3-o3',
          name: 'Luxury Package',
          priceAdjustment: 6500,
          description: 'High-end fixtures with designer finishes and smart features.',
          image: '/images/upgrades/luxury-bath.jpg',
          isDefault: false
        }
      ]
    },
    {
      id: 'u4',
      name: 'Lighting Package',
      category: 'lighting',
      basePrice: 0,
      description: 'Select your preferred lighting package.',
      options: [
        {
          id: 'u4-o1',
          name: 'Standard Lighting',
          priceAdjustment: 0,
          description: 'Basic lighting fixtures throughout the home.',
          image: '/images/upgrades/standard-light.jpg',
          isDefault: true
        },
        {
          id: 'u4-o2',
          name: 'Enhanced Lighting',
          priceAdjustment: 2800,
          description: 'Enhanced lighting with additional fixtures and dimmer controls.',
          image: '/images/upgrades/enhanced-light.jpg',
          isDefault: false
        },
        {
          id: 'u4-o3',
          name: 'Smart Lighting',
          priceAdjustment: 4500,
          description: 'Smart lighting system with app control and automation.',
          image: '/images/upgrades/smart-light.jpg',
          isDefault: false
        }
      ]
    }
  ];
  
  // Filter upgrades based on selected category
  const filteredUpgrades = upgrades.filter(upgrade => 
    selectedCategory === 'all' || upgrade.category === selectedCategory
  );
  
  // Initialize selected upgrades with default options if not already selected
  React.useEffect(() => {
    const defaults: {[key: string]: string} = {};
    upgrades.forEach(upgrade => {
      if (!selectedUpgrades[upgrade.id]) {
        const defaultOption = upgrade.options.find(option => option.isDefault);
        if (defaultOption) {
          defaults[upgrade.id] = defaultOption.id;
        }
      }
    });
    
    if (Object.keys(defaults).length > 0) {
      setSelectedUpgrades(prev => ({...prev, ...defaults}));
    }
  }, []);
  
  // Handle upgrade option selection
  const handleOptionSelect = (upgradeId: string, optionId: string) => {
    setSelectedUpgrades(prev => ({
      ...prev,
      [upgradeId]: optionId
    }));
  };
  
  // Calculate total upgrade cost
  const calculateTotalCost = () => {
    let total = 0;
    
    Object.entries(selectedUpgrades).forEach(([upgradeId, optionId]) => {
      const upgrade = upgrades.find(u => u.id === upgradeId);
      if (upgrade) {
        const option = upgrade.options.find(o => o.id === optionId);
        if (option) {
          total += option.priceAdjustment;
        }
      }
    });
    
    return total;
  };
  
  return (
    <div className="card">
      <h2 className="section-title">Upgrade Management</h2>
      <p className="mb-6 text-gray-600">
        Customize your home with premium upgrades and options.
      </p>
      
      {/* Category Tabs */}
      <div className="flex flex-wrap border-b border-gray-200 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            className={`py-2 px-4 text-sm font-medium ${
              selectedCategory === category.id
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Upgrade Options */}
      <div className="space-y-8 mb-8">
        {filteredUpgrades.map(upgrade => (
          <div key={upgrade.id} className="border rounded-md p-4">
            <h3 className="font-semibold text-lg mb-2">{upgrade.name}</h3>
            <p className="text-gray-600 mb-4">{upgrade.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upgrade.options.map(option => {
                const isSelected = selectedUpgrades[upgrade.id] === option.id;
                
                return (
                  <div 
                    key={option.id}
                    className={`border rounded-md p-4 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-primary-500 ring-2 ring-primary-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleOptionSelect(upgrade.id, option.id)}
                  >
                    {/* Image Placeholder */}
                    <div className="bg-gray-100 h-32 mb-3 rounded flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Image Placeholder</span>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{option.name}</h4>
                      <div className="text-right">
                        {option.priceAdjustment === 0 ? (
                          <span className="text-green-600 font-medium">Included</span>
                        ) : (
                          <span className="font-medium">+€{option.priceAdjustment.toLocaleString()}</span>
                        )}
                        {option.isDefault && (
                          <div className="text-xs text-gray-500">Default</div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary */}
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <h3 className="font-semibold text-lg mb-3">Upgrade Summary</h3>
        
        <div className="space-y-2 mb-4">
          {Object.entries(selectedUpgrades).map(([upgradeId, optionId]) => {
            const upgrade = upgrades.find(u => u.id === upgradeId);
            if (!upgrade) return null;
            
            const option = upgrade.options.find(o => o.id === optionId);
            if (!option) return null;
            
            return (
              <div key={upgradeId} className="flex justify-between">
                <div>
                  <span className="text-gray-700">{upgrade.name}:</span>
                  <span className="ml-2">{option.name}</span>
                </div>
                <div>
                  {option.priceAdjustment === 0 ? (
                    <span className="text-green-600">Included</span>
                  ) : (
                    <span>+€{option.priceAdjustment.toLocaleString()}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between font-semibold text-lg border-t pt-3">
          <span>Total Upgrade Cost:</span>
          <span>€{calculateTotalCost().toLocaleString()}</span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button 
          className="btn-outline"
          onClick={() => {
            // Reset to defaults
            const defaults: {[key: string]: string} = {};
            upgrades.forEach(upgrade => {
              const defaultOption = upgrade.options.find(option => option.isDefault);
              if (defaultOption) {
                defaults[upgrade.id] = defaultOption.id;
              }
            });
            setSelectedUpgrades(defaults);
          }}
        >
          Reset to Defaults
        </button>
        <button className="btn-primary">
          Save Upgrades
        </button>
      </div>
    </div>
  );
};

export default UpgradeManagement;
