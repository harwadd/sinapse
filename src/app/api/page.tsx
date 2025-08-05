"use client";
import { useState } from "react";
import { Copy, Code, Crown, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const apiLink = "https://api.atomic-eye.com/api";

const fields = [
  { field: "key", description: "Sua Chave API Elite", value: "cm...kpg9q", required: true },
  { field: "target", description: "Alvo IPv4/Subnet ou URL", value: "74.74.74.8, 74.74.74.8/24, https://google.com", required: true },
  { field: "port", description: "Porta do Alvo", value: "0 - 65565", required: true },
  { field: "time", description: "Duração do teste", value: "30 ou mais (em segundos)", required: true },
  { field: "method", description: "Método solicitado", value: "veja métodos disponíveis abaixo", required: true },
  { field: "concurrents", description: "Concorrências para enviar", value: "1, 2, 3 (depende do seu plano)", required: false },
  { field: "requests", description: "Requisições por proxy", value: "64, 128, 256, 512", required: false },
  { field: "payload", description: "Camada para ataques (Layer7 ou Layer4)", value: "Layer7, Layer4, Layer7_premium, Layer4_premium", required: false },
];

export default function Docs() {
  const [copied, setCopied] = useState(false);
  const { currentTheme } = useTheme();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen p-6 ${currentTheme.dashboard.text} ${currentTheme.dashboard.background}`}>
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-xl`}>
              <Code className={`w-8 h-8 ${currentTheme.dashboard.text}`} />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${currentTheme.dashboard.text}`}>Documentação Elite</h1>
              <p className={currentTheme.dashboard.textSecondary}>Documentação completa da API para integração com o ATOMIC EYE</p>
            </div>
          </div>
        </motion.div>

        {/* API Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
            <h2 className={`text-2xl font-semibold ${currentTheme.dashboard.text}`}>Endpoint Principal</h2>
          </div>
          <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-3 flex items-center justify-between`}>
            <code className="text-blue-400 break-all">{apiLink}</code>
            <button onClick={() => copyToClipboard(apiLink)}>
              <Copy size={18} className={`${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text}`} />
            </button>
          </div>
        </motion.div>

        {/* API Fields Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Crown className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
            <h2 className={`text-2xl font-semibold ${currentTheme.dashboard.text}`}>Parâmetros da API</h2>
          </div>
          <div className="overflow-x-auto">
            <table className={`w-full text-sm text-left ${currentTheme.dashboard.textSecondary} border ${currentTheme.dashboard.borders} rounded-lg overflow-hidden`}>
              <thead className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} uppercase text-xs`}>
                <tr>
                  <th className="px-4 py-3">Campo</th>
                  <th className="px-4 py-3">Descrição</th>
                  <th className="px-4 py-3">Valor</th>
                  <th className="px-4 py-3">Obrigatório</th>
                </tr>
              </thead>
              <tbody className={currentTheme.dashboard.cards}>
                {fields.map((item, i) => (
                  <tr key={i} className={`border-t ${currentTheme.dashboard.borders}`}>
                    <td className={`px-4 py-3 font-medium ${currentTheme.dashboard.text}`}>{item.field}</td>
                    <td className="px-4 py-3">{item.description}</td>
                    <td className="px-4 py-3 text-blue-400">{item.value}</td>
                    <td className="px-4 py-3">
                      {item.required ? "✔️" : "❌"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Example: Ongoing Tests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Zap className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
            <h2 className={`text-2xl font-semibold ${currentTheme.dashboard.text}`}>Testes em Andamento</h2>
          </div>
          <p className={`text-sm ${currentTheme.dashboard.textSecondary} mb-2`}>Use este endpoint para recuperar testes em andamento:</p>
          <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-3 flex items-center justify-between`}>
            <code className="break-all">{apiLink}/ongoing?key=cm...kpg9q</code>
            <button onClick={() => copyToClipboard({apiLink}+"/ongoing?key=cm...kpg9q")}>
              <Copy size={18} className={`${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text}`} />
            </button>
          </div>
        </motion.div>

        {/* Example: Stop Test */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
            <h2 className={`text-2xl font-semibold ${currentTheme.dashboard.text}`}>Parar Teste em Andamento</h2>
          </div>
          <p className={`text-sm ${currentTheme.dashboard.textSecondary} mb-2`}>Pare um teste usando seu ID:</p>
          <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-3 flex items-center justify-between`}>
            <code className="break-all">{apiLink}/stop?key=cm...kpg9q&id=TEST_ID</code>
            <button onClick={() => copyToClipboard({apiLink}+"/stop?key=cm...kpg9q&id=TEST_ID")}>
              <Copy size={18} className={`${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text}`} />
            </button>
          </div>
        </motion.div>

        {/* Feedback copy status */}
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed bottom-4 right-4 ${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-2 ${currentTheme.dashboard.text}`}
          >
            Copiado para a área de transferência!
          </motion.div>
        )}
      </div>
    </div>
  );
}
