import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Code2, Zap, User, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, profile, signOut } = useAuth();
    const xp = profile?.xp || 0;
    const level = profile?.level || 'Beginner';

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Code', path: '/code' },
        { name: 'Learn', path: '/learn' },
        { name: 'Repo Analyzer', path: '/repo-analyzer' },
        { name: 'Practice', path: '/practice' },
        { name: 'Translate', path: '/translate' },
        { name: 'Leaderboard', path: '/leaderboard' },
    ];

    return (
        <nav className="glass-card" style={{
            margin: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 32px',
            position: 'sticky',
            top: '16px',
            zIndex: 50
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text-primary)' }}>
                <Code2 size={32} className="text-cyan animate-pulse" />
                <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.5px'
                }}>
                    CodeQuest AI
                </span>
            </Link>

            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        style={{
                            textDecoration: 'none',
                            color: location.pathname === link.path ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                            fontWeight: 600,
                            transition: 'all 0.2s',
                            textShadow: location.pathname === link.path ? 'var(--glow-cyan)' : 'none',
                            padding: '4px 8px',
                            borderRadius: '8px'
                        }}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        border: '1px solid rgba(0, 229, 255, 0.2)',
                        boxShadow: 'inset 0 0 10px rgba(0, 229, 255, 0.1)',
                        transition: 'all 0.3s'
                    }}>
                        <Zap className="text-cyan animate-pulse" size={18} />
                        <span style={{ fontWeight: 'bold' }}>XP: <span className="text-cyan">{xp}</span></span>
                    </div>
                    {user && <span style={{ fontSize: '0.7rem', color: 'var(--accent-purple)', fontWeight: 'bold', textTransform: 'uppercase' }}>{level}</span>}
                </div>
                {user ? (
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{user.email}</span>
                        <button
                            onClick={() => signOut()}
                            className="btn btn-secondary"
                            style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/auth')}
                        className="btn btn-primary"
                        style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                    >
                        <User size={18} /> Login
                    </button>
                )}
            </div>
        </nav>
    )
}
