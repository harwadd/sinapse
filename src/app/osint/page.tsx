"use client";
import { motion } from "framer-motion";
import { Eye, Globe, MapPin, User, Mail, Phone, Building, Calendar, Target, Zap, Crown, Flag, FileText, CreditCard, Search, Database, Car, Key, Users, Shield, Wifi, Heart, Baby, Briefcase, Lock } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function VisaoDivina() {
  const { currentTheme } = useTheme();
  
  const tools = [
    {
      name: "Rastreamento de Domínios",
      description: "Visão completa sobre infraestrutura digital, DNS, WHOIS e certificados de segurança",
      icon: <Globe className="w-6 h-6" />,
      color: "text-blue-400",
      features: ["WHOIS Profundo", "DNS Completo", "Certificados SSL", "Descoberta de Subdomínios"]
    },
    {
      name: "Monitoramento Social",
      description: "Sistema de vigilância total em redes sociais e plataformas digitais",
      icon: <User className="w-6 h-6" />,
      color: "text-purple-400",
      features: ["Busca de Usuários", "Análise de Perfis", "Histórico Completo", "Mapa de Conexões"]
    },
    {
      name: "Inteligência de Email",
      description: "Análise profunda de endereços de email e verificação de comprometimento",
      icon: <Mail className="w-6 h-6" />,
      color: "text-green-400",
      features: ["Validação Avançada", "Verificação de Vazamentos", "Análise de Domínio", "Detecção de Formato"]
    },
    {
      name: "Rastreamento Telefônico",
      description: "Informações completas sobre números de telefone e operadoras",
      icon: <Phone className="w-6 h-6" />,
      color: "text-orange-400",
      features: ["Identificação de Operadora", "Dados de Localização", "Validação de Formato", "Verificação de Spam"]
    },
    {
      name: "Inteligência Corporativa",
      description: "Dados empresariais, funcionários e informações financeiras",
      icon: <Building className="w-6 h-6" />,
      color: "text-red-400",
      features: ["Perfil da Empresa", "Busca de Funcionários", "Dados Financeiros", "Registros Legais"]
    },
    {
      name: "Geolocalização Suprema",
      description: "Análise avançada de localização e dados geográficos precisos",
      icon: <MapPin className="w-6 h-6" />,
      color: "text-cyan-400",
      features: ["Geolocalização por IP", "Metadados de Imagens", "Coordenadas GPS", "Validação de Endereços"]
    }
  ];

  const brazilianTools = [
    // Identificação Pessoal
    {
      name: "CPF",
      description: "Rastreamento completo de CPF com dados pessoais e histórico",
      icon: <CreditCard className="w-6 h-6" />,
      color: "text-green-500",
      features: ["Dados Pessoais", "Histórico Completo", "Endereços", "Verificação de Vivos"],
      modules: ["PROCRED", "LINKTRACKER", "COMPLETA"]
    },
    {
      name: "RG",
      description: "Consulta de documentos de identidade e dados pessoais",
      icon: <FileText className="w-6 h-6" />,
      color: "text-blue-500",
      features: ["Dados do RG", "Validação", "Histórico", "Informações Pessoais"],
      modules: ["RG"]
    },
    {
      name: "CNS",
      description: "Consulta de cartão do Sistema Único de Saúde",
      icon: <Heart className="w-6 h-6" />,
      color: "text-red-500",
      features: ["Dados do SUS", "Histórico Médico", "Validação", "Informações de Saúde"],
      modules: ["SUS"]
    },
    
    // Dados Corporativos
    {
      name: "CNPJ",
      description: "Análise profunda de empresas e dados corporativos brasileiros",
      icon: <Building className="w-6 h-6" />,
      color: "text-purple-500",
      features: ["Dados da Empresa", "Sócios", "Situação Cadastral", "Dados Financeiros"],
      modules: ["EMPRESAS", "RECEITA"]
    },
    {
      name: "Funcionários",
      description: "Busca de funcionários e colaboradores de empresas",
      icon: <Users className="w-6 h-6" />,
      color: "text-orange-500",
      features: ["Lista de Funcionários", "Cargos", "Histórico Empregatício", "Dados de Contato"],
      modules: ["FUNCIONARIOS"]
    },
    {
      name: "Empregos",
      description: "Histórico profissional e registros de trabalho",
      icon: <Briefcase className="w-6 h-6" />,
      color: "text-cyan-500",
      features: ["Histórico Profissional", "Empregadores", "Cargos", "Períodos"],
      modules: ["REGISTRO"]
    },
    
    // Veículos
    {
      name: "Placa",
      description: "Consulta de veículos por placa no sistema DETRAN",
      icon: <Car className="w-6 h-6" />,
      color: "text-yellow-500",
      features: ["Dados do Veículo", "Proprietário", "Multas", "Situação"],
      modules: ["DETRAN", "BASICA"]
    },
    {
      name: "Motor",
      description: "Consulta de veículos por número do motor",
      icon: <Car className="w-6 h-6" />,
      color: "text-indigo-500",
      features: ["Dados do Motor", "Veículo", "Proprietário", "Histórico"],
      modules: ["DETRAN"]
    },
    {
      name: "Chassi",
      description: "Consulta de veículos por número do chassi",
      icon: <Car className="w-6 h-6" />,
      color: "text-pink-500",
      features: ["Dados do Chassi", "Veículo", "Proprietário", "Histórico"],
      modules: ["DETRAN"]
    },
    
    // Localização e Endereços
    {
      name: "CEP",
      description: "Consulta de endereços e habitantes por CEP",
      icon: <MapPin className="w-6 h-6" />,
      color: "text-green-600",
      features: ["Endereço Completo", "Bairro", "Cidade", "Habitantes"],
      modules: ["RECEITA", "HABITANTES"]
    },
    {
      name: "Vizinhos",
      description: "Busca de vizinhos e moradores próximos",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-600",
      features: ["Lista de Vizinhos", "Endereços", "Contatos", "Histórico"],
      modules: ["TRACKER"]
    },
    
    // Comunicação e Contatos
    {
      name: "Email",
      description: "Rastreamento de emails e dados de contato",
      icon: <Mail className="w-6 h-6" />,
      color: "text-purple-600",
      features: ["Dados do Email", "Histórico", "Vazamentos", "Validação"],
      modules: ["TRACKERPRO"]
    },
    {
      name: "Telefone",
      description: "Consulta de números de telefone na ANATEL",
      icon: <Phone className="w-6 h-6" />,
      color: "text-orange-600",
      features: ["Operadora", "DDD", "Tipo de Linha", "Status"],
      modules: ["ANATEL"]
    },
    {
      name: "IP",
      description: "Rastreamento de endereços IP e localização",
      icon: <Wifi className="w-6 h-6" />,
      color: "text-cyan-600",
      features: ["Geolocalização", "ISP", "Histórico", "Dados Técnicos"],
      modules: ["IP"]
    },
    
    // Relacionamentos
    {
      name: "Pai",
      description: "Busca de informações sobre pais e ascendentes",
      icon: <User className="w-6 h-6" />,
      color: "text-green-700",
      features: ["Dados do Pai", "Histórico", "Relacionamento", "Documentos"],
      modules: ["FILHOS", "COMPLETA"]
    },
    {
      name: "Filhos",
      description: "Busca de informações sobre filhos e descendentes",
      icon: <Baby className="w-6 h-6" />,
      color: "text-pink-600",
      features: ["Dados dos Filhos", "Histórico", "Relacionamento", "Documentos"],
      modules: ["FILHOS", "COMPLETA"]
    },
    
    // Pagamentos e Chaves
    {
      name: "Chave PIX",
      description: "Consulta de chaves PIX e dados bancários",
      icon: <Key className="w-6 h-6" />,
      color: "text-yellow-600",
      features: ["Dados da Chave", "Banco", "Tipo de Chave", "Histórico"],
      modules: ["PIX"]
    },
    
    // Segurança e Senhas
    {
      name: "Senhas",
      description: "Consulta de senhas e dados de acesso por CPF/Email",
      icon: <Lock className="w-6 h-6" />,
      color: "text-red-600",
      features: ["Senhas Vazadas", "Emails", "CPFs", "Histórico de Vazamentos"],
      modules: ["CPF", "EMAIL"]
    }
  ];

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
              <Eye className={`w-8 h-8 ${currentTheme.dashboard.text}`} />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${currentTheme.dashboard.text}`}>Visão Divina</h1>
              <p className={currentTheme.dashboard.textSecondary}>Sistema de Inteligência Suprema - O Olho Que Tudo Vê</p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Eye className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${currentTheme.dashboard.textSecondary} w-5 h-5`} />
            <input
              type="text"
              placeholder="Digite um alvo para rastreamento total: CPF, CNPJ, placa, email, telefone, IP..."
              className={`w-full pl-12 pr-4 py-4 ${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl ${currentTheme.dashboard.text} placeholder-${currentTheme.dashboard.textSecondary.replace('text-', '')} focus:outline-none focus:border-gray-600 transition-colors`}
            />
            <button className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} px-6 py-2 rounded-lg hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors border ${currentTheme.dashboard.borders}`}>
              <Target className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Brazilian Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
              <Flag className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>Rastreamento Brasileiro</h2>
              <p className={currentTheme.dashboard.textSecondary}>Ferramentas especializadas para inteligência no território nacional</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brazilianTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
                className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6 hover:border-gray-700 transition-all duration-300 hover:shadow-xl`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={tool.color}>
                    {tool.icon}
                  </div>
                  <h3 className={`text-lg font-semibold ${currentTheme.dashboard.text}`}>{tool.name}</h3>
                </div>
                
                <p className={`text-sm mb-4 ${currentTheme.dashboard.textSecondary}`}>{tool.description}</p>
                
                <div className="space-y-2 mb-4">
                  {tool.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                      <span className={`text-xs ${currentTheme.dashboard.textSecondary}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {tool.modules.map((module, moduleIndex) => (
                      <span key={moduleIndex} className={`px-2 py-1 rounded-full text-xs font-medium ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.textSecondary} border ${currentTheme.dashboard.borders}`}>
                        {module}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className={`w-full py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors flex items-center justify-center gap-2`}>
                  <Zap className="w-4 h-4" />
                  Ativar Rastreamento
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Global Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
              <Globe className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>Rastreamento Global</h2>
              <p className={currentTheme.dashboard.textSecondary}>Ferramentas de inteligência para alvos internacionais</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6 hover:border-gray-700 transition-all duration-300 hover:shadow-xl`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={tool.color}>
                    {tool.icon}
                  </div>
                  <h3 className={`text-xl font-semibold ${currentTheme.dashboard.text}`}>{tool.name}</h3>
                </div>
                
                <p className={`text-sm mb-4 ${currentTheme.dashboard.textSecondary}`}>{tool.description}</p>
                
                <div className="space-y-2">
                  {tool.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                      <span className={`text-xs ${currentTheme.dashboard.textSecondary}`}>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className={`w-full mt-6 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-500')} transition-colors flex items-center justify-center gap-2`}>
                  <Zap className="w-4 h-4" />
                  Ativar Rastreamento
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Searches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`mt-12 ${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}
        >
          <div className="flex items-center gap-3 mb-4">
            <Crown className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
            <h2 className={`text-xl font-semibold ${currentTheme.dashboard.text}`}>Alvos Rastreados Recentemente</h2>
          </div>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
              <div className="flex items-center gap-3">
                <CreditCard className={`w-5 h-5 ${currentTheme.dashboard.text}`} />
                <span className={currentTheme.dashboard.text}>123.456.789-00</span>
              </div>
              <span className={`${currentTheme.dashboard.textSecondary} text-sm`}>30 min atrás</span>
            </div>
            <div className={`flex items-center justify-between p-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
              <div className="flex items-center gap-3">
                <Car className={`w-5 h-5 ${currentTheme.dashboard.text}`} />
                <span className={currentTheme.dashboard.text}>ABC-1234</span>
              </div>
              <span className={`${currentTheme.dashboard.textSecondary} text-sm`}>2 horas atrás</span>
            </div>
            <div className={`flex items-center justify-between p-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
              <div className="flex items-center gap-3">
                <Building className={`w-5 h-5 ${currentTheme.dashboard.text}`} />
                <span className={currentTheme.dashboard.text}>12.345.678/0001-90</span>
              </div>
              <span className={`${currentTheme.dashboard.textSecondary} text-sm`}>5 horas atrás</span>
            </div>
            <div className={`flex items-center justify-between p-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
              <div className="flex items-center gap-3">
                <Mail className={`w-5 h-5 ${currentTheme.dashboard.text}`} />
                <span className={currentTheme.dashboard.text}>usuario@email.com</span>
              </div>
              <span className={`${currentTheme.dashboard.textSecondary} text-sm`}>1 dia atrás</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 