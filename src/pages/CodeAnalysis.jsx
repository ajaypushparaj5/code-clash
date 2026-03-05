import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Bot, Zap, AlertTriangle, Code, Play } from 'lucide-react';

export default function CodeAnalysis() {
    const [code, setCode] = useState('function calculateSum(arr) {\n  let sum = 0;\n  for(let i=0; i<arr.length; i++) {\n    for(let j=0; j<arr.length; j++) {\n       if(i === j) sum += arr[i];\n    }\n  }\n  return sum;\n}');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setFeedback(null);

        // Simulate AI API call & Static analysis processing from Gemini 2.5 mocked behavior
        setTimeout(() => {
            const staticIssues = [];
            if (code.match(/for.*\\{[\\s\\S]*for/)) {
                staticIssues.push({
                    id: 1,
                    title: 'Nested loops causing O(n²) complexity',
                    type: 'warning',
                    explanation: 'Your code compares elements redundantly within a nested loop sequence. This increases runtime significantly for large datasets.'
                });
            }

            setFeedback({
                static: staticIssues,
                dynamic: [
                    {
                        id: 2,
                        title: 'Optimize Array Summation',
                        concept: 'Time Complexity - O(n)',
                        explanation: 'The nested loop is unnecessary for a simple sum. You are looping n*n times when you only need to loop n times.',
                        suggestion: 'Use a single loop or the built-in Array.reduce() method to sum elements efficiently in O(n) time.',
                        optimizedCode: 'function calculateSum(arr) {\\n  return arr.reduce((acc, curr) => acc + curr, 0);\\n}'
                    }
                ]
            });
            setIsAnalyzing(false);
        }, 2000);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', height: 'calc(100vh - 120px)' }}>
            {/* Editor Panel */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
                <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                        <Code className="text-cyan" size={20} /> Code Editor
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        style={{ padding: '8px 20px', fontSize: '0.9rem' }}
                    >
                        {isAnalyzing ? <span className="animate-pulse">Analyzing...</span> : <><Play size={16} /> Analyze Code</>}
                    </button>
                </div>
                <div style={{ flex: 1 }}>
                    <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        theme="vs-dark"
                        value={code}
                        onChange={(val) => setCode(val)}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 16,
                            fontFamily: 'Fira Code',
                            padding: { top: 16 }
                        }}
                    />
                </div>
            </div>

            {/* Feedback Panel */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '24px', fontSize: '1.2rem' }}>
                    <Bot className="text-purple" size={24} /> AI Mentor Feedback
                </div>

                {!feedback && !isAnalyzing && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--text-secondary)', textAlign: 'center' }}>
                        <Zap size={64} className="text-cyan animate-pulse" style={{ opacity: 0.8, marginBottom: '16px', filter: 'drop-shadow(0 0 10px rgba(0, 229, 255, 0.5))' }} />
                        <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>Awaiting Code Submission</p>
                        <p style={{ maxWidth: '300px', marginTop: '8px' }}>Submit your code to receive gamified AI feedback and earn XP.</p>
                    </div>
                )}

                {isAnalyzing && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <div className="animate-pulse" style={{
                            width: '60px', height: '60px',
                            borderRadius: '50%',
                            border: '4px solid var(--accent-cyan)',
                            borderTopColor: 'transparent',
                            animation: 'spin 1s linear infinite'
                        }}></div>
                        <p style={{ marginTop: '16px', color: 'var(--accent-cyan)', fontWeight: 600 }}>Scanning for bugs and complexity...</p>
                    </div>
                )}

                {feedback && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Static Feedback Cards */}
                        {feedback.static.map(issue => (
                            <div key={issue.id} style={{
                                background: 'rgba(255, 170, 0, 0.1)',
                                borderLeft: '4px solid #FFAA00',
                                padding: '16px',
                                borderRadius: '0 8px 8px 0'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFAA00', fontWeight: 'bold', marginBottom: '8px' }}>
                                    <AlertTriangle size={18} /> {issue.title}
                                </div>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{issue.explanation}</p>
                            </div>
                        ))}

                        {/* Dynamic AI Feedback Cards */}
                        {feedback.dynamic.map(issue => (
                            <div key={issue.id} style={{
                                background: 'rgba(178, 0, 255, 0.1)',
                                border: '1px solid rgba(178, 0, 255, 0.3)',
                                padding: '24px',
                                borderRadius: '12px',
                                boxShadow: 'inset 0 0 20px rgba(178, 0, 255, 0.05)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)', fontWeight: 'bold', marginBottom: '16px', fontSize: '1.2rem' }}>
                                    <Zap size={24} style={{ filter: 'drop-shadow(0 0 5px rgba(178,0,255,0.8))' }} /> {issue.title}
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <span style={{ fontSize: '0.85rem', background: 'var(--bg-primary)', padding: '6px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        📝 Concept: {issue.concept}
                                    </span>
                                </div>

                                <p style={{ fontSize: '1rem', marginBottom: '20px', lineHeight: 1.6 }}>
                                    {issue.explanation}
                                </p>

                                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0, 255, 102, 0.2)' }}>
                                    <p style={{ color: 'var(--accent-green)', fontWeight: 600, marginBottom: '12px', fontSize: '1rem' }}>🏆 Suggested Improvement:</p>
                                    <p style={{ fontSize: '0.95rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>{issue.suggestion}</p>
                                    <pre className="code-font" style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <code>{issue.optimizedCode}</code>
                                    </pre>
                                </div>

                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                                    <div className="animate-float text-green" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', textShadow: 'var(--glow-green)', fontSize: '1.2rem' }}>
                                        +40 XP ✨
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
        </div>
    )
}
