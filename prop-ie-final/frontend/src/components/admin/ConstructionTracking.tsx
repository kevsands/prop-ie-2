import React, { useState } from 'react';

interface ConstructionAppointment {
  id: string;
  projectId: string;
  projectName: string;
  contractorId: string;
  contractorName: string;
  trade: string;
  startDate: string;
  endDate: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'delayed' | 'cancelled';
  notes: string;
}

const ConstructionTracking: React.FC = () => {
  const [appointments, setAppointments] = useState<ConstructionAppointment[]>([
    {
      id: 'a1',
      projectId: 'p1',
      projectName: 'Fitzgerald Gardens',
      contractorId: 'c1',
      contractorName: 'John Murphy - Murphy Electrical Ltd',
      trade: 'Electrical',
      startDate: '2025-05-10',
      endDate: '2025-05-25',
      status: 'scheduled',
      notes: 'First floor wiring installation'
    },
    {
      id: 'a2',
      projectId: 'p1',
      projectName: 'Fitzgerald Gardens',
      contractorId: 'c2',
      contractorName: 'Michael O\'Brien - O\'Brien Plumbing',
      trade: 'Plumbing',
      startDate: '2025-04-15',
      endDate: '2025-05-05',
      status: 'in_progress',
      notes: 'Bathroom fixtures installation'
    },
    {
      id: 'a3',
      projectId: 'p2',
      projectName: 'Riverside Apartments',
      contractorId: 'c3',
      contractorName: 'Sarah Kelly - Kelly Interiors',
      trade: 'Interior Design',
      startDate: '2025-06-01',
      endDate: '2025-06-15',
      status: 'scheduled',
      notes: 'Kitchen design finalization'
    }
  ]);
  
  const [filterProject, setFilterProject] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const projects = [
    { id: 'p1', name: 'Fitzgerald Gardens' },
    { id: 'p2', name: 'Riverside Apartments' },
    { id: 'p3', name: 'Ballymakennyview' }
  ];
  
  const filteredAppointments = appointments.filter(appointment => {
    if (filterProject !== 'all' && appointment.projectId !== filterProject) {
      return false;
    }
    if (filterStatus !== 'all' && appointment.status !== filterStatus) {
      return false;
    }
    return true;
  });
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'delayed':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const updateAppointmentStatus = (id: string, newStatus: ConstructionAppointment['status']) => {
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: newStatus } : appointment
    );
    setAppointments(updatedAppointments);
  };
  
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title mb-0">Construction Tracking</h2>
        <button className="btn-primary">
          Schedule New Appointment
        </button>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="form-label">Filter by Project</label>
          <select 
            className="input-field"
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
          >
            <option value="all">All Projects</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
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
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      {/* Appointments List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contractor
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timeline
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
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{appointment.projectName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{appointment.contractorName}</div>
                    <div className="text-sm text-gray-500">{appointment.trade}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(appointment.startDate).toLocaleDateString()} - {new Date(appointment.endDate).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-500">{appointment.notes}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(appointment.status)}`}>
                      {appointment.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <select 
                        className="text-sm border border-gray-300 rounded-md p-1"
                        value={appointment.status}
                        onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value as ConstructionAppointment['status'])}
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="delayed">Delayed</option>
                        <option value="cancelled">Cancelled</option>
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
                  No appointments found matching the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Timeline View */}
      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-4">Construction Timeline</h3>
        <div className="relative">
          {/* Timeline Header */}
          <div className="flex border-b border-gray-200 pb-2">
            <div className="w-1/4 text-xs font-medium text-gray-500">Project</div>
            <div className="w-3/4 flex">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="flex-1 text-center text-xs font-medium text-gray-500">
                  {new Date(2025, i, 1).toLocaleDateString('default', { month: 'short' })}
                </div>
              ))}
            </div>
          </div>
          
          {/* Timeline Rows */}
          {projects.map(project => {
            const projectAppointments = appointments.filter(a => a.projectId === project.id);
            
            return (
              <div key={project.id} className="flex py-3 border-b border-gray-100">
                <div className="w-1/4 text-sm font-medium text-gray-900">{project.name}</div>
                <div className="w-3/4 relative">
                  {projectAppointments.map(appointment => {
                    const startDate = new Date(appointment.startDate);
                    const endDate = new Date(appointment.endDate);
                    const startMonth = startDate.getMonth();
                    const endMonth = endDate.getMonth();
                    const startPosition = (startMonth / 12) * 100;
                    const duration = ((endMonth - startMonth) + (endDate.getDate() / 30)) / 12 * 100;
                    
                    return (
                      <div 
                        key={appointment.id}
                        className={`absolute h-6 rounded-md text-xs flex items-center justify-center px-2 text-white ${
                          appointment.status === 'completed' ? 'bg-green-500' :
                          appointment.status === 'in_progress' ? 'bg-yellow-500' :
                          appointment.status === 'delayed' ? 'bg-orange-500' :
                          appointment.status === 'cancelled' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`}
                        style={{ 
                          left: `${startPosition}%`, 
                          width: `${Math.max(duration, 8)}%`,
                          top: projectAppointments.indexOf(appointment) * 28 + 'px'
                        }}
                      >
                        {appointment.trade}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConstructionTracking;
