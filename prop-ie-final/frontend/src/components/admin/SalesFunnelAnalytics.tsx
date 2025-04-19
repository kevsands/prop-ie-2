import React, { useState } from 'react';

interface SalesFunnelData {
  stage: string;
  count: number;
  percentage: number;
}

interface ConversionMetric {
  name: string;
  value: number;
  change: number;
  isPositive: boolean;
}

const SalesFunnelAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('30');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  
  // Mock data for sales funnel
  const funnelData: SalesFunnelData[] = [
    { stage: 'Website Visitors', count: 2450, percentage: 100 },
    { stage: 'Property Views', count: 1830, percentage: 74.7 },
    { stage: 'Inquiries', count: 420, percentage: 17.1 },
    { stage: 'Viewings', count: 185, percentage: 7.6 },
    { stage: 'Reservations', count: 42, percentage: 1.7 },
    { stage: 'Contracts', count: 28, percentage: 1.1 },
    { stage: 'Completions', count: 22, percentage: 0.9 }
  ];
  
  // Mock data for conversion metrics
  const conversionMetrics: ConversionMetric[] = [
    { name: 'Visitor to Inquiry', value: 17.1, change: 2.3, isPositive: true },
    { name: 'Inquiry to Viewing', value: 44.0, change: -1.5, isPositive: false },
    { name: 'Viewing to Reservation', value: 22.7, change: 3.8, isPositive: true },
    { name: 'Reservation to Contract', value: 66.7, change: 4.2, isPositive: true },
    { name: 'Contract to Completion', value: 78.6, change: 0.5, isPositive: true }
  ];
  
  // Mock projects for filter
  const projects = [
    { id: 'all', name: 'All Projects' },
    { id: 'p1', name: 'Fitzgerald Gardens' },
    { id: 'p2', name: 'Riverside Apartments' },
    { id: 'p3', name: 'Ballymakennyview' }
  ];
  
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title mb-0">Sales Funnel Analytics</h2>
        <div className="flex space-x-4">
          <select
            className="input-field py-1 px-3"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <select
            className="input-field py-1 px-3"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
          >
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Sales Funnel Visualization */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-4">Sales Funnel</h3>
        <div className="space-y-3">
          {funnelData.map((stage, index) => (
            <div key={stage.stage} className="relative">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                <span className="text-sm font-medium text-gray-700">{stage.count} ({stage.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full ${
                    index === 0 ? 'bg-blue-600' :
                    index === 1 ? 'bg-blue-500' :
                    index === 2 ? 'bg-blue-400' :
                    index === 3 ? 'bg-blue-300' :
                    index === 4 ? 'bg-green-500' :
                    index === 5 ? 'bg-green-600' :
                    'bg-green-700'
                  }`} 
                  style={{ width: `${stage.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Conversion Metrics */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-4">Conversion Rates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {conversionMetrics.map(metric => (
            <div key={metric.name} className="bg-white p-4 rounded-md border border-gray-200">
              <h4 className="text-sm font-medium text-gray-500">{metric.name}</h4>
              <div className="flex items-end mt-1">
                <p className="text-2xl font-bold text-gray-900">{metric.value}%</p>
                <p className={`ml-2 text-sm ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.isPositive ? '+' : ''}{metric.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Visitor Sources */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-4">Visitor Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart Placeholder */}
          <div className="bg-gray-50 rounded-md p-4 flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-gray-400 mb-2">Pie Chart Placeholder</div>
              <div className="text-sm text-gray-500">
                In a real implementation, this would display a pie chart of visitor sources
              </div>
            </div>
          </div>
          
          {/* Source Table */}
          <div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visitors
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Direct
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    735
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      18.2%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Google Search
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    612
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      21.4%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Social Media
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    490
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      12.7%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Property Portals
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    368
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      24.5%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Email Campaigns
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    245
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      28.2%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button className="btn-outline">
          Export Data
        </button>
        <button className="btn-primary">
          Generate Detailed Report
        </button>
      </div>
    </div>
  );
};

export default SalesFunnelAnalytics;
