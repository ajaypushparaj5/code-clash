import React from 'react';

export const PropsList = {
    // Solid flat Moon
    BlockyMoon: ({ style, className }) => (
        <svg width="120" height="120" viewBox="0 0 120 120" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="50" fill="#ccfbf1" />
        </svg>
    ),

    // Flat Red Character looking right
    RedCharacter: ({ style, className }) => (
        <svg width="60" height="70" viewBox="0 0 60 70" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
            {/* Body */}
            <rect x="10" y="10" width="40" height="50" rx="10" fill="#ef4444" />
            {/* Eye socket bg */}
            <rect x="35" y="20" width="25" height="25" fill="#f87171" rx="5" />
            {/* Black eye hole */}
            <path d="M 40 25 L 60 25 L 60 40 Q 50 45 40 40 Z" fill="#111827" />
            <rect x="45" y="28" width="6" height="6" fill="#ffffff" />
            {/* Legs */}
            <rect x="15" y="60" width="10" height="10" fill="#b91c1c" />
            <rect x="35" y="60" width="10" height="10" fill="#b91c1c" />
        </svg>
    ),

    // Blocky Platform
    BlockyPlatformBig: ({ style, className }) => (
        <svg width="400" height="250" viewBox="0 0 400 250" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
            {/* Base dirt layer - sharp borders, no blur */}
            <path d="M 10 50 L 390 50 L 370 120 L 340 180 L 290 200 L 240 170 L 190 220 L 110 190 L 60 210 L 30 140 Z" fill="#78350f" />
            <path d="M 20 60 L 380 60 L 360 110 L 330 170 L 290 190 L 240 160 L 190 210 L 120 180 L 70 200 L 40 130 Z" fill="#581c87" opacity="0.1" />

            {/* Dirt clods for detail */}
            <rect x="50" y="70" width="30" height="30" rx="10" fill="#451a03" />
            <rect x="120" y="120" width="40" height="30" rx="15" fill="#451a03" />
            <rect x="250" y="90" width="50" height="40" rx="20" fill="#451a03" />
            <rect x="310" y="140" width="25" height="25" rx="8" fill="#451a03" />
            <rect x="180" y="160" width="20" height="20" rx="5" fill="#451a03" />

            {/* Grass top layer */}
            <path d="M 0 30 C 50 20, 100 40, 150 25 C 200 10, 250 35, 300 20 C 350 5, 380 30, 400 30 L 395 55 C 380 45, 350 60, 300 45 C 250 30, 200 60, 150 45 C 100 30, 50 55, 5 45 Z" fill="#4ade80" />

            {/* Overhanging vines */}
            <path d="M 20 40 Q 25 100 10 130 Q 30 120 35 45 Z" fill="#22c55e" />
            <path d="M 80 40 Q 85 120 70 160 Q 95 150 100 45 Z" fill="#22c55e" />
            <path d="M 120 45 Q 125 90 110 110 Q 130 100 135 45 Z" fill="#22c55e" />
            <path d="M 280 40 Q 285 140 270 180 Q 295 160 305 45 Z" fill="#22c55e" />
            <path d="M 350 45 Q 355 110 340 140 Q 365 130 370 45 Z" fill="#22c55e" />
        </svg>
    ),

    // Cyan glowing portal door
    BlockyPortal: ({ style, className }) => (
        <svg width="150" height="200" viewBox="0 0 150 200" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
            {/* Archway made of stone */}
            <path d="M 10 200 L 10 70 A 65 65 0 0 1 140 70 L 140 200 L 110 200 L 110 70 A 35 35 0 0 0 40 70 L 40 200 Z" fill="#64748b" />
            <path d="M 20 200 L 20 70 A 55 55 0 0 1 130 70 L 130 200 L 100 200 L 100 70 A 25 25 0 0 0 50 70 L 50 200 Z" fill="#475569" />

            {/* Bricks/Details */}
            <rect x="15" y="100" width="20" height="15" fill="#334155" />
            <rect x="115" y="150" width="20" height="15" fill="#334155" />
            <rect x="115" y="80" width="20" height="15" fill="#334155" />
            <rect x="15" y="160" width="20" height="15" fill="#334155" />

            {/* Glowing inner door */}
            <path d="M 50 200 L 50 70 A 25 25 0 0 1 100 70 L 100 200 Z" fill="#00e5ff" opacity="0.8" />
            <path d="M 60 200 L 60 70 A 15 15 0 0 1 90 70 L 90 200 Z" fill="#ccfbf1" />

            {/* Elegant inner sigil line */}
            <path d="M 75 80 L 75 160 M 65 100 C 65 80 85 80 85 100 C 85 120 65 120 65 140 C 65 160 85 160 85 140" stroke="#0891b2" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
    ),

    // Yellow Crystal
    BlockyCrystal: ({ style, className }) => (
        <svg width="40" height="60" viewBox="0 0 40 60" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
            <polygon points="20,0 40,30 20,60 0,30" fill="#facc15" />
            <polygon points="20,0 30,30 20,60 10,30" fill="#fef08a" />
            <polygon points="20,10 25,30 20,50 15,30" fill="#ffffff" opacity="0.6" />
        </svg>
    ),

    // Pixel Chest (for the white section)
    PixelChest: ({ style, className }) => (
        <svg width="100" height="100" viewBox="0 0 100 100" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="30" width="80" height="60" fill="#b45309" stroke="#1e293b" strokeWidth="6" />
            <rect x="10" y="30" width="80" height="20" fill="#d97706" stroke="#1e293b" strokeWidth="6" />
            <rect x="40" y="40" width="20" height="20" fill="#1e293b" />
            <rect x="45" y="45" width="10" height="10" fill="#fbbf24" />
        </svg>
    ),

    // Pixel Pedestal/Plinth
    PixelPedestal: ({ style, className }) => (
        <svg width="120" height="150" viewBox="0 0 120 150" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="10" width="80" height="30" fill="#64748b" stroke="#1e293b" strokeWidth="6" />
            <rect x="30" y="40" width="60" height="80" fill="#38bdf8" stroke="#1e293b" strokeWidth="6" />
            <rect x="30" y="50" width="60" height="10" fill="#0284c7" />
            <rect x="30" y="70" width="60" height="10" fill="#0284c7" />
            <rect x="30" y="90" width="60" height="10" fill="#0284c7" />
            <rect x="10" y="120" width="100" height="30" fill="#475569" stroke="#1e293b" strokeWidth="6" />
        </svg>
    )
}

// Flat simple cloud separator based on GDevelop style
export const BlockyCloudSeparator = () => (
    <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '140px', display: 'block', fill: '#ffffff', position: 'relative', zIndex: 10, marginTop: '-60px' }}
    >
        {/* Simple overlapping circles creating a generic cloud shape, very flat */}
        <path d="M0,120 L1200,120 L1200,80 C1150,80 1150,40 1100,20 C1050,0 950,20 900,40 C850,20 750,0 700,50 C650,20 550,20 500,60 C400,30 300,50 250,80 C200,60 100,60 50,80 C25,80 0,100 0,120 Z" />
    </svg>
);
