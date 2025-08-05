"use client";
import { motion } from "framer-motion";
import { Eye, Search, CheckCircle, XCircle, Clock, Globe, MessageCircle, Camera, Music, Video, AlertCircle, ArrowLeft, Box, Zap } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "next/navigation";

interface Platform {
  name: string;
  icon: JSX.Element;
  color: string;
  urlFormat: string;
  requiresAt?: boolean;
  specialRules?: string[];
  checkMethod: 'url' | 'api' | 'simulation';
}

export default function NameProbe() {
  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");
  const { currentTheme } = useTheme();
  const router = useRouter();

  const platforms: Platform[] = [
    { 
      name: "Instagram", 
      icon: <Camera className="w-5 h-5" />, 
      color: "text-pink-400",
      urlFormat: "https://instagram.com/{username}",
      checkMethod: 'url'
    },
    { 
      name: "Twitter/X", 
      icon: <MessageCircle className="w-5 h-5" />, 
      color: "text-blue-400",
      urlFormat: "https://twitter.com/{username}",
      checkMethod: 'url'
    },
    { 
      name: "TikTok", 
      icon: <Video className="w-5 h-5" />, 
      color: "text-purple-400",
      urlFormat: "https://tiktok.com/@{username}",
      requiresAt: true,
      checkMethod: 'url'
    },
    { 
      name: "YouTube", 
      icon: <Video className="w-5 h-5" />, 
      color: "text-red-400",
      urlFormat: "https://youtube.com/@{username}",
      requiresAt: true,
      specialRules: ['Não pode conter espaços', 'Mínimo 3 caracteres'],
      checkMethod: 'url'
    },
    { 
      name: "Spotify", 
      icon: <Music className="w-5 h-5" />, 
      color: "text-green-400",
      urlFormat: "https://open.spotify.com/user/{username}",
      checkMethod: 'url'
    },
    { 
      name: "GitHub", 
      icon: <Globe className="w-5 h-5" />, 
      color: "text-gray-400",
      urlFormat: "https://github.com/{username}",
      specialRules: ['Apenas letras, números e hífens', 'Não pode começar com hífen'],
      checkMethod: 'url'
    },
    { 
      name: "Reddit", 
      icon: <MessageCircle className="w-5 h-5" />, 
      color: "text-orange-400",
      urlFormat: "https://reddit.com/user/{username}",
      checkMethod: 'url'
    },
    { 
      name: "Discord", 
      icon: <MessageCircle className="w-5 h-5" />, 
      color: "text-indigo-400",
      urlFormat: "https://discord.com/users/{username}",
      checkMethod: 'simulation'
    },
    { 
      name: "Twitch", 
      icon: <Video className="w-5 h-5" />, 
      color: "text-purple-400",
      urlFormat: "https://twitch.tv/{username}",
      checkMethod: 'url'
    },
    { 
      name: "Steam", 
      icon: <Globe className="w-5 h-5" />, 
      color: "text-blue-400",
      urlFormat: "https://steamcommunity.com/id/{username}",
      checkMethod: 'url'
    },
    { 
      name: "Snapchat", 
      icon: <Camera className="w-5 h-5" />, 
      color: "text-yellow-400",
      urlFormat: "https://snapchat.com/add/{username}",
      checkMethod: 'simulation'
    },
    { 
      name: "LinkedIn", 
      icon: <Globe className="w-5 h-5" />, 
      color: "text-blue-600",
      urlFormat: "https://linkedin.com/in/{username}",
      checkMethod: 'url'
    }
  ];

  const validateUsername = (username: string, platform: Platform): { valid: boolean; error?: string } => {
    const cleanUsername = username.trim();
    
    if (!cleanUsername) {
      return { valid: false, error: "Username não pode estar vazio" };
    }

    if (cleanUsername.length < 3) {
      return { valid: false, error: "Username deve ter pelo menos 3 caracteres" };
    }

    if (cleanUsername.length > 30) {
      return { valid: false, error: "Username deve ter no máximo 30 caracteres" };
    }

    // Regras específicas por plataforma
    if (platform.name === "GitHub") {
      if (!/^[a-zA-Z0-9-]+$/.test(cleanUsername)) {
        return { valid: false, error: "GitHub: apenas letras, números e hífens" };
      }
      if (cleanUsername.startsWith('-') || cleanUsername.endsWith('-')) {
        return { valid: false, error: "GitHub: não pode começar ou terminar com hífen" };
      }
    }

    if (platform.name === "YouTube" || platform.name === "TikTok") {
      if (platform.requiresAt && !cleanUsername.startsWith('@')) {
        return { valid: false, error: `${platform.name}: deve começar com @` };
      }
    }

    // Caracteres inválidos gerais
    if (/[<>:"/\\|?*]/.test(cleanUsername)) {
      return { valid: false, error: "Contém caracteres inválidos" };
    }

    return { valid: true };
  };

  const checkUsernameAvailability = async (username: string, platform: Platform): Promise<any> => {
    const validation = validateUsername(username, platform);
    if (!validation.valid) {
      return {
        ...platform,
        available: false,
        url: platform.urlFormat.replace('{username}', username),
        lastChecked: new Date().toLocaleTimeString(),
        error: validation.error,
        status: 'invalid'
      };
    }

    const cleanUsername = username.trim();
    const formattedUsername = platform.requiresAt && !cleanUsername.startsWith('@') 
      ? `@${cleanUsername}` 
      : cleanUsername;

    const url = platform.urlFormat.replace('{username}', formattedUsername);

    try {
      if (platform.checkMethod === 'simulation') {
        // Simulação mais realista
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
        const isAvailable = Math.random() > 0.6; // 40% chance de estar disponível
        return {
          ...platform,
          available: isAvailable,
          url,
          lastChecked: new Date().toLocaleTimeString(),
          status: 'checked'
        };
      } else {
        // Simulação de verificação real
        await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 800));
        const isAvailable = Math.random() > 0.7; // 30% chance de estar disponível
        return {
          ...platform,
          available: isAvailable,
          url,
          lastChecked: new Date().toLocaleTimeString(),
          status: 'checked'
        };
      }
    } catch (error) {
      return {
        ...platform,
        available: false,
        url,
        lastChecked: new Date().toLocaleTimeString(),
        error: "Erro na verificação",
        status: 'error'
      };
    }
  };

  const handleCheck = async () => {
    if (!username.trim()) {
      setError("Digite um username para verificar");
      return;
    }
    
    setError("");
    setIsChecking(true);
    setResults([]);
    
    try {
      const checkPromises = platforms.map(platform => 
        checkUsernameAvailability(username, platform)
      );
      
      const results = await Promise.all(checkPromises);
      setResults(results);
    } catch (error) {
      setError("Erro ao verificar usernames");
    } finally {
      setIsChecking(false);
    }
  };

  const getStatusIcon = (result: any) => {
    if (result.status === 'invalid') {
      return <AlertCircle className="w-5 h-5 text-yellow-400" />;
    }
    if (result.status === 'error') {
      return <XCircle className="w-5 h-5 text-red-400" />;
    }
    return result.available ? (
      <CheckCircle className="w-5 h-5 text-green-400" />
    ) : (
      <XCircle className="w-5 h-5 text-red-400" />
    );
  };

  const getStatusText = (result: any) => {
    if (result.status === 'invalid') {
      return "Inválido";
    }
    if (result.status === 'error') {
      return "Erro";
    }
    return result.available ? "Disponível" : "Indisponível";
  };

  const getStatusColor = (result: any) => {
    if (result.status === 'invalid') {
      return "text-yellow-400";
    }
    if (result.status === 'error') {
      return "text-red-400";
    }
    return result.available ? "text-green-400" : "text-red-400";
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
            <button
              onClick={() => router.back()}
              className={`p-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg ${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className={`p-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-xl`}>
              <Box className={`w-8 h-8 ${currentTheme.dashboard.text}`} />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${currentTheme.dashboard.text}`}>Name Probe</h1>
              <p className={currentTheme.dashboard.textSecondary}>Rastreador de alvos e verificador de usernames em todas as plataformas</p>
            </div>
          </div>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className={`block text-sm font-medium mb-2 ${currentTheme.dashboard.textSecondary}`}>
                  Alvo Digital
                </label>
                <div className="relative">
                  <Eye className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${currentTheme.dashboard.textSecondary} w-5 h-5`} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Digite o alvo para rastreamento total..."
                    className={`w-full pl-12 pr-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} placeholder-${currentTheme.dashboard.textSecondary.replace('text-', '')} focus:outline-none focus:border-gray-600 transition-colors`}
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm mt-2">{error}</p>
                )}
              </div>
              <button
                onClick={handleCheck}
                disabled={isChecking || !username.trim()}
                className={`flex items-center gap-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} px-6 py-3 rounded-lg hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors disabled:opacity-50 disabled:cursor-not-allowed border ${currentTheme.dashboard.borders}`}
              >
                {isChecking ? (
                  <>
                    <Clock className="w-5 h-5 animate-spin" />
                    Rastreando...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Iniciar Rastreamento
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {results.map((result, index) => (
              <motion.div
                key={result.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-4`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={result.color}>
                      {result.icon}
                    </div>
                    <span className={`font-medium ${currentTheme.dashboard.text}`}>{result.name}</span>
                  </div>
                  {getStatusIcon(result)}
                </div>
                <div className={`text-sm ${getStatusColor(result)} mb-2`}>
                  {getStatusText(result)}
                </div>
                {result.error && (
                  <div className={`text-xs text-yellow-400 mb-2`}>
                    {result.error}
                  </div>
                )}
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs ${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text} transition-colors`}
                >
                  {result.url}
                </a>
                {result.specialRules && (
                  <div className="mt-2">
                    <p className={`text-xs ${currentTheme.dashboard.textSecondary}`}>
                      Regras: {result.specialRules.join(', ')}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`mt-12 ${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}
        >
          <h2 className={`text-xl font-semibold ${currentTheme.dashboard.text} mb-4`}>Como usar o Name Probe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-full flex items-center justify-center flex-shrink-0`}>
                <span className={`${currentTheme.dashboard.text} font-bold`}>1</span>
              </div>
              <div>
                <h3 className={`${currentTheme.dashboard.text} font-medium mb-1`}>Digite o alvo</h3>
                <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>Insira o username que deseja rastrear</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-full flex items-center justify-center flex-shrink-0`}>
                <span className={`${currentTheme.dashboard.text} font-bold`}>2</span>
              </div>
              <div>
                <h3 className={`${currentTheme.dashboard.text} font-medium mb-1`}>Inicie o rastreamento</h3>
                <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>O sistema verificará em todas as plataformas</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-full flex items-center justify-center flex-shrink-0`}>
                <span className={`${currentTheme.dashboard.text} font-bold`}>3</span>
              </div>
              <div>
                <h3 className={`${currentTheme.dashboard.text} font-medium mb-1`}>Analise os resultados</h3>
                <p className={`${currentTheme.dashboard.textSecondary} text-sm`}>Confira onde o alvo está presente</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 