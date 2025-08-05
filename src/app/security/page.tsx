"use client";
import { motion } from "framer-motion";
import { Shield, Search, AlertTriangle, CheckCircle, Clock, Zap, Crown, Target, Eye, Activity } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ScannerElite() {
  const { currentTheme } = useTheme();

  return (
    <div className={`min-h-screen p-6 ${currentTheme.dashboard.background}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-xl`}>
              <Shield className={`w-8 h-8 ${currentTheme.dashboard.text}`} />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${currentTheme.dashboard.text}`}>Scanner Elite</h1>
              <p className={currentTheme.dashboard.textSecondary}>Scanner de vulnerabilidades de última geração para análise profunda de sistemas</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
              <h2 className={`text-xl font-semibold ${currentTheme.dashboard.text}`}>Novo Scan Elite</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${currentTheme.dashboard.textSecondary}`}>
                  Alvo (URL ou IP)
                </label>
                <input
                  type="text"
                  placeholder="https://example.com ou 192.168.1.1"
                  className={`w-full px-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} placeholder-${currentTheme.dashboard.textSecondary.replace('text-', '')} focus:outline-none focus:border-gray-600`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${currentTheme.dashboard.textSecondary}`}>
                  Tipo de Análise
                </label>
                <select className={`w-full px-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}>
                  <option value="quick">Reconhecimento Rápido</option>
                  <option value="full">Análise Profunda Completa</option>
                  <option value="custom">Scan Personalizado Elite</option>
                </select>
              </div>
              <button className={`w-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} py-3 rounded-lg hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors border ${currentTheme.dashboard.borders} flex items-center justify-center gap-2`}>
                <Zap className="w-4 h-4" />
                Iniciar Análise Elite
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}
          >
            <div className="flex items-center gap-3 mb-6">
              <Crown className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
              <h2 className={`text-xl font-semibold ${currentTheme.dashboard.text}`}>Análises Recentes</h2>
            </div>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                <div className="flex items-center gap-3">
                  <CheckCircle className={`w-5 h-5 text-green-400`} />
                  <div>
                    <p className={`${currentTheme.dashboard.text} font-medium`}>example.com</p>
                    <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>2 pontos fracos identificados</p>
                  </div>
                </div>
                <span className={`${currentTheme.dashboard.textSecondary} text-sm`}>2 min atrás</span>
              </div>
              <div className={`flex items-center justify-between p-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                <div className="flex items-center gap-3">
                  <Activity className={`w-5 h-5 text-blue-400 animate-pulse`} />
                  <div>
                    <p className={`${currentTheme.dashboard.text} font-medium`}>test.com</p>
                    <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>Análise em progresso...</p>
                  </div>
                </div>
                <span className={`${currentTheme.dashboard.textSecondary} text-sm`}>5 min atrás</span>
              </div>
              <div className={`flex items-center justify-between p-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`w-5 h-5 text-red-400`} />
                  <div>
                    <p className={`${currentTheme.dashboard.text} font-medium`}>vulnerable.com</p>
                    <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>8 vulnerabilidades críticas detectadas</p>
                  </div>
                </div>
                <span className={`${currentTheme.dashboard.textSecondary} text-sm`}>1 hora atrás</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6 text-center`}>
            <div className={`text-3xl font-bold text-green-400 mb-2`}>156</div>
            <div className={`${currentTheme.dashboard.textSecondary} text-sm`}>Alvos Analisados</div>
          </div>
          <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6 text-center`}>
            <div className={`text-3xl font-bold text-red-400 mb-2`}>23</div>
            <div className={`${currentTheme.dashboard.textSecondary} text-sm`}>Vulnerabilidades Críticas</div>
          </div>
          <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6 text-center`}>
            <div className={`text-3xl font-bold text-yellow-400 mb-2`}>89</div>
            <div className={`${currentTheme.dashboard.textSecondary} text-sm`}>Pontos Fracos Identificados</div>
          </div>
          <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6 text-center`}>
            <div className={`text-3xl font-bold text-blue-400 mb-2`}>99.9%</div>
            <div className={`${currentTheme.dashboard.textSecondary} text-sm`}>Taxa de Detecção</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 