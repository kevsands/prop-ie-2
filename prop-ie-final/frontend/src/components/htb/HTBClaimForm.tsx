import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHTB } from '../../context/HTBContext';

const HTBClaimSchema = Yup.object().shape({
  claimCode: Yup.string()
    .matches(/^HTB-\d{6}-[A-Z]{2}$/, 'Invalid HTB claim code format. Should be HTB-XXXXXX-XX')
    .required('Help-to-Buy claim code is required'),
});

const HTBClaimForm: React.FC = () => {
  const { submitHTBClaim, loading, error, htbApplication } = useHTB();

  return (
    <div className="card">
      <h2 className="section-title">Help-to-Buy Scheme</h2>
      <p className="mb-4 text-gray-600">
        The Help-to-Buy (HTB) incentive is a scheme for first-time property buyers. 
        It helps you with the deposit you need to buy or build a new house or apartment.
      </p>
      
      {htbApplication ? (
        <div className="mt-4">
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <h3 className="font-semibold text-green-800">HTB Application Submitted</h3>
            <p className="text-green-700 mt-1">Your HTB claim code has been submitted successfully.</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-gray-500">Claim Code</p>
                <p className="font-medium">{htbApplication.claimCode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className={`badge ${
                  htbApplication.status === 'verified' 
                    ? 'badge-success' 
                    : htbApplication.status === 'rejected'
                    ? 'badge-error'
                    : 'badge-warning'
                }`}>
                  {htbApplication.status.charAt(0).toUpperCase() + htbApplication.status.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">€{htbApplication.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Application Date</p>
                <p className="font-medium">{new Date(htbApplication.applicationDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={{ claimCode: '' }}
          validationSchema={HTBClaimSchema}
          onSubmit={(values) => {
            submitHTBClaim(values.claimCode);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="claimCode" className="form-label">
                  Help-to-Buy Claim Code
                </label>
                <Field
                  id="claimCode"
                  name="claimCode"
                  type="text"
                  placeholder="HTB-123456-AB"
                  className="input-field"
                />
                <ErrorMessage
                  name="claimCode"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter the claim code you received from Revenue's HTB portal.
                </p>
              </div>

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="btn-primary"
                >
                  {loading ? 'Submitting...' : 'Submit HTB Claim'}
                </button>
                <a
                  href="https://www.revenue.ie/en/property/help-to-buy-incentive/index.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-800 text-sm"
                >
                  Learn more about Help-to-Buy
                </a>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default HTBClaimForm;
