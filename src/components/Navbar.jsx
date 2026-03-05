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
        { name: 'Practice', path: '/practice' },
        { name: 'Translate', path: '/translate' },
        { name: 'Leaderboard', path: '/leaderboard' },
    ];

    return (
        <nav style={{
            background: 'var(--bg-primary)',
            borderBottom: '4px solid var(--color-sky)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 32px',
            position: 'sticky',
            top: '0',
            zIndex: 50,
            boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text-primary)' }}>
                {/* Pixelated Cow Logo */}
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ width: '40px', height: '40px', filter: 'drop-shadow(0 2px 0px rgba(0,0,0,0.2))' }}>
                    <rect x="8" y="12" width="16" height="14" fill="#fafafa" />
                    <rect x="10" y="14" width="6" height="6" fill="#333" />
                    <rect x="18" y="20" width="4" height="4" fill="#333" />
                    <rect x="10" y="4" width="12" height="10" fill="#fafafa" />
                    <rect x="8" y="2" width="2" height="4" fill="#e0e0e0" />
                    <rect x="22" y="2" width="2" height="4" fill="#e0e0e0" />
                    <rect x="6" y="6" width="4" height="2" fill="#333" />
                    <rect x="22" y="6" width="4" height="2" fill="#333" />
                    <rect x="10" y="10" width="12" height="4" fill="#ffb6c1" />
                    <rect x="12" y="12" width="2" height="2" fill="#d87093" />
                    <rect x="18" y="12" width="2" height="2" fill="#d87093" />
                    <rect x="12" y="6" width="2" height="2" fill="#111" />
                    <rect x="18" y="6" width="2" height="2" fill="#111" />
                </svg>
                <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.5px'
                }}>
                    CodeClash
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
                        background: 'var(--bg-secondary)',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        border: '2px solid var(--color-sky)',
                        boxShadow: '2px 2px 0px rgba(0,0,0,0.5)',
                        transition: 'all 0.1s'
                    }}>
                        <Zap className="text-cyan animate-pulse" size={18} />
                        <span style={{ fontWeight: '800' }}>XP: <span className="text-cyan">{xp}</span></span>
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
