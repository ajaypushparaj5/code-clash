import { Zap, Shield, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PropsList, BlockyCloudSeparator } from '../components/MinecraftProps'

export default function Home() {
    return (
        <div style={{ width: '100%', overflowX: 'hidden' }}>

            {/* Top HERO Section (Dark Sky) */}
            <div style={{
                position: 'relative',
                minHeight: '800px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '100px',
                background: 'var(--color-sky)'
            }}>

                {/* Sky Props */}
                <PropsList.BlockyMoon style={{ position: 'absolute', top: '80px', left: '10%' }} />

                {/* Left Floating Island with Red Character */}
                <div style={{ position: 'absolute', top: '350px', left: '-50px', zIndex: 5 }} className="animate-float">
                    <PropsList.RedCharacter style={{ position: 'absolute', top: '-60px', right: '40px' }} />
                    <PropsList.BlockyPlatformBig style={{ transform: 'scale(0.8)' }} />
                </div>

                {/* Right Floating Island with Portal & Crystal */}
                <div style={{ position: 'absolute', top: '300px', right: '-50px', zIndex: 5, animationDelay: '1s' }} className="animate-float">
                    <PropsList.BlockyPlatformBig style={{ transform: 'scale(0.8) scaleX(-1)' }} />
                    <PropsList.BlockyPortal style={{ position: 'absolute', top: '-130px', left: '120px', transform: 'scale(0.8)' }} />
                    <PropsList.BlockyCrystal style={{ position: 'absolute', top: '-40px', left: '50px', transform: 'scale(0.8)' }} className="animate-float" />
                </div>

                {/* Center Island */}
                <div style={{ position: 'absolute', top: '550px', left: '50%', transform: 'translateX(-50%)', zIndex: 6, animationDelay: '2s' }} className="animate-float">
                    <PropsList.BlockyPlatformBig style={{ transform: 'scale(0.5)' }} />
                </div>

                {/* Hero Content */}
                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    textAlign: 'center',
                    maxWidth: '800px',
                    padding: '0 20px'
                }}>
                    <h1 style={{
                        fontSize: '4.5rem',
                        marginBottom: '24px',
                        lineHeight: 1.1,
                        fontWeight: 900,
                        color: 'var(--color-text-light)'
                    }}>
                        Code making made <br />
                        <span style={{ color: 'var(--color-cyan)' }}>easy</span>
                    </h1>

                    <p style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-secondary)',
                        margin: '0 auto 48px',
                        fontWeight: 500
                    }}>
                        Master programming with CodeClash, a gamified, free, and open-source
                        mentor engine that teaches you how to build real logic.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
                        <Link to="/code" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1.2rem', borderRadius: '40px' }}>
                            Try it online
                        </Link>
                        <Link to="/leaderboard" className="btn btn-secondary" style={{ padding: '16px 36px', fontSize: '1.2rem', borderRadius: '40px' }}>
                            View Leaderboard
                        </Link>
                    </div>
                </div>
            </div>

            {/* Cloud Separator transitioning to White Middle Section */}
            <BlockyCloudSeparator />

            {/* Middle Section (White Background, Dark Text) */}
            <div style={{
                background: 'var(--color-white)',
                color: 'var(--color-text-dark)',
                padding: '100px 20px 160px 20px',
                position: 'relative',
                zIndex: 5
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '60px' }}>

                    {/* Left Prop (Pedestal with chest) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <PropsList.PixelChest style={{ marginBottom: '-20px', zIndex: 2, position: 'relative' }} className="animate-float" />
                        <PropsList.PixelPedestal />
                    </div>

                    {/* Middle Text */}
                    <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '24px', lineHeight: 1.1 }}>
                            Code creation, <br />
                            <span style={{ color: '#4338ca' }}>intuitive</span> for all
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: '#475569', maxWidth: '500px', margin: '0 auto', fontWeight: 500 }}>
                            What makes CodeClash unique and so easy to use are the real-time AI mentors.
                            Interactive blocks are a powerful way to express the logic of your application,
                            helping you understand algorithms without hitting a wall.
                        </p>

                        {/* Visual Logic Block Examples */}
                        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                            <div style={{ background: '#f8fafc', border: '2px solid #e2e8f0', padding: '12px 24px', borderRadius: '40px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 4px 0 #e2e8f0' }}>
                                <div style={{ width: 20, height: 20, background: '#ef4444', borderRadius: '50%' }}></div>
                                <span style={{ fontWeight: 600, color: '#ef4444' }}>If</span>
                                <span style={{ color: '#64748b', fontWeight: 500 }}>player is in collision with</span>
                                <div style={{ width: 20, height: 20, background: '#fbbf24', borderRadius: '50%' }}></div>
                                <span style={{ color: '#fbbf24', fontWeight: 600 }}>Coin</span>
                            </div>
                            <div style={{ background: '#f8fafc', border: '2px solid #e2e8f0', padding: '12px 24px', borderRadius: '40px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 4px 0 #e2e8f0' }}>
                                <div style={{ width: 20, height: 20, borderRadius: '50%', border: '4px solid #ef4444' }}></div>
                                <span style={{ fontWeight: 600, color: '#64748b' }}>Delete</span>
                                <div style={{ width: 20, height: 20, background: '#fbbf24', borderRadius: '50%' }}></div>
                                <span style={{ color: '#fbbf24', fontWeight: 600 }}>Coin</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Prop (Stack of pedestals with chest) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <PropsList.PixelChest style={{ marginBottom: '-20px', zIndex: 2, position: 'relative' }} className="animate-float" />
                        <PropsList.PixelPedestal style={{ marginBottom: '-30px', position: 'relative', zIndex: 1 }} />
                        <PropsList.PixelPedestal />
                    </div>

                </div>

                {/* Features Row inside the white section */}
                <div style={{
                    maxWidth: '1200px',
                    margin: '120px auto 0',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '40px'
                }}>
                    <div className="light-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Shield className="text-cyan" size={48} style={{ marginBottom: '20px' }} />
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: 800 }}>AI Code Mentor</h3>
                        <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>Get instant, intelligent feedback on your code quality, best practices, and runtime complexity using Gemini 2.5.</p>
                    </div>

                    <div className="light-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Zap className="text-purple" size={48} style={{ marginBottom: '20px' }} />
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: 800 }}>Gamified Learning</h3>
                        <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>Earn XP, unlock beautiful achievement badges, and level up your developer rank as you solve challenging problems.</p>
                    </div>

                    <div className="light-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Trophy className="text-green" size={48} style={{ marginBottom: '20px' }} />
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: 800 }}>Compete & Rise</h3>
                        <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>Climb the global leaderboard by maintaining coding streaks, submitting optimal algorithmic solutions, and fixing bugs.</p>
                    </div>
                </div>
            </div>

            {/* Footer Section (Dark Purple Background) */}
            <div style={{
                background: 'var(--color-purple-dark)',
                color: 'var(--color-text-light)',
                padding: '120px 20px',
                textAlign: 'center'
            }}>
                <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '24px', lineHeight: 1.1 }}>
                    Master your skills <br />
                    <span style={{ color: 'var(--color-cyan)' }}>in two clicks</span>
                </h2>

                <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 48px', fontWeight: 500 }}>
                    Applications created with CodeClash prepare you for anywhere and can run in any environment.
                    Practice on the web, track your logic on mobile, and publish your stats to GitHub, LinkedIn,
                    and beyond.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', color: '#64748b' }}>
                    {/* Simulated logos */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /></svg>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                    <Trophy size={32} />
                    <Zap size={32} />
                </div>
            </div>

        </div>
    )
}
