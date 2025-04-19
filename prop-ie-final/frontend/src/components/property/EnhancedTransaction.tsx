import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface TransactionStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface EnhancedTransactionProps {
  propertyId: string;
  propertyName: string;
  propertyPrice: number;
}

const EnhancedTransaction: React.FC<EnhancedTransactionProps> = ({
  propertyId,
  propertyName,
  propertyPrice
}) => {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  
  const transactionSteps: TransactionStep[] = [
    {
      id: 'reservation',
      title: 'Property Reservation',
      description: 'Reserve your property with a booking deposit',
      status: 'completed'
    },
    {
      id: 'mortgage',
      title: 'Mortgage Approval',
      description: 'Upload your mortgage approval documents',
      status: 'current'
    },
    {
      id: 'legal',
      title: 'Legal Process',
      description: 'Contract review and signing with your solicitor',
      status: 'upcoming'
    },
    {
      id: 'closing',
      title: 'Closing',
      description: 'Final payment and key handover',
      status: 'upcoming'
    }
  ];
  
  const handleContinue = () => {
    if (currentStepIndex < transactionSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      
      // Update the step statuses
      transactionSteps[currentStepIndex - 1].status = 'completed';
      transactionSteps[currentStepIndex].status = 'current';
    }
  };
  
  return (
    <div className="card">
      <h2 className="section-title">Purchase Transaction</h2>
      <p className="mb-6 text-gray-600">
        Track and manage your property purchase process from reservation to closing.
      </p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <h3 className="font-semibold text-lg mb-2">{propertyName}</h3>
        <p className="text-gray-700">Price: <span className="font-medium">€{propertyPrice.toLocaleString()}</span></p>
        <p className="text-gray-700">Transaction ID: <span className="font-medium">TRX-{propertyId}</span></p>
      </div>
      
      {/* Transaction Progress */}
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="h-0.5 w-full bg-gray-200"></div>
        </div>
        <ul className="relative flex justify-between">
          {transactionSteps.map((step, index) => (
            <li key={step.id} className="flex flex-col items-center">
              <div 
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step.status === 'completed' 
                    ? 'bg-primary-600' 
                    : step.status === 'current'
                    ? 'bg-white border-2 border-primary-600 text-primary-600' 
                    : 'bg-white border-2 border-gray-300 text-gray-500'
                }`}
              >
                {step.status === 'completed' ? (
                  <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-medium text-gray-900">{step.title}</div>
                <div className="text-xs text-gray-500 mt-1 max-w-[120px]">{step.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Current Step Content */}
      <div className="border rounded-md p-6 mb-6">
        {currentStepIndex === 1 && (
          <div>
            <h3 className="font-semibold text-lg mb-3">Mortgage Approval</h3>
            <p className="text-gray-600 mb-4">
              Upload your mortgage approval documents to proceed with the purchase process.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="form-label">Mortgage Provider</label>
                <select className="input-field">
                  <option value="">Select your mortgage provider</option>
                  <option value="aib">AIB</option>
                  <option value="boi">Bank of Ireland</option>
                  <option value="ptsb">Permanent TSB</option>
                  <option value="ulster">Ulster Bank</option>
                  <option value="kbc">KBC</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="form-label">Mortgage Approval Document</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, JPG, or PNG (Max. 10MB)</p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
              
              <div>
                <label className="form-label">Loan Amount Approved</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">€</span>
                  </div>
                  <input type="text" className="input-field pl-8" placeholder="Enter loan amount" />
                </div>
              </div>
              
              <div>
                <label className="form-label">Approval Expiry Date</label>
                <input type="date" className="input-field" />
              </div>
            </div>
          </div>
        )}
        
        {currentStepIndex === 2 && (
          <div>
            <h3 className="font-semibold text-lg mb-3">Legal Process</h3>
            <p className="text-gray-600 mb-4">
              Work with your solicitor to review and sign the purchase contract.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="form-label">Solicitor Details</label>
                <input type="text" className="input-field" placeholder="Solicitor name" />
              </div>
              
              <div>
                <label className="form-label">Solicitor Email</label>
                <input type="email" className="input-field" placeholder="Solicitor email address" />
              </div>
              
              <div>
                <label className="form-label">Solicitor Phone</label>
                <input type="tel" className="input-field" placeholder="Solicitor phone number" />
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <h4 className="font-semibold text-yellow-800 text-sm">Next Steps</h4>
                <p className="text-yellow-700 text-sm mt-1">
                  Our legal team will contact your solicitor within 2 business days to initiate the contract process.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {currentStepIndex === 3 && (
          <div>
            <h3 className="font-semibold text-lg mb-3">Closing</h3>
            <p className="text-gray-600 mb-4">
              Complete the final payment and prepare for key handover.
            </p>
            
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <h4 className="font-semibold text-green-800 text-sm">Closing Date Scheduled</h4>
                <p className="text-green-700 text-sm mt-1">
                  Your closing date has been scheduled for <span className="font-medium">June 15, 2025</span>.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Closing Checklist</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span className="text-sm text-gray-700">Final walkthrough scheduled</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span className="text-sm text-gray-700">Closing funds arranged</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span className="text-sm text-gray-700">Insurance policy secured</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span className="text-sm text-gray-700">Utilities transfer arranged</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <button 
          className="btn-outline"
          onClick={() => router.back()}
        >
          Back
        </button>
        <button 
          className="btn-primary"
          onClick={handleContinue}
          disabled={currentStepIndex >= transactionSteps.length - 1}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default EnhancedTransaction;
