import { Trophy, Medal, Star, Flame } from 'lucide-react';

const MOCK_LEADERBOARD = [
    { rank: 1, user: 'Ajay', xp: 4200, level: 'Code Master', streak: 12 },
    { rank: 2, user: 'Rahul', xp: 3850, level: 'Optimizer', streak: 8 },
    { rank: 3, user: 'Sneha', xp: 3100, level: 'Optimizer', streak: 5 },
    { rank: 4, user: 'Vikram', xp: 2400, level: 'Debugger', streak: 3 },
    { rank: 5, user: 'Priya', xp: 1950, level: 'Debugger', streak: 2 },
    { rank: 6, user: 'You', xp: 120, level: 'Beginner', streak: 1 }
];

export default function Leaderboard() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '32px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '16px', textShadow: 'var(--glow-green)' }}>
                    <Trophy size={48} className="text-green animate-pulse" style={{ verticalAlign: 'middle', marginRight: '16px' }} />
                    Global Rankings
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Compete with developers worldwide and rise up the ranks.</p>
            </div>

            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ display: 'flex', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'var(--bg-secondary)', fontWeight: 'bold', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <div style={{ width: '60px' }}>Rank</div>
                    <div style={{ flex: 1 }}>Developer</div>
                    <div style={{ width: '120px', textAlign: 'center' }}>Streak</div>
                    <div style={{ width: '100px', textAlign: 'right' }}>Total XP</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {MOCK_LEADERBOARD.map((entry, i) => (
                        <div
                            key={entry.user}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '20px 24px',
                                borderBottom: i !== MOCK_LEADERBOARD.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                background: entry.user === 'You' ? 'rgba(0, 229, 255, 0.05)' : 'transparent',
                                transition: 'background 0.2s',
                                cursor: 'default'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = entry.user === 'You' ? 'rgba(0, 229, 255, 0.05)' : 'transparent'}
                        >
                            {/* Rank */}
                            <div style={{ width: '60px', display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: entry.rank === 1 ? '#FFD700' : entry.rank === 2 ? '#C0C0C0' : entry.rank === 3 ? '#CD7F32' : 'var(--text-secondary)' }}>
                                {entry.rank <= 3 ? <Medal size={24} style={{ filter: `drop-shadow(0 0 5px ${entry.rank === 1 ? '#FFD700' : entry.rank === 2 ? '#C0C0C0' : '#CD7F32'})` }} /> : `#${entry.rank}`}
                            </div>

                            {/* Detail */}
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                    {entry.user[0]}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {entry.user} {entry.user === 'You' && <span style={{ fontSize: '0.7rem', background: 'var(--accent-cyan)', color: '#000', padding: '2px 6px', borderRadius: '12px' }}>YOU</span>}
                                    </h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Star size={12} className="text-purple" /> {entry.level}
                                    </p>
                                </div>
                            </div>

                            {/* Streak */}
                            <div style={{ width: '120px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', color: '#FF5500', fontWeight: 'bold' }}>
                                <Flame size={16} className={entry.streak > 5 ? 'animate-pulse' : ''} /> {entry.streak}
                            </div>

                            {/* XP */}
                            <div style={{ width: '100px', textAlign: 'right', fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent-cyan)', textShadow: 'var(--glow-cyan)' }}>
                                {entry.xp.toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
