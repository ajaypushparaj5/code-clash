import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Languages, ArrowRight, Sparkles, Loader2, Braces } from 'lucide-react';
import { translateCode } from '../lib/gemini';
import { PropsList } from '../components/MinecraftProps';

const SUPPORTED_LANGUAGES = [
    { id: 'python', name: 'Python' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'java', name: 'Java' },
    { id: 'cpp', name: 'C++' },
    { id: 'csharp', name: 'C#' },
    { id: 'go', name: 'Go' },
    { id: 'rust', name: 'Rust' },
];

export default function Translate() {
    const [sourceCode, setSourceCode] = useState('// Type or paste your code here\nfunction greet(name) {\n  console.log("Hello, " + name);\n}');
    const [targetCode, setTargetCode] = useState('');
    const [sourceLang, setSourceLang] = useState('javascript');
    const [targetLang, setTargetLang] = useState('python');
    const [isTranslating, setIsTranslating] = useState(false);

    const handleTranslate = async () => {
        if (!sourceCode.trim()) return;
        setIsTranslating(true);
        const translated = await translateCode(sourceCode, targetLang);
        setTargetCode(translated);
        setIsTranslating(false);
    };

    return (
        <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', minHeight: 'calc(100vh - 80px)', position: 'relative' }}>

            {/* Fun background props behind the cards */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
                <PropsList.BlockyCrystal style={{ position: 'absolute', top: '20%', left: '5%', opacity: 0.8 }} className="animate-float" />
                <PropsList.PixelChest style={{ position: 'absolute', bottom: '10%', right: '5%', transform: 'scale(1.2)', opacity: 0.9, animationDelay: '1s' }} className="animate-float" />
            </div>

            {/* Header / Gamified Top */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '40px',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <div style={{
                        background: 'var(--color-cyan)',
                        padding: '16px',
                        borderRadius: '16px',
                        boxShadow: '0 8px 0 #00a4b5',
                        transform: 'translateY(-4px)'
                    }}>
                        <Languages size={40} color="white" />
                    </div>
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-primary)' }}>
                    CodeLingo
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '8px' }}>
                    Master any language. Translate your logic instantly.
                </p>

                {/* Decorative Minecraft-ish Prop */}
                <div style={{
                    position: 'absolute',
                    right: '10%',
                    top: '20px',
                    width: '60px',
                    height: '60px',
                    background: 'var(--color-green)',
                    border: '4px solid var(--color-sky)',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.5)',
                    animation: 'float 3s ease-in-out infinite'
                }}>
                    <div style={{ width: 10, height: 10, background: '#fff', margin: 4 }}></div>
                </div>
            </div>

            {/* Main Translation Arena */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: '24px',
                alignItems: 'stretch',
                height: '60vh',
                position: 'relative',
                zIndex: 1
            }}>

                {/* Source Column */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '16px', background: 'var(--bg-primary)', borderBottom: '4px solid var(--color-sky)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 900, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Braces size={18} /> Source Code
                        </span>
                        <select
                            value={sourceLang}
                            onChange={(e) => setSourceLang(e.target.value)}
                            style={{
                                background: '#222',
                                color: 'white',
                                border: '2px solid #555',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                fontFamily: '"Fira Code", monospace',
                                fontWeight: 'bold',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="auto">Auto-Detect</option>
                            {SUPPORTED_LANGUAGES.map(lang => (
                                <option key={lang.id} value={lang.id}>{lang.name}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Editor
                            height="100%"
                            language={sourceLang !== 'auto' ? sourceLang : 'javascript'}
                            theme="vs-dark"
                            value={sourceCode}
                            onChange={(val) => setSourceCode(val)}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 16,
                                padding: { top: 16 }
                            }}
                        />
                    </div>
                </div>

                {/* Center Action */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                    <button
                        onClick={handleTranslate}
                        disabled={isTranslating}
                        style={{
                            background: isTranslating ? '#555' : 'var(--color-cyan)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '80px',
                            height: '80px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: isTranslating ? 'not-allowed' : 'pointer',
                            boxShadow: isTranslating ? 'none' : '0 8px 0 #00a4b5',
                            transform: isTranslating ? 'translateY(8px)' : 'none',
                            transition: 'all 0.1s',
                        }}
                        onMouseDown={(e) => !isTranslating && (e.currentTarget.style.transform = 'translateY(8px)', e.currentTarget.style.boxShadow = '0 0 0 transparent')}
                        onMouseUp={(e) => !isTranslating && (e.currentTarget.style.transform = 'none', e.currentTarget.style.boxShadow = '0 8px 0 #0055AA')}
                        onMouseLeave={(e) => !isTranslating && (e.currentTarget.style.transform = 'none', e.currentTarget.style.boxShadow = '0 8px 0 #0055AA')}
                    >
                        {isTranslating ? <Loader2 size={32} className="animate-spin" /> : <Sparkles size={32} />}
                    </button>
                    <div style={{ background: 'var(--bg-secondary)', padding: '8px 16px', borderRadius: '16px', fontWeight: '900', color: 'var(--accent-cyan)', border: '4px solid var(--color-sky)' }}>
                        TRANSLATE
                    </div>
                </div>

                {/* Target Column */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '16px', background: 'var(--bg-primary)', borderBottom: '4px solid var(--color-sky)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 900, color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ArrowRight size={18} /> Output Code
                        </span>
                        <select
                            value={targetLang}
                            onChange={(e) => setTargetLang(e.target.value)}
                            style={{
                                background: 'rgba(178,0,255,0.2)',
                                color: 'white',
                                border: '2px solid var(--accent-purple)',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                fontFamily: '"Fira Code", monospace',
                                fontWeight: 'bold',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {SUPPORTED_LANGUAGES.map(lang => (
                                <option key={lang.id} value={lang.id}>{lang.name}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Editor
                            height="100%"
                            language={targetLang}
                            theme="vs-dark"
                            value={targetCode}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 16,
                                padding: { top: 16 },
                                readOnly: true,
                            }}
                        />
                        {/* Overlay when empty */}
                        {!targetCode && !isTranslating && (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(13, 17, 23, 0.8)' }}>
                                <div style={{ textAlign: 'center', color: '#666' }}>
                                    <Sparkles size={48} style={{ opacity: 0.5, marginBottom: '16px' }} />
                                    <p style={{ fontWeight: 900, fontSize: '1.2rem' }}>Hit Translate to Cast Magic</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
            `}} />
        </div>
    );
}
