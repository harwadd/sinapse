"use client";
import { motion } from "framer-motion";
import { Database, Search, Shield, Zap, Activity, Settings } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function DatabaseTools() {
  const { currentTheme } = useTheme();

  return (
    <div className={`min-h-screen p-6 ${currentTheme.dashboard.background}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${currentTheme.dashboard.text}`}>Database Tools</h1>
          <p className={currentTheme.dashboard.textSecondary}>Ferramentas para análise e gerenciamento de bancos de dados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6 hover:border-gray-700 transition-all duration-300`}
          >
            <Database className={`w-8 h-8 ${currentTheme.dashboard.text} mb-4`} />
            <h3 className={`text-lg font-semibold mb-2 ${currentTheme.dashboard.text}`}>Query Builder</h3>
            <p className={`${currentTheme.dashboard.textSecondary} text-sm mb-4`}>Construtor visual de consultas SQL</p>
            <button className={`w-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} ${currentTheme.dashboard.text} py-2 rounded-lg hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors`}>
              Usar Ferramenta
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6 hover:border-gray-700 transition-all duration-300`}
          >
            <Search className={`w-8 h-8 ${currentTheme.dashboard.text} mb-4`} />
            <h3 className={`text-lg font-semibold mb-2 ${currentTheme.dashboard.text}`}>Data Explorer</h3>
            <p className={`${currentTheme.dashboard.textSecondary} text-sm mb-4`}>Explorador de dados e estruturas</p>
            <button className={`w-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} ${currentTheme.dashboard.text} py-2 rounded-lg hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors`}>
              Usar Ferramenta
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6 hover:border-gray-700 transition-all duration-300`}
          >
            <Shield className={`w-8 h-8 ${currentTheme.dashboard.text} mb-4`} />
            <h3 className={`text-lg font-semibold mb-2 ${currentTheme.dashboard.text}`}>Security Audit</h3>
            <p className={`${currentTheme.dashboard.textSecondary} text-sm mb-4`}>Auditoria de segurança de banco de dados</p>
            <button className={`w-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} ${currentTheme.dashboard.text} py-2 rounded-lg hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors`}>
              Usar Ferramenta
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6 hover:border-gray-700 transition-all duration-300`}
          >
            <Zap className={`w-8 h-8 ${currentTheme.dashboard.text} mb-4`} />
            <h3 className={`text-lg font-semibold mb-2 ${currentTheme.dashboard.text}`}>Performance Monitor</h3>
            <p className={`${currentTheme.dashboard.textSecondary} text-sm mb-4`}>Monitoramento de performance</p>
            <button className={`w-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} ${currentTheme.dashboard.text} py-2 rounded-lg hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors`}>
              Usar Ferramenta
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6 hover:border-gray-700 transition-all duration-300`}
          >
            <Activity className={`w-8 h-8 ${currentTheme.dashboard.text} mb-4`} />
            <h3 className={`text-lg font-semibold mb-2 ${currentTheme.dashboard.text}`}>Backup Manager</h3>
            <p className={`${currentTheme.dashboard.textSecondary} text-sm mb-4`}>Gerenciador de backups automáticos</p>
            <button className={`w-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} ${currentTheme.dashboard.text} py-2 rounded-lg hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors`}>
              Usar Ferramenta
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6 hover:border-gray-700 transition-all duration-300`}
          >
            <Settings className={`w-8 h-8 ${currentTheme.dashboard.text} mb-4`} />
            <h3 className={`text-lg font-semibold mb-2 ${currentTheme.dashboard.text}`}>Schema Designer</h3>
            <p className={`${currentTheme.dashboard.textSecondary} text-sm mb-4`}>Designer de esquemas de banco</p>
            <button className={`w-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} ${currentTheme.dashboard.text} py-2 rounded-lg hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors`}>
              Usar Ferramenta
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 