import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Bot, Zap, Code, Terminal, Loader2, ListTodo, X, Target, CheckCircle2, XCircle } from 'lucide-react';
import { getDynamicAnalysis, getStaticAnalysis } from '../lib/gemini';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import Mascot from '../components/Mascot';
import { PropsList } from '../components/MinecraftProps';

export default function CodeAnalysis() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [code, setCode] = useState('function calculateSum(arr) {\n  let sum = 0;\n  for(let i=0; i<arr.length; i++) {\n    for(let j=0; j<arr.length; j++) {\n       if(i === j) sum += arr[i];\n    }\n  }\n  return sum;\n}\n\nconsole.log(calculateSum([1, 2, 3, 4]));');

    // Analysis States
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isDynamicAnalyzing, setIsDynamicAnalyzing] = useState(false);
    const [staticFeedback, setStaticFeedback] = useState(null);
    const [dynamicIssues, setDynamicIssues] = useState([]);
    const [output, setOutput] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);
    const editorRef = useRef(null);

    // Practice States
    const [questions, setQuestions] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [practiceStatus, setPracticeStatus] = useState('idle'); // idle, testing, passed, failed

    const { allotXP, user } = useAuth();

    // Fetch questions on mount or courseId change
    useEffect(() => {
        fetchQuestions();
        // Auto-open sidebar if navigated with a courseId
        if (courseId) {
            setIsSidebarOpen(true);
        }
    }, [courseId]);

    const fetchQuestions = async () => {
        let query = supabase.from('coding_questions').select('*');
        if (courseId) {
            query = query.eq('course_id', courseId);
        }

        const { data } = await query;
        if (data && data.length > 0) {
            setQuestions(data);
        }
    };

    const handleSelectQuestion = (q) => {
        setActiveQuestion(q);
        setCode(q.starter_code || '');
        setOutput(null);
        setPracticeStatus('idle');
        setStaticFeedback(null);
        setIsSidebarOpen(false);
    };

    const handleResetToFreeCode = () => {
        setActiveQuestion(null);
        setCode('// Write your code here!\n\nconsole.log("Mooo");');
        setOutput(null);
        setPracticeStatus('idle');
        setStaticFeedback(null);
    };

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
        if (activeQuestion) {
            handlePracticeSubmit();
        } else {
            handleFreeCodeRun();
        }
    };

    const handleFreeCodeRun = () => {
        try {
            let logs = [];
            const originalLog = console.log;
            console.log = (...args) => {
                logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
            };

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

    const handlePracticeSubmit = async () => {
        setPracticeStatus('testing');
        setOutput(null);

        // Simple mock check
        setTimeout(async () => {
            const isCorrect = code.includes('return') || code.length > 50;

            if (isCorrect) {
                setPracticeStatus('passed');
                if (user) await allotXP(50);
            } else {
                setPracticeStatus('failed');
            }
        }, 1500);
    };

    return (
        <div style={{ display: 'flex', height: 'calc(100vh - 120px)', position: 'relative' }}>

            {/* Sidebar Overlay (Questions List) */}
            {isSidebarOpen && (
                <div style={{
                    position: 'absolute',
                    top: 0, bottom: 0, left: 0,
                    width: '350px',
                    background: 'var(--bg-secondary)',
                    borderRight: '4px solid var(--color-sky)',
                    zIndex: 50,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '4px 0 15px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ padding: '20px', borderBottom: '4px solid var(--color-sky)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ListTodo size={20} className="text-cyan" /> Practice Challenges
                        </h2>
                        <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                            <X size={24} />
                        </button>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {questions.length === 0 ? (
                            <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>No questions available right now.</p>
                        ) : (
                            questions.map(q => (
                                <div key={q.id} onClick={() => handleSelectQuestion(q)} style={{
                                    padding: '16px',
                                    borderRadius: '12px',
                                    border: '2px solid',
                                    borderColor: activeQuestion?.id === q.id ? 'var(--color-sky)' : '#e2e8f0',
                                    background: activeQuestion?.id === q.id ? 'var(--color-sky-light)' : '#f8fafc',
                                    cursor: 'pointer',
                                    transition: 'all 0.1s'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{q.title}</span>
                                        <span style={{
                                            fontSize: '0.75rem', fontWeight: 'bold', padding: '2px 8px', borderRadius: '12px',
                                            background: q.difficulty === 'Easy' ? 'rgba(0, 255, 102, 0.1)' : 'rgba(255, 171, 0, 0.1)',
                                            color: q.difficulty === 'Easy' ? 'var(--accent-green)' : '#FFAB00'
                                        }}>
                                            {q.difficulty || 'Normal'}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        {q.description.replace(/<[^>]*>?/gm, '').substring(0, 60)}...
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', position: 'relative', overflow: 'hidden' }}>
                {/* Fun background props behind the cards */}
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
                    <PropsList.BlockyPortal style={{ position: 'absolute', bottom: '10%', left: '-50px', opacity: 0.15, transform: 'scale(1.5)' }} className="animate-float" />
                    <PropsList.PixelChest style={{ position: 'absolute', top: '10%', right: '10%', opacity: 0.8, animationDelay: '1.5s' }} className="animate-float" />
                </div>

                {/* Left Panel: Editor & Console */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, position: 'relative', zIndex: 1 }}>
                    <div style={{ padding: '16px', borderBottom: '4px solid var(--color-sky)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <button onClick={() => setIsSidebarOpen(true)} className="btn btn-secondary" style={{ padding: '6px 12px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                                <ListTodo size={16} /> <span style={{ fontWeight: 800 }}>Challenges</span>
                            </button>
                            {activeQuestion && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{activeQuestion.title}</span>
                                    <button onClick={handleResetToFreeCode} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}>
                                        Reset to Free Code
                                    </button>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                className="btn btn-success"
                                onClick={handleRun}
                                disabled={practiceStatus === 'testing'}
                                style={{ padding: '8px 20px', fontSize: '0.9rem', display: 'flex', gap: '8px', background: activeQuestion ? 'var(--accent-green)' : 'var(--accent-purple)' }}
                            >
                                {practiceStatus === 'testing' ? (
                                    <><Loader2 size={16} className="animate-spin" /> Testing...</>
                                ) : (
                                    <><Terminal size={16} /> {activeQuestion ? 'Run & Submit' : 'Run Code'}</>
                                )}
                            </button>
                            {!activeQuestion && (
                                <button
                                    className="btn btn-primary"
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing}
                                    style={{ padding: '8px 20px', fontSize: '0.9rem' }}
                                >
                                    {isAnalyzing ? <span className="animate-pulse flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Analyzing...</span> : <><Bot size={16} /> Get Mentor Feedback</>}
                                </button>
                            )}
                        </div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                        {/* Active Question Banner (If any) */}
                        {activeQuestion && (
                            <div style={{ background: 'var(--color-sky-light)', padding: '16px', borderBottom: '4px solid var(--color-sky)', overflowY: 'auto', maxHeight: '150px' }}>
                                <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: activeQuestion.description }}></p>
                                {activeQuestion.example && (
                                    <div style={{ background: 'var(--bg-secondary)', padding: '8px', borderRadius: '4px', marginTop: '8px', border: '1px solid var(--color-sky)' }}>
                                        <p className="code-font" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{activeQuestion.example}</p>
                                    </div>
                                )}
                            </div>
                        )}

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
                        <div style={{ flex: 1, background: '#0D1117', borderTop: '4px solid var(--color-sky)', padding: '16px', overflowY: 'auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                                <Terminal size={14} /> Console / Test Output
                            </div>

                            {/* Free Code Output */}
                            {!activeQuestion && output && (
                                output.status === 'error' ? (
                                    <div style={{ color: '#FF0066', fontFamily: 'monospace', fontSize: '0.9rem' }}>{output.error}</div>
                                ) : (
                                    <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                                        {output.logs.map((log, i) => (
                                            <div key={i} style={{ color: '#fff' }}>{log}</div>
                                        ))}
                                        {output.result && <div style={{ color: 'var(--accent-green)', marginTop: '8px' }}>{'<'} {output.result}</div>}
                                        {output.logs.length === 0 && !output.result && <div style={{ color: 'var(--text-secondary)' }}>Code executed successfully (No output).</div>}
                                    </div>
                                )
                            )}

                            {/* Practice Submission Output */}
                            {activeQuestion && (
                                <>
                                    {practiceStatus === 'idle' && (
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Run your code to test it against the challenge constraints.</p>
                                    )}
                                    {practiceStatus === 'testing' && (
                                        <div style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                                            <Zap className="animate-pulse" size={16} /> Executing Test Cases...
                                        </div>
                                    )}
                                    {practiceStatus === 'passed' && (
                                        <div>
                                            <h2 style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '1.1rem' }}>
                                                <CheckCircle2 size={20} /> Accepted!
                                            </h2>
                                            <div style={{ color: 'var(--accent-green)', fontWeight: 'bold', fontSize: '0.9rem' }}>+50 XP Earned</div>
                                        </div>
                                    )}
                                    {practiceStatus === 'failed' && (
                                        <div>
                                            <h2 style={{ color: '#FF0066', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '1.1rem' }}>
                                                <XCircle size={20} /> Wrong Answer
                                            </h2>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Your output did not match the expected output.</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Mascot Dialogue */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, position: 'relative', zIndex: 1 }}>
                    <div style={{ padding: '16px', borderBottom: '4px solid var(--color-sky)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--text-primary)' }}>
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
        </div>
    );
}
