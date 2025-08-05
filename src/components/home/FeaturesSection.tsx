"use client";
import { motion } from "framer-motion";
import { 
  Eye, 
  Zap, 
  Shield, 
  Network, 
  Bot, 
  Target, 
  Lock, 
  Cpu,
  Globe,
  Database,
  Terminal,
  Key,
  Activity,
  Crown
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const features = [
  {
    title: "Visão Divina",
    description: "Sistema de inteligência suprema que rastreia e monitora qualquer alvo digital em tempo real.",
    icon: Eye
  },
  {
    title: "Poder Destrutivo",
    description: "Ferramentas de teste de resistência em escala industrial para demonstrar vulnerabilidades críticas.",
    icon: Zap
  },
  {
    title: "Automação Suprema",
    description: "Bots inteligentes que simulam comportamento humano para coleta massiva de dados.",
    icon: Bot
  },
  {
    title: "Rede de Controle",
    description: "Gerenciamento avançado de infraestrutura com rotação automática e validação de qualidade.",
    icon: Network
  },
  {
    title: "Scanner Elite",
    description: "Scanner de vulnerabilidades de última geração para análise profunda de sistemas.",
    icon: Shield
  },
  {
    title: "Mapeamento Global",
    description: "Ferramentas de análise de rede e mapeamento completo de infraestrutura alvo.",
    icon: Globe
  },
  {
    title: "Controle de Dados",
    description: "Ferramentas para análise e manipulação segura de bancos de dados críticos.",
    icon: Database
  },
  {
    title: "Terminal Supremo",
    description: "Interface de controle total com acesso direto a todos os sistemas do ATOMIC EYE.",
    icon: Terminal
  }
];

export function FeaturesSection() {
  const { currentTheme } = useTheme();

  return (
    <section
      id="section-features"
      className="w-full max-w-5xl mx-auto py-12 mb-10 min-h-[70vh] flex flex-col px-4 md:px-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-10 text-center"
      >
        <span className={currentTheme.dashboard.text}>Capacidades</span>{" "}
        <span className={currentTheme.dashboard.text}>Supremas</span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, idx) => {
          const IconComponent = feat.icon;
          return (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} shadow-lg p-6 rounded-xl flex flex-col items-center text-center hover:shadow-xl hover:border-gray-700 transition-all duration-300 group`}
            >
              <div className={`p-3 rounded-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} mb-4 group-hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors`}>
                <IconComponent className={`h-8 w-8 ${currentTheme.dashboard.text}`} />
              </div>
              <h3 className={`font-bold text-lg mb-3 ${currentTheme.dashboard.text}`}>{feat.title}</h3>
              <p className={`text-sm ${currentTheme.dashboard.textSecondary} leading-relaxed`}>{feat.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
