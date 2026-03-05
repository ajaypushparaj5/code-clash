import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Bot, Zap, AlertTriangle, Code, Play, Terminal, Loader2 } from 'lucide-react';
import { getDynamicAnalysis, getStaticAnalysis } from '../lib/gemini';
import { useAuth } from '../contexts/AuthContext';

export default function CodeAnalysis() {
    const [code, setCode] = useState('function calculateSum(arr) {\n  let sum = 0;\n  for(let i=0; i<arr.length; i++) {\n    for(let j=0; j<arr.length; j++) {\n       if(i === j) sum += arr[i];\n    }\n  }\n  return sum;\n}\n\nconsole.log(calculateSum([1, 2, 3, 4]));');

    // States
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isDynamicAnalyzing, setIsDynamicAnalyzing] = useState(false);
    const [staticFeedback, setStaticFeedback] = useState(null);
    const [dynamicIssues, setDynamicIssues] = useState([]);
    const [output, setOutput] = useState(null);

    const editorRef = useRef(null);
    const { allotXP, user } = useAuth();

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        editor.onKeyUp((e) => {
            // Trigger dynamic analysis when '}' is typed
            if (e.browserEvent.key === '}') {
                triggerDynamicAnalysis();
            }
        });
    };

    const triggerDynamicAnalysis = async () => {
        if (!editorRef.current) return;
        const currentCode = editorRef.current.getValue();

        setIsDynamicAnalyzing(true);
        const result = await getDynamicAnalysis(currentCode, 'javascript');
        if (result && result.issues && result.issues.length > 0) {
            setDynamicIssues(result.issues);
        }
        setIsDynamicAnalyzing(false);
    };

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setStaticFeedback(null);

        const result = await getStaticAnalysis(code, 'javascript');
        if (result) {
            setStaticFeedback(result);
            if (user) await allotXP(20); // Reward for seeking mentorship
        }

        setIsAnalyzing(false);
    };

    const handleRun = () => {
        try {
            let logs = [];
            const originalLog = console.log;
            console.log = (...args) => {
                logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
            };

            // Execute code
            const fn = new Function(code);
            const result = fn();

            console.log = originalLog;

            setOutput({
                status: 'success',
                logs: logs,
                result: result !== undefined ? String(result) : null
            });
        } catch (err) {
            setOutput({
                status: 'error',
                error: err.toString()
            });
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', height: 'calc(100vh - 120px)' }}>
            {/* Left Panel: Editor & Console */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
                <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                        <Code className="text-cyan" size={20} /> Code Editor
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            className="btn btn-secondary"
                            onClick={handleRun}
                            style={{ padding: '8px 20px', fontSize: '0.9rem', display: 'flex', gap: '8px' }}
                        >
                            <Terminal size={16} /> Run Code
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            style={{ padding: '8px 20px', fontSize: '0.9rem' }}
                        >
                            {isAnalyzing ? <span className="animate-pulse flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Analyzing...</span> : <><Bot size={16} /> Get Mentor Feedback</>}
                        </button>
                    </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {/* Editor Space */}
                    <div style={{ flex: 2, height: '60%' }}>
                        <Editor
                            height="100%"
                            defaultLanguage="javascript"
                            theme="vs-dark"
                            value={code}
                            onChange={(val) => setCode(val)}
                            onMount={handleEditorDidMount}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 16,
                                fontFamily: 'Fira Code',
                                padding: { top: 16 }
                            }}
                        />
                    </div>

                    {/* Console Output Panel */}
                    <div style={{ flex: 1, background: '#0D1117', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '16px', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                            <Terminal size={14} /> Output Console
                        </div>
                        {output ? (
                            output.status === 'error' ? (
                                <div style={{ color: '#FF0066', fontFamily: 'monospace', fontSize: '0.9rem' }}>{output.error}</div>
                            ) : (
                                <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                                    {output.logs.map((log, i) => (
                                        <div key={i}>{log}</div>
                                    ))}
                                    {output.result && <div style={{ color: 'var(--accent-green)', marginTop: '8px' }}>{'<'} {output.result}</div>}
                                    {output.logs.length === 0 && !output.result && <div style={{ color: 'var(--text-secondary)' }}>Code executed successfully (No output).</div>}
                                </div>
                            )
                        ) : (
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic' }}>Run code to see output here.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Panel: Feedback */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '24px', fontSize: '1.2rem' }}>
                    <Bot className="text-purple" size={24} /> AI Mentor Feedback
                </div>

                {/* Dynamic Analysis Loading Indicator */}
                {isDynamicAnalyzing && (
                    <div style={{ padding: '12px', background: 'rgba(0, 229, 255, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontSize: '0.9rem', marginBottom: '16px' }}>
                        <Loader2 size={16} className="animate-spin" /> Analyzing recently typed block...
                    </div>
                )}

                {!staticFeedback && dynamicIssues.length === 0 && !isAnalyzing && !isDynamicAnalyzing && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--text-secondary)', textAlign: 'center' }}>
                        <Zap size={64} className="text-cyan animate-pulse" style={{ opacity: 0.8, marginBottom: '16px', filter: 'drop-shadow(0 0 10px rgba(0, 229, 255, 0.5))' }} />
                        <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>Ready for Coding</p>
                        <p style={{ maxWidth: '300px', marginTop: '8px' }}>Type `{ }` blocks or click "Get Mentor Feedback" to receive AI insights.</p>
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
                        <p style={{ marginTop: '16px', color: 'var(--accent-cyan)', fontWeight: 600 }}>Mentor is reviewing your code...</p>
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Dynamic AI Feedback Cards (Real-time syntax/logic) */}
                    {dynamicIssues.map((issue, idx) => (
                        <div key={idx} style={{
                            background: issue.type === 'error' ? 'rgba(255, 0, 102, 0.1)' : 'rgba(255, 170, 0, 0.1)',
                            borderLeft: `4px solid ${issue.type === 'error' ? '#FF0066' : '#FFAA00'}`,
                            padding: '16px',
                            borderRadius: '0 8px 8px 0',
                            animation: 'slideIn 0.3s ease-out'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: issue.type === 'error' ? '#FF0066' : '#FFAA00', fontWeight: 'bold', marginBottom: '8px' }}>
                                <AlertTriangle size={18} /> {issue.title}
                            </div>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{issue.message}</p>
                        </div>
                    ))}

                    {/* Static Deep Analysis Feedback */}
                    {staticFeedback && (
                        <div style={{
                            background: 'rgba(178, 0, 255, 0.1)',
                            border: '1px solid rgba(178, 0, 255, 0.3)',
                            padding: '24px',
                            borderRadius: '12px',
                            boxShadow: 'inset 0 0 20px rgba(178, 0, 255, 0.05)',
                            animation: 'fadeIn 0.5s ease-out'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)', fontWeight: 'bold', marginBottom: '16px', fontSize: '1.2rem' }}>
                                <Bot size={24} style={{ filter: 'drop-shadow(0 0 5px rgba(178,0,255,0.8))' }} /> Deep Mentor Review
                            </div>

                            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                                <div style={{ flex: 1, background: 'var(--bg-primary)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Time Complexity</div>
                                    <div style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{staticFeedback.complexity?.time || 'O(?)'}</div>
                                </div>
                                <div style={{ flex: 1, background: 'var(--bg-primary)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Space Complexity</div>
                                    <div style={{ fontSize: '1.1rem', color: 'var(--accent-purple)', fontWeight: 'bold' }}>{staticFeedback.complexity?.space || 'O(?)'}</div>
                                </div>
                            </div>

                            <p style={{ fontSize: '1rem', marginBottom: '20px', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                                {staticFeedback.analysis}
                            </p>

                            <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0, 255, 102, 0.2)' }}>
                                <p style={{ color: 'var(--accent-green)', fontWeight: 600, marginBottom: '12px', fontSize: '1rem' }}>🏆 Suggested Approach:</p>
                                <p style={{ fontSize: '0.95rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>{staticFeedback.suggestion}</p>
                                {staticFeedback.optimalCode && (
                                    <pre className="code-font" style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <code>{staticFeedback.optimalCode}</code>
                                    </pre>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}} />
        </div>
    );
}
