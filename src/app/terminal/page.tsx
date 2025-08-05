"use client";
import { motion } from "framer-motion";
import { Terminal, Command, Play, Square, RotateCcw, Crown, Zap, Target } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function BashPage() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>([
    "ATOMIC EYE - Terminal Supremo v1.0",
    "Interface de controle total com acesso direto a todos os sistemas",
    "Digite 'help' para ver os comandos disponíveis",
    "",
    "root@atomic-eye:~$ "
  ]);
  const { currentTheme } = useTheme();

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const newOutput = [...output, `$ ${command}`];
    
    // Simular resposta do comando
    let response = "";
    switch (command.toLowerCase()) {
      case "help":
        response = `Comandos Elite disponíveis:
- scan <target>: Executar análise profunda de alvo
- osint <query>: Buscar informações com Visão Divina
- network <ip>: Mapeamento completo de rede
- attack <target>: Iniciar Poder Destrutivo
- clear: Limpar terminal
- exit: Sair do sistema`;
        break;
      case "clear":
        setOutput(["ATOMIC EYE - Terminal Supremo v1.0", "root@atomic-eye:~$ "]);
        setCommand("");
        return;
      case "exit":
        response = "Saindo do sistema ATOMIC EYE...";
        break;
      default:
        response = `Comando '${command}' não reconhecido. Digite 'help' para ajuda.`;
    }

    setOutput([...newOutput, response, "", "root@atomic-eye:~$ "]);
    setCommand("");
  };

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
              <Terminal className={`w-8 h-8 ${currentTheme.dashboard.text}`} />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${currentTheme.dashboard.text}`}>Terminal Supremo</h1>
              <p className={currentTheme.dashboard.textSecondary}>Interface de controle total com acesso direto a todos os sistemas do ATOMIC EYE</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-black border border-gray-700 rounded-xl p-6 h-96 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">ATOMIC EYE Terminal</span>
              <Crown className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 text-gray-400 hover:text-white">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-white">
                <Square className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-black text-green-400 font-mono text-sm h-80 overflow-y-auto mb-4 p-4 border border-gray-800 rounded">
            {output.map((line, index) => (
              <div key={index} className="whitespace-pre-wrap">{line}</div>
            ))}
          </div>

          <form onSubmit={handleCommand} className="flex items-center gap-2">
            <span className="text-green-400 font-mono">root@atomic-eye:~$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="flex-1 bg-transparent text-green-400 font-mono outline-none"
              placeholder="Digite um comando elite..."
              autoFocus
            />
          </form>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
              <h3 className={`text-lg font-semibold ${currentTheme.dashboard.text}`}>Comandos Elite</h3>
            </div>
            <div className="space-y-2">
              <button className={`w-full text-left p-2 rounded ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors`}>
                scan localhost
              </button>
              <button className={`w-full text-left p-2 rounded ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors`}>
                osint example.com
              </button>
              <button className={`w-full text-left p-2 rounded ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors`}>
                attack target.com
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
              <h3 className={`text-lg font-semibold ${currentTheme.dashboard.text}`}>Scripts Supremos</h3>
            </div>
            <div className="space-y-2">
              <button className={`w-full text-left p-2 rounded ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors`}>
                Auto Scan Elite
              </button>
              <button className={`w-full text-left p-2 rounded ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors`}>
                Network Discovery Total
              </button>
              <button className={`w-full text-left p-2 rounded ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors`}>
                Vulnerability Check Elite
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}
          >
            <div className="flex items-center gap-3 mb-4">
              <Crown className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
              <h3 className={`text-lg font-semibold ${currentTheme.dashboard.text}`}>Histórico Elite</h3>
            </div>
            <div className={`space-y-2 text-sm ${currentTheme.dashboard.textSecondary}`}>
              <div>scan localhost - 2 min atrás</div>
              <div>osint example.com - 5 min atrás</div>
              <div>attack target.com - 10 min atrás</div>
              <div>clear - 15 min atrás</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 