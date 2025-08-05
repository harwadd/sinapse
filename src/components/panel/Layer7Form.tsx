"use client";
import { useState, useEffect } from 'react';
import { Zap } from "lucide-react";
import MethodDropdown from '@/components/panel/MethodDropdown';
import { useAttackContext } from '@/contexts/AttackContext';
import { useToast } from "@/components/ToastPopup";
import { useTheme } from "@/contexts/ThemeContext";
import { AxiosError } from "axios";
import api from '@/lib/api';

interface Method {
    method: string;
    description: string;
    layer4: boolean;
    layer7: boolean;
    amplification: boolean;
    premium: boolean;
    proxy: boolean;
}

export default function Layer7Form({ methods = [] }: { methods: Method[] }) {
    const { showToast } = useToast();
    const { currentTheme } = useTheme();
    const [url, setUrl] = useState('https://google.com');
    const [requests, setRequests] = useState('100');
    const [server, setServer] = useState('Layer7');
    const [time, setTime] = useState('30');
    const [concurrents, setConcurrents] = useState(1);
    const [selectedMethod, setSelectedMethod] = useState("");
    const [protocol, setProtocol] = useState("Methods");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filtered = methods.filter((m) =>
        protocol === "Amplification" ? m.amplification : !m.amplification
    );

    const launchAttack = async () => {
        try {
            const response = await api.post("/launch",
                new URLSearchParams({
                    method: selectedMethod,
                    target: url,
                    time: time,
                    rpc: requests,
                    layer: server // "Layer7" ou "Layer7_premium"
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }
            );

            if (response.data.success != false && response.data.ongoing != 0) {
                showToast("attack launched!", "success");
            } else {
                showToast("attack failed!", "error");
            }

        } catch (err) {
            const error = err as AxiosError<{ detail: string }>;
            showToast("attack failed!", "error");
            console.error("Erro ao lançar ataque Layer4:", err);
        }
    };

    const isDisabled = !url || !requests || !selectedMethod || isSubmitting;

    return (
        <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}>
            <div className="space-y-6">
                {/* Configurações básicas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={`block ${currentTheme.dashboard.text} text-sm font-medium mb-2`}>Target URL</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className={`w-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-3 ${currentTheme.dashboard.text} placeholder:${currentTheme.dashboard.textSecondary.replace('text-', '')} focus:outline-none focus:border-gray-600 transition-colors`}
                        />
                    </div>

                    <div>
                        <label className={`block ${currentTheme.dashboard.text} text-sm font-medium mb-2`}>Requests per Second</label>
                        <input
                            type="text"
                            value={requests}
                            onChange={(e) => setRequests(e.target.value)}
                            placeholder="100"
                            className={`w-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-3 ${currentTheme.dashboard.text} placeholder:${currentTheme.dashboard.textSecondary.replace('text-', '')} focus:outline-none focus:border-gray-600 transition-colors`}
                        />
                    </div>
                </div>

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
                            <option value="Layer7">Normal Network</option>
                            <option value="Layer7_premium">Premium Network</option>
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