import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const courseQuestions = {
    1: [
        {
            title: 'Two Sum',
            description: 'Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.<br><br><b>Example:</b> Input: nums = [2,7,11,15], target = 9 | Output: [0,1]',
            difficulty: 'Easy',
            language: 'javascript',
            starter_code: 'function twoSum(nums, target) {\n    // Write your code here\n    \n}\n'
        },
        {
            title: 'Reverse Array In-Place',
            description: 'Write a function that reverses a given array in-place without using extra space.<br><br><b>Example:</b> Input: [1, 2, 3, 4, 5] | Output: [5, 4, 3, 2, 1]',
            difficulty: 'Easy',
            language: 'javascript',
            starter_code: 'function reverseArray(arr) {\n    // Write your code here\n    \n}\n'
        }
    ],
    2: [
        {
            title: 'Valid Palindrome',
            description: 'Given a string <code>s</code>, return <code>true</code> if it is a palindrome, or <code>false</code> otherwise.<br><br><b>Example:</b> Input: s = "A man, a plan, a canal: Panama" | Output: true',
            difficulty: 'Easy',
            language: 'javascript',
            starter_code: 'function isPalindrome(s) {\n    // Write your code here\n    \n}\n'
        }
    ],
    3: [
        {
            title: 'Fibonacci Number',
            description: 'Given <code>n</code>, calculate <code>F(n)</code> (Fibonacci sequence).<br><br><b>Example:</b> Input: n = 4 | Output: 3',
            difficulty: 'Easy',
            language: 'javascript',
            starter_code: 'function fib(n) {\n    // Write your code here (use recursion!)\n    \n}\n'
        }
    ],
    4: [
        {
            title: 'Sort an Array',
            description: 'Given an array of integers <code>nums</code>, sort the array in ascending order and return it.<br><br><b>Example:</b> Input: nums = [5,2,3,1] | Output: [1,2,3,5]',
            difficulty: 'Medium',
            language: 'javascript',
            starter_code: 'function sortArray(nums) {\n    // Implement a sorting algorithm here\n    \n}\n'
        }
    ],
    5: [
        {
            title: 'Climbing Stairs',
            description: 'You are climbing a staircase. It takes <code>n</code> steps to reach the top. Each time you can either climb 1 or 2 steps.<br><br><b>Example:</b> Input: n = 3 | Output: 3',
            difficulty: 'Easy',
            language: 'javascript',
            starter_code: 'function climbStairs(n) {\n    // Write your code here\n    \n}\n'
        }
    ],
    6: [
        {
            title: 'Invert Binary Tree',
            description: 'Given the root of a binary tree, invert the tree, and return its root.<br><br><b>Example:</b> Input: root = [4,2,7,1,3,6,9] | Output: [4,7,2,9,6,3,1]',
            difficulty: 'Easy',
            language: 'javascript',
            starter_code: 'function invertTree(root) {\n    // Write your code here\n    \n}\n'
        }
    ]
};

async function run() {
    await supabase.from('coding_questions').delete().neq('id', -1);
    const questionsToInsert = [];
    for (const [courseId, questions] of Object.entries(courseQuestions)) {
        for (const q of questions) {
            questionsToInsert.push({ ...q, course_id: parseInt(courseId) });
        }
    }

    const { error } = await supabase.from('coding_questions').insert(questionsToInsert);
    if (error) console.error("Error inserting questions", error);
    else console.log(`Successfully added ${questionsToInsert.length} practice questions!`);
}

run();
