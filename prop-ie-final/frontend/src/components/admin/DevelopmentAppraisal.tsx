import React, { useState } from 'react';

interface Project {
  id: string;
  name: string;
  location: string;
  totalUnits: number;
  soldUnits: number;
  reservedUnits: number;
  availableUnits: number;
  startDate: string;
  completionDate: string;
  status: 'planning' | 'construction' | 'selling' | 'completed';
}

interface DevelopmentAppraisalProps {
  projects: Project[];
}

const DevelopmentAppraisal: React.FC<DevelopmentAppraisalProps> = ({ projects = [] }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Mock data if no projects are provided
  const mockProjects: Project[] = [
    {
      id: 'p1',
      name: 'Fitzgerald Gardens',
      location: 'Dublin, Ireland',
      totalUnits: 45,
      soldUnits: 28,
      reservedUnits: 7,
      availableUnits: 10,
      startDate: '2024-06-01',
      completionDate: '2025-12-31',
      status: 'selling'
    },
    {
      id: 'p2',
      name: 'Riverside Apartments',
      location: 'Cork, Ireland',
      totalUnits: 32,
      soldUnits: 15,
      reservedUnits: 5,
      availableUnits: 12,
      startDate: '2024-03-15',
      completionDate: '2025-09-30',
      status: 'construction'
    },
    {
      id: 'p3',
      name: 'Ballymakennyview',
      location: 'Drogheda, Ireland',
      totalUnits: 28,
      soldUnits: 22,
      reservedUnits: 4,
      availableUnits: 2,
      startDate: '2023-10-01',
      completionDate: '2025-06-30',
      status: 'selling'
    }
  ];
  
  const displayProjects = projects.length > 0 ? projects : mockProjects;
  
  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };
  
  const calculateSalesRate = (project: Project) => {
    return ((project.soldUnits + project.reservedUnits) / project.totalUnits) * 100;
  };
  
  const calculateProjectCompletion = (project: Project) => {
    const startDate = new Date(project.startDate);
    const completionDate = new Date(project.completionDate);
    const currentDate = new Date();
    
    const totalDuration = completionDate.getTime() - startDate.getTime();
    const elapsedDuration = currentDate.getTime() - startDate.getTime();
    
    return Math.min(Math.max(Math.round((elapsedDuration / totalDuration) * 100), 0), 100);
  };
  
  return (
    <div className="card">
      <h2 className="section-title">Development Appraisal</h2>
      <p className="mb-6 text-gray-600">
        Analyze and track the performance of your development projects.
      </p>
      
      {/* Project Selection */}
      <div className="mb-6">
        <label className="form-label">Select Project</label>
        <select 
          className="input-field"
          onChange={(e) => {
            const project = displayProjects.find(p => p.id === e.target.value);
            if (project) handleProjectSelect(project);
          }}
          value={selectedProject?.id || ''}
        >
          <option value="">Select a project</option>
          {displayProjects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name} - {project.location}
            </option>
          ))}
        </select>
      </div>
      
      {selectedProject ? (
        <div>
          {/* Project Overview */}
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="font-semibold text-lg mb-2">{selectedProject.name}</h3>
            <p className="text-gray-700">Location: <span className="font-medium">{selectedProject.location}</span></p>
            <p className="text-gray-700">Status: 
              <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${selectedProject.status === 'planning' ? 'bg-blue-100 text-blue-800' : 
                  selectedProject.status === 'construction' ? 'bg-yellow-100 text-yellow-800' :
                  selectedProject.status === 'selling' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'}`}>
                {selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}
              </span>
            </p>
            <p className="text-gray-700">Timeline: <span className="font-medium">{new Date(selectedProject.startDate).toLocaleDateString()} to {new Date(selectedProject.completionDate).toLocaleDateString()}</span></p>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-md border border-gray-200">
              <h4 className="text-sm font-medium text-gray-500">Total Units</h4>
              <p className="text-2xl font-bold text-gray-900">{selectedProject.totalUnits}</p>
            </div>
            <div className="bg-white p-4 rounded-md border border-gray-200">
              <h4 className="text-sm font-medium text-gray-500">Sold Units</h4>
              <p className="text-2xl font-bold text-green-600">{selectedProject.soldUnits}</p>
              <p className="text-sm text-gray-500">{Math.round((selectedProject.soldUnits / selectedProject.totalUnits) * 100)}% of total</p>
            </div>
            <div className="bg-white p-4 rounded-md border border-gray-200">
              <h4 className="text-sm font-medium text-gray-500">Reserved Units</h4>
              <p className="text-2xl font-bold text-yellow-600">{selectedProject.reservedUnits}</p>
              <p className="text-sm text-gray-500">{Math.round((selectedProject.reservedUnits / selectedProject.totalUnits) * 100)}% of total</p>
            </div>
            <div className="bg-white p-4 rounded-md border border-gray-200">
              <h4 className="text-sm font-medium text-gray-500">Available Units</h4>
              <p className="text-2xl font-bold text-blue-600">{selectedProject.availableUnits}</p>
              <p className="text-sm text-gray-500">{Math.round((selectedProject.availableUnits / selectedProject.totalUnits) * 100)}% of total</p>
            </div>
          </div>
          
          {/* Progress Bars */}
          <div className="space-y-6 mb-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Sales Rate</span>
                <span className="text-sm font-medium text-gray-700">{calculateSalesRate(selectedProject).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${calculateSalesRate(selectedProject)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Project Completion</span>
                <span className="text-sm font-medium text-gray-700">{calculateProjectCompletion(selectedProject)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${calculateProjectCompletion(selectedProject)}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Financial Summary */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Financial Summary</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Metric
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Projected
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actual
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Variance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Total Revenue
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      €{(selectedProject.totalUnits * 350000).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      €{(selectedProject.soldUnits * 350000).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        selectedProject.soldUnits >= selectedProject.totalUnits * 0.7 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {Math.round((selectedProject.soldUnits / selectedProject.totalUnits) * 100)}%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Construction Costs
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      €{(selectedProject.totalUnits * 200000).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      €{(selectedProject.totalUnits * 210000).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        +5%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Marketing Expenses
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      €{(selectedProject.totalUnits * 5000).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      €{(selectedProject.totalUnits * 4500).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        -10%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Projected Profit
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      €{(selectedProject.totalUnits * 145000).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      €{(selectedProject.soldUnits * 350000 - selectedProject.totalUnits * 214500).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        (selectedProject.soldUnits * 350000 - selectedProject.totalUnits * 214500) >= (selectedProject.totalUnits * 145000 * 0.8)
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {Math.round(((selectedProject.soldUnits * 350000 - selectedProject.totalUnits * 214500) / (selectedProject.totalUnits * 145000)) * 100)}%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button className="btn-outline">
              Export Report
            </button>
            <button className="btn-primary">
              View Detailed Analysis
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No project selected</h3>
          <p className="mt-1 text-sm text-gray-500">
            Select a project to view its development appraisal.
          </p>
        </div>
      )}
    </div>
  );
};

export default DevelopmentAppraisal;
