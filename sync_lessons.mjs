import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const YOUTUBE_VIDEOS = [
    "https://www.youtube.com/embed/PkZNo7MF68F",
    "https://www.youtube.com/embed/8mAITcNt710",
    "https://www.youtube.com/embed/zJSY8tbf_ys",
    "https://www.youtube.com/embed/Ke90Tje7VS0",
    "https://www.youtube.com/embed/W6NZfCO5SIk",
    "https://www.youtube.com/embed/rfscVS0vtbw",
    "https://www.youtube.com/embed/HGvQk7_6-pU",
    "https://www.youtube.com/embed/pQN-pnXPaVg",
    "https://www.youtube.com/embed/NW-rJ2pEQ-8",
    "https://www.youtube.com/embed/Q33KBiDriJY",
];

async function run() {
    console.log("Fetching courses...");
    const { data: courses, error: fetchError } = await supabase.from('courses').select('id, title');

    if (fetchError) {
        console.error("Error fetching courses", fetchError);
        return;
    }

    console.log(`Found ${courses.length} courses. Processing...`);

    for (const course of courses) {
        console.log(`Adding 10 lessons for course: ${course.title} (${course.id})`);

        // Check existing
        const { count, error: countError } = await supabase
            .from('lessons')
            .select('*', { count: 'exact', head: true })
            .eq('course_id', course.id);

        if (countError) {
            console.error("Error counting lessons", countError);
            continue;
        }

        // Clear existing
        if (count > 0) {
            console.log(`Cleaning up ${count} existing lessons...`);
            const { error: deleteError } = await supabase.from('lessons').delete().eq('course_id', course.id);
            if (deleteError) {
                console.error("Error deleting old lessons", deleteError);
                continue;
            }
        }

        const lessonsToAdd = [];
        for (let i = 1; i <= 10; i++) {
            // We embed the video purely via the 'content' column to guarantee it fits the db schema
            const contentHtml = `
            <h3>Mastering Module ${i}</h3>
            <p>In this module, we will explore key concepts for <strong>${course.title}</strong>. Watch the video below to understand the topic deeply. Pay attention to the specific patterns provided!</p>
            <div style="margin: 24px 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                <iframe 
                    width="100%" 
                    height="400" 
                    src="${YOUTUBE_VIDEOS[i - 1]}" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    style="display: block;"
                ></iframe>
            </div>
            <p>Take notes and try testing out the concepts on your own to see how standard algorithms react.</p>
        `;

            lessonsToAdd.push({
                course_id: course.id,
                title: `${course.title} - Module ${i}`,
                description: `This is module ${i} for the ${course.title} framework. Dive deep into complex programming techniques to master this module!`,
                content: contentHtml,
                order_num: i
            });
        }

        const { error: insertError } = await supabase.from('lessons').insert(lessonsToAdd);

        if (insertError) {
            console.error(`Error inserting lessons for ${course.title}`, insertError);
        } else {
            console.log(`Successfully added 10 lessons for ${course.title}`);
        }
    }

    console.log("Done!");
}

run();
