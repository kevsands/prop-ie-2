import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface Contractor {
  id: string;
  name: string;
  company: string;
  trade: string;
  email: string;
  phone: string;
}

const ContractorSchema = Yup.object().shape({
  name: Yup.string().required('Contractor name is required'),
  company: Yup.string().required('Company name is required'),
  trade: Yup.string().required('Trade is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required')
});

const ContractorManagement: React.FC = () => {
  const [contractors, setContractors] = useState<Contractor[]>([
    {
      id: 'c1',
      name: 'John Murphy',
      company: 'Murphy Electrical Ltd',
      trade: 'Electrical',
      email: 'john@murphyelectrical.ie',
      phone: '087-123-4567'
    },
    {
      id: 'c2',
      name: 'Michael O\'Brien',
      company: 'O\'Brien Plumbing',
      trade: 'Plumbing',
      email: 'michael@obrienplumbing.ie',
      phone: '086-234-5678'
    },
    {
      id: 'c3',
      name: 'Sarah Kelly',
      company: 'Kelly Interiors',
      trade: 'Interior Design',
      email: 'sarah@kellyinteriors.ie',
      phone: '085-345-6789'
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContractor, setEditingContractor] = useState<Contractor | null>(null);
  
  const handleAddContractor = (values: Omit<Contractor, 'id'>, { resetForm }: any) => {
    const newContractor = {
      ...values,
      id: 'c' + (contractors.length + 1)
    };
    
    setContractors([...contractors, newContractor]);
    setShowAddForm(false);
    resetForm();
  };
  
  const handleEditContractor = (values: Contractor, { resetForm }: any) => {
    const updatedContractors = contractors.map(contractor => 
      contractor.id === values.id ? values : contractor
    );
    
    setContractors(updatedContractors);
    setEditingContractor(null);
    resetForm();
  };
  
  const handleDeleteContractor = (id: string) => {
    const updatedContractors = contractors.filter(contractor => contractor.id !== id);
    setContractors(updatedContractors);
  };
  
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title mb-0">Contractor Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          Add Contractor
        </button>
      </div>
      
      {/* Contractor List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trade
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contractors.map((contractor) => (
              <tr key={contractor.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{contractor.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{contractor.company}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {contractor.trade}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{contractor.email}</div>
                  <div>{contractor.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => setEditingContractor(contractor)}
                    className="text-primary-600 hover:text-primary-900 mr-4"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteContractor(contractor.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Add/Edit Contractor Form */}
      {(showAddForm || editingContractor) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingContractor ? 'Edit Contractor' : 'Add New Contractor'}
            </h3>
            
            <Formik
              initialValues={editingContractor || {
                name: '',
                company: '',
                trade: '',
                email: '',
                phone: ''
              }}
              validationSchema={ContractorSchema}
              onSubmit={editingContractor ? handleEditContractor : handleAddContractor}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="form-label">Name</label>
                    <Field name="name" type="text" className="input-field" />
                    <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="form-label">Company</label>
                    <Field name="company" type="text" className="input-field" />
                    <ErrorMessage name="company" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                  
                  <div>
                    <label htmlFor="trade" className="form-label">Trade</label>
                    <Field name="trade" as="select" className="input-field">
                      <option value="">Select a trade</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Carpentry">Carpentry</option>
                      <option value="Masonry">Masonry</option>
                      <option value="Painting">Painting</option>
                      <option value="Roofing">Roofing</option>
                      <option value="HVAC">HVAC</option>
                      <option value="Landscaping">Landscaping</option>
                      <option value="Interior Design">Interior Design</option>
                      <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage name="trade" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <Field name="email" type="email" className="input-field" />
                    <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <Field name="phone" type="text" className="input-field" />
                    <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      className="btn-outline"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingContractor(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractorManagement;
