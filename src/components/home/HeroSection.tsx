"use client";
import React from "react";
import { motion } from "framer-motion";
import { Eye, Zap, Search, Cpu, Network, Shield, Target, Activity } from "lucide-react";
import { WorldMap } from "./WorldMap";
import { useTheme } from "@/contexts/ThemeContext";

export function HeroSection() {
    const { currentTheme } = useTheme();

    return (
        <section className="relative w-full flex flex-col justify-center items-center min-h-[80vh] text-center mt-6 mb-16 mx-auto max-w-7xl px-4 md:px-8 py-16">
            {/* Fundo adaptativo ao tema */}
            <div className={`absolute inset-0 ${currentTheme.dashboard.background}`}></div>

            {/* Mapa mundi em pontilhados */}
            <WorldMap />

            <div className="relative z-20 flex flex-col items-center gap-8 mt-12">
                {/* Ícones flutuantes */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="flex gap-6 mb-4"
                >
                    <Eye className={`w-8 h-8 ${currentTheme.dashboard.text} animate-pulse`} />
                    <Target className={`w-8 h-8 ${currentTheme.dashboard.text} animate-pulse`} />
                    <Zap className={`w-8 h-8 ${currentTheme.dashboard.text} animate-pulse`} />
                    <Search className={`w-8 h-8 ${currentTheme.dashboard.text} animate-pulse`} />
                    <Activity className={`w-8 h-8 ${currentTheme.dashboard.text} animate-pulse`} />
                    <Shield className={`w-8 h-8 ${currentTheme.dashboard.text} animate-pulse`} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                >
                    <span className={currentTheme.dashboard.text}>ATOMIC</span>
                    <span className={currentTheme.dashboard.text}>EYE</span>
                    <br />
                    <span className={`text-2xl md:text-3xl ${currentTheme.dashboard.textSecondary} font-normal`}>
                        O Olho Que Tudo Vê
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`text-xl md:text-2xl max-w-4xl ${currentTheme.dashboard.textSecondary} mb-8 leading-relaxed`}
                >
                    Sistema de <span className={`${currentTheme.dashboard.text} font-semibold`}>Inteligência Suprema</span> que combina{" "}
                    <span className={`${currentTheme.dashboard.text} font-semibold`}>Visão Divina</span>,{" "}
                    <span className={`${currentTheme.dashboard.text} font-semibold`}>Automação Total</span> e{" "}
                    <span className={`${currentTheme.dashboard.text} font-semibold`}>Poder Destrutivo</span>.
                    <br />
                    <span className={`text-lg ${currentTheme.dashboard.textSecondary}`}>
                        A ferramenta definitiva para profissionais de segurança e pesquisadores de elite.
                    </span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a
                        href="/dashboard"
                        className={`px-8 py-4 rounded-lg font-semibold ${currentTheme.dashboard.cards} ${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} hover:shadow-lg hover:scale-105 transition-all duration-300 text-lg border ${currentTheme.dashboard.borders}`}
                    >
                        Acessar Sistema
                    </a>
                    <a
                        href="#features"
                        className={`px-8 py-4 rounded-lg font-semibold border-2 ${currentTheme.dashboard.borders} ${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards} hover:shadow-lg hover:scale-105 transition-all duration-300 text-lg`}
                    >
                        Ver Capacidades
                    </a>
                </motion.div>

                {/* Estatísticas */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-8 mt-12"
                >
                    <div className="text-center">
                        <div className={`text-3xl font-bold ${currentTheme.dashboard.text}`}>∞</div>
                        <div className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Alvos Rastreados</div>
                    </div>
                    <div className="text-center">
                        <div className={`text-3xl font-bold ${currentTheme.dashboard.text}`}>100%</div>
                        <div className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Precisão</div>
                    </div>
                    <div className="text-center">
                        <div className={`text-3xl font-bold ${currentTheme.dashboard.text}`}>0ms</div>
                        <div className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Latência</div>
                    </div>
                    <div className="text-center">
                        <div className={`text-3xl font-bold ${currentTheme.dashboard.text}`}>Elite</div>
                        <div className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Usuários</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
