"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Bot, 
  Shield, 
  Zap, 
  Clock, 
  Star, 
  Server, 
  Database,
  Network,
  Eye,
  Terminal,
  Key
} from "lucide-react";

const plans = [
  {
    id: "basic",
    title: "Básico",
    price: "R$ 29,90",
    period: "/mês",
    features: [
      { icon: <Search size={16} />, label: "5 ferramentas OSINT" },
      { icon: <Bot size={16} />, label: "2 automações básicas" },
      { icon: <Shield size={16} />, label: "Scanner básico" },
      { icon: <Clock size={16} />, label: "Suporte 8/5" },
      { icon: <Database size={16} />, label: "API Limitada", included: false },
      { icon: <Network size={16} />, label: "Proxies Básicos", included: false },
    ],
    popular: false
  },
  {
    id: "professional",
    title: "Profissional",
    price: "R$ 79,90",
    period: "/mês",
    features: [
      { icon: <Search size={16} />, label: "15 ferramentas OSINT" },
      { icon: <Bot size={16} />, label: "10 automações" },
      { icon: <Shield size={16} />, label: "Scanner avançado" },
      { icon: <Clock size={16} />, label: "Suporte 24/7" },
      { icon: <Database size={16} />, label: "API Completa" },
      { icon: <Network size={16} />, label: "Proxies Premium" },
    ],
    popular: true
  },
  {
    id: "enterprise",
    title: "Enterprise",
    price: "R$ 199,90",
    period: "/mês",
    features: [
      { icon: <Search size={16} />, label: "Todas as ferramentas OSINT" },
      { icon: <Bot size={16} />, label: "Automações ilimitadas" },
      { icon: <Shield size={16} />, label: "Scanner completo" },
      { icon: <Clock size={16} />, label: "Suporte prioritário" },
      { icon: <Database size={16} />, label: "API Ilimitada" },
      { icon: <Network size={16} />, label: "Proxies dedicados" },
    ],
    popular: false
  },
];

export function PriceSection() {
  const router = useRouter();

  const handlePlanSelect = (planId: string) => {
    router.push(`/checkout?plan=${planId}`);
  };

  return (
    <section
      id="section-plan"
      className="w-full max-w-6xl mx-auto py-16 px-4 md:px-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
      >
        <span className="text-white">Escolha seu</span>{" "}
        <span className="text-white">Plano</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            className={`relative bg-gray-900 border shadow-lg p-8 rounded-xl text-center hover:shadow-xl transition-all duration-300 ${
              plan.popular 
                ? "border-gray-600 scale-105" 
                : "border-gray-800 hover:border-gray-700"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm font-semibold border border-gray-700">
                  Mais Popular
                </span>
              </div>
            )}
            
            <h3 className="text-2xl font-bold text-white mb-4">{plan.title}</h3>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-white">{plan.price}</span>
              <span className="text-gray-400">{plan.period}</span>
            </div>
            
            <ul className="space-y-4 text-sm text-gray-300 mb-8">
              {plan.features.map((f, i) => {
                const isIncluded = f.included !== false;
                return (
                  <li key={i} className={`flex items-center gap-3 ${
                    isIncluded ? "text-gray-300" : "text-gray-500 line-through"
                  }`}>
                    <div className={`flex-shrink-0 ${isIncluded ? "text-white" : "text-gray-500"}`}>
                      {f.icon}
                    </div>
                    <span>{f.label}</span>
                  </li>
                );
              })}
            </ul>
            
            <button 
              onClick={() => handlePlanSelect(plan.id)}
              className={`w-full font-semibold py-3 rounded-lg transition-all duration-300 ${
                plan.popular
                  ? "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700"
                  : "bg-transparent border-2 border-gray-600 text-white hover:bg-gray-800 hover:text-white"
              }`}
            >
              {plan.popular ? "Começar Agora" : "Escolher Plano"}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
