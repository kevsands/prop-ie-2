import { createContext, useContext, useState, ReactNode } from 'react';

interface HTBApplication {
  id: string;
  claimCode: string;
  status: 'pending' | 'verified' | 'rejected';
  amount: number;
  applicationDate: Date;
}

interface HTBContextType {
  htbApplication: HTBApplication | null;
  loading: boolean;
  error: string | null;
  submitHTBClaim: (claimCode: string) => Promise<void>;
  checkHTBStatus: () => Promise<void>;
}

const HTBContext = createContext<HTBContextType | undefined>(undefined);

export const HTBProvider = ({ children }: { children: ReactNode }) => {
  const [htbApplication, setHTBApplication] = useState<HTBApplication | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitHTBClaim = async (claimCode: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would call an API endpoint
      // For now, we'll simulate the API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate a successful response
      setHTBApplication({
        id: 'htb-' + Math.random().toString(36).substr(2, 9),
        claimCode,
        status: 'pending',
        amount: 30000, // Example amount
        applicationDate: new Date()
      });
      
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting HTB claim');
    } finally {
      setLoading(false);
    }
  };

  const checkHTBStatus = async () => {
    if (!htbApplication) {
      setError('No HTB application found');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would call an API endpoint
      // For now, we'll simulate the API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate a status update (randomly choose verified or still pending)
      const newStatus = Math.random() > 0.5 ? 'verified' : 'pending';
      
      setHTBApplication({
        ...htbApplication,
        status: newStatus as 'pending' | 'verified' | 'rejected'
      });
      
    } catch (err: any) {
      setError(err.message || 'An error occurred while checking HTB status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <HTBContext.Provider
      value={{
        htbApplication,
        loading,
        error,
        submitHTBClaim,
        checkHTBStatus
      }}
    >
      {children}
    </HTBContext.Provider>
  );
};

export const useHTB = () => {
  const context = useContext(HTBContext);
  if (context === undefined) {
    throw new Error('useHTB must be used within an HTBProvider');
  }
  return context;
};
