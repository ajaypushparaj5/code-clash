import { useState } from 'react';
import { ChevronRight, BrainCircuit, Code, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_FLASHCARDS = [
    {
        id: 1,
        question: "What is Time Complexity and Big O Notation?",
        concept: "Algorithmic Efficiency",
        explanation: "Big O notation describes how the runtime or spatial requirements of an algorithm grow as the input size grows. It focuses on the worst-case scenario.",
        code: "// O(1) - Constant\\nconst getFirst = (arr) => arr[0];\\n\\n// O(n) - Linear\\nconst findItem = (arr, val) => arr.find(i => i === val);"
    },
    {
        id: 2,
        question: "How do you detect a cycle in a Linked List?",
        concept: "Floyd's Tortoise and Hare",
        explanation: "Use two pointers, one moving at standard speed (tortoise) and another moving twice as fast (hare). If they ever meet, there is a cycle.",
        code: "function hasCycle(head) {\\n  let slow = head, fast = head;\\n  while (fast && fast.next) {\\n    slow = slow.next;\\n    fast = fast.next.next;\\n    if (slow === fast) return true;\\n  }\\n  return false;\\n}"
    },
    {
        id: 3,
        question: "What is Dynamic Programming?",
        concept: "Overlapping Subproblems",
        explanation: "An optimization technique that solves complex problems by breaking them down into simpler subproblems and storing the results to avoid redundant computations (memoization).",
        code: "const memo = {};\\nfunction fib(n) {\\n  if (n <= 1) return n;\\n  if (memo[n]) return memo[n];\\n  memo[n] = fib(n-1) + fib(n-2);\\n  return memo[n];\\n}"
    }
];

export default function Learn() {
    const [flipped, setFlipped] = useState({});

    const toggleFlip = (id) => {
        setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '32px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '16px', textShadow: 'var(--glow-purple)' }}>
                    <BrainCircuit size={48} className="text-purple animate-pulse" style={{ verticalAlign: 'middle', marginRight: '16px' }} />
                    Concept Flashcards
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Master core programming concepts and advance your developer rank.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                {MOCK_FLASHCARDS.map(card => (
                    <div
                        key={card.id}
                        className="flashcard-container"
                        style={{ perspective: '1000px', height: '400px', cursor: 'pointer' }}
                        onClick={() => toggleFlip(card.id)}
                    >
                        <div
                            className="flashcard-inner"
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                transformStyle: 'preserve-3d',
                                transform: flipped[card.id] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                            }}
                        >
                            {/* Front */}
                            <div className="glass-card flashcard-front" style={{
                                position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                                background: 'linear-gradient(145deg, rgba(22, 27, 34, 0.9), rgba(11, 14, 20, 0.9))',
                                border: '2px solid rgba(178, 0, 255, 0.2)'
                            }}>
                                <span style={{ color: 'var(--accent-purple)', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '16px', fontSize: '0.9rem' }}>QUESTION</span>
                                <h3 style={{ fontSize: '1.5rem', lineHeight: 1.4 }}>{card.question}</h3>
                                <p style={{ color: 'var(--text-secondary)', marginTop: '24px', fontSize: '0.9rem' }}><ChevronRight className="animate-pulse" style={{ verticalAlign: 'middle' }} /> Click to reveal</p>
                            </div>

                            {/* Back */}
                            <div className="glass-card flashcard-back" style={{
                                position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)',
                                display: 'flex', flexDirection: 'column',
                                background: 'linear-gradient(145deg, rgba(22, 27, 34, 0.9), rgba(11, 14, 20, 0.9))',
                                border: '2px solid rgba(0, 229, 255, 0.2)'
                            }}>
                                <div style={{ flex: 1, overflowY: 'auto' }}>
                                    <div style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', marginBottom: '8px', fontSize: '0.85rem' }}>CONCEPT: {card.concept.toUpperCase()}</div>
                                    <p style={{ fontSize: '0.95rem', marginBottom: '16px', color: 'var(--text-primary)' }}>{card.explanation}</p>

                                    <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '8px', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <pre className="code-font" style={{ whiteSpace: 'pre-wrap' }}><code>{card.code}</code></pre>
                                    </div>
                                </div>

                                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                                    <Link to="/practice" className="btn btn-primary" style={{ width: '100%', display: 'flex', gap: '8px', padding: '12px' }}>
                                        <Code size={18} /> Practice Concept
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
