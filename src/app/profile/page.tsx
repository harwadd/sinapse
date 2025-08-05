"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { 
  Copy, 
  CheckCircle, 
  Info, 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Clock, 
  Zap, 
  Crown,
  Edit,
  Save,
  X,
  Camera,
  Key,
  Settings,
  Activity,
  TrendingUp,
  Award
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

type Profile = {
  id: string;
  username: string;
  email: string;
  plan: string;
  rule: string;
  join_date: string;
  max_concurrents: number;
  max_seconds: number;
  expiration_date: string | null;
  avatar: string;
  attacks_completed?: number;
  total_attacks?: number;
  success_rate?: number;
  last_login?: string;
  status?: 'active' | 'suspended' | 'premium';
  api_key?: string;
  notifications_enabled?: boolean;
  two_factor_enabled?: boolean;
};

export default function ProfilePage() {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    notifications_enabled: false,
    two_factor_enabled: false
  });
  const { currentTheme } = useTheme();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        const user = response.data;
        const profileData = {
          ...user,
          avatar: user.username
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase(),
          attacks_completed: 156,
          total_attacks: 180,
          success_rate: 86.7,
          last_login: new Date().toISOString(),
          status: 'active' as const,
          api_key: 'ct_' + Math.random().toString(36).substr(2, 32),
          notifications_enabled: true,
          two_factor_enabled: false
        };
        setProfile(profileData);
        setEditForm({
          username: profileData.username,
          email: profileData.email,
          notifications_enabled: profileData.notifications_enabled || false,
          two_factor_enabled: profileData.two_factor_enabled || false
        });
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        // Mock data para demonstração
        const mockProfile: Profile = {
          id: "CT_001",
          username: "cosmic",
          email: "admin@admin.com",
          plan: "Premium",
          rule: "User",
          join_date: "2024-01-15",
          max_concurrents: 10,
          max_seconds: 3600,
          expiration_date: "2024-12-31",
          avatar: "C",
          attacks_completed: 156,
          total_attacks: 180,
          success_rate: 86.7,
          last_login: new Date().toISOString(),
          status: 'active',
          api_key: 'ct_' + Math.random().toString(36).substr(2, 32),
          notifications_enabled: true,
          two_factor_enabled: false
        };
        setProfile(mockProfile);
        setEditForm({
          username: mockProfile.username,
          email: mockProfile.email,
          notifications_enabled: mockProfile.notifications_enabled || false,
          two_factor_enabled: mockProfile.two_factor_enabled || false
        });
      }
    };
    fetchProfile();
  }, []);

  const copyUserId = () => {
    navigator.clipboard.writeText(profile?.id?.toString() ?? "");
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(profile?.api_key ?? "");
    setCopiedApiKey(true);
    setTimeout(() => setCopiedApiKey(false), 2000);
  };

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as alterações
    setIsEditing(false);
    // Simular atualização do perfil
    if (profile) {
      setProfile({
        ...profile,
        username: editForm.username,
        email: editForm.email,
        notifications_enabled: editForm.notifications_enabled,
        two_factor_enabled: editForm.two_factor_enabled
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setEditForm({
        username: profile.username,
        email: profile.email,
        notifications_enabled: profile.notifications_enabled || false,
        two_factor_enabled: profile.two_factor_enabled || false
      });
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  if (!profile) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-300 bg-emerald-900/30 border-emerald-800/50';
      case 'premium': return 'text-amber-300 bg-amber-900/30 border-amber-800/50';
      case 'suspended': return 'text-red-300 bg-red-900/30 border-red-800/50';
      default: return 'text-gray-300 bg-gray-800/30 border-gray-700/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Shield className="w-4 h-4" />;
      case 'premium': return <Crown className="w-4 h-4" />;
      case 'suspended': return <X className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className={`min-h-screen p-6 ${currentTheme.dashboard.background}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${currentTheme.dashboard.text}`}>Perfil do Usuário</h1>
            <p className={currentTheme.dashboard.textSecondary}>Gerencie suas informações e configurações</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 ${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} transition-colors`}
          >
            {isEditing ? <X size={16} /> : <Edit size={16} />}
            {isEditing ? 'Cancelar' : 'Editar'}
          </button>
        </motion.div>

        {/* Informação de Segurança */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`flex items-center gap-3 text-sm ${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl px-6 py-4`}
        >
          <Info size={20} className={`${currentTheme.dashboard.textSecondary} flex-shrink-0`} />
          <p className={currentTheme.dashboard.textSecondary}>
            Nunca solicitamos informações sensíveis. Apenas seu User ID ou Username é necessário ao comprar um plano.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card do Perfil */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-2xl p-8`}
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className={`w-24 h-24 rounded-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} flex items-center justify-center text-3xl font-bold ${currentTheme.dashboard.textSecondary} shadow-lg`}>
                    {profile.avatar}
                  </div>
                  <button className={`absolute -bottom-2 -right-2 p-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-full hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors`}>
                    <Camera size={16} className={currentTheme.dashboard.textSecondary} />
                  </button>
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editForm.username}
                        onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                        className={`w-full px-4 py-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:border-gray-600 focus:outline-none`}
                        placeholder="Username"
                      />
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className={`w-full px-4 py-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:border-gray-600 focus:outline-none`}
                        placeholder="Email"
                      />
                    </div>
                  ) : (
                    <div>
                      <h2 className={`text-2xl font-bold mb-1 ${currentTheme.dashboard.text}`}>{profile.username}</h2>
                      <p className={`${currentTheme.dashboard.textSecondary} flex items-center gap-2`}>
                        <Mail size={16} />
                        {profile.email}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(profile.status || 'active')}`}>
                      {getStatusIcon(profile.status || 'active')}
                      {profile.status === 'premium' ? 'Premium' : profile.status === 'active' ? 'Ativo' : 'Suspenso'}
                    </span>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-4 py-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} rounded-lg ${currentTheme.dashboard.text} transition-colors`}
                  >
                    <Save size={16} />
                    Salvar
                  </button>
                  <button
                    onClick={handleCancel}
                    className={`flex items-center gap-2 px-4 py-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} rounded-lg ${currentTheme.dashboard.textSecondary} transition-colors`}
                  >
                    <X size={16} />
                    Cancelar
                  </button>
                </div>
              )}
            </motion.div>

            {/* Estatísticas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                    <Activity className={`w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                  </div>
                  <div>
                    <p className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Ataques Completados</p>
                    <p className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>{profile.attacks_completed}</p>
                  </div>
                </div>
                <div className={`w-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-full h-2`}>
                  <div 
                    className="bg-gray-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(profile.attacks_completed || 0) / (profile.total_attacks || 1) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                    <TrendingUp className={`w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                  </div>
                  <div>
                    <p className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Taxa de Sucesso</p>
                    <p className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>{profile.success_rate}%</p>
                  </div>
                </div>
                <div className={`w-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-full h-2`}>
                  <div 
                    className="bg-gray-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${profile.success_rate || 0}%` }}
                  ></div>
                </div>
              </div>

              <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                    <Award className={`w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                  </div>
                  <div>
                    <p className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Total de Ataques</p>
                    <p className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>{profile.total_attacks}</p>
                  </div>
                </div>
                <div className={`w-full ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-full h-2`}>
                  <div 
                    className="bg-gray-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(profile.total_attacks || 0) / 200 * 100}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>

            {/* Informações da Conta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-2xl p-8`}
            >
              <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${currentTheme.dashboard.text}`}>
                <User className={`w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                Informações da Conta
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className={`flex items-center justify-between p-4 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                    <div className="flex items-center gap-3">
                      <Shield className={`w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                      <div>
                        <p className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Plano</p>
                        <p className={`${currentTheme.dashboard.text} font-semibold`}>{profile.plan}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`flex items-center justify-between p-4 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                    <div className="flex items-center gap-3">
                      <Calendar className={`w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                      <div>
                        <p className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Membro desde</p>
                        <p className={`${currentTheme.dashboard.text} font-semibold`}>{formatDate(profile.join_date)}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`flex items-center justify-between p-4 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                    <div className="flex items-center gap-3">
                      <Clock className={`w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                      <div>
                        <p className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Último login</p>
                        <p className={`${currentTheme.dashboard.text} font-semibold`}>{formatDate(profile.last_login || '')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className={`flex items-center justify-between p-4 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                    <div className="flex items-center gap-3">
                      <Zap className={`w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                      <div>
                        <p className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Máx. Concorrentes</p>
                        <p className={`${currentTheme.dashboard.text} font-semibold`}>{profile.max_concurrents}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`flex items-center justify-between p-4 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                    <div className="flex items-center gap-3">
                      <Clock className={`w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                      <div>
                        <p className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Duração Máxima</p>
                        <p className={`${currentTheme.dashboard.text} font-semibold`}>{formatTime(profile.max_seconds)}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`flex items-center justify-between p-4 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                    <div className="flex items-center gap-3">
                      <Calendar className={`w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                      <div>
                        <p className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Expira em</p>
                        <p className={`${currentTheme.dashboard.text} font-semibold`}>
                          {profile.expiration_date ? formatDate(profile.expiration_date) : "Sem expiração"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User ID */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}
            >
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${currentTheme.dashboard.text}`}>
                <Key className={`w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                User ID
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${currentTheme.dashboard.textSecondary}`}>ID</span>
                  <button 
                    onClick={copyUserId} 
                    className={`p-2 ${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg transition-colors`}
                  >
                    {copiedId ? <CheckCircle size={16} className={currentTheme.dashboard.textSecondary} /> : <Copy size={16} />}
                  </button>
                </div>
                <code className={`block text-sm ${currentTheme.dashboard.text} break-words ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} p-3 rounded-lg font-mono`}>
                  {profile.id}
                </code>
              </div>
            </motion.div>

            {/* API Key */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}
            >
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${currentTheme.dashboard.text}`}>
                <Key className={`w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                API Key
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Chave</span>
                  <button 
                    onClick={copyApiKey} 
                    className={`p-2 ${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg transition-colors`}
                  >
                    {copiedApiKey ? <CheckCircle size={16} className={currentTheme.dashboard.textSecondary} /> : <Copy size={16} />}
                  </button>
                </div>
                <code className={`block text-sm ${currentTheme.dashboard.text} break-words ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} p-3 rounded-lg font-mono`}>
                  {profile.api_key}
                </code>
              </div>
            </motion.div>

            {/* Configurações */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}
            >
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${currentTheme.dashboard.text}`}>
                <Settings className={`w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                Configurações
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                      <Activity className={`w-4 h-4 ${currentTheme.dashboard.textSecondary}`} />
                    </div>
                    <div>
                      <p className={`text-sm ${currentTheme.dashboard.text}`}>Notificações</p>
                      <p className={`text-xs ${currentTheme.dashboard.textSecondary}`}>Alertas por email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.notifications_enabled}
                      onChange={(e) => setEditForm({...editForm, notifications_enabled: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600`}></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                      <Shield className={`w-4 h-4 ${currentTheme.dashboard.textSecondary}`} />
                    </div>
                    <div>
                      <p className={`text-sm ${currentTheme.dashboard.text}`}>2FA</p>
                      <p className={`text-xs ${currentTheme.dashboard.textSecondary}`}>Autenticação dupla</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.two_factor_enabled}
                      onChange={(e) => setEditForm({...editForm, two_factor_enabled: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600`}></div>
                  </label>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}