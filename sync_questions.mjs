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

const courseQuestions = {
    1: [ // Arrays & Lists
        {
            title: 'Two Sum',
            description: 'Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>。<br><br>You may assume that each input would have exactly one solution, and you may not use the same element twice.',
            example: 'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]',
            difficulty: 'Easy',
            language: 'javascript',
            starter_code: 'function twoSum(nums, target) {\n    // Write your code here\n    \n}\n'
        },
        {
            title: 'Reverse Array In-Place',
            description: 'Write a function that reverses a given array in-place without using extra space.',
            example: 'Input: [1, 2, 3, 4, 5]\nOutput: [5, 4, 3, 2, 1]',
            difficulty: 'Easy',
            language: 'javascript',
            starter_code: 'function reverseArray(arr) {\n    // Write your code here\n    \n}\n'
        }
    ],
    2: [ // Strings
        {
            title: 'Valid Palindrome',
            description: 'Given a string <code>s</code>, return <code>true</code> if it is a palindrome, or <code>false</code> otherwise.<br><br>A string is a palindrome if it reads the same forward and backward, ignoring non-alphanumeric characters and case.',
            example: 'Input: s = "A man, a plan, a canal: Panama"\nOutput: true',
            difficulty: 'Easy',
            language: 'javascript',
            starter_code: 'function isPalindrome(s) {\n    // Write your code here\n    \n}\n'
        }
    ],
    3: [ // Recursion
        {
            title: 'Fibonacci Number',
            description: 'The Fibonacci numbers, commonly denoted <code>F(n)</code> form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. <br>Given <code>n</code>, calculate <code>F(n)</code>.',
            example: 'Input: n = 4\nOutput: 3\nExplanation: F(4) = F(3) + F(2) = 2 + 1 = 3.',
            difficulty: 'Easy',
            language: 'javascript',
            starter_code: 'function fib(n) {\n    // Write your code here (use recursion!)\n    \n}\n'
        }
    ],
    4: [ // Sorting
        {
            title: 'Sort an Array',
            description: 'Given an array of integers <code>nums</code>, sort the array in ascending order and return it.<br>Try to implement it without using the built-in sort() function.',
            example: 'Input: nums = [5,2,3,1]\nOutput: [1,2,3,5]',
            difficulty: 'Medium',
            language: 'javascript',
            starter_code: 'function sortArray(nums) {\n    // Implement a sorting algorithm here\n    \n}\n'
        }
    ],
    5: [ // Dynamic Programming
        {
            title: 'Climbing Stairs',
            description: 'You are climbing a staircase. It takes <code>n</code> steps to reach the top.<br><br>Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
            example: 'Input: n = 3\nOutput: 3\nExplanation: There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step',
            difficulty: 'Easy',
            language: 'javascript',
            starter_code: 'function climbStairs(n) {\n    // Write your code here\n    \n}\n'
        }
    ],
    6: [ // Trees
        {
            title: 'Invert Binary Tree',
            description: 'Given the root of a binary tree, invert the tree, and return its root. (Swap every left child with its right child for all nodes).',
            example: 'Input: root = [4,2,7,1,3,6,9]\nOutput: [4,7,2,9,6,3,1]',
            difficulty: 'Easy',
            language: 'javascript',
            starter_code: '/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\nfunction invertTree(root) {\n    // Write your code here\n    \n}\n'
        }
    ]
};

async function run() {
    console.log("Emptying old questions...");
    await supabase.from('coding_questions').delete().neq('id', -1); // deletes all

    console.log("Inserting new questions mapping to specific courses...");
    const questionsToInsert = [];

    for (const [courseId, questions] of Object.entries(courseQuestions)) {
        for (const q of questions) {
            questionsToInsert.push({ ...q, course_id: parseInt(courseId) });
        }
    }

    const { error } = await supabase.from('coding_questions').insert(questionsToInsert);

    if (error) {
        console.error("Error inserting questions", error);
    } else {
        console.log(`Successfully added ${questionsToInsert.length} practice questions!`);
    }
}

run();
