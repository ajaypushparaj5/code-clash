import React, { useState } from 'react';
import { Search, Github, Loader2 } from 'lucide-react';
import { PropsList } from '../components/MinecraftProps';
import Mascot from '../components/Mascot';
import { getStaticAnalysis } from '../lib/gemini';

export default function RepoAnalyzer() {
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [statusText, setStatusText] = useState('');
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleAnalyze = async () => {
    if (!repoUrl) return;

    setIsAnalyzing(true);
    setHasAnalyzed(false);
    setSuggestions([]);

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
          <div style={{ width: '100%', maxWidth: '600px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {(isAnalyzing || hasAnalyzed || statusText) ? (
              <Mascot
                state={isAnalyzing ? 'typing' : 'idle'}
                isAnalyzing={isAnalyzing}
                suggestions={suggestions}
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