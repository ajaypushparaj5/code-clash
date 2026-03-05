import { Zap, Shield, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PropsList, BlockyCloudSeparator } from '../components/MinecraftProps'

export default function Home() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', paddingTop: '64px' }}>

            {/* Hero Section */}
            <div style={{ marginBottom: '80px', position: 'relative', minHeight: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {/* Decorative glowing backdrops */}
                <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(178,0,255,0.15) 0%, transparent 70%)', zIndex: -1 }}></div>

                {/* Visual Props Scene: Minecraft / Platformer Theme */}
                <PropsList.BlockyMoon style={{ position: 'absolute', top: '20px', left: '10%' }} className="animate-pulse" />

                {/* Left Platform */}
                <div style={{ position: 'absolute', top: '150px', left: '-50px', zIndex: 5, animationDuration: '6s' }} className="animate-float">
                    <PropsList.BlockyPlatformBig style={{ transform: 'scale(0.8)' }} />
                    {/* Blocky Player token standing on it */}
                    <div style={{ position: 'absolute', top: '-30px', left: '200px', width: '30px', height: '30px', background: '#FF5252', borderRadius: '4px', boxShadow: '0 0 10px #FF5252' }}></div>
                </div>

                {/* Right Platform */}
                <div style={{ position: 'absolute', top: '100px', right: '-20px', zIndex: 5, animationDuration: '5s', animationDelay: '1s' }} className="animate-float">
                    <PropsList.BlockyPlatformBig style={{ transform: 'scale(0.8)' }} />
                    <PropsList.BlockyPortal style={{ position: 'absolute', top: '-110px', left: '250px', transform: 'scale(0.7)' }} />
                    <PropsList.BlockyCrystal style={{ position: 'absolute', top: '-10px', left: '150px', transform: 'scale(0.6)' }} className="animate-float" />
                </div>

                {/* Center Platform */}
                <div style={{ position: 'absolute', top: '280px', left: '50%', transform: 'translateX(-50%)', zIndex: 6, animationDuration: '4s', animationDelay: '2s' }} className="animate-float">
                    <PropsList.BlockyPlatformSmall style={{ transform: 'scale(1)' }} />
                    <PropsList.BlockyCoin style={{ position: 'absolute', top: '-30px', left: '80px' }} className="animate-pulse" />
                </div>

                <div style={{ position: 'relative', zIndex: 10, background: 'rgba(22, 27, 34, 0.85)', padding: '50px', borderRadius: '16px', backdropFilter: 'blur(16px)', border: '4px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
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
            </div>

            {/* Blocky Cloud Separator */}
            <div style={{ position: 'absolute', left: 0, right: 0, width: '100%', zIndex: 10 }}>
                <BlockyCloudSeparator />
            </div>

            {/* Feature Showcases */}
            <div style={{
                marginTop: '160px',
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
