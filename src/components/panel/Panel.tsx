"use client";
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Zap, Shield, Network, Target, Clock, Settings } from "lucide-react";
import Layer4Form from '@/components/panel/Layer4Form';
import Layer7Form from '@/components/panel/Layer7Form';
import api from '@/lib/api';
import { useTheme } from "@/contexts/ThemeContext";

interface Method {
    method: string;
    description: string;
    layer4: boolean;
    layer7: boolean;
    amplification: boolean;
    premium: boolean;
    proxy: boolean;
    concurrents: number;
}

export default function Panel() {
    const [activeLayer, setActiveLayer] = useState<'L4' | 'L7'>('L4');
    const [methods, setMethods] = useState<Method[]>([]);
    const { currentTheme } = useTheme();

    useEffect(() => {
        const fetchMethods = async () => {
            try {
                const response = await api.get("/methods");
                const methodsWithConcurrents = (response.data as Omit<Method, 'concurrents'>[]).map((m) => ({
                  concurrents: 1,
                  ...m
                }));
                setMethods(methodsWithConcurrents);
            } catch (err: unknown) {
                console.error("Erro ao buscar métodos:", err);
            }
        };
        fetchMethods();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-2xl p-8 shadow-xl`}
        >
            {/* Header com estatísticas */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                        <Zap className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
                    </div>
                    <div>
                        <h2 className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>Stress Testing</h2>
                        <p className={currentTheme.dashboard.textSecondary}>Configure e execute testes de carga</p>
                    </div>
                </div>
                
                {/* Cards de estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-xl p-4`}>
                        <div className="flex items-center gap-3">
                            <Target className={`w-5 h-5 ${currentTheme.dashboard.text}`} />
                            <div>
                                <p className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>12</p>
                                <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>Métodos</p>
                            </div>
                        </div>
                    </div>
                    <div className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-xl p-4`}>
                        <div className="flex items-center gap-3">
                            <Network className={`w-5 h-5 ${currentTheme.dashboard.text}`} />
                            <div>
                                <p className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>4</p>
                                <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>Ativos</p>
                            </div>
                        </div>
                    </div>
                    <div className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-xl p-4`}>
                        <div className="flex items-center gap-3">
                            <Clock className={`w-5 h-5 ${currentTheme.dashboard.text}`} />
                            <div>
                                <p className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>156</p>
                                <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>Execuções</p>
                            </div>
                        </div>
                    </div>
                    <div className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-xl p-4`}>
                        <div className="flex items-center gap-3">
                            <Shield className={`w-5 h-5 ${currentTheme.dashboard.text}`} />
                            <div>
                                <p className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>99.2%</p>
                                <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>Sucesso</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Seletor de Layer */}
            <div className="mb-6">
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveLayer('L4')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            activeLayer === 'L4'
                                ? `${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} border ${currentTheme.dashboard.borders}`
                                : `${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text}`
                        }`}
                    >
                        Layer 4
                    </button>
                    <button
                        onClick={() => setActiveLayer('L7')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            activeLayer === 'L7'
                                ? `${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} border ${currentTheme.dashboard.borders}`
                                : `${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text}`
                        }`}
                    >
                        Layer 7
                    </button>
                </div>
            </div>

            {/* Formulário ativo */}
            {activeLayer === 'L4' ? (
                <Layer4Form methods={methods} />
            ) : (
                <Layer7Form methods={methods} />
            )}
        </motion.div>
    );
}
