"use client";
import { motion } from "framer-motion";
import { Settings, User, Shield, Bell, Palette, Globe, Key, Check, Eye, EyeOff, Download, Upload } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { currentTheme, themes, setTheme } = useTheme();

  const sections = [
    { id: 'profile', name: 'Perfil', icon: User },
    { id: 'security', name: 'Segurança', icon: Shield },
    { id: 'notifications', name: 'Notificações', icon: Bell },
    { id: 'appearance', name: 'Aparência', icon: Palette },
    { id: 'language', name: 'Idioma', icon: Globe },
    { id: 'api', name: 'API Keys', icon: Key },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'appearance':
        return <AppearanceSection />;
      case 'security':
        return <SecuritySection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'language':
        return <LanguageSection />;
      case 'api':
        return <ApiSection />;
      case 'profile':
      default:
        return <ProfileSection />;
    }
  };

  const ProfileSection = () => (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-medium ${currentTheme.dashboard.textSecondary} mb-2`}>
          Nome de Usuário
        </label>
        <input
          type="text"
          defaultValue="admin"
          className={`w-full px-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}
        />
      </div>

      <div>
        <label className={`block text-sm font-medium ${currentTheme.dashboard.textSecondary} mb-2`}>
          Email
        </label>
        <input
          type="email"
          defaultValue="admin@example.com"
          className={`w-full px-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}
        />
      </div>

      <div>
        <label className={`block text-sm font-medium ${currentTheme.dashboard.textSecondary} mb-2`}>
          Nova Senha
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="Deixe em branco para manter a atual"
            className={`w-full px-4 py-3 pr-10 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showNewPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
          </button>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium ${currentTheme.dashboard.textSecondary} mb-2`}>
          Confirmar Nova Senha
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme a nova senha"
            className={`w-full px-4 py-3 pr-10 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
          </button>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium ${currentTheme.dashboard.textSecondary} mb-2`}>
          Fuso Horário
        </label>
        <select className={`w-full px-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}>
          <option value="utc-3">UTC-3 (Brasília)</option>
          <option value="utc-5">UTC-5 (Eastern Time)</option>
          <option value="utc+0">UTC+0 (London)</option>
          <option value="utc+1">UTC+1 (Paris)</option>
        </select>
      </div>

      <div className="pt-6 border-t border-gray-700">
        <button className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors border ${currentTheme.dashboard.borders}`}>
          Salvar Alterações
        </button>
      </div>
    </div>
  );

  const SecuritySection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`${currentTheme.dashboard.text} font-medium`}>Autenticação de Dois Fatores</h3>
          <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>Adicione uma camada extra de segurança</p>
        </div>
        <button className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors border ${currentTheme.dashboard.borders}`}>
          Configurar 2FA
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className={`${currentTheme.dashboard.text} font-medium`}>Sessões Ativas</h3>
          <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>Gerencie suas sessões de login</p>
        </div>
        <button className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors border ${currentTheme.dashboard.borders}`}>
          Ver Sessões
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className={`${currentTheme.dashboard.text} font-medium`}>Histórico de Login</h3>
          <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>Visualize tentativas de login recentes</p>
        </div>
        <button className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors border ${currentTheme.dashboard.borders}`}>
          Ver Histórico
        </button>
      </div>

      <div className="pt-6 border-t border-gray-700">
        <button className={`bg-red-600 ${currentTheme.dashboard.text} px-6 py-3 rounded-lg hover:bg-red-700 transition-colors`}>
          Alterar Senha
        </button>
      </div>
    </div>
  );

  const NotificationsSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`${currentTheme.dashboard.text} font-medium`}>Notificações por Email</h3>
          <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>Receba alertas importantes por email</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className={`${currentTheme.dashboard.text} font-medium`}>Notificações de Ataque</h3>
          <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>Receba notificações quando ataques forem concluídos</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className={`${currentTheme.dashboard.text} font-medium`}>Alertas de Segurança</h3>
          <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>Notificações sobre atividades suspeitas</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div className="pt-6 border-t border-gray-700">
        <button className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors border ${currentTheme.dashboard.borders}`}>
          Salvar Preferências
        </button>
      </div>
    </div>
  );

  const LanguageSection = () => (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-medium ${currentTheme.dashboard.textSecondary} mb-2`}>
          Idioma da Interface
        </label>
        <select className={`w-full px-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}>
          <option value="pt-BR">Português (Brasil)</option>
          <option value="en-US">English (US)</option>
          <option value="es-ES">Español</option>
          <option value="fr-FR">Français</option>
        </select>
      </div>

      <div>
        <label className={`block text-sm font-medium ${currentTheme.dashboard.textSecondary} mb-2`}>
          Formato de Data
        </label>
        <select className={`w-full px-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}>
          <option value="dd/mm/yyyy">DD/MM/YYYY</option>
          <option value="mm/dd/yyyy">MM/DD/YYYY</option>
          <option value="yyyy-mm-dd">YYYY-MM-DD</option>
        </select>
      </div>

      <div>
        <label className={`block text-sm font-medium ${currentTheme.dashboard.textSecondary} mb-2`}>
          Formato de Hora
        </label>
        <select className={`w-full px-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}>
          <option value="12h">12 horas (AM/PM)</option>
          <option value="24h">24 horas</option>
        </select>
      </div>

      <div className="pt-6 border-t border-gray-700">
        <button className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors border ${currentTheme.dashboard.borders}`}>
          Aplicar Configurações
        </button>
      </div>
    </div>
  );

  const ApiSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className={`${currentTheme.dashboard.text} font-medium mb-2`}>API Key Atual</h3>
        <div className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-3 flex items-center justify-between`}>
          <code className="text-blue-400 break-all">cm...kpg9q</code>
          <button className={`${currentTheme.dashboard.text} hover:text-blue-400 transition-colors`}>
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <button className={`flex-1 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors border ${currentTheme.dashboard.borders} flex items-center justify-center gap-2`}>
          <Download className="w-5 h-5" />
          Gerar Nova Key
        </button>
        <button className={`flex-1 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors border ${currentTheme.dashboard.borders} flex items-center justify-center gap-2`}>
          <Upload className="w-5 h-5" />
          Revogar Key
        </button>
      </div>

      <div>
        <h3 className={`${currentTheme.dashboard.text} font-medium mb-4`}>Documentação da API</h3>
        <div className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg p-4`}>
          <p className={`${currentTheme.dashboard.textSecondary} text-sm mb-3`}>
            Acesse a documentação completa da API para integrar com suas aplicações.
          </p>
          <a 
            href="/api" 
            className={`text-blue-400 hover:text-blue-300 transition-colors text-sm`}
          >
            Ver Documentação →
          </a>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-700">
        <button className={`bg-red-600 ${currentTheme.dashboard.text} px-6 py-3 rounded-lg hover:bg-red-700 transition-colors`}>
          Revogar Todas as Keys
        </button>
      </div>
    </div>
  );

  const AppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className={`${currentTheme.dashboard.text} font-medium mb-4`}>Temas Disponíveis</h3>
        <p className={`${currentTheme.dashboard.textSecondary} text-sm mb-6`}>Escolha o tema que melhor se adapta ao seu estilo</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {themes.map((theme) => (
            <motion.div
              key={theme.id}
              whileHover={{ scale: 1.02 }}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                currentTheme.id === theme.id
                  ? 'border-blue-500 bg-gray-800'
                  : `${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.borders} hover:border-gray-600`
              }`}
              onClick={() => setTheme(theme.id)}
            >
              {currentTheme.id === theme.id && (
                <div className="absolute top-2 right-2">
                  <Check className="w-5 h-5 text-blue-500" />
                </div>
              )}
              
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h4 className={`${currentTheme.dashboard.text} font-medium mb-1`}>{theme.name}</h4>
                  <p className={`${currentTheme.dashboard.textSecondary} text-sm mb-3`}>{theme.description}</p>
                  
                  {/* Preview do tema */}
                  <div className="flex gap-2">
                    <div className={`w-8 h-6 rounded ${theme.dashboard.background} border ${theme.dashboard.borders}`}></div>
                    <div className={`w-6 h-6 rounded ${theme.sidebar.background} border ${theme.sidebar.borders}`}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-gray-700">
        <div className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg p-4`}>
          <h4 className={`${currentTheme.dashboard.text} font-medium mb-2`}>Preview do Tema Atual</h4>
          <p className={`${currentTheme.dashboard.textSecondary} text-sm mb-3`}>
            Dashboard: {currentTheme.dashboard.background} | Sidebar: {currentTheme.sidebar.background}
          </p>
          <div className="flex gap-4">
            <div className={`w-16 h-12 rounded-lg ${currentTheme.dashboard.background} border ${currentTheme.dashboard.borders} flex items-center justify-center`}>
              <div className={`w-8 h-8 rounded ${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders}`}></div>
            </div>
            <div className={`w-12 h-12 rounded-lg ${currentTheme.sidebar.background} border ${currentTheme.sidebar.borders} flex items-center justify-center`}>
              <div className={`w-6 h-6 rounded ${currentTheme.sidebar.active} border ${currentTheme.sidebar.borders}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen p-6 ${currentTheme.dashboard.background}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${currentTheme.dashboard.text}`}>Configurações</h1>
          <p className={currentTheme.dashboard.textSecondary}>Gerencie suas preferências e configurações da conta</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu lateral */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}>
              <h2 className={`text-lg font-semibold mb-4 ${currentTheme.dashboard.text}`}>Categorias</h2>
              <div className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 p-3 text-left rounded-lg transition-colors ${
                        activeSection === section.id
                          ? `${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text}`
                          : `${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text.replace('text-', '')} hover:bg-gray-700/50`
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{section.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Conteúdo principal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}>
              <h2 className={`text-xl font-semibold mb-6 ${currentTheme.dashboard.text}`}>
                {sections.find(s => s.id === activeSection)?.name}
              </h2>
              
              {renderSection()}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 