import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Target, CheckCircle2, XCircle, Code, Zap } from 'lucide-react';

export default function Practice() {
    const [code, setCode] = useState('/**\\n * @param {number[]} nums\\n * @param {number} target\\n * @return {number[]}\\n */\\nvar twoSum = function(nums, target) {\\n    \\n};');
    const [status, setStatus] = useState('idle'); // idle, testing, passed, failed

    const handleRun = () => {
        setStatus('testing');
        setTimeout(() => {
            // Mock passing condition
            if (code.includes('for') || code.includes('Map')) {
                setStatus('passed');
            } else {
                setStatus('failed');
            }
        }, 1500);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '24px', height: 'calc(100vh - 120px)' }}>
            {/* Left Panel: Problem Statement */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ background: 'rgba(0, 255, 102, 0.1)', color: 'var(--accent-green)', padding: '4px 12px', borderRadius: '16px', fontSize: '0.85rem', fontWeight: 'bold' }}>Easy</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Array • Hash Table</span>
                </div>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', fontWeight: 800 }}>1. Two Sum</h2>

                <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
                    <p style={{ marginBottom: '16px' }}>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
                    <p style={{ marginBottom: '16px' }}>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
                    <p>You can return the answer in any order.</p>
                </div>

                <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '24px' }}>
                    <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Example 1:</p>
                    <p className="code-font" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <strong>Input:</strong> nums = [2,7,11,15], target = 9<br />
                        <strong>Output:</strong> [0,1]<br />
                        <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
                    </p>
                </div>
            </div>

            {/* Right Panel: Editor + Results */}
            <div style={{ display: 'grid', gridTemplateRows: '1fr auto', gap: '24px' }}>

                {/* Editor Wrapper */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <Code size={16} /> JavaScript
                        </div>
                        <button className="btn btn-success" onClick={handleRun} disabled={status === 'testing'} style={{ padding: '6px 16px', fontSize: '0.9rem' }}>
                            {status === 'testing' ? 'Testing...' : 'Run & Submit'}
                        </button>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Editor
                            height="100%"
                            defaultLanguage="javascript"
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
