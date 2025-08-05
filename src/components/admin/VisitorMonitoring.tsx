"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Eye, 
  Globe, 
  Users, 
  Activity, 
  Search, 
  Filter, 
  Trash2, 
  RefreshCw,
  MapPin,
  Monitor,
  Smartphone,
  Clock,
  Flag,
  Database
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import api from "@/lib/api";

interface Visitor {
  id: number;
  timestamp: string;
  url: string;
  referrer: string;
  userAgent: string;
  language: string;
  platform: string;
  screenResolution: string;
  timezone: string;
  ip?: string;
  country?: string;
  city?: string;
  isp?: string;
  fingerprint: string;
  saved_at: string;
}

interface VisitorStats {
  total_visitors: number;
  countries: Array<{name: string, count: number}>;
  platforms: Array<{name: string, count: number}>;
  recent_activity: Array<{
    time: string;
    ip: string;
    country: string;
    platform: string;
  }>;
  hourly_stats: Array<{hour: string, count: number}>;
}

export default function VisitorMonitoring() {
  const { currentTheme } = useTheme();
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "50"
      });
      
      if (searchTerm) params.append("search", searchTerm);
      if (selectedCountry) params.append("country", selectedCountry);
      if (selectedPlatform) params.append("platform", selectedPlatform);

      const response = await api.get(`/visitors?${params}`);

      setVisitors(response.data.visitors);
      setTotalPages(response.data.pagination.pages);
    } catch (err) {
      console.error("Erro ao carregar visitantes:", err);
      setError("Erro ao carregar visitantes");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get("/visitors/stats");
      setStats(response.data);
    } catch (err) {
      console.error("Erro ao carregar estatísticas:", err);
    }
  };

  const deleteVisitor = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/visitors/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchVisitors();
      fetchStats();
    } catch (err) {
      setError("Erro ao deletar visitante");
    }
  };

  const clearAllVisitors = async () => {
    if (!confirm("Tem certeza que deseja limpar todos os dados de visitantes?")) return;
    
    try {
      const token = localStorage.getItem("token");
      await api.delete("/visitors", {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchVisitors();
      fetchStats();
    } catch (err) {
      setError("Erro ao limpar dados");
    }
  };

  useEffect(() => {
    fetchVisitors();
    fetchStats();
  }, [currentPage, searchTerm, selectedCountry, selectedPlatform]);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'Brazil': '🇧🇷',
      'United States': '🇺🇸',
      'Canada': '🇨🇦',
      'United Kingdom': '🇬🇧',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'Spain': '🇪🇸',
      'Italy': '🇮🇹',
      'Portugal': '🇵🇹',
      'Russia': '🇷🇺',
      'China': '🇨🇳',
      'Japan': '🇯🇵',
      'South Korea': '🇰🇷',
      'India': '🇮🇳',
      'Australia': '🇦🇺'
    };
    return flags[country] || '🌍';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-xl`}>
            <Eye className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>Visitor Monitoring</h2>
            <p className={currentTheme.dashboard.textSecondary}>Total surveillance system - The Eye That Sees Everything</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { fetchVisitors(); fetchStats(); }}
            className={`flex items-center gap-2 px-4 py-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} rounded-lg hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors border ${currentTheme.dashboard.borders}`}
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={clearAllVisitors}
            className={`flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors`}
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>

      {/* Estatísticas */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}
          >
            <div className="flex items-center gap-3">
              <Users className={`w-8 h-8 text-blue-400`} />
              <div>
                <p className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Total Visitors</p>
                <p className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>{stats.total_visitors}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}
          >
            <div className="flex items-center gap-3">
              <Globe className={`w-8 h-8 text-green-400`} />
              <div>
                <p className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Unique Countries</p>
                <p className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>{stats.countries.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}
          >
            <div className="flex items-center gap-3">
              <Monitor className={`w-8 h-8 text-purple-400`} />
              <div>
                <p className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Platforms</p>
                <p className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>{stats.platforms.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}
          >
            <div className="flex items-center gap-3">
              <Activity className={`w-8 h-8 text-orange-400`} />
              <div>
                <p className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Recent Activity</p>
                <p className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>{stats.recent_activity.length}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Filtros */}
      <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
              <input
                type="text"
                placeholder="Search by IP, country, city, user agent..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}
              />
            </div>
          </div>
          
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className={`px-4 py-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}
          >
            <option value="">All countries</option>
            {stats?.countries.map((country) => (
              <option key={country.name} value={country.name}>
                {getCountryFlag(country.name)} {country.name} ({country.count})
              </option>
            ))}
          </select>

          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className={`px-4 py-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}
          >
            <option value="">All platforms</option>
            {stats?.platforms.map((platform) => (
              <option key={platform.name} value={platform.name}>
                {platform.name} ({platform.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Visitantes */}
      <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-semibold ${currentTheme.dashboard.text}`}>Detected Visitors</h3>
          {loading && <RefreshCw className="w-5 h-5 animate-spin" />}
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-600 text-white rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {visitors.map((visitor, index) => (
            <motion.div
              key={visitor.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg p-4`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {visitor.country && (
                      <span className="text-2xl">{getCountryFlag(visitor.country)}</span>
                    )}
                    <div>
                      <p className={`font-medium ${currentTheme.dashboard.text}`}>
                        {visitor.ip || 'IP not detected'}
                      </p>
                      <p className={`text-sm ${currentTheme.dashboard.textSecondary}`}>
                        {visitor.country && visitor.city ? `${visitor.city}, ${visitor.country}` : visitor.timezone}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {visitor.platform.includes('Win') ? (
                      <Monitor className="w-4 h-4 text-blue-400" />
                    ) : visitor.platform.includes('Mac') ? (
                      <Monitor className="w-4 h-4 text-purple-400" />
                    ) : (
                      <Smartphone className="w-4 h-4 text-green-400" />
                    )}
                    <span className={`text-sm ${currentTheme.dashboard.textSecondary}`}>
                      {visitor.platform}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <span className={`text-sm ${currentTheme.dashboard.textSecondary}`}>
                      {formatTimestamp(visitor.timestamp)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteVisitor(visitor.id)}
                    className={`p-2 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-colors`}
                    title="Delete visitor"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className={`${currentTheme.dashboard.textSecondary}`}>ISP: </span>
                    <span className={currentTheme.dashboard.text}>{visitor.isp || 'Not detected'}</span>
                  </div>
                  <div>
                    <span className={`${currentTheme.dashboard.textSecondary}`}>Resolution: </span>
                    <span className={currentTheme.dashboard.text}>{visitor.screenResolution}</span>
                  </div>
                  <div>
                    <span className={`${currentTheme.dashboard.textSecondary}`}>Language: </span>
                    <span className={currentTheme.dashboard.text}>{visitor.language}</span>
                  </div>
                  <div>
                    <span className={`${currentTheme.dashboard.textSecondary}`}>Fingerprint: </span>
                    <span className={currentTheme.dashboard.text}>{visitor.fingerprint}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className={`text-sm ${currentTheme.dashboard.textSecondary}`}>
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} rounded-lg disabled:opacity-50 disabled:cursor-not-allowed border ${currentTheme.dashboard.borders}`}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} rounded-lg disabled:opacity-50 disabled:cursor-not-allowed border ${currentTheme.dashboard.borders}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 