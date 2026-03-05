import { useEffect, useState } from 'react';
import { BrainCircuit, Code } from 'lucide-react';
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

    const neonColors = [
        '#00E5FF', '#FF00AA', '#9D00FF', '#00FF66', '#FFD700', '#FF3300'
    ];

    return (
        <div style={{ padding: '60px 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{
                fontSize: '3rem',
                marginBottom: '50px',
                textShadow: '0 0 20px rgba(178, 0, 255, 0.8)',
                fontWeight: '800',
                color: '#fff',
                fontFamily: "'Outfit', sans-serif",
                textAlign: 'center'
            }}>
                Explore Courses
            </h1>

            <style>{`
                .crystal-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 40px;
                    width: 100%;
                    max-width: 1200px;
                }

                .crystal-card {
                    background: linear-gradient(180deg, rgba(20, 15, 35, 0.9) 0%, rgba(10, 5, 20, 0.9) 100%);
                    border-radius: 16px;
                    border: 1px solid var(--theme-color-dim);
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 0 20px var(--theme-color-dim), inset 0 0 20px rgba(0,0,0,0.5);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .crystal-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 0 30px var(--theme-color-glow), inset 0 0 20px rgba(0,0,0,0.5);
                    border-color: var(--theme-color-glow);
                }

                .crystal-image-container {
                    background: rgba(10, 5, 20, 0.5);
                    border: 1px solid var(--theme-color-glow);
                    border-radius: 12px;
                    height: 220px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 24px;
                    position: relative;
                    box-shadow: inset 0 0 30px var(--theme-color-dim);
                    overflow: hidden;
                }
                
                /* Slight noise texture approximation */
                .crystal-image-container::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-image: radial-gradient(var(--theme-color-dim) 1px, transparent 1px);
                    background-size: 4px 4px;
                    opacity: 0.15;
                    pointer-events: none;
                }

                .crystal-icon {
                    font-size: 80px;
                    filter: drop-shadow(0 0 20px var(--theme-color));
                    transform: scale(1);
                    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .crystal-card:hover .crystal-icon {
                    transform: scale(1.1) rotate(5deg);
                }

                .crystal-title-row {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 16px;
                }

                .crystal-title-line {
                    height: 1px;
                    flex: 1;
                    background: linear-gradient(90deg, transparent, var(--theme-color), transparent);
                    opacity: 0.5;
                }

                .crystal-title {
                    color: var(--theme-color);
                    font-size: 1.3rem;
                    font-weight: 700;
                    margin: 0;
                    text-transform: capitalize;
                    letter-spacing: 1px;
                    text-shadow: 0 0 10px var(--theme-color-dim);
                }

                .crystal-desc {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.9rem;
                    line-height: 1.6;
                    text-align: center;
                    margin-bottom: 24px;
                    flex-grow: 1;
                }

                .crystal-actions {
                    display: flex;
                    gap: 12px;
                }

                .crystal-btn {
                    flex: 1;
                    padding: 12px;
                    background: transparent;
                    border: 1px solid var(--theme-color-dim);
                    border-radius: 8px;
                    color: #fff;
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.95rem;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.2s;
                }

                .crystal-btn:hover {
                    background: var(--theme-color-dim);
                    border-color: var(--theme-color);
                    box-shadow: 0 0 15px var(--theme-color-dim);
                }
            `}</style>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px', color: '#B200FF' }}>
                    <BrainCircuit className="animate-pulse" size={48} style={{ margin: '0 auto' }} />
                    <p style={{ marginTop: '16px' }}>Loading Courses...</p>
                </div>
            ) : (
                <div className="crystal-grid">
                    {courses.map((course, index) => {
                        const color = neonColors[index % neonColors.length];
                        return (
                            <div
                                key={course.id}
                                className="crystal-card"
                                style={{
                                    '--theme-color': color,
                                    '--theme-color-dim': `${color}40`,
                                    '--theme-color-glow': `${color}AA`,
                                }}
                            >
                                <div className="crystal-image-container">
                                    <div className="crystal-icon">
                                        {course.icon || <BrainCircuit size={64} color={color} />}
                                    </div>
                                </div>

                                <div className="crystal-title-row">
                                    <div className="crystal-title-line"></div>
                                    <h3 className="crystal-title">{course.title}</h3>
                                    <div className="crystal-title-line"></div>
                                </div>

                                <p className="crystal-desc">
                                    {course.description || "Explore this amazing course to level up your coding skills."}
                                </p>

                                <div className="crystal-actions">
                                    <button
                                        className="crystal-btn"
                                        onClick={() => navigate(`/learn/${course.id}`)}
                                    >
                                        <BrainCircuit size={16} /> Learn
                                    </button>
                                    <button
                                        className="crystal-btn"
                                        onClick={() => navigate(`/practice/${course.id}`)}
                                    >
                                        <Code size={16} /> Practice
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}