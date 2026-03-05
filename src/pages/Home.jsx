import { Zap, Shield, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', paddingTop: '64px' }}>

            {/* Hero Section */}
            <div style={{ marginBottom: '80px', position: 'relative' }}>
                {/* Decorative glowing backdrops */}
                <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(178,0,255,0.15) 0%, transparent 70%)', zIndex: -1 }}></div>

                <h1 style={{
                    fontSize: '4.5rem',
                    marginBottom: '24px',
                    lineHeight: 1.1,
                    fontWeight: 800
                }}>
                    Master Code like a <br />
                    <span style={{
                        background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-green))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: 'var(--glow-cyan)',
                        display: 'inline-block'
                    }}>Game</span>
                </h1>

                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 48px' }}>
                    Level up your programming skills through AI code analysis, interactive flashcards, and gamified practice problems.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
                    <Link to="/code" className="btn btn-primary animate-float" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>
                        Start Coding Journey
                    </Link>
                    <Link to="/leaderboard" className="btn btn-secondary" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>
                        View Leaderboard
                    </Link>
                </div>
            </div>

            {/* Feature Showcases */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '32px'
            }}>
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ background: 'rgba(0, 229, 255, 0.1)', padding: '20px', borderRadius: '50%', marginBottom: '20px', boxShadow: 'inset 0 0 15px rgba(0,229,255,0.2)' }}>
                        <Shield className="text-cyan" size={48} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>AI Code Mentor</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Get instant, intelligent feedback on your code quality, best practices, and runtime complexity using Gemini 2.5.</p>
                </div>

                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ background: 'rgba(178, 0, 255, 0.1)', padding: '20px', borderRadius: '50%', marginBottom: '20px', boxShadow: 'inset 0 0 15px rgba(178,0,255,0.2)' }}>
                        <Zap className="text-purple" size={48} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Gamified Learning</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Earn XP, unlock beautiful achievement badges, and level up your developer rank as you solve challenging problems.</p>
                </div>

                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ background: 'rgba(0, 255, 102, 0.1)', padding: '20px', borderRadius: '50%', marginBottom: '20px', boxShadow: 'inset 0 0 15px rgba(0,255,102,0.2)' }}>
                        <Trophy className="text-green" size={48} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Compete & Rise</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Climb the global leaderboard by maintaining coding streaks, submitting optimal algorithmic solutions, and fixing bugs.</p>
                </div>
            </div>
        </div>
    )
}
