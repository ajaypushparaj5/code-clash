import { useEffect, useState } from 'react';
import { ChevronRight, BrainCircuit, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Learn() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('courses')
            .select('*');

        if (data) setCourses(data);
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '32px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '16px', textShadow: 'var(--glow-purple)' }}>
                    <BrainCircuit size={48} className="text-purple animate-pulse" style={{ verticalAlign: 'middle', marginRight: '16px' }} />
                    Learn Programming
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Master core concepts and solve real coding problems.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                {loading ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px', color: 'var(--accent-cyan)' }}>
                        <BrainCircuit className="animate-pulse" size={48} />
                        <p style={{ marginTop: '16px' }}>Loading Courses...</p>
                    </div>
                ) : courses.map(course => (
                    <div
                        key={course.id}
                        className="glass-card"
                        style={{
                            padding: '32px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            minHeight: '300px',
                            background: 'linear-gradient(145deg, rgba(22, 27, 34, 0.9), rgba(11, 14, 20, 0.9))',
                            border: '2px solid rgba(178, 0, 255, 0.2)',
                            borderRadius: '12px'
                        }}
                    >
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--accent-purple)' }}>
                                {course.icon} {course.title}
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                {course.description}
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                            <button
                                onClick={() => navigate(`/learn/${course.id}`)}
                                className="btn btn-primary"
                                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                <BrainCircuit size={18} /> Learn
                            </button>
                            <button
                                onClick={() => navigate(`/practice/${course.id}`)}
                                className="btn btn-primary"
                                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                <Code size={18} /> Practice
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}