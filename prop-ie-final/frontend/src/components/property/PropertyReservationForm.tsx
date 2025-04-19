import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PropertyReservationSchema = Yup.object().shape({
  agreeTerms: Yup.boolean()
    .oneOf([true], 'You must agree to the terms and conditions')
    .required('You must agree to the terms and conditions'),
  depositAmount: Yup.number()
    .min(1000, 'Deposit must be at least €1,000')
    .required('Deposit amount is required'),
});

interface PropertyReservationFormProps {
  propertyId: string;
  propertyName: string;
  propertyPrice: number;
  onReservationComplete: () => void;
}

const PropertyReservationForm: React.FC<PropertyReservationFormProps> = ({
  propertyId,
  propertyName,
  propertyPrice,
  onReservationComplete
}) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showTerms, setShowTerms] = React.useState(false);

  const handleSubmit = async (values: { agreeTerms: boolean; depositAmount: number }) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would call an API endpoint
      // For now, we'll simulate the API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate a successful reservation
      onReservationComplete();
      
    } catch (err: any) {
      setError(err.message || 'An error occurred while processing your reservation');
    } finally {
      setLoading(false);
    }
  };

  const minDeposit = Math.max(1000, propertyPrice * 0.05);

  return (
    <div className="card">
      <h2 className="section-title">Reserve Your Property</h2>
      <p className="mb-4 text-gray-600">
        Complete this form to legally reserve your rights to purchase this property.
        Your reservation is subject to contract signing within 21 days.
      </p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <h3 className="font-semibold text-lg mb-2">{propertyName}</h3>
        <p className="text-gray-700">Price: <span className="font-medium">€{propertyPrice.toLocaleString()}</span></p>
        <p className="text-gray-700">Minimum Deposit: <span className="font-medium">€{minDeposit.toLocaleString()}</span></p>
      </div>
      
      <Formik
        initialValues={{ agreeTerms: false, depositAmount: minDeposit }}
        validationSchema={PropertyReservationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="depositAmount" className="form-label">
                Booking Deposit Amount (€)
              </label>
              <Field
                id="depositAmount"
                name="depositAmount"
                type="number"
                min={minDeposit}
                className="input-field"
              />
              <ErrorMessage
                name="depositAmount"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
              <p className="mt-1 text-xs text-gray-500">
                The minimum booking deposit is €{minDeposit.toLocaleString()} (5% of the property price).
              </p>
            </div>

            <div className="mt-4">
              <button 
                type="button" 
                className="text-primary-600 hover:text-primary-800 text-sm underline"
                onClick={() => setShowTerms(!showTerms)}
              >
                {showTerms ? 'Hide Terms & Conditions' : 'View Terms & Conditions'}
              </button>
              
              {showTerms && (
                <div className="mt-2 p-4 bg-gray-50 rounded-md text-sm text-gray-700 max-h-60 overflow-y-auto">
                  <h4 className="font-semibold mb-2">Reservation Terms & Conditions</h4>
                  <p className="mb-2">
                    1. This reservation is subject to contract signing within 21 days from the date of reservation.
                  </p>
                  <p className="mb-2">
                    2. The booking deposit is refundable only if the seller fails to proceed with the sale.
                  </p>
                  <p className="mb-2">
                    3. If the buyer fails to proceed with the purchase, the booking deposit may be forfeited.
                  </p>
                  <p className="mb-2">
                    4. The booking deposit will be applied toward the purchase price upon contract signing.
                  </p>
                  <p className="mb-2">
                    5. This reservation does not constitute a legally binding contract for sale.
                  </p>
                  <p className="mb-2">
                    6. The buyer is advised to seek independent legal advice before proceeding.
                  </p>
                  <p className="mb-2">
                    7. The seller reserves the right to withdraw the property from sale at any time prior to contract signing.
                  </p>
                  <p>
                    8. All property details are subject to contract and final verification.
                  </p>
                </div>
              )}
              
              <div className="mt-4">
                <label className="flex items-start">
                  <Field
                    type="checkbox"
                    name="agreeTerms"
                    className="mt-1 mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the terms and conditions of this property reservation, including the requirement to sign a contract within 21 days.
                  </span>
                </label>
                <ErrorMessage
                  name="agreeTerms"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <div className="flex items-center space-x-4 mt-6">
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="btn-primary"
              >
                {loading ? 'Processing...' : 'Reserve Property'}
              </button>
              <p className="text-xs text-gray-500">
                You will be redirected to our secure payment processor to complete your deposit payment.
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PropertyReservationForm;
