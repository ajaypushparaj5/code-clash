import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { ChevronLeft, BookOpen, Clock, Heart, PlayCircle } from 'lucide-react';

export default function LearnCourse() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourseAndLessons();
    }, [courseId]);

    const fetchCourseAndLessons = async () => {
        setLoading(true);

        // Fetch course
        const { data: courseData } = await supabase
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .single();

        // Fetch lessons
        const { data: lessonsData } = await supabase
            .from('lessons')
            .select('*')
            .eq('course_id', courseId)
            .order('order_num', { ascending: true });

        setCourse(courseData);
        setLessons(lessonsData || []);
        if (lessonsData?.length > 0) setSelectedLesson(lessonsData[0]);
        setLoading(false);
    };

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '100px', minHeight: '100vh', color: 'var(--text-primary)' }}>
            <div className="animate-spin-slow" style={{ display: 'inline-block', marginBottom: '16px' }}>
                <PlayCircle size={48} />
            </div>
            <p style={{ fontWeight: 500 }}>Loading Course...</p>
        </div>
    );

    return (
        <div style={{
            minHeight: '100vh',
            padding: '40px 20px',
            fontFamily: "'Outfit', sans-serif",
            color: 'var(--text-primary)',
            background: 'transparent'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <button
                    onClick={() => navigate('/learn')}
                    className="glass-card"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '32px',
                        padding: '8px 16px',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'all 0.2s',
                        background: 'var(--bg-card)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--accent-cyan)';
                        e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-primary)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    }}
                >
                    <ChevronLeft size={18} /> Back to Collection
                </button>

                {/* Hero / Header Section */}
                <div className="glass-card" style={{
                    padding: '32px',
                    marginBottom: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    flexWrap: 'wrap',
                    background: 'var(--bg-card)'
                }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, var(--color-deep) 0%, var(--color-muted) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '48px',
                        boxShadow: 'inset 0 0 20px rgba(255,255,255,0.2)'
                    }}>
                        {course?.icon || '🚀'}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <span style={{
                                background: 'rgba(255,255,255,0.1)',
                                color: 'var(--accent-cyan)',
                                padding: '4px 12px',
                                borderRadius: '12px',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                <Clock size={12} /> Live
                            </span>
                            <span style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}>
                                Course Series #2024
                            </span>
                        </div>
                        <h1 style={{ fontSize: '2.5rem', margin: '0 0 8px 0', color: 'var(--text-primary)', fontWeight: '800' }}>
                            {course?.title}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1.1rem', lineHeight: '1.5', maxWidth: '800px' }}>
                            {course?.description || 'Learn and master the fundamentals of this technology with our guided path.'}
                        </p>
                    </div>
                    <div style={{
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '20px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minWidth: '180px'
                    }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Progression</span>
                        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>{lessons.length} Modules</div>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                            <button style={{
                                width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-primary)', transition: 'all 0.2s'
                            }}
                                onMouseEnter={e => { e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.borderColor = '#EF4444'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                            >
                                <Heart size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 340px) 1fr', gap: '32px' }}>
                    {/* Modules Sidebar */}
                    <div className="glass-card" style={{
                        padding: '24px',
                        maxHeight: '700px',
                        overflowY: 'auto',
                        background: 'var(--bg-card)'
                    }}>
                        <h3 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <PlayCircle size={22} className="text-cyan" /> Learning Path
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {lessons.map((lesson, idx) => {
                                const isSelected = selectedLesson?.id === lesson.id;
                                return (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setSelectedLesson(lesson)}
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '18px',
                                            background: isSelected ? 'rgba(179, 207, 229, 0.15)' : 'rgba(255,255,255,0.02)',
                                            border: `1px solid ${isSelected ? 'var(--color-light)' : 'rgba(255,255,255,0.05)'}`,
                                            borderRadius: '16px',
                                            color: isSelected ? 'var(--color-white)' : 'var(--text-secondary)',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '14px',
                                            fontWeight: isSelected ? '700' : '500',
                                            boxShadow: isSelected ? 'var(--glow-cyan)' : 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isSelected) {
                                                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                                e.currentTarget.style.transform = 'scale(1.02)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isSelected) {
                                                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }
                                        }}
                                    >
                                        <div style={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '50%',
                                            background: isSelected ? 'var(--color-light)' : 'rgba(255,255,255,0.1)',
                                            color: isSelected ? 'var(--color-darkest)' : 'var(--text-primary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.9rem',
                                            fontWeight: '800',
                                            flexShrink: 0
                                        }}>
                                            {idx + 1}
                                        </div>
                                        <div style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {lesson.title}
                                        </div>
                                        {isSelected && <PlayCircle size={18} className="text-cyan animate-pulse" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Lesson Content Viewer */}
                    <div className="glass-card" style={{
                        padding: '48px',
                        background: 'rgba(10, 25, 49, 0.4)',
                        border: '1px solid rgba(179, 207, 229, 0.1)'
                    }}>
                        {selectedLesson ? (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                    <span style={{
                                        background: 'rgba(74, 127, 167, 0.2)',
                                        color: 'var(--color-light)',
                                        padding: '6px 16px',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        fontWeight: '700',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}>
                                        Active Module
                                    </span>
                                </div>
                                <h2 style={{ fontSize: '2.8rem', marginBottom: '20px', color: 'var(--text-primary)', fontWeight: '800', lineHeight: '1.2' }}>
                                    {selectedLesson.title}
                                </h2>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.25rem', lineHeight: '1.7', fontStyle: 'italic' }}>
                                    {selectedLesson.description}
                                </p>

                                <div
                                    className="lesson-content-box"
                                    style={{
                                        color: 'var(--text-primary)',
                                        lineHeight: '1.9',
                                        fontSize: '1.1rem',
                                        background: 'rgba(0,0,0,0.25)',
                                        padding: '40px',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(255,255,255,0.03)',
                                        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.2)'
                                    }}
                                    dangerouslySetInnerHTML={{ __html: selectedLesson.content }}
                                />

                                <div style={{ marginTop: '50px', borderTop: '1px solid rgba(179, 207, 229, 0.1)', paddingTop: '40px', display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                                    <button
                                        onClick={() => navigate(`/practice/${courseId}`)}
                                        className="btn btn-primary animate-pulse"
                                        style={{
                                            padding: '18px 40px',
                                            fontSize: '1.2rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '14px',
                                            background: 'linear-gradient(135deg, var(--color-muted) 0%, var(--color-deep) 100%)',
                                            borderRadius: '20px',
                                            boxShadow: '0 8px 25px rgba(26, 61, 99, 0.5)'
                                        }}
                                    >
                                        Jump to Practice <PlayCircle size={22} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '120px 0', color: 'var(--text-secondary)' }}>
                                <BookOpen size={64} className="text-cyan" style={{ margin: '0 auto 24px auto', opacity: 0.3 }} />
                                <p style={{ fontSize: '1.4rem', fontWeight: '500' }}>Select a module to begin your journey.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .lesson-content-box iframe {
                    width: 100%;
                    aspect-ratio: 16 / 9;
                    border-radius: 16px;
                    border: 1px solid rgba(179, 207, 229, 0.2);
                    margin: 24px 0;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
                }
                .lesson-content-box h3 {
                    color: var(--color-light);
                    margin: 32px 0 16px;
                    font-size: 1.5rem;
                }
                .lesson-content-box p {
                    margin-bottom: 20px;
                }
                .lesson-content-box ul {
                    margin-bottom: 24px;
                    padding-left: 20px;
                }
                .lesson-content-box li {
                    margin-bottom: 12px;
                }
            `}</style>
        </div>
    );
}