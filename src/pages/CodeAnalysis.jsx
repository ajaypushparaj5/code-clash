import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Bot, Zap, Code, Terminal, Loader2 } from 'lucide-react';
import { getDynamicAnalysis, getStaticAnalysis } from '../lib/gemini';
import { useAuth } from '../contexts/AuthContext';
import Mascot from '../components/Mascot';

export default function CodeAnalysis() {
    const [code, setCode] = useState('function calculateSum(arr) {\n  let sum = 0;\n  for(let i=0; i<arr.length; i++) {\n    for(let j=0; j<arr.length; j++) {\n       if(i === j) sum += arr[i];\n    }\n  }\n  return sum;\n}\n\nconsole.log(calculateSum([1, 2, 3, 4]));');

    // States
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isDynamicAnalyzing, setIsDynamicAnalyzing] = useState(false);
    const [staticFeedback, setStaticFeedback] = useState(null);
    const [dynamicIssues, setDynamicIssues] = useState([]);
    const [output, setOutput] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);

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

    const handleCodeChange = (val) => {
        setCode(val);
        setIsTyping(true);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
        }, 1000);
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
                            onChange={handleCodeChange}
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

            {/* Right Panel: Mascot Dialogue */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
                <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                        <Bot className="text-purple" size={20} /> AI Moo-ntor
                    </div>
                </div>

                <div style={{ flex: 1, position: 'relative' }}>
                    <Mascot
                        state={isTyping ? 'typing' : 'idle'}
                        isAnalyzing={isAnalyzing || isDynamicAnalyzing}
                        suggestions={[
                            ...dynamicIssues.map(i => `Mooo! ${i.message} (Line ${i.title})`),
                            ...(staticFeedback?.suggestions || [])
                        ]}
                    />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
        </div>
    );
}
