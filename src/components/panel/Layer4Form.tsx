"use client";
import { useState, useEffect } from 'react';
import { Zap } from "lucide-react";
import MethodDropdown from '@/components/panel/MethodDropdown';
import { useToast } from "@/components/ToastPopup";
import { AxiosError } from "axios";
import { useAttackContext } from '@/contexts/AttackContext';
import { useTheme } from "@/contexts/ThemeContext";
import api from '@/lib/api';

interface Method {
    method: string;
    description: string;
    layer4: boolean;
    layer7: boolean;
    amplification: boolean;
    premium: boolean;
    concurrents: number;
    proxy: boolean;
}
export default function Layer4Form({ methods = [] }: { methods: Method[] }) {
    const { triggerRefresh } = useAttackContext();
    const { showToast } = useToast();
    const { currentTheme } = useTheme();
    const [ipv4, setIpv4] = useState('74.74.74.8');
    const [port, setPort] = useState('80');
    const [time, setTime] = useState('30');
    const [concurrents, setConcurrents] = useState(1);
    const [server, setServer] = useState('Layer4');
    const [protocol, setProtocol] = useState('Methods');
    const [filteredMethods, setFilteredMethods] = useState<Method[]>([]);
    const [selectedMethod, setSelectedMethod] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filtered = methods.filter((m) =>
        protocol === "Amplification" ? m.amplification : !m.amplification
    );

    useEffect(() => {
        const filtered = methods.filter(m =>
            protocol === 'Amplification' ? m.amplification : !m.amplification
        );
        setFilteredMethods(filtered);
    }, [protocol, methods]);

    const launchAttack = async () => {
        try {
            const response = await api.post("/launch",
                new URLSearchParams({
                    method: selectedMethod,
                    target: ipv4,
                    port: port,
                    time: time,
                    concurrents: concurrents.toString(),
                    layer: server // "Layer4" ou "Layer4_premium"
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }
            );

            if (response.data.success != false && response.data.ongoing != 0) {
                showToast("attack launched!", "success");
                triggerRefresh();
            } else {
                showToast("attack failed!", "error");
            }

        } catch (err) {
            const error = err as AxiosError<{ detail: string }>;
            showToast(error.response?.data?.detail || "Unexpected error", "error");
            console.error("Erro ao lançar ataque Layer4:", err);
        }
    };

    const isDisabled = !ipv4 || !port || !selectedMethod || isSubmitting;

    return (
        <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}>
            <div className="space-y-6">
                {/* Configurações básicas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={`block ${currentTheme.dashboard.text} text-sm font-medium mb-2`}>IPv4 Target</label>
                        <input
                            type="text"
                            value={ipv4}
                            onChange={(e) => setIpv4(e.target.value)}
                            placeholder="192.168.1.1"
                            className={`w-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-3 ${currentTheme.dashboard.text} placeholder:${currentTheme.dashboard.textSecondary.replace('text-', '')} focus:outline-none focus:border-gray-600 transition-colors`}
                        />
                    </div>

                    <div>
                        <label className={`block ${currentTheme.dashboard.text} text-sm font-medium mb-2`}>Port</label>
                        <input
                            type="text"
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                            placeholder="80"
                            className={`w-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-3 ${currentTheme.dashboard.text} placeholder:${currentTheme.dashboard.textSecondary.replace('text-', '')} focus:outline-none focus:border-gray-600 transition-colors`}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={`block ${currentTheme.dashboard.text} text-sm font-medium mb-2`}>Duration (seconds)</label>
                        <input
                            type="text"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            placeholder="30"
                            className={`w-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-3 ${currentTheme.dashboard.text} placeholder:${currentTheme.dashboard.textSecondary.replace('text-', '')} focus:outline-none focus:border-gray-600 transition-colors`}
                        />
                    </div>
                    <div>
                        <label className={`block ${currentTheme.dashboard.text} text-sm font-medium mb-2`}>Protocol Type</label>
                        <select
                            value={protocol}
                            onChange={(e) => setProtocol(e.target.value)}
                            className={`w-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-3 ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600 transition-colors`}
                        >
                            <option value="Methods">UDP / TCP</option>
                            <option value="Amplification">Amplification</option>
                        </select>
                    </div>
                </div>

                {/* Método */}
                <div>
                    <label className={`block ${currentTheme.dashboard.text} text-sm font-medium mb-2`}>Attack Method</label>
                    <MethodDropdown
                        methods={filtered}
                        value={selectedMethod}
                        onChange={setSelectedMethod}
                    />
                </div>

                {/* Configurações avançadas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={`block ${currentTheme.dashboard.text} text-sm font-medium mb-2`}>Server Network</label>
                        <select
                            value={server}
                            onChange={(e) => setServer(e.target.value)}
                            className={`w-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-3 ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600 transition-colors`}
                        >
                            <option value="Layer4">Normal Network</option>
                            <option value="Layer4_premium">Premium Network</option>
                        </select>
                    </div>

                    <div>
                        <label className={`block ${currentTheme.dashboard.text} text-sm font-medium mb-2`}>
                            Concurrent Connections: {concurrents}
                        </label>
                        <div className="relative">
                            <input
                                type="range"
                                min="1"
                                max="25"
                                value={concurrents}
                                onChange={(e) => setConcurrents(Number(e.target.value))}
                                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className={`flex justify-between text-xs ${currentTheme.dashboard.textSecondary} mt-1`}>
                                <span>1</span>
                                <span>25</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botão de ataque */}
                <button
                    disabled={isDisabled}
                    onClick={launchAttack}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                        isDisabled
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                    }`}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Launching Attack...
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <Zap className="w-5 h-5" />
                            Launch Attack
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
}
