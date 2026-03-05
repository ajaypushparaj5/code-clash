import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { ChevronLeft, BookOpen } from 'lucide-react';

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

    if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '32px' }}>
            <button
                onClick={() => navigate('/learn')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', background: 'none', border: 'none', color: 'var(--accent-purple)', cursor: 'pointer', fontSize: '1rem' }}
            >
                <ChevronLeft size={20} /> Back to Courses
            </button>

            <h1 style={{ fontSize: '2.5rem', marginBottom: '32px', color: 'var(--accent-purple)' }}>
                {course?.icon} {course?.title}
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px' }}>
                {/* Lessons Sidebar */}
                <div style={{ background: 'rgba(22, 27, 34, 0.9)', border: '1px solid rgba(178, 0, 255, 0.2)', borderRadius: '12px', padding: '24px', maxHeight: '600px', overflowY: 'auto' }}>
                    <h3 style={{ marginBottom: '16px', color: 'var(--accent-purple)' }}>Lessons</h3>
                    {lessons.map((lesson, idx) => (
                        <button
                            key={lesson.id}
                            onClick={() => setSelectedLesson(lesson)}
                            style={{
                                width: '100%',
                                textAlign: 'left',
                                padding: '12px',
                                marginBottom: '8px',
                                background: selectedLesson?.id === lesson.id ? 'rgba(178, 0, 255, 0.3)' : 'transparent',
                                border: '1px solid rgba(178, 0, 255, 0.2)',
                                borderRadius: '8px',
                                color: selectedLesson?.id === lesson.id ? 'var(--accent-purple)' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            <BookOpen size={16} style={{ display: 'inline', marginRight: '8px' }} />
                            {idx + 1}. {lesson.title}
                        </button>
                    ))}
                </div>

                {/* Lesson Content */}
                <div style={{ background: 'rgba(22, 27, 34, 0.9)', border: '1px solid rgba(178, 0, 255, 0.2)', borderRadius: '12px', padding: '32px' }}>
                    {selectedLesson ? (
                        <>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--accent-purple)' }}>
                                {selectedLesson.title}
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1.1rem' }}>
                                {selectedLesson.description}
                            </p>
                            <div style={{ color: 'var(--text-primary)', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                                {selectedLesson.content}
                            </div>

                            <button
                                onClick={() => navigate(`/practice/${courseId}`)}
                                style={{ marginTop: '32px', padding: '12px 24px', background: 'var(--accent-purple)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}
                            >
                                Practice Questions for this Course →
                            </button>
                        </>
                    ) : (
                        <p style={{ color: 'var(--text-secondary)' }}>No lessons available yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}