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
        <div style={{ textAlign: 'center', padding: '100px', backgroundColor: '#F4F7FA', minHeight: '100vh', color: '#0284C7' }}>
            <div className="animate-spin-slow" style={{ display: 'inline-block', marginBottom: '16px' }}>
                <PlayCircle size={48} />
            </div>
            <p style={{ fontWeight: 500 }}>Loading Course...</p>
        </div>
    );

    return (
        <div style={{
            backgroundColor: '#F4F7FA',
            minHeight: '100vh',
            padding: '40px 20px',
            fontFamily: "'Outfit', sans-serif",
            color: '#1E293B'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <button
                    onClick={() => navigate('/learn')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '32px',
                        padding: '8px 16px',
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        color: '#64748B',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#0284C7';
                        e.currentTarget.style.borderColor = '#0284C7';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#64748B';
                        e.currentTarget.style.borderColor = '#E2E8F0';
                    }}
                >
                    <ChevronLeft size={18} /> Back to Collection
                </button>

                {/* Hero / Header Section like an NFT banner */}
                <div style={{
                    background: '#FFFFFF',
                    borderRadius: '24px',
                    padding: '32px',
                    marginBottom: '32px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    flexWrap: 'wrap'
                }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '48px',
                        boxShadow: 'inner 0 0 20px rgba(255,255,255,0.5)'
                    }}>
                        {course?.icon || '🚀'}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <span style={{
                                background: '#E0F2FE',
                                color: '#0284C7',
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
                                color: '#64748B',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}>
                                Collection #0001
                            </span>
                        </div>
                        <h1 style={{ fontSize: '2.2rem', margin: '0 0 8px 0', color: '#0F172A', fontWeight: '800' }}>
                            {course?.title}
                        </h1>
                        <p style={{ color: '#64748B', margin: 0, fontSize: '1rem', lineHeight: '1.5', maxWidth: '800px' }}>
                            {course?.description || 'Learn the ins and outs of this amazing technology and build your skills.'}
                        </p>
                    </div>
                    <div style={{
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '16px',
                        padding: '16px 24px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end'
                    }}>
                        <span style={{ color: '#64748B', fontSize: '0.85rem', fontWeight: '500', marginBottom: '4px' }}>Value</span>
                        <span style={{ color: '#0284C7', fontSize: '1.5rem', fontWeight: '800' }}>0.047 ETH</span>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                            <button style={{
                                width: '36px', height: '36px', borderRadius: '50%', background: '#fff', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748B', transition: 'all 0.2s'
                            }}
                                onMouseEnter={e => { e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.borderColor = '#EF4444'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = '#64748B'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
                            >
                                <Heart size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: '32px' }}>
                    {/* Lessons Sidebar */}
                    <div style={{
                        background: '#FFFFFF',
                        border: '1px solid #F1F5F9',
                        borderRadius: '24px',
                        padding: '24px',
                        maxHeight: '600px',
                        overflowY: 'auto',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
                    }}>
                        <h3 style={{ marginBottom: '20px', color: '#0F172A', fontSize: '1.2rem', fontWeight: '700' }}>Modules</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {lessons.map((lesson, idx) => {
                                const isSelected = selectedLesson?.id === lesson.id;
                                return (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setSelectedLesson(lesson)}
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '16px',
                                            background: isSelected ? '#F0F9FF' : '#FFFFFF',
                                            border: `1px solid ${isSelected ? '#BAE6FD' : '#F1F5F9'}`,
                                            borderRadius: '16px',
                                            color: isSelected ? '#0369A1' : '#475569',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            fontWeight: isSelected ? '600' : '500',
                                            boxShadow: isSelected ? '0 2px 10px rgba(2, 132, 199, 0.05)' : 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isSelected) {
                                                e.currentTarget.style.background = '#F8FAFC';
                                                e.currentTarget.style.borderColor = '#E2E8F0';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isSelected) {
                                                e.currentTarget.style.background = '#FFFFFF';
                                                e.currentTarget.style.borderColor = '#F1F5F9';
                                            }
                                        }}
                                    >
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: isSelected ? '#0284C7' : '#F1F5F9',
                                            color: isSelected ? '#FFFFFF' : '#94A3B8',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.85rem',
                                            fontWeight: '700',
                                            flexShrink: 0
                                        }}>
                                            {idx + 1}
                                        </div>
                                        <div style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {lesson.title}
                                        </div>
                                        {isSelected && <PlayCircle size={16} color="#0284C7" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Lesson Content */}
                    <div style={{
                        background: '#FFFFFF',
                        border: '1px solid #F1F5F9',
                        borderRadius: '24px',
                        padding: '40px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
                    }}>
                        {selectedLesson ? (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <span style={{
                                        background: '#FEF2F2',
                                        color: '#EF4444',
                                        padding: '4px 12px',
                                        borderRadius: '12px',
                                        fontSize: '0.8rem',
                                        fontWeight: '700'
                                    }}>
                                        Module Content
                                    </span>
                                </div>
                                <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: '#0F172A', fontWeight: '800' }}>
                                    {selectedLesson.title}
                                </h2>
                                <p style={{ color: '#64748B', marginBottom: '32px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                                    {selectedLesson.description}
                                </p>
                                <div style={{
                                    color: '#334155',
                                    lineHeight: '1.8',
                                    whiteSpace: 'pre-wrap',
                                    fontSize: '1.05rem',
                                    background: '#F8FAFC',
                                    padding: '32px',
                                    borderRadius: '16px',
                                    border: '1px solid #E2E8F0'
                                }}>
                                    {selectedLesson.content}
                                </div>

                                <div style={{ marginTop: '40px', borderTop: '1px solid #F1F5F9', paddingTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button
                                        onClick={() => navigate(`/practice/${courseId}`)}
                                        style={{
                                            padding: '16px 32px',
                                            background: '#0284C7',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '16px',
                                            cursor: 'pointer',
                                            fontSize: '1.1rem',
                                            fontWeight: '700',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            boxShadow: '0 4px 15px rgba(2, 132, 199, 0.3)',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(2, 132, 199, 0.4)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(2, 132, 199, 0.3)';
                                        }}
                                    >
                                        Execute Practice Mission <PlayCircle size={20} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '100px 0', color: '#94A3B8' }}>
                                <BookOpen size={48} style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
                                <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>Select a module from the left to start learning.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}