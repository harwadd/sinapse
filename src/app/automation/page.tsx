"use client";
import { motion } from "framer-motion";
import { Bot, Plus, Box, Crown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "next/navigation";

export default function AutomacaoSuprema() {
  const { currentTheme } = useTheme();
  const router = useRouter();

  const automationTypes = [
    {
      id: "name-probe",
      name: "Name Probe",
      description: "Rastreador de alvos e verificador de usernames em todas as plataformas",
      type: "API",
      route: "/automation/name-probe"
    },
    {
      id: "discord",
      name: "Discord",
      description: "Automações específicas para Discord e bots de vigilância",
      type: "API + Web Scraping",
      route: "/automation/discord"
    },
    {
      id: "web-scraping",
      name: "Web Scraping",
      description: "Coleta massiva de dados de qualquer fonte digital",
      type: "Web Scraping",
      route: "/automation/web-scraping"
    },
    {
      id: "social-monitor",
      name: "Social Monitor",
      description: "Vigilância total em redes sociais e plataformas digitais",
      type: "API + Web Scraping",
      route: "/automation/social-monitor"
    },
    {
      id: "security-scanner",
      name: "Security Scanner",
      description: "Scanner automático de vulnerabilidades e análise de segurança",
      type: "API",
      route: "/automation/security-scanner"
    },
    {
      id: "data-backup",
      name: "Data Backup",
      description: "Sistema de backup automático e proteção de dados críticos",
      type: "API",
      route: "/automation/data-backup"
    }
  ];

  const templates = [
    {
      name: "Name Probe Elite",
      description: "Template avançado para rastreamento de alvos",
      type: "API"
    },
    {
      name: "Discord Bot Pro",
      description: "Bot de vigilância para Discord",
      type: "API + Web Scraping"
    },
    {
      name: "Web Scraper Elite",
      description: "Template para coleta massiva de dados",
      type: "Web Scraping"
    },
    {
      name: "Social Monitor Pro",
      description: "Monitoramento avançado de redes sociais",
      type: "API + Web Scraping"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "API": return "bg-blue-500";
      case "Web Scraping": return "bg-green-500";
      case "API + Web Scraping": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const handleCardClick = (route: string) => {
    router.push(route);
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-xl`}>
                <Bot className={`w-8 h-8 ${currentTheme.dashboard.text}`} />
              </div>
              <div>
                <h1 className={`text-3xl font-bold mb-2 ${currentTheme.dashboard.text}`}>Automação Suprema</h1>
                <p className={currentTheme.dashboard.textSecondary}>Bots inteligentes que simulam comportamento humano para coleta massiva</p>
              </div>
            </div>
            <button className={`flex items-center gap-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} px-4 py-2 rounded-lg hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors border ${currentTheme.dashboard.borders}`}>
              <Plus className="w-5 h-5" />
              Nova Automação
            </button>
          </div>
        </motion.div>

        {/* Cards de Automação */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {automationTypes.map((automation, index) => (
            <motion.div
              key={automation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleCardClick(automation.route)}
              className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6 hover:border-gray-700 transition-all duration-300 hover:shadow-xl cursor-pointer`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Box className={`w-8 h-8 ${currentTheme.dashboard.text}`} />
                <h3 className={`text-xl font-semibold ${currentTheme.dashboard.text}`}>{automation.name}</h3>
              </div>
              
              <p className={`text-sm ${currentTheme.dashboard.textSecondary} mb-4`}>{automation.description}</p>
              
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(automation.type)}`}>
                  {automation.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}
        >
          <div className="flex items-center gap-3 mb-6">
            <Crown className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
            <h2 className={`text-xl font-semibold ${currentTheme.dashboard.text}`}>Templates Elite</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template, index) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg p-4 cursor-pointer hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Box className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
                  <h3 className={`font-medium ${currentTheme.dashboard.text}`}>{template.name}</h3>
                </div>
                <p className={`text-sm ${currentTheme.dashboard.textSecondary} mb-3`}>{template.description}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(template.type)}`}>
                  {template.type}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 