import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseService';

interface TableStatus {
  name: string;
  exists: boolean;
  rowCount?: number;
  error?: string;
}

export const DiagnosticsPage: React.FC = () => {
  const [tableStatuses, setTableStatuses] = useState<TableStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectionOk, setConnectionOk] = useState(false);

  useEffect(() => {
    checkDatabaseStatus();
  }, []);

  const checkDatabaseStatus = async () => {
    try {
      const tables = ['submissions', 'blogs', 'careers', 'banners', 'admin_users'];
      const statuses: TableStatus[] = [];

      for (const table of tables) {
        try {
          const { count, error } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: false })
            .limit(1);

          if (error && error.code === 'PGRST116') {
            statuses.push({
              name: table,
              exists: false,
              error: 'Table does not exist',
            });
          } else if (error) {
            statuses.push({
              name: table,
              exists: false,
              error: error.message,
            });
          } else {
            statuses.push({
              name: table,
              exists: true,
              rowCount: count || 0,
            });
            setConnectionOk(true);
          }
        } catch (err: any) {
          statuses.push({
            name: table,
            exists: false,
            error: err.message,
          });
        }
      }

      setTableStatuses(statuses);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
          <h1 className="text-4xl font-bold text-white mb-2">Database Diagnostics</h1>
          <p className="text-slate-400 mb-8">Check Supabase table status</p>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin">
                <span className="material-icons text-primary text-4xl">sync</span>
              </div>
              <span className="text-white ml-4">Checking database...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Connection Status */}
              <div className={`p-4 rounded-xl border ${connectionOk ? 'bg-green-500/10 border-green-400/30' : 'bg-red-500/10 border-red-400/30'}`}>
                <div className="flex items-center gap-3">
                  <span className={`material-icons ${connectionOk ? 'text-green-400' : 'text-red-400'}`}>
                    {connectionOk ? 'check_circle' : 'error'}
                  </span>
                  <div>
                    <h3 className={`font-bold ${connectionOk ? 'text-green-400' : 'text-red-400'}`}>
                      {connectionOk ? 'Connected to Supabase ✅' : 'Not Connected ❌'}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {connectionOk ? 'All systems operational' : 'Check your .env.local credentials'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Table Status */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-white mb-4">Table Status</h2>
                <div className="space-y-3">
                  {tableStatuses.map((table) => (
                    <div
                      key={table.name}
                      className={`p-4 rounded-xl border ${
                        table.exists
                          ? 'bg-green-500/10 border-green-400/30'
                          : 'bg-red-500/10 border-red-400/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`material-icons ${table.exists ? 'text-green-400' : 'text-red-400'}`}>
                            {table.exists ? 'check' : 'close'}
                          </span>
                          <div>
                            <h3 className={`font-bold ${table.exists ? 'text-green-400' : 'text-red-400'}`}>
                              {table.name}
                            </h3>
                            {table.exists && (
                              <p className="text-slate-400 text-sm">{table.rowCount} rows</p>
                            )}
                            {table.error && (
                              <p className="text-red-300 text-sm">{table.error}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-8 p-4 bg-blue-500/10 border border-blue-400/30 rounded-xl">
                <h3 className="text-blue-400 font-bold mb-2">Missing Tables?</h3>
                <ol className="text-blue-200 text-sm space-y-2">
                  <li>1. Go to Supabase Dashboard → SQL Editor</li>
                  <li>2. Copy all content from SUPABASE_SETUP.sql</li>
                  <li>3. Paste and execute in SQL Editor</li>
                  <li>4. Refresh this page to verify</li>
                </ol>
              </div>

              {/* Refresh Button */}
              <button
                onClick={checkDatabaseStatus}
                className="w-full mt-8 bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
              >
                <span className="material-icons">refresh</span>
                Refresh Status
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
