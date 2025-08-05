"use client";
import React from "react";
import { motion } from "framer-motion";

export function WorldMap() {
    return (
        <motion.svg
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            viewBox="0 0 1000 500"
            className="absolute inset-0 w-full h-full opacity-80 pointer-events-none"
            style={{ zIndex: 0 }}
        >
            {/* Gradientes para o planeta */}
            <defs>
                {/* Gradiente para o brilho */}
                <radialGradient id="glowGradient" cx="20%" cy="20%" r="80%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                    <stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
                    <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                </radialGradient>
                
                {/* Gradiente para os dados */}
                <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
            </defs>

            {/* Anéis de dados orbitando */}
            <g className="data-rings">
                {/* Anel interno */}
                <ellipse 
                    cx="500" 
                    cy="250" 
                    rx="180" 
                    ry="60" 
                    fill="none" 
                    stroke="url(#dataGradient)" 
                    strokeWidth="2" 
                    opacity="0.6"
                    className="data-ring data-ring-1"
                />
                
                {/* Anel médio */}
                <ellipse 
                    cx="500" 
                    cy="250" 
                    rx="220" 
                    ry="80" 
                    fill="none" 
                    stroke="url(#dataGradient)" 
                    strokeWidth="1.5" 
                    opacity="0.4"
                    className="data-ring data-ring-2"
                />
                
                {/* Anel externo */}
                <ellipse 
                    cx="500" 
                    cy="250" 
                    rx="260" 
                    ry="100" 
                    fill="none" 
                    stroke="url(#dataGradient)" 
                    strokeWidth="1" 
                    opacity="0.3"
                    className="data-ring data-ring-3"
                />
            </g>

            {/* Partículas de dados fluindo */}
            <g className="data-particles">
                {/* Partículas no anel interno */}
                <circle cx="320" cy="250" r="2" fill="#10b981" className="data-particle data-particle-1" />
                <circle cx="680" cy="250" r="2" fill="#3b82f6" className="data-particle data-particle-2" />
                <circle cx="500" cy="190" r="2" fill="#8b5cf6" className="data-particle data-particle-3" />
                <circle cx="500" cy="310" r="2" fill="#10b981" className="data-particle data-particle-4" />
                
                {/* Partículas no anel médio */}
                <circle cx="280" cy="250" r="1.5" fill="#3b82f6" className="data-particle data-particle-5" />
                <circle cx="720" cy="250" r="1.5" fill="#8b5cf6" className="data-particle data-particle-6" />
                <circle cx="500" cy="170" r="1.5" fill="#10b981" className="data-particle data-particle-7" />
                <circle cx="500" cy="330" r="1.5" fill="#3b82f6" className="data-particle data-particle-8" />
                
                {/* Partículas no anel externo */}
                <circle cx="240" cy="250" r="1" fill="#8b5cf6" className="data-particle data-particle-9" />
                <circle cx="760" cy="250" r="1" fill="#10b981" className="data-particle data-particle-10" />
                <circle cx="500" cy="150" r="1" fill="#3b82f6" className="data-particle data-particle-11" />
                <circle cx="500" cy="350" r="1" fill="#8b5cf6" className="data-particle data-particle-12" />
            </g>

            {/* Linhas de conexão de dados */}
            <g className="data-connections">
                <line x1="320" y1="250" x2="680" y2="250" stroke="url(#dataGradient)" strokeWidth="1" opacity="0.3" className="data-connection data-connection-1" />
                <line x1="500" y1="190" x2="500" y2="310" stroke="url(#dataGradient)" strokeWidth="1" opacity="0.3" className="data-connection data-connection-2" />
                <line x1="280" y1="250" x2="720" y2="250" stroke="url(#dataGradient)" strokeWidth="0.8" opacity="0.2" className="data-connection data-connection-3" />
                <line x1="500" y1="170" x2="500" y2="330" stroke="url(#dataGradient)" strokeWidth="0.8" opacity="0.2" className="data-connection data-connection-4" />
            </g>
        </motion.svg>
    );
} 