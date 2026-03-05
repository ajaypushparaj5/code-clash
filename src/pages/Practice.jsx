import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Target, CheckCircle2, XCircle, Code, Zap, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

export default function Practice() {
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState('');
    const [status, setStatus] = useState('idle'); // idle, testing, passed, failed
    const { allotXP, user } = useAuth();

    const currentQuestion = questions[currentIdx];

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('coding_questions')
            .select('*');

        if (data && data.length > 0) {
            setQuestions(data);
            setCode(data[0].starter_code || '');
        }
        setLoading(false);
    };

    const handleRun = async () => {
        if (!currentQuestion) return;

        setStatus('testing');

        // Simulating testing logic for now (later integrated with Gemini)
        setTimeout(async () => {
            const isCorrect = code.includes('return') || code.length > 50; // Mock check

            if (isCorrect) {
                setStatus('passed');
                if (user) {
                    await allotXP(50); // Standard XP reward for easy/medium
                }
            } else {
                setStatus('failed');
            }
        }, 1500);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--accent-cyan)' }}>
                <Loader2 className="animate-spin" size={48} />
                <p style={{ marginTop: '16px', fontSize: '1.2rem' }}>Loading Challenge...</p>
            </div>
        );
    }

    if (!currentQuestion) {
        return (
            <div style={{ textAlign: 'center', padding: '100px' }}>
                <h2 style={{ color: 'var(--text-secondary)' }}>No challenges found in database.</h2>
            </div>
        );
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '24px', height: 'calc(100vh - 120px)' }}>
            {/* Left Panel: Problem Statement */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{
                        background: currentQuestion.difficulty === 'Easy' ? 'rgba(0, 255, 102, 0.1)' : 'rgba(255, 171, 0, 0.1)',
                        color: currentQuestion.difficulty === 'Easy' ? 'var(--accent-green)' : '#FFAB00',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                    }}>
                        {currentQuestion.difficulty || 'Medium'}
                    </span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{currentQuestion.language}</span>
                </div>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', fontWeight: 800 }}>{currentQuestion.title}</h2>

                <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }} dangerouslySetInnerHTML={{ __html: currentQuestion.description }}>
                </div>

                {currentQuestion.example && (
                    <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '24px' }}>
                        <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Example:</p>
                        <p className="code-font" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
                            {currentQuestion.example}
                        </p>
                    </div>
                )}
            </div>

            {/* Right Panel: Editor + Results */}
            <div style={{ display: 'grid', gridTemplateRows: '1fr auto', gap: '24px' }}>

                {/* Editor Wrapper */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <Code size={16} /> {currentQuestion.language || 'Code'}
                        </div>
                        <button className="btn btn-success" onClick={handleRun} disabled={status === 'testing'} style={{ padding: '6px 16px', fontSize: '0.9rem' }}>
                            {status === 'testing' ? 'Testing...' : 'Run & Submit'}
                        </button>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Editor
                            height="100%"
                            defaultLanguage={(currentQuestion.language || 'javascript').toLowerCase()}
                            theme="vs-dark"
                            value={code}
                            onChange={(val) => setCode(val)}
                            options={{ minimap: { enabled: false }, fontSize: 16, fontFamily: 'Fira Code', padding: { top: 16 } }}
                        />
                    </div>
                </div>

                {/* Console / Feedback Panel */}
                <div className="glass-card" style={{ height: '250px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Target size={18} /> Console Output
                    </h3>

                    <div style={{ flex: 1, background: 'var(--bg-primary)', borderRadius: '8px', padding: '16px', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.05)' }}>
                        {status === 'idle' && (
                            <p style={{ color: 'var(--text-secondary)' }}>Run your code to see results & performance analysis.</p>
                        )}
                        {status === 'testing' && (
                            <div style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Zap className="animate-pulse" size={16} /> Executing Test Cases...
                            </div>
                        )}
                        {status === 'passed' && (
                            <div>
                                <h2 style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                    <CheckCircle2 size={24} /> Accepted!
                                </h2>
                                <div style={{ display: 'flex', gap: '32px' }}>
                                    <div>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Runtime</p>
                                        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>52 ms</p>
                                        <p style={{ color: 'var(--accent-green)', fontSize: '0.8rem' }}>Beats 98%</p>
                                    </div>
                                    <div>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Memory</p>
                                        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>42.1 MB</p>
                                        <p style={{ color: 'var(--accent-purple)', fontSize: '0.8rem' }}>Beats 84%</p>
                                    </div>
                                </div>
                                <div style={{ marginTop: '24px', padding: '12px', background: 'rgba(0, 255, 102, 0.1)', borderRadius: '8px', color: 'var(--accent-green)', fontWeight: 'bold', display: 'inline-block' }}>
                                    +50 XP Earned
                                </div>
                            </div>
                        )}
                        {status === 'failed' && (
                            <div>
                                <h2 style={{ color: '#FF0066', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                    <XCircle size={24} /> Wrong Answer
                                </h2>
                                <p style={{ color: 'var(--text-secondary)' }}>Your output did not match the expected output for test case 1.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}
