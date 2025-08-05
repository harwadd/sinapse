"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Bot, Shield, Network, Database, Terminal, Eye, Zap } from "lucide-react";

const osintTools = [
  { name: "Email OSINT", description: "Coleta de informações de emails e domínios" },
  { name: "Social Media", description: "Análise de perfis em redes sociais" },
  { name: "Phone Lookup", description: "Busca de informações por número de telefone" },
  { name: "Domain Intel", description: "Inteligência sobre domínios e DNS" },
  { name: "Image Analysis", description: "Análise de metadados de imagens" },
  { name: "Username Search", description: "Busca de usernames em múltiplas plataformas" },
  { name: "IP Geolocation", description: "Localização geográfica de IPs" },
  { name: "Company Intel", description: "Informações sobre empresas e organizações" },
];

const automationTools = [
  { name: "Web Scraping", description: "Automação de coleta de dados web" },
  { name: "API Testing", description: "Testes automatizados de APIs" },
  { name: "Vulnerability Scanner", description: "Scanner automático de vulnerabilidades" },
  { name: "Password Cracker", description: "Ferramentas de quebra de senhas" },
  { name: "Network Mapper", description: "Mapeamento automático de redes" },
  { name: "Port Scanner", description: "Scanner de portas automatizado" },
  { name: "SSL Checker", description: "Verificação automática de certificados SSL" },
  { name: "Backup Tools", description: "Ferramentas de backup automatizado" },
];

const securityTools = [
  { name: "Penetration Testing", description: "Ferramentas de teste de penetração" },
  { name: "Forensics", description: "Análise forense digital" },
  { name: "Malware Analysis", description: "Análise de malware e vírus" },
  { name: "Network Security", description: "Ferramentas de segurança de rede" },
  { name: "Web Security", description: "Testes de segurança web" },
  { name: "Mobile Security", description: "Análise de segurança mobile" },
  { name: "Wireless Security", description: "Testes de segurança wireless" },
  { name: "Cryptography", description: "Ferramentas de criptografia" },
];

export function MethodsSection() {
  const [selectedCategory, setSelectedCategory] = useState<"OSINT" | "AUTOMATION" | "SECURITY">("OSINT");

  const getTools = () => {
    switch (selectedCategory) {
      case "OSINT":
        return osintTools;
      case "AUTOMATION":
        return automationTools;
      case "SECURITY":
        return securityTools;
      default:
        return osintTools;
    }
  };

  const getIcon = () => {
    switch (selectedCategory) {
      case "OSINT":
        return Search;
      case "AUTOMATION":
        return Bot;
      case "SECURITY":
        return Shield;
      default:
        return Search;
    }
  };

  const tools = getTools();
  const IconComponent = getIcon();

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 md:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-10 text-center"
      >
        <span className="text-white">Categorias de</span>{" "}
        <span className="text-white">Ferramentas</span>
      </motion.h2>

      <div className="flex justify-center gap-4 mb-8">
        {(["OSINT", "AUTOMATION", "SECURITY"] as const).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-lg font-semibold border-2 transition-all ${selectedCategory === category
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-transparent text-gray-300 border-gray-700 hover:border-gray-600 hover:text-white"
              }`}
          >
            {category === "OSINT" ? "OSINT" : category === "AUTOMATION" ? "Automações" : "Segurança"}
          </button>
        ))}
      </div>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tools.map((tool: { name: string; description: string }, idx: number) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex items-start gap-3 hover:border-gray-700 transition-colors"
            >
              <IconComponent className="text-white mt-1" size={20} />
              <div>
                <h4 className="font-bold text-white mb-1">{tool.name}</h4>
                <p className="text-sm text-gray-400">{tool.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-gray-400">
          Esta é apenas uma prévia — muitas mais ferramentas avançadas estão disponíveis na plataforma.
        </p>
      </div>
    </section>
  );
}
