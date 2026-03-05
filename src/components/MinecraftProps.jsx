import React from 'react';

export const PropsList = {
    // A chunky pixelated sun/moon based on Minecraft style
    BlockyMoon: ({ style, className }) => (
        <svg width="120" height="120" viewBox="0 0 120 120" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
            {/* Square Moon Base */}
            <rect x="20" y="20" width="80" height="80" fill="#E0F7FA" filter="drop-shadow(0 0 20px rgba(224, 247, 250, 0.8))" />
            {/* Craters as square pixels */}
            <rect x="30" y="30" width="15" height="15" fill="#B2EBF2" opacity="0.6" />
            <rect x="70" y="45" width="20" height="20" fill="#B2EBF2" opacity="0.4" />
            <rect x="40" y="70" width="15" height="15" fill="#B2EBF2" opacity="0.5" />
        </svg>
    ),

    // A blocky Minecraft-style dirt and grass platform
    BlockyPlatformBig: ({ style, className }) => (
        <svg width="400" height="200" viewBox="0 0 400 200" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
            {/* Base dirt layer - segmented into blocks */}
            <rect x="20" y="60" width="360" height="40" fill="#795548" />
            <rect x="40" y="100" width="320" height="40" fill="#5D4037" />
            <rect x="80" y="140" width="240" height="40" fill="#4E342E" />

            {/* Blocky detail dirt clods */}
            <rect x="50" y="70" width="20" height="20" fill="#4E342E" />
            <rect x="120" y="80" width="20" height="20" fill="#3E2723" />
            <rect x="250" y="110" width="20" height="20" fill="#3E2723" />
            <rect x="300" y="70" width="20" height="20" fill="#4E342E" />
            <rect x="180" y="150" width="20" height="20" fill="#3E2723" />

            {/* Grass top layer - sharp blocky segments */}
            <rect x="10" y="40" width="380" height="20" fill="#00E676" />
            <rect x="20" y="50" width="360" height="10" fill="#69F0AE" />

            {/* Dangling Minecraft vines (straight blocky descending lines) */}
            <rect x="40" y="60" width="10" height="60" fill="#00C853" />
            <rect x="90" y="60" width="10" height="100" fill="#00C853" />
            <rect x="220" y="60" width="10" height="80" fill="#00E676" />
            <rect x="310" y="60" width="10" height="40" fill="#00C853" />
            <rect x="350" y="60" width="10" height="90" fill="#00E676" />

            {/* Adding blocky leaves to the vines */}
            <rect x="35" y="100" width="20" height="10" fill="#00E676" />
            <rect x="85" y="130" width="20" height="10" fill="#00E676" />
            <rect x="215" y="110" width="20" height="10" fill="#00C853" />
        </svg>
    ),

    BlockyPlatformSmall: ({ style, className }) => (
        <svg width="200" height="100" viewBox="0 0 200 100" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="40" width="160" height="30" fill="#795548" />
            <rect x="40" y="70" width="120" height="30" fill="#5D4037" />

            <rect x="50" y="45" width="15" height="15" fill="#4E342E" />
            <rect x="130" y="75" width="15" height="15" fill="#4E342E" />

            <rect x="10" y="20" width="180" height="20" fill="#00E676" />
            <rect x="20" y="30" width="160" height="10" fill="#69F0AE" />

            <rect x="30" y="40" width="10" height="50" fill="#00C853" />
            <rect x="140" y="40" width="10" height="30" fill="#00E676" />
        </svg>
    ),

    // Minecraft style End Portal blocky arch
    BlockyPortal: ({ style, className }) => (
        <svg width="150" height="200" viewBox="0 0 150 200" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
            {/* Blocky Obsidian Arch */}
            <rect x="20" y="60" width="30" height="140" fill="#2E004F" />
            <rect x="100" y="60" width="30" height="140" fill="#2E004F" />
            <rect x="20" y="40" width="110" height="30" fill="#2E004F" />

            <rect x="25" y="65" width="20" height="135" fill="#410070" />
            <rect x="105" y="65" width="20" height="135" fill="#410070" />
            <rect x="25" y="45" width="100" height="20" fill="#410070" />

            {/* Teleport Area - Blocky Pixels */}
            <rect x="50" y="70" width="50" height="130" fill="#AA00FF" opacity="0.6" filter="drop-shadow(0 0 15px #AA00FF)" />

            {/* Blocky flying portal particles */}
            <rect x="65" y="160" width="8" height="8" fill="#E040FB" className="animate-float" style={{ animationDelay: '0s' }} />
            <rect x="55" y="120" width="8" height="8" fill="#E040FB" className="animate-float" style={{ animationDelay: '0.5s' }} />
            <rect x="85" y="90" width="8" height="8" fill="#FFF" className="animate-pulse" />
            <rect x="75" y="140" width="8" height="8" fill="#FFF" className="animate-float" style={{ animationDelay: '1s' }} />
        </svg>
    ),

    // Blocky Minecraft emerald/diamond style crystal
    BlockyCrystal: ({ style, className }) => (
        <svg width="50" height="60" viewBox="0 0 50 60" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="10" width="20" height="40" fill="#00E676" filter="drop-shadow(0 0 15px rgba(0, 230, 118, 0.8))" />
            <rect x="10" y="20" width="30" height="20" fill="#00C853" />
            <rect x="20" y="5" width="10" height="50" fill="#B9F6CA" />

            <rect x="20" y="10" width="5" height="10" fill="#FFF" opacity="0.8" />
        </svg>
    ),

    // Blocky Minecraft style coin/token
    BlockyCoin: ({ style, className }) => (
        <svg width="40" height="40" viewBox="0 0 40 40" style={style} className={className} xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="5" width="20" height="30" fill="#FFD700" filter="drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))" />
            <rect x="5" y="10" width="30" height="20" fill="#FFC107" />
            <rect x="15" y="15" width="10" height="10" fill="#FFECB3" />
        </svg>
    )
}

// Blocky cloud separator
export const BlockyCloudSeparator = () => (
    <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '120px', display: 'block', fill: '#FFFFFF', position: 'relative', zIndex: 10, marginTop: '-50px' }}
    >
        <path d="M0,120 L1200,120 L1200,60 L1150,60 L1150,40 L1050,40 L1050,20 L900,20 L900,50 L800,50 L800,30 L650,30 L650,50 L550,50 L550,10 L400,10 L400,40 L300,40 L300,60 L150,60 L150,20 L50,20 L50,50 L0,50 Z" />
    </svg>
);
