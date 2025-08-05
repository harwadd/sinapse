"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  DatabaseZap,
  Server,
  Users,
  Zap,
  Search,
  Bot,
  Shield,
  Network,
  Database,
  Eye,
  Terminal,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Bar,
  BarChart,
  TooltipProps,
} from "recharts";
import api from "@/lib/api";
import { useTheme } from "@/contexts/ThemeContext";

interface Stat {
  label: string;
  value: number;
  icon: JSX.Element;
  color: string;
  change?: string;
}

interface AttackData {
  name: string;
  attacks: number;
}

interface ToolStatus {
  name: string;
  status: "online" | "offline" | "warning";
  uptime: number;
  lastCheck: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-700 border border-zinc-600 rounded-lg p-3 shadow-xl">
        <p className="text-zinc-100 text-sm font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [attacksData, setAttacksData] = useState<AttackData[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [toolStatus, setToolStatus] = useState<ToolStatus[]>([]);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard");
        const data = res.data;

        setAttacksData(data.attacks_last_7_days);

        setStats([
          {
            label: "Ferramentas Ativas",
            value: 12,
            icon: <Shield size={24} />,
            color: "text-emerald-400",
            change: "+2 esta semana",
          },
          {
            label: "Scans Realizados",
            value: 15420,
            icon: <Search size={24} />,
            color: "text-violet-400",
            change: "+15% vs mês passado",
          },
          {
            label: "Automações Rodando",
            value: 8,
            icon: <Bot size={24} />,
            color: "text-orange-400",
            change: "3 concluídas hoje",
          },
          {
            label: "Usuários Online",
            value: 342,
            icon: <Users size={24} />,
            color: "text-cyan-400",
            change: "+12% vs ontem",
          },
          {
            label: "Proxies Ativos",
            value: 156,
            icon: <Network size={24} />,
            color: "text-pink-400",
            change: "99.2% uptime",
          },
          {
            label: "Vulnerabilidades Encontradas",
            value: 23,
            icon: <AlertTriangle size={24} />,
            color: "text-red-400",
            change: "5 críticas",
          },
        ]);

        setToolStatus([
          { name: "OSINT Scanner", status: "online", uptime: 99.8, lastCheck: "2 min atrás" },
          { name: "Network Mapper", status: "online", uptime: 99.5, lastCheck: "5 min atrás" },
          { name: "Vulnerability Scanner", status: "warning", uptime: 95.2, lastCheck: "1 min atrás" },
          { name: "Username Checker", status: "online", uptime: 99.9, lastCheck: "30 seg atrás" },
          { name: "Proxy Manager", status: "online", uptime: 99.7, lastCheck: "3 min atrás" },
          { name: "Database Tools", status: "offline", uptime: 0, lastCheck: "10 min atrás" },
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className={`min-h-screen p-6 ${currentTheme.dashboard.background}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header do Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className={`text-3xl font-bold mb-2 ${currentTheme.dashboard.text}`}>Dashboard</h1>
          <p className={currentTheme.dashboard.textSecondary}>Visão geral das ferramentas de segurança cibernética</p>
        </motion.div>

        {/* Cards de Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`relative overflow-hidden ${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <p className={`text-3xl font-bold mb-1 ${currentTheme.dashboard.text}`}>
                    {stat.value.toLocaleString("pt-BR")}
                  </p>
                  <p className={`text-sm mb-2 ${currentTheme.dashboard.textSecondary}`}>{stat.label}</p>
                  {stat.change && (
                    <p className="text-xs text-emerald-400 font-medium">{stat.change}</p>
                  )}
                </div>
                <div className="text-right">
                  <span className={`text-2xl ${stat.color}`}>
                    {stat.icon}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Grid de Conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gráfico de Atividade */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} p-6 rounded-2xl shadow-lg`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-xl font-semibold mb-1 ${currentTheme.dashboard.text}`}>Atividade de Scans</h2>
                <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>Últimos 7 dias</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                <span className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Scans</span>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attacksData}>
                  <defs>
                    <linearGradient id="attacksGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    tick={{ fill: "#d1d5db", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#6b7280"
                    tick={{ fill: "#d1d5db", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="attacks"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    fill="url(#attacksGradient)"
                    name="Scans"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Status das Ferramentas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} p-6 rounded-2xl shadow-lg`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-semibold ${currentTheme.dashboard.text}`}>Status das Ferramentas</h2>
              <Activity className={currentTheme.dashboard.text} size={20} />
            </div>
            <div className="space-y-4">
              {toolStatus.map((tool, index) => (
                <div key={index} className={`flex items-center justify-between p-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      tool.status === 'online' ? 'bg-emerald-500' :
                      tool.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <p className={`font-medium text-sm ${currentTheme.dashboard.text}`}>{tool.name}</p>
                      <p className={`text-xs ${currentTheme.dashboard.textSecondary}`}>{tool.lastCheck}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${currentTheme.dashboard.text}`}>{tool.uptime}%</p>
                    <p className={`text-xs ${currentTheme.dashboard.textSecondary}`}>uptime</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Seção de Ações Rápidas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className={`mt-8 ${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} p-6 rounded-2xl shadow-lg`}
        >
          <h2 className={`text-xl font-semibold mb-6 ${currentTheme.dashboard.text}`}>Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className={`flex items-center gap-3 p-4 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg hover:bg-zinc-500 transition-colors`}>
              <Search className={currentTheme.dashboard.text} size={20} />
              <span className={`text-sm ${currentTheme.dashboard.text}`}>Novo Scan OSINT</span>
            </button>
            <button className={`flex items-center gap-3 p-4 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg hover:bg-zinc-500 transition-colors`}>
              <Bot className={currentTheme.dashboard.text} size={20} />
              <span className={`text-sm ${currentTheme.dashboard.text}`}>Criar Automação</span>
            </button>
            <button className={`flex items-center gap-3 p-4 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg hover:bg-zinc-500 transition-colors`}>
              <Shield className={currentTheme.dashboard.text} size={20} />
              <span className={`text-sm ${currentTheme.dashboard.text}`}>Security Scan</span>
            </button>
            <button className={`flex items-center gap-3 p-4 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg hover:bg-zinc-500 transition-colors`}>
              <Eye className={currentTheme.dashboard.text} size={20} />
              <span className={`text-sm ${currentTheme.dashboard.text}`}>Username Check</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
