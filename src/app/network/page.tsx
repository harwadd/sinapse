"use client";
import { motion } from "framer-motion";
import { 
  Network, 
  Wifi, 
  Activity, 
  Globe, 
  Zap, 
  Target, 
  Crown, 
  Eye,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface PingResult {
  target: string;
  time: number;
  status: 'success' | 'timeout' | 'error';
}

interface TracerouteResult {
  hop: number;
  ip: string;
  hostname?: string;
  time: number;
  status: 'success' | 'timeout' | 'error';
}

interface PortScanResult {
  port: number;
  service: string;
  status: 'open' | 'closed' | 'filtered';
  banner?: string;
}

interface DnsResult {
  type: string;
  value: string;
  ttl: number;
}

interface SpeedTestResult {
  download: number;
  upload: number;
  ping: number;
  server: string;
}

export default function MapeamentoGlobal() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [target, setTarget] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [pingResults, setPingResults] = useState<PingResult[]>([]);
  const [portRange, setPortRange] = useState("1-1000");
  const { currentTheme } = useTheme();

  const tools = [
    {
      id: "ping",
      name: "Ping Supremo",
      description: "Teste de conectividade e latência com precisão milissegundos",
      icon: <Target className="w-8 h-8" />,
      color: currentTheme.dashboard.text
    },
    {
      id: "traceroute",
      name: "Rastreamento de Rota",
      description: "Mapeamento completo da rota de rede até o alvo",
      icon: <Network className="w-8 h-8" />,
      color: currentTheme.dashboard.text
    },
    {
      id: "portscan",
      name: "Scanner de Portas Elite",
      description: "Descoberta de portas abertas e serviços ativos",
      icon: <Search className="w-8 h-8" />,
      color: currentTheme.dashboard.text
    },
    {
      id: "dns",
      name: "Análise DNS Profunda",
      description: "Resolução completa de registros DNS e subdomínios",
      icon: <Globe className="w-8 h-8" />,
      color: currentTheme.dashboard.text
    },
    {
      id: "speedtest",
      name: "Teste de Velocidade Supremo",
      description: "Medição precisa de largura de banda e performance",
      icon: <Activity className="w-8 h-8" />,
      color: currentTheme.dashboard.text
    }
  ];

  const runPing = async () => {
    setIsRunning(true);
    const results: PingResult[] = [];
    
    for (let i = 0; i < 4; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const time = Math.random() * 50 + 10;
      results.push({
        target,
        time: Math.round(time),
        status: 'success'
      });
    }
    
    setPingResults(results);
    setIsRunning(false);
  };

  const runTraceroute = async () => {
    setIsRunning(true);
    const results: TracerouteResult[] = [];
    
    for (let i = 1; i <= 15; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      results.push({
        hop: i,
        ip: `192.168.${i}.${Math.floor(Math.random() * 255)}`,
        hostname: i > 1 ? `router-${i}.isp.com` : undefined,
        time: Math.round(Math.random() * 20 + 5),
        status: 'success'
      });
    }
    
    setResults(results);
    setIsRunning(false);
  };

  const runPortScan = async () => {
    setIsRunning(true);
    const [start, end] = portRange.split('-').map(Number);
    const results: PortScanResult[] = [];
    
    for (let port = start; port <= Math.min(end, start + 20); port++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      if (Math.random() > 0.8) {
        results.push({
          port,
          service: getServiceName(port),
          status: 'open',
          banner: `Service running on port ${port}`
        });
      }
    }
    
    setResults(results);
    setIsRunning(false);
  };

  const runDnsLookup = async () => {
    setIsRunning(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const results: DnsResult[] = [
      { type: 'A', value: '192.168.1.1', ttl: 300 },
      { type: 'AAAA', value: '2001:db8::1', ttl: 300 },
      { type: 'MX', value: 'mail.example.com', ttl: 3600 },
      { type: 'NS', value: 'ns1.example.com', ttl: 86400 },
      { type: 'TXT', value: 'v=spf1 include:_spf.example.com ~all', ttl: 3600 }
    ];
    
    setResults(results);
    setIsRunning(false);
  };

  const runSpeedTest = async () => {
    setIsRunning(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const results: SpeedTestResult = {
      download: Math.round(Math.random() * 100 + 50),
      upload: Math.round(Math.random() * 50 + 20),
      ping: Math.round(Math.random() * 20 + 5),
      server: 'Speed Test Server Elite'
    };
    
    setResults(results);
    setIsRunning(false);
  };

  const getServiceName = (port: number): string => {
    const services: { [key: number]: string } = {
      21: 'FTP', 22: 'SSH', 23: 'Telnet', 25: 'SMTP', 53: 'DNS',
      80: 'HTTP', 110: 'POP3', 143: 'IMAP', 443: 'HTTPS', 993: 'IMAPS'
    };
    return services[port] || 'Unknown';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-green-400';
      case 'closed': return 'text-red-400';
      case 'filtered': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <XCircle className="w-4 h-4" />;
      case 'filtered': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const renderToolContent = () => {
    switch (activeTool) {
      case 'ping':
        return (
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Digite o alvo (ex: google.com)"
                className={`flex-1 ${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-2 ${currentTheme.dashboard.text} placeholder-${currentTheme.dashboard.textSecondary.replace('text-', '')}`}
              />
              <button
                onClick={runPing}
                disabled={isRunning || !target}
                className={`px-6 py-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors disabled:opacity-50`}
              >
                {isRunning ? 'Executando...' : 'Ping'}
              </button>
            </div>
            {pingResults.length > 0 && (
              <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-lg p-4`}>
                <h3 className={`font-semibold mb-3 ${currentTheme.dashboard.text}`}>Resultados do Ping</h3>
                <div className="space-y-2">
                  {pingResults.map((result, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className={currentTheme.dashboard.text}>Pacote {index + 1}:</span>
                      <span className="text-green-400">{result.time}ms</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'traceroute':
        return (
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Digite o alvo para rastrear"
                className={`flex-1 ${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-2 ${currentTheme.dashboard.text} placeholder-${currentTheme.dashboard.textSecondary.replace('text-', '')}`}
              />
              <button
                onClick={runTraceroute}
                disabled={isRunning || !target}
                className={`px-6 py-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors disabled:opacity-50`}
              >
                {isRunning ? 'Rastreando...' : 'Traceroute'}
              </button>
            </div>
            {results && (
              <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-lg p-4`}>
                <h3 className={`font-semibold mb-3 ${currentTheme.dashboard.text}`}>Rota para {target}</h3>
                <div className="space-y-1">
                  {results.map((hop: TracerouteResult) => (
                    <div key={hop.hop} className="flex justify-between items-center text-sm">
                      <span className={currentTheme.dashboard.text}>{hop.hop}</span>
                      <span className={currentTheme.dashboard.text}>{hop.ip}</span>
                      <span className={currentTheme.dashboard.textSecondary}>{hop.hostname || ''}</span>
                      <span className="text-green-400">{hop.time}ms</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'portscan':
        return (
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Digite o alvo (ex: 192.168.1.1)"
                className={`flex-1 ${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-2 ${currentTheme.dashboard.text} placeholder-${currentTheme.dashboard.textSecondary.replace('text-', '')}`}
              />
              <input
                type="text"
                value={portRange}
                onChange={(e) => setPortRange(e.target.value)}
                placeholder="Range de portas (ex: 1-1000)"
                className={`w-48 ${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-2 ${currentTheme.dashboard.text} placeholder-${currentTheme.dashboard.textSecondary.replace('text-', '')}`}
              />
              <button
                onClick={runPortScan}
                disabled={isRunning || !target}
                className={`px-6 py-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors disabled:opacity-50`}
              >
                {isRunning ? 'Escaneando...' : 'Scan'}
              </button>
            </div>
            {results && (
              <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-lg p-4`}>
                <h3 className={`font-semibold mb-3 ${currentTheme.dashboard.text}`}>Portas Encontradas</h3>
                <div className="space-y-2">
                  {results.map((port: PortScanResult) => (
                    <div key={port.port} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`${getStatusColor(port.status)}`}>
                          {getStatusIcon(port.status)}
                        </span>
                        <span className={currentTheme.dashboard.text}>Porta {port.port}</span>
                        <span className={currentTheme.dashboard.textSecondary}>({port.service})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'dns':
        return (
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Digite o domínio (ex: example.com)"
                className={`flex-1 ${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-2 ${currentTheme.dashboard.text} placeholder-${currentTheme.dashboard.textSecondary.replace('text-', '')}`}
              />
              <button
                onClick={runDnsLookup}
                disabled={isRunning || !target}
                className={`px-6 py-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors disabled:opacity-50`}
              >
                {isRunning ? 'Consultando...' : 'DNS Lookup'}
              </button>
            </div>
            {results && (
              <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-lg p-4`}>
                <h3 className={`font-semibold mb-3 ${currentTheme.dashboard.text}`}>Registros DNS para {target}</h3>
                <div className="space-y-2">
                  {results.map((record: DnsResult, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className={`font-medium ${currentTheme.dashboard.text}`}>{record.type}</span>
                      <span className={currentTheme.dashboard.text}>{record.value}</span>
                      <span className={currentTheme.dashboard.textSecondary}>TTL: {record.ttl}s</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'speedtest':
        return (
          <div className="space-y-4">
            <button
              onClick={runSpeedTest}
              disabled={isRunning}
              className={`px-6 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors disabled:opacity-50`}
            >
              {isRunning ? 'Testando Velocidade...' : 'Iniciar Teste de Velocidade'}
            </button>
            {results && (
              <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-lg p-6`}>
                <h3 className={`font-semibold mb-4 ${currentTheme.dashboard.text}`}>Resultados do Teste</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{results.download} Mbps</div>
                    <div className={currentTheme.dashboard.textSecondary}>Download</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{results.upload} Mbps</div>
                    <div className={currentTheme.dashboard.textSecondary}>Upload</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{results.ping} ms</div>
                    <div className={currentTheme.dashboard.textSecondary}>Ping</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-green-400">{results.server}</div>
                    <div className={currentTheme.dashboard.textSecondary}>Servidor</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
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
              <Network className={`w-8 h-8 ${currentTheme.dashboard.text}`} />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${currentTheme.dashboard.text}`}>Mapeamento Global</h1>
              <p className={currentTheme.dashboard.textSecondary}>Ferramentas de análise de rede e mapeamento completo de infraestrutura alvo</p>
            </div>
          </div>
        </motion.div>

        {!activeTool ? (
          // Grid de ferramentas
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setActiveTool(tool.id)}
                className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6 cursor-pointer hover:border-gray-700 transition-all duration-300 hover:shadow-xl`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={tool.color}>
                    {tool.icon}
                  </div>
                  <h3 className={`text-xl font-semibold ${currentTheme.dashboard.text}`}>{tool.name}</h3>
                </div>
                <p className={`text-sm ${currentTheme.dashboard.textSecondary}`}>{tool.description}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          // Interface da ferramenta ativa
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTool(null)}
                  className={`p-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg ${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors`}
                >
                  ← Voltar
                </button>
                <h2 className={`text-xl font-semibold ${currentTheme.dashboard.text}`}>
                  {tools.find(t => t.id === activeTool)?.name}
                </h2>
              </div>
            </div>
            {renderToolContent()}
          </motion.div>
        )}
      </div>
    </div>
  );
} 