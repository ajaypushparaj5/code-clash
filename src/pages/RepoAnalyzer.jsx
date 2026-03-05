import React, { useState } from 'react';
import { Search, ShieldAlert, FileCode, Activity, CheckCircle2, AlertCircle } from 'lucide-react';

const RepoAnalyzer = () => {
  const [repoUrl, setRepoUrl] = useState('');
  
  // Mock data based on your screenshot
  const results = {
    score: 75,
    filesScanned: 55,
    issues: [
      { id: 1, type: 'Security', message: 'Debug log found in config/db.js', severity: 'high' },
      { id: 2, type: 'Security', message: 'Debug log found in controllers/authController.js', severity: 'high' },
      { id: 3, type: 'Best Practice', message: 'Unused variable in server.js', severity: 'low' },
    ]
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 p-8 font-sans">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Repo Analyzer <span className="text-white">🔍</span>
        </h1>
        <p className="text-slate-400 mb-8">Analyze your GitHub repository for security flaws and code quality in seconds.</p>
        
        <div className="flex max-w-2xl mx-auto gap-2 p-2 bg-slate-900/50 border border-slate-800 rounded-2xl backdrop-blur-md">
          <div className="flex items-center pl-3 flex-1">
            <Search className="text-slate-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="https://github.com/user/repo"
              className="bg-transparent border-none outline-none w-full px-3 py-2 text-sm focus:ring-0"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-indigo-500/20">
            Analyze
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Score Card */}
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex flex-col items-center justify-center text-center">
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="w-full h-full -rotate-90">
              <circle cx="64" cy="64" r="58" fill="transparent" stroke="#1e293b" strokeWidth="8" />
              <circle cx="64" cy="64" r="58" fill="transparent" stroke="#6366f1" strokeWidth="8" 
                strokeDasharray="364" strokeDashoffset={364 - (364 * results.score) / 100} strokeLinecap="round" />
            </svg>
            <span className="absolute text-3xl font-bold">{results.score}</span>
          </div>
          <h3 className="text-lg font-semibold">Health Score</h3>
          <p className="text-sm text-slate-500 mt-1">Based on 12 security rules</p>
        </div>

        {/* Stats Bento Box */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-2xl"><FileCode className="text-indigo-400" /></div>
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">Files Scanned</p>
              <p className="text-2xl font-bold">{results.filesScanned}</p>
            </div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex items-center gap-4">
            <div className="p-3 bg-rose-500/10 rounded-2xl"><ShieldAlert className="text-rose-400" /></div>
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">Critical Issues</p>
              <p className="text-2xl font-bold text-rose-400">{results.issues.length}</p>
            </div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl col-span-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Activity className="text-emerald-400" />
              <span className="font-medium">Optimization Status</span>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs border border-emerald-500/20">Stable</span>
          </div>
        </div>

        {/* Detailed Issues List */}
        <div className="md:col-span-3 mt-4">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <AlertCircle className="text-indigo-400" /> Analysis Findings
          </h2>
          <div className="space-y-3">
            {results.issues.map((issue) => (
              <div key={issue.id} className="group bg-slate-900/40 border border-slate-800 p-4 rounded-2xl flex items-center justify-between hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  <div>
                    <p className="font-medium text-slate-200">{issue.message}</p>
                    <span className="text-xs text-slate-500 uppercase">{issue.type}</span>
                  </div>
                </div>
                <button className="text-xs font-semibold text-indigo-400 hover:underline">View File</button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RepoAnalyzer;