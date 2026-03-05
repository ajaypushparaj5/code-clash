import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Target, Activity, Zap, Play, CheckCircle2, AlertCircle, HelpCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Mascot from '../components/Mascot';
import { PropsList } from '../components/MinecraftProps';

// Local Bug Hunt Challenges
const BUG_CHALLENGES = [
    {
        id: 1,
        title: "The Infinite Loop Trap",
        description: "This function is supposed to sum all even numbers up to `n`. However, something is very wrong with the loop condition and the return value. Fix the bugs to heal the code!",
        xpReward: 100,
        starterCode: `function sumEvens(n) {
  let sum = 0;
  // Bug 1: Wrong loop condition setup
  for (let i = 0; i > n; i++) {
    // Bug 2: Checking for odd instead of even
    if (i % 2 !== 0) {
      sum += i;
    }
  }
  // Bug 3: Returning inside the loop? Or what?
  return n;
}`,
        hints: [
            "Mooo... Look at the `for` loop condition `i > n`. Will that ever run if `n` is positive?",
            "*sniffs code* `i % 2 !== 0` checks if a number is ODD. We want EVEN numbers!",
            "You are returning `n` at the end, but shouldn't you return the `sum` instead?"
        ],
        // Test suite the user's code will be executed against behind the scenes
        testCases: [
            { input: 10, expected: 30 }, // 2+4+6+8+10
            { input: 4, expected: 6 },   // 2+4
            { input: 0, expected: 0 },
            { input: 7, expected: 12 }   // 2+4+6
        ],
        testRunner: (fn) => {
            let passedCount = 0;
            const cases = [
                { input: 10, expected: 30 },
                { input: 4, expected: 6 },
                { input: 0, expected: 0 },
                { input: 7, expected: 12 }
            ];
            cases.forEach(c => {
                try {
                    if (fn(c.input) === c.expected) passedCount++;
                } catch { } // Ignore errors from user code in test
            });
            return (passedCount / cases.length) * 100; // Returns 0, 25, 50, 75, or 100
        }
    },
    {
        id: 2,
        title: "The Undefined Object",
        description: "We're trying to extract the user's city from their profile, but the code keeps crashing when the address object is missing! Fix the bugs so it handles missing data safely.",
        xpReward: 150,
        starterCode: `function getUserCity(userProfile) {
  // Bug 1: What if userProfile is null or undefined?
  // Bug 2: What if userProfile.address doesn't exist?
  
  const city = userProfile.address.city;
  
  if (city = null) { // Bug 3: Assignment instead of comparison
    return "Unknown";
  }
  
  return city;
}`,
        hints: [
            "Mooo! If `userProfile` is undefined, `userProfile.address` will throw an error!",
            "Try using optional chaining (`?.`) like `userProfile?.address?.city` to safely dig into objects.",
            "*chews cud* Look at `if (city = null)`. A single `=` assigns a value. You need `===` to compare!"
        ],
        testRunner: (fn) => {
            let passedCount = 0;
            const cases = [
                { input: [{ address: { city: "New York" } }], expected: "New York" },
                { input: [{ address: {} }], expected: "Unknown" }, // Missing city
                { input: [{}], expected: "Unknown" }, // Missing address
                { input: [null], expected: "Unknown" } // Null profile
            ];
            cases.forEach(c => {
                try {
                    const res = fn(...c.input);
                    if (res === c.expected || (res === undefined && c.expected === "Unknown")) passedCount++;
                } catch (e) {
                    if (c.expected === "Unknown" && typeof e === 'object') {
                        // If it errored but we expected Unknown, it's a fail
                    }
                }
            });
            // Adjust logic slightly, allowing undefined to be treated as unknown if they use optional chaining directly
            return (passedCount / cases.length) * 100;
        }
    }
];

export default function BugHunt() {
    const { allotXP, user } = useAuth();

    const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
    const challenge = BUG_CHALLENGES[currentLevelIdx];

    const [code, setCode] = useState(challenge.starterCode);
    const [healthPoint, setHealthPoint] = useState(0);
    const [hintIndex, setHintIndex] = useState(-1);
    const [isTesting, setIsTesting] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [logs, setLogs] = useState([]);

    // Update code when level changes
    useEffect(() => {
        setCode(challenge.starterCode);
        setHealthPoint(0);
        setHintIndex(-1);
        setHasWon(false);
        setLogs([]);
    }, [currentLevelIdx, challenge]);

    const handleNextHint = () => {
        if (hintIndex < challenge.hints.length - 1) {
            setHintIndex(prev => prev + 1);
        }
    };

    const runTests = async () => {
        setIsTesting(true);
        setLogs([]);

        // Slight delay to simulate testing
        await new Promise(r => setTimeout(r, 600));

        let currentLogs = [];
        const originalLog = console.log;
        console.log = (...args) => {
            currentLogs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
        };

        try {
            // Dynamically create the user's function
            // We wrap it in a return so we can extract it
            const createFn = new Function(`return ${code}`);
            const userFn = createFn();

            if (typeof userFn !== 'function') {
                throw new Error("Make sure your code defines a function!");
            }

            // Run the secret test cases
            const newHealth = challenge.testRunner(userFn);
            setHealthPoint(newHealth);

            if (newHealth === 100 && !hasWon) {
                setHasWon(true);
                currentLogs.push(`SUCCESS! All tests passed. Code Health is 100%.`);
                currentLogs.push(`Awarding +${challenge.xpReward} XP!`);
                if (user) {
                    await allotXP(challenge.xpReward);
                }
            } else if (newHealth > 0) {
                currentLogs.push(`Tests finished. Code Health is at ${newHealth}%. Keep squashing bugs!`);
            } else {
                currentLogs.push(`Tests failed. Code Health remains at 0%. Try viewing a hint.`);
            }

        } catch (err) {
            setHealthPoint(0);
            currentLogs.push(`Execution Error: ${err.message}`);
        }

        console.log = originalLog;
        setLogs(currentLogs);
        setIsTesting(false);
    };

    const handleNextLevel = () => {
        if (currentLevelIdx < BUG_CHALLENGES.length - 1) {
            setCurrentLevelIdx(prev => prev + 1);
        } else {
            // Reset to beginning or show grand completion
            setCurrentLevelIdx(0);
        }
    };

    return (
        <div style={{ display: 'flex', height: 'calc(100vh - 120px)', position: 'relative' }}>
            {/* Background Details */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
                <PropsList.PixelChest style={{ position: 'absolute', top: '20px', right: '35%', opacity: 0.6 }} className="animate-float" />
                <PropsList.BlockyPortal style={{ position: 'absolute', bottom: '10%', left: '10%', opacity: 0.2, transform: 'scale(1.2)' }} className="animate-float" />
            </div>

            {/* Left Panel: Problem, Editor & Console */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px', gap: '24px', zIndex: 1, maxWidth: '65%' }}>

                {/* Header & Health Meter Card */}
                <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--bg-secondary)', border: '4px solid var(--color-sky)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <span style={{ background: 'rgba(255, 171, 0, 0.1)', color: '#FFAB00', padding: '4px 12px', borderRadius: '16px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                    Bug Hunt Level {currentLevelIdx + 1}
                                </span>
                                <span style={{ color: 'var(--accent-purple)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                    +{challenge.xpReward} XP Reward
                                </span>
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>{challenge.title}</h2>
                        </div>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{challenge.description}</p>

                    {/* Code Health Meter */}
                    <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '2px solid #e2e8f0', marginTop: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                            <span style={{ fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Activity size={18} className={healthPoint === 100 ? 'text-green' : 'text-cyan'} />
                                Code Health
                            </span>
                            <span style={{
                                fontWeight: 900,
                                fontSize: '1.2rem',
                                color: healthPoint === 100 ? 'var(--accent-green)' : (healthPoint > 0 ? 'var(--accent-cyan)' : '#FF0066')
                            }}>
                                {healthPoint}%
                            </span>
                        </div>
                        {/* Progress Bar Container */}
                        <div style={{ height: '24px', background: '#e2e8f0', borderRadius: '12px', overflow: 'hidden', border: '2px solid rgba(0,0,0,0.1)' }}>
                            <div style={{
                                height: '100%',
                                width: `${healthPoint}%`,
                                background: healthPoint === 100 ? 'var(--accent-green)' : (healthPoint > 40 ? 'var(--accent-cyan)' : '#FF0066'),
                                transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.5s',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {/* Animated stripe overlay for active feeling */}
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
                                    backgroundSize: '1rem 1rem',
                                    animation: 'stripe-slide 1s linear infinite'
                                }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Editor Container */}
                <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', border: '4px solid var(--color-sky)' }}>
                    <div style={{ padding: '12px 16px', borderBottom: '4px solid var(--color-sky)', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--text-primary)' }}>
                            Code Editor
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={runTests}
                            disabled={isTesting || hasWon}
                            style={{ padding: '8px 24px', display: 'flex', gap: '8px' }}
                        >
                            {isTesting ? <><Loader2 size={16} className="animate-spin" /> Testing...</> : <><Play size={16} /> Run Diagnostics</>}
                        </button>
                    </div>

                    <div style={{ flex: 2, minHeight: '300px' }}>
                        <Editor
                            height="100%"
                            defaultLanguage="javascript"
                            theme="vs-dark"
                            value={code}
                            onChange={(val) => setCode(val)}
                            options={{ minimap: { enabled: false }, fontSize: 16, fontFamily: 'Fira Code', padding: { top: 16 } }}
                        />
                    </div>

                    {/* Tiny Console output */}
                    <div style={{ height: '120px', background: '#0D1117', borderTop: '4px solid var(--color-sky)', padding: '12px', overflowY: 'auto' }}>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Diagnostic Output:</div>
                        {logs.length === 0 && <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic' }}>Run diagnostics to test your fixes.</div>}
                        {logs.map((log, i) => (
                            <div key={i} style={{
                                color: log.includes('SUCCESS') ? 'var(--accent-green)' : (log.includes('Error') || log.includes('failed') ? '#FF0066' : '#fff'),
                                fontFamily: 'monospace', fontSize: '0.9rem', marginBottom: '4px'
                            }}>{log}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel: Mascot & Hints */}
            <div style={{ width: '35%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px', zIndex: 1 }}>

                {/* Floating Hint Button overlayed slightly above mascot */}
                <div style={{ marginBottom: '-20px', zIndex: 20 }}>
                    <button
                        onClick={handleNextHint}
                        disabled={hasWon}
                        style={{
                            background: hintIndex >= challenge.hints.length - 1 ? '#e2e8f0' : 'var(--accent-purple)',
                            color: hintIndex >= challenge.hints.length - 1 ? '#94a3b8' : '#fff',
                            border: '4px solid #111827',
                            padding: '12px 24px',
                            borderRadius: '9999px',
                            fontSize: '1.1rem',
                            fontWeight: 900,
                            fontFamily: "'Outfit', sans-serif",
                            cursor: hintIndex >= challenge.hints.length - 1 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 0 rgba(0,0,0,0.5)',
                            transform: hintIndex >= challenge.hints.length - 1 ? 'translateY(4px)' : 'none',
                            transition: 'all 0.1s'
                        }}
                    >
                        <HelpCircle size={20} />
                        {hintIndex >= challenge.hints.length - 1 ? 'No More Hints' : 'Get A Hint!'}
                    </button>
                </div>

                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Mascot
                        state={isTesting ? 'typing' : 'idle'}
                        isAnalyzing={false}
                        suggestions={
                            hasWon ? ["Mooooo! You sqaushed all the bugs! Amazing job! Code Health is 100%!"]
                                : hintIndex >= 0 ? [challenge.hints[hintIndex]]
                                    : ["Mooo! The code is sick. Find the bugs and fix them to heal the code. Click the Hint button if you get stuck!"]
                        }
                    />
                </div>

                {/* Next Level Button that appears upon winning */}
                {hasWon && (
                    <div style={{ marginTop: '40px', animation: 'float 2s infinite ease-in-out' }}>
                        <button
                            className="btn btn-success"
                            onClick={handleNextLevel}
                            style={{ padding: '16px 32px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '9999px', border: '4px solid #111827' }}
                        >
                            <Target size={24} />
                            {currentLevelIdx < BUG_CHALLENGES.length - 1 ? 'Next Bug Hunt!' : 'Replay Bug Hunts!'}
                        </button>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes stripe-slide {
                    0% { background-position: 0 0; }
                    100% { background-position: 1rem 0; }
                }
            `}} />
        </div>
    );
}
