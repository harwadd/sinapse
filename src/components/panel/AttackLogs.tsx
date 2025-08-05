"use client";
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Activity, Target, Clock, Zap, StopCircle, Search } from "lucide-react";
import { useAttackContext } from '@/contexts/AttackContext';
import { useTheme } from "@/contexts/ThemeContext";
import api from '@/lib/api';
import { useToast } from "@/components/ToastPopup";

interface LaunchedAttack {
    attack_id: string;
    target: string;
    method: string;
    layer?: string;
    time_total: number;
    time_remaining: number;
}

export default function AttackLogs() {
    const { refreshAttacks } = useAttackContext();
    const { showToast } = useToast();
    const { currentTheme } = useTheme();
    const [logs, setLogs] = useState<LaunchedAttack[]>([]);
    const [filterTarget, setFilterTarget] = useState('');

    const fetchAttacks = async () => {
        try {
            const response = await api.get('/ongoing-attacks');
            if (response.data?.status === 'success') {
                setLogs(response.data.attacks);
            }
        } catch (err) {
            console.error("Erro ao buscar ataques em andamento:", err);
        }
    };

    useEffect(() => {
        fetchAttacks();
    }, []);

    useEffect(() => {
        if (refreshAttacks) {
            fetchAttacks();
        }
    }, [refreshAttacks]);

    useEffect(() => {
        const timer = setInterval(() => {
            setLogs((prevLogs) =>
                prevLogs
                    .map(log => ({
                        ...log,
                        time_remaining: log.time_remaining > 0 ? log.time_remaining - 1 : 0
                    }))
                    .filter(log => log.time_remaining > 0)
            );
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const stopAttack = async (attackId: string, layer: string | undefined) => {
        try {
            const response = await api.post('/stop', new URLSearchParams({
                attack_id: attackId,
                layer: layer || ''
            }));
            setLogs(prev => prev.filter(log => log.attack_id !== attackId));
            if (response.data.success == true) {
                showToast("attack stopped!", "success");
            }
        } catch (err) {
            console.error("Erro ao parar ataque:", err);
        }
    };

    const filteredLogs = logs.filter(log =>
        log.target.toLowerCase().includes(filterTarget.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-2xl p-6 shadow-xl`}
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                    <Activity className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
                </div>
                <div>
                    <h2 className={`text-xl font-bold ${currentTheme.dashboard.text}`}>Attack Logs</h2>
                    <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>Ataques em andamento</p>
                </div>
            </div>

            {/* Filtro */}
            <div className="relative mb-6">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme.dashboard.textSecondary} w-4 h-4`} />
                <input
                    type="text"
                    placeholder="Filtrar por target..."
                    value={filterTarget}
                    onChange={(e) => setFilterTarget(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} placeholder:${currentTheme.dashboard.textSecondary.replace('text-', '')} focus:outline-none focus:border-gray-600 transition-colors`}
                />
            </div>

            {/* Lista de ataques */}
            <div className="space-y-3">
                {filteredLogs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <Target className={`w-12 h-12 ${currentTheme.dashboard.textSecondary} mx-auto mb-4`} />
                        <p className={`${currentTheme.dashboard.textSecondary}`}>Nenhum ataque em andamento</p>
                        <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>Os ataques aparecerão aqui quando iniciados</p>
                    </motion.div>
                ) : (
                    filteredLogs.map((log, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-xl p-4 hover:border-gray-600 transition-colors`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                                    <span className={`${currentTheme.dashboard.text} font-medium`}>{log.target}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.textSecondary} px-2 py-1 rounded`}>
                                        {log.layer}
                                    </span>
                                    <button
                                        onClick={() => stopAttack(log.attack_id, log.layer)}
                                        className="p-1 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors"
                                    >
                                        <StopCircle className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Zap className={`w-4 h-4 ${currentTheme.dashboard.text}`} />
                                    <span className={`${currentTheme.dashboard.textSecondary}`}>Método:</span>
                                    <span className={`${currentTheme.dashboard.text}`}>{log.method}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className={`w-4 h-4 ${currentTheme.dashboard.text}`} />
                                    <span className={`${currentTheme.dashboard.textSecondary}`}>Tempo restante:</span>
                                    <span className={`${currentTheme.dashboard.text} font-medium`}>{log.time_remaining}s</span>
                                </div>
                            </div>

                            {/* Barra de progresso */}
                            <div className="mt-3">
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>Progresso</span>
                                    <span>{Math.round(((log.time_total - log.time_remaining) / log.time_total) * 100)}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1">
                                    <div 
                                        className="bg-white h-1 rounded-full transition-all duration-1000"
                                        style={{ 
                                            width: `${((log.time_total - log.time_remaining) / log.time_total) * 100}%` 
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Estatísticas */}
            {filteredLogs.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-600">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center">
                            <p className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>{filteredLogs.length}</p>
                            <p className={`${currentTheme.dashboard.textSecondary}`}>Ataques ativos</p>
                        </div>
                        <div className="text-center">
                            <p className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>
                                {filteredLogs.reduce((sum, log) => sum + log.time_remaining, 0)}s
                            </p>
                            <p className={`${currentTheme.dashboard.textSecondary}`}>Tempo total restante</p>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
