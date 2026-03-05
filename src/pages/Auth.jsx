import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Mail, Lock } from 'lucide-react';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const { error } = isLogin
                ? await signIn(email, password)
                : await signUp(email, password);

            if (error) throw error;
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '60px' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        display: 'inline-flex',
                        padding: '16px',
                        borderRadius: '20px',
                        background: 'rgba(0, 229, 255, 0.1)',
                        marginBottom: '16px',
                        border: '1px solid rgba(0, 229, 255, 0.2)'
                    }}>
                        {isLogin ? <LogIn className="text-cyan" size={32} /> : <UserPlus className="text-purple" size={32} />}
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {isLogin ? 'Enter your credentials to continue your journey' : 'Join CodeQuest AI and start leveling up'}
                    </p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(255, 0, 102, 0.1)',
                        border: '1px solid #FF0066',
                        color: '#FF0066',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '24px',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="email"
                                placeholder="developer@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    background: 'var(--bg-primary)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    color: '#fff',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    background: 'var(--bg-primary)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    color: '#fff',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
                        {isLogin ? 'Sign In' : 'Level Up (Sign Up)'}
                    </button>
                </form>

                <div style={{ marginTop: '32px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--accent-cyan)',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                padding: 0
                            }}
                        >
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
