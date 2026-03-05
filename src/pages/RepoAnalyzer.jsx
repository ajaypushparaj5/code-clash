import React, { useState } from 'react';
import { Search, Github, Loader2 } from 'lucide-react';
import { PropsList } from '../components/MinecraftProps';
import Mascot from '../components/Mascot';
import { getStaticAnalysis } from '../lib/gemini';

export default function RepoAnalyzer() {
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [languageBreakdown, setLanguageBreakdown] = useState(null);
  const [statusText, setStatusText] = useState('');
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleAnalyze = async () => {
    if (!repoUrl) return;

    setIsAnalyzing(true);
    setHasAnalyzed(false);
    setShowDashboard(false);
    setSuggestions([]);
    setMetrics(null);
    setLanguageBreakdown(null);

    try {
      // Extract owner and repo
      let url = repoUrl.trim();
      if (url.endsWith('/')) url = url.slice(0, -1);
      if (url.endsWith('.git')) url = url.slice(0, -4);

      const parts = url.split('/');
      const repo = parts.pop();
      const owner = parts.pop();

      if (!owner || !repo || !url.includes('github.com')) {
        setStatusText("Invalid GitHub URL format.");
        setIsAnalyzing(false);
        return;
      }

      setStatusText("Fetching repository structure...");
      const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`;
      const treeResponse = await fetch(treeUrl);

      if (!treeResponse.ok) {
        setStatusText("Failed to find repository. Make sure it is public and on the 'main' branch.");
        setIsAnalyzing(false);
        return;
      }

      const treeData = await treeResponse.json();
      const files = treeData.tree || [];

      // Filter supported files
      const supportedFiles = files.filter(f =>
        f.type === 'blob' &&
        (f.path.endsWith('.js') || f.path.endsWith('.jsx') || f.path.endsWith('.ts') || f.path.endsWith('.tsx') || f.path.endsWith('.py'))
      );

      // Determine real language breakdown from the repo tree
      const extensionToLang = {
        '.js': 'JavaScript', '.jsx': 'React',
        '.ts': 'TypeScript', '.tsx': 'React (TS)',
        '.py': 'Python', '.html': 'HTML', '.css': 'CSS',
        '.json': 'JSON', '.md': 'Markdown', '.java': 'Java',
        '.cpp': 'C++', '.c': 'C', '.cs': 'C#', '.go': 'Go', '.rs': 'Rust',
        '.rb': 'Ruby', '.php': 'PHP'
      };

      const langCounts = {};
      let totalBlobs = 0;
      files.forEach(f => {
        if (f.type === 'blob') {
          const match = f.path.match(/\.[0-9a-z]+$/i);
          const ext = match ? match[0].toLowerCase() : '';
          if (extensionToLang[ext]) {
            const lang = extensionToLang[ext];
            langCounts[lang] = (langCounts[lang] || 0) + 1;
            totalBlobs++;
          }
        }
      });

      const calculatedLanguageBreakdown = {};
      if (totalBlobs > 0) {
        for (const [lang, count] of Object.entries(langCounts)) {
          calculatedLanguageBreakdown[lang] = Math.round((count / totalBlobs) * 100);
        }
      } else {
        calculatedLanguageBreakdown['Unknown'] = 100;
      }

      if (supportedFiles.length === 0) {
        setStatusText("No supported code files found to analyze.");
        setIsAnalyzing(false);
        return;
      }

      setStatusText(`Found ${supportedFiles.length} files. Fetching samples...`);

      // Limit to max 3 files to avoid massive payload
      const filesToAnalyze = supportedFiles.slice(0, 3);
      let combinedCode = '';

      for (const file of filesToAnalyze) {
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${file.path}`;
        const rawResponse = await fetch(rawUrl);
        if (rawResponse.ok) {
          const code = await rawResponse.text();
          combinedCode += `// File: ${file.path}\n${code}\n\n`;
        }
      }

      if (!combinedCode) {
        setStatusText("Could not read file contents.");
        setIsAnalyzing(false);
        return;
      }

      setStatusText("Moo-ntor is analyzing code quality...");

      // Send to Gemini
      const analysisResult = await getStaticAnalysis(combinedCode, 'javascript');

      if (analysisResult && analysisResult.suggestions) {
        setSuggestions(analysisResult.suggestions);
        if (analysisResult.metrics) setMetrics(analysisResult.metrics);
        // Use our real calculate percentages!
        setLanguageBreakdown(calculatedLanguageBreakdown);
      } else {
        setSuggestions(["*Mooo...* I couldn't find anything to suggest. The code looks okay or I got confused!"]);
      }

      setStatusText('');
      setHasAnalyzed(true);

    } catch (error) {
      console.error(error);
      setStatusText("An error occurred during analysis.");
    }

    setIsAnalyzing(false);
  };

  // --- Dashboard Component Helper ---
  const renderDashboard = () => {
    if (!metrics || !languageBreakdown) return null;

    // Convert string values to numbers just in case Gemini returned "85%"
    const safeNumber = (val) => {
      if (typeof val === 'number') return val;
      if (typeof val === 'string') return parseInt(val.replace(/\D/g, ''), 10) || 0;
      return 0;
    };

    // Sort languages by highest percentage
    const sortedLangs = Object.entries(languageBreakdown)
      .map(([lang, pct]) => ({ lang, pct: safeNumber(pct) }))
      .sort((a, b) => b.pct - a.pct);

    const colors = ['var(--color-cyan)', 'var(--color-green)', 'var(--accent-purple)', '#FF8C00', '#FF1493', 'var(--color-red)'];

    const legendItems = sortedLangs.map((item, index) => {
      return {
        ...item,
        color: colors[index % colors.length]
      };
    });

    const getProgressColor = (val) => {
      const num = safeNumber(val);
      if (num >= 80) return 'var(--color-green)';
      if (num >= 50) return '#facc15'; // yellow
      return 'var(--color-red)';
    };

    return (
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <button
          className="btn btn-secondary"
          onClick={() => setShowDashboard(false)}
          style={{ alignSelf: 'flex-start', padding: '8px 16px', borderRadius: '12px' }}
        >
          ← Back to Moo-ntor
        </button>

        <div className="layout-split" style={{ display: 'flex', gap: '24px' }}>
          {/* Left: Metrics */}
          <div className="glass-card" style={{ flex: 1, padding: '24px', background: 'var(--bg-primary)', border: '4px solid #333' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '20px', color: 'var(--text-primary)' }}>Code Metrics</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Efficiency', value: metrics.efficiency },
                { label: 'Quality', value: metrics.quality },
                { label: 'Best Practices', value: metrics.bestPractices },
                { label: 'Time Complexity', value: metrics.timeComplexity }
              ].map(metric => (
                <div key={metric.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 'bold' }}>
                    <span>{metric.label}</span>
                    <span>{metric.value}%</span>
                  </div>
                  {/* Minecraft style progress bar */}
                  <div style={{ width: '100%', height: '28px', background: '#333', border: '4px solid #111', padding: '2px', boxShadow: 'inset 0 4px 0 rgba(0,0,0,0.3)' }}>
                    <div style={{
                      width: `${safeNumber(metric.value)}%`,
                      height: '100%',
                      background: getProgressColor(metric.value),
                      transition: 'width 1s ease-out'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Languages Block Bar */}
          <div className="glass-card" style={{ flex: 1, padding: '24px', background: 'var(--bg-primary)', border: '4px solid #333', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '24px', color: 'var(--text-primary)' }}>Languages</h2>

            {/* Segmented Minecraft Block Bar */}
            <div style={{
              width: '100%',
              height: '40px',
              display: 'flex',
              background: '#333',
              border: '4px solid #111',
              padding: '2px',
              marginBottom: '32px',
              boxShadow: 'inset 0 4px 0 rgba(0,0,0,0.3)',
              borderRadius: '2px'
            }}>
              {legendItems.map((item) => (
                <div key={item.lang} style={{
                  width: `${item.pct}%`,
                  height: '100%',
                  background: item.color,
                  borderRight: '2px solid rgba(0,0,0,0.2)',
                  transition: 'width 1s ease-out'
                }} title={`${item.lang} (${item.pct}%)`}></div>
              ))}
            </div>

            {/* Legend */}
            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              {legendItems.map(item => (
                <div key={item.lang} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                  <div style={{ width: '20px', height: '20px', background: item.color, border: '4px solid #333' }}></div>
                  <span>{item.lang} ({item.pct}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '40px 20px', minHeight: 'calc(100vh - 80px)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Fun background props */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <PropsList.BlockyCrystal style={{ position: 'absolute', top: '150px', left: '10%', opacity: 0.8 }} className="animate-float" />
        <PropsList.PixelChest style={{ position: 'absolute', top: '250px', right: '10%', transform: 'scale(1.2)', opacity: 0.9, animationDelay: '1s' }} className="animate-float" />
        <PropsList.BlockyPortal style={{ position: 'absolute', bottom: '10%', left: '20%', opacity: 0.3, transform: 'scale(1.5)' }} className="animate-float" />
      </div>

      <h1 style={{
        fontSize: '3.5rem',
        marginBottom: '20px',
        fontWeight: '900',
        color: 'var(--text-primary)',
        fontFamily: "'Outfit', sans-serif",
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        Repo Analyzer <span style={{ color: 'var(--accent-purple)' }}>🔍</span>
      </h1>

      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '40px', position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '600px', fontWeight: 500 }}>
        Paste a GitHub repository link. Our Moo-ntor will fetch the code and provide AI-powered quality suggestions!
      </p>

      {/* Search Bar */}
      <div className="glass-card" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        maxWidth: '800px',
        padding: '12px 24px',
        borderRadius: '9999px',
        position: 'relative',
        zIndex: 10,
        marginBottom: '40px',
        background: 'var(--bg-secondary)',
        border: '4px solid var(--color-sky)'
      }}>
        <Github size={28} className="text-cyan" />
        <input
          type="text"
          placeholder="https://github.com/username/repository"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '1.2rem',
            fontFamily: "'Fira Code', monospace"
          }}
        />
        <button
          className="btn btn-primary"
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          style={{ padding: '12px 32px', fontSize: '1.2rem', borderRadius: '9999px' }}
        >
          {isAnalyzing ? <span className="flex items-center gap-2"><Loader2 size={18} className="animate-spin" /> Analyzing...</span> : 'Analyze'}
        </button>
      </div>

      {/* Mascot Area */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', width: '100%', maxWidth: '800px' }}>

        {statusText && (
          <div style={{
            background: 'var(--color-sky)',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '16px',
            fontWeight: 'bold',
            marginBottom: '24px',
            animation: 'pulse-glow 2s infinite',
            border: '4px solid var(--color-purple-dark)',
            fontFamily: "'Outfit', sans-serif"
          }}>
            {statusText}
          </div>
        )}

        {/* We wrap Mascot in a container that looks like a stage */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '800px', minHeight: '400px', height: 'auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '20px' }}>
            {showDashboard ? (
              renderDashboard()
            ) : (isAnalyzing || hasAnalyzed || statusText) ? (
              <Mascot
                state={isAnalyzing ? 'typing' : 'idle'}
                isAnalyzing={isAnalyzing}
                suggestions={suggestions}
                actionLink={metrics ? { label: 'View Dashboard →', onClick: () => setShowDashboard(true) } : null}
              />
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                <Mascot state="idle" isAnalyzing={false} suggestions={["*Mooo...* I'm ready! Paste a repo link above and I'll review its code!"]} />
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}