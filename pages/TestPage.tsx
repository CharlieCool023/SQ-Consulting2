import React, { useState } from 'react';
import { saveSubmission, supabase } from '../services/supabaseService';

export const TestPage: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [testResult, setTestResult] = useState<any>(null);

  const testConnection = async () => {
    setStatus('Testing Supabase connection...');
    try {
      // Check if supabase is initialized
      if (!supabase) {
        setStatus('❌ Supabase client not initialized');
        return;
      }

      // Test environment variables
      const url = import.meta.env.VITE_SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!url || !key) {
        setStatus('❌ Environment variables missing');
        setTestResult({ url: !!url, key: !!key });
        return;
      }

      setTestResult({ url: !!url, key: !!key });

      // Test a simple query
      const { data, error } = await supabase
        .from('submissions')
        .select('count', { count: 'exact', head: true });

      if (error) {
        setStatus(`❌ Query failed: ${error.message}`);
        setTestResult({ error: error.message });
        return;
      }

      setStatus('✅ Supabase connection successful!');
      setTestResult({ success: true, data });
    } catch (error: any) {
      setStatus(`❌ Error: ${error.message}`);
      setTestResult({ error: error.message });
    }
  };

  const testSubmission = async () => {
    setStatus('Testing submission...');
    try {
      const testData = {
        name: `Test User ${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        phone: '+1234567890',
        subject: 'Test Booking',
        message: 'This is a test submission from the test page'
      };

      const result = await saveSubmission(testData);
      
      if (result.success) {
        setStatus('✅ Submission saved successfully!');
        setTestResult({ success: true, data: testData });
      } else {
        setStatus(`❌ Submission failed: ${result.message}`);
        setTestResult({ error: result.message });
      }
    } catch (error: any) {
      setStatus(`❌ Error: ${error.message}`);
      setTestResult({ error: error.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Database Test Page</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <p className="text-lg mb-4">{status}</p>
          
          {testResult && (
            <div className="bg-gray-700 p-4 rounded mb-4 font-mono text-sm overflow-auto max-h-64">
              <pre>{JSON.stringify(testResult, null, 2)}</pre>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={testConnection}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-bold transition"
            >
              Test Connection
            </button>
            <button
              onClick={testSubmission}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded font-bold transition"
            >
              Test Submission
            </button>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Environment Info</h2>
          <div className="font-mono text-sm space-y-2">
            <div>VITE_SUPABASE_URL: {import.meta.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Not set'}</div>
            <div>VITE_SUPABASE_ANON_KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not set'}</div>
            <div>Current URL: {window.location.href}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
