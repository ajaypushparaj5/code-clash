import { useState } from 'react';
import { ChevronRight, ChevronLeft, Bot } from 'lucide-react';

export default function Mascot({ state = 'idle', suggestions = [], isAnalyzing = false }) {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < suggestions.length - 1) {
            setCurrentStep(c => c + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(c => c - 1);
        }
    };

    // Determine animation class based on state
    let animationClass = "mascot-idle";
    if (state === 'typing') {
        animationClass = "mascot-jumping";
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '20px' }}>

            {/* Dialog Box (Speech Bubble) */}
            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#111',
                padding: '24px',
                borderRadius: '16px',
                border: '4px solid #333',
                marginBottom: '20px',
                position: 'relative',
                minHeight: '150px',
                height: 'auto', // Fix for text spilling out
                width: '100%',
                maxWidth: '400px',
                boxShadow: '0 8px 0 rgba(0,0,0,0.2), inset 0 -4px 0 rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                fontFamily: '"Press Start 2P", "Fira Code", monospace',
            }}>
                {/* Speech Bubble Tail */}
                <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '0',
                    height: '0',
                    borderLeft: '20px solid transparent',
                    borderRight: '20px solid transparent',
                    borderTop: '20px solid #333',
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-24px',
                        left: '-14px',
                        width: '0',
                        height: '0',
                        borderLeft: '14px solid transparent',
                        borderRight: '14px solid transparent',
                        borderTop: '18px solid rgba(255, 255, 255, 0.95)',
                    }}></div>
                </div>

                {isAnalyzing ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                        <div className="animate-pulse" style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ width: 12, height: 12, background: '#333', borderRadius: '50%' }}></div>
                            <div style={{ width: 12, height: 12, background: '#333', borderRadius: '50%', animationDelay: '0.2s' }}></div>
                            <div style={{ width: 12, height: 12, background: '#333', borderRadius: '50%', animationDelay: '0.4s' }}></div>
                        </div>
                        <p style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Mooo... Thinking...</p>
                    </div>
                ) : suggestions.length > 0 ? (
                    <>
                        <div style={{ flex: 1, fontSize: '1.1rem', lineHeight: 1.6, fontWeight: 500, overflowWrap: 'break-word', wordWrap: 'break-word', hyphens: 'auto' }}>
                            {suggestions[currentStep]}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '2px dashed #ccc', paddingTop: '16px' }}>
                            <button
                                onClick={handlePrev}
                                disabled={currentStep === 0}
                                style={{
                                    background: currentStep === 0 ? '#ddd' : '#333',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <ChevronLeft size={16} /> Prev
                            </button>
                            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#666' }}>
                                {currentStep + 1} / {suggestions.length}
                            </span>
                            <button
                                onClick={handleNext}
                                disabled={currentStep === suggestions.length - 1}
                                style={{
                                    background: currentStep === suggestions.length - 1 ? '#ddd' : 'var(--accent-purple)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    cursor: currentStep === suggestions.length - 1 ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                Next <ChevronRight size={16} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '8px' }}>
                        <Bot size={32} style={{ color: 'var(--accent-purple)' }} />
                        <p style={{ fontWeight: 'bold' }}>Waiting for code!</p>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>Type and I'll watch, or click Analyze to get my thoughts.</p>
                    </div>
                )}
            </div>

            {/* Pixelated Cow Mascot */}
            <div className={animationClass} style={{ width: '150px', height: '150px', marginTop: '20px', position: 'relative' }}>
                {/* We use a pure CSS / simple SVG pixel art construction for the cow */}
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' }}>
                    {/* Shadow underneath */}
                    <ellipse cx="16" cy="30" rx="10" ry="2" fill="rgba(0,0,0,0.4)" />

                    {/* Legs */}
                    <rect x="10" y="24" width="4" height="6" fill="#333" />
                    <rect x="18" y="24" width="4" height="6" fill="#333" />
                    <rect x="10" y="28" width="4" height="2" fill="#111" /> {/* Hooves */}
                    <rect x="18" y="28" width="4" height="2" fill="#111" />

                    {/* Body */}
                    <rect x="8" y="12" width="16" height="14" fill="#fafafa" />
                    {/* Cow Spots */}
                    <rect x="10" y="14" width="6" height="6" fill="#333" />
                    <rect x="18" y="20" width="4" height="4" fill="#333" />
                    {/* Belly pinkish tint */}
                    <rect x="12" y="22" width="8" height="4" fill="#ffb6c1" />
                    {/* Udder */}
                    <rect x="14" y="24" width="4" height="2" fill="#ff69b4" />

                    {/* Head */}
                    <rect x="10" y="4" width="12" height="10" fill="#fafafa" />

                    {/* Horns */}
                    <rect x="8" y="2" width="2" height="4" fill="#e0e0e0" />
                    <rect x="22" y="2" width="2" height="4" fill="#e0e0e0" />

                    {/* Ears */}
                    <rect x="6" y="6" width="4" height="2" fill="#333" />
                    <rect x="22" y="6" width="4" height="2" fill="#333" />

                    {/* Snout */}
                    <rect x="10" y="10" width="12" height="4" fill="#ffb6c1" />
                    {/* Nostrils */}
                    <rect x="12" y="12" width="2" height="2" fill="#d87093" />
                    <rect x="18" y="12" width="2" height="2" fill="#d87093" />

                    {/* Eyes */}
                    <rect x="12" y="6" width="2" height="2" fill="#111" />
                    <rect x="18" y="6" width="2" height="2" fill="#111" />

                    {/* "Thinking" finger to mouth if loading */}
                    {isAnalyzing && (
                        <g>
                            {/* Arm going up to face */}
                            <rect x="18" y="12" width="6" height="4" fill="#fafafa" />
                            <rect x="22" y="8" width="2" height="6" fill="#111" /> {/* Hoof pointing */}
                        </g>
                    )}
                </svg>
            </div>

        </div>
    );
}
