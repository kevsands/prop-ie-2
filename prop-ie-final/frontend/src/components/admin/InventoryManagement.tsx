import React, { useState } from 'react';

interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: 'available' | 'reserved' | 'sold';
  type: 'apartment' | 'house' | 'duplex';
  developmentId: string;
}

const InventoryManagement: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 'prop1',
      name: 'Fitzgerald Gardens - Unit 14',
      location: 'Dublin, Ireland',
      price: 385000,
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      status: 'available',
      type: 'apartment',
      developmentId: 'p1'
    },
    {
      id: 'prop2',
      name: 'Fitzgerald Gardens - Unit 15',
      location: 'Dublin, Ireland',
      price: 395000,
      bedrooms: 3,
      bathrooms: 2.5,
      area: 125,
      status: 'available',
      type: 'apartment',
      developmentId: 'p1'
    },
    {
      id: 'prop3',
      name: 'Ballymakennyview - Unit 8',
      location: 'Drogheda, Ireland',
      price: 325000,
      bedrooms: 2,
      bathrooms: 2,
      area: 95,
      status: 'reserved',
      type: 'apartment',
      developmentId: 'p3'
    },
    {
      id: 'prop4',
      name: 'Riverside Apartments - Unit 7',
      location: 'Cork, Ireland',
      price: 275000,
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      status: 'available',
      type: 'apartment',
      developmentId: 'p2'
    },
    {
      id: 'prop5',
      name: 'Oakwood Terrace - Unit 3',
      location: 'Galway, Ireland',
      price: 425000,
      bedrooms: 4,
      bathrooms: 3,
      area: 150,
      status: 'sold',
      type: 'house',
      developmentId: 'p4'
    }
  ]);
  
  const [filterDevelopment, setFilterDevelopment] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  
  const developments = [
    { id: 'p1', name: 'Fitzgerald Gardens' },
    { id: 'p2', name: 'Riverside Apartments' },
    { id: 'p3', name: 'Ballymakennyview' },
    { id: 'p4', name: 'Oakwood Terrace' }
  ];
  
  const filteredProperties = properties.filter(property => {
    if (filterDevelopment !== 'all' && property.developmentId !== filterDevelopment) {
      return false;
    }
    if (filterStatus !== 'all' && property.status !== filterStatus) {
      return false;
    }
    if (filterType !== 'all' && property.type !== filterType) {
      return false;
    }
    return true;
  });
  
  const updatePropertyStatus = (id: string, newStatus: Property['status']) => {
    const updatedProperties = properties.map(property => 
      property.id === id ? { ...property, status: newStatus } : property
    );
    setProperties(updatedProperties);
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Calculate inventory statistics
  const totalProperties = properties.length;
  const availableProperties = properties.filter(p => p.status === 'available').length;
  const reservedProperties = properties.filter(p => p.status === 'reserved').length;
  const soldProperties = properties.filter(p => p.status === 'sold').length;
  
  const availablePercentage = (availableProperties / totalProperties) * 100;
  const reservedPercentage = (reservedProperties / totalProperties) * 100;
  const soldPercentage = (soldProperties / totalProperties) * 100;
  
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title mb-0">Inventory Management</h2>
        <button className="btn-primary">
          Add New Property
        </button>
      </div>
      
      {/* Inventory Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-md border border-gray-200">
          <h4 className="text-sm font-medium text-gray-500">Total Properties</h4>
          <p className="text-2xl font-bold text-gray-900">{totalProperties}</p>
        </div>
        <div className="bg-white p-4 rounded-md border border-gray-200">
          <h4 className="text-sm font-medium text-gray-500">Available</h4>
          <p className="text-2xl font-bold text-green-600">{availableProperties}</p>
          <p className="text-sm text-gray-500">{availablePercentage.toFixed(1)}% of total</p>
        </div>
        <div className="bg-white p-4 rounded-md border border-gray-200">
          <h4 className="text-sm font-medium text-gray-500">Reserved</h4>
          <p className="text-2xl font-bold text-yellow-600">{reservedProperties}</p>
          <p className="text-sm text-gray-500">{reservedPercentage.toFixed(1)}% of total</p>
        </div>
        <div className="bg-white p-4 rounded-md border border-gray-200">
          <h4 className="text-sm font-medium text-gray-500">Sold</h4>
          <p className="text-2xl font-bold text-blue-600">{soldProperties}</p>
          <p className="text-sm text-gray-500">{soldPercentage.toFixed(1)}% of total</p>
        </div>
      </div>
      
      {/* Inventory Status Bar */}
      <div className="mb-6">
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div className="flex h-full">
            <div 
              className="bg-green-500 h-full" 
              style={{ width: `${availablePercentage}%` }}
              title={`Available: ${availableProperties} (${availablePercentage.toFixed(1)}%)`}
            ></div>
            <div 
              className="bg-yellow-500 h-full" 
              style={{ width: `${reservedPercentage}%` }}
              title={`Reserved: ${reservedProperties} (${reservedPercentage.toFixed(1)}%)`}
            ></div>
            <div 
              className="bg-blue-500 h-full" 
              style={{ width: `${soldPercentage}%` }}
              title={`Sold: ${soldProperties} (${soldPercentage.toFixed(1)}%)`}
            ></div>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <div>Available: {availableProperties} ({availablePercentage.toFixed(1)}%)</div>
          <div>Reserved: {reservedProperties} ({reservedPercentage.toFixed(1)}%)</div>
          <div>Sold: {soldProperties} ({soldPercentage.toFixed(1)}%)</div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="form-label">Filter by Development</label>
          <select 
            className="input-field"
            value={filterDevelopment}
            onChange={(e) => setFilterDevelopment(e.target.value)}
          >
            <option value="all">All Developments</option>
            {developments.map(dev => (
              <option key={dev.id} value={dev.id}>{dev.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">Filter by Status</label>
          <select 
            className="input-field"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        <div>
          <label className="form-label">Filter by Type</label>
          <select 
            className="input-field"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="duplex">Duplex</option>
          </select>
        </div>
      </div>
      
      {/* Properties List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <tr key={property.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{property.name}</div>
                    <div className="text-sm text-gray-500">{property.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {property.bedrooms} bed • {property.bathrooms} bath • {property.area} m²
                    </div>
                    <div className="text-sm text-gray-500 capitalize">{property.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">€{property.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">€{Math.round(property.price / property.area).toLocaleString()}/m²</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(property.status)}`}>
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <select 
                        className="text-sm border border-gray-300 rounded-md p-1"
                        value={property.status}
                        onChange={(e) => updatePropertyStatus(property.id, e.target.value as Property['status'])}
                      >
                        <option value="available">Available</option>
                        <option value="reserved">Reserved</option>
                        <option value="sold">Sold</option>
                      </select>
                      <button className="text-primary-600 hover:text-primary-900">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No properties found matching the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManagement;
