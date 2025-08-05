"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Eye, 
  CreditCard, 
  Lock, 
  CheckCircle, 
  ArrowLeft, 
  Shield, 
  Zap, 
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface Plan {
  id: string;
  title: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
}

const plans: Plan[] = [
  {
    id: "basic",
    title: "Básico",
    price: "R$ 29,90",
    period: "/mês",
    features: [
      "5 ferramentas OSINT",
      "2 automações básicas", 
      "Scanner básico",
      "Suporte 8/5"
    ],
    popular: false
  },
  {
    id: "professional",
    title: "Profissional",
    price: "R$ 79,90",
    period: "/mês",
    features: [
      "15 ferramentas OSINT",
      "10 automações",
      "Scanner avançado",
      "Suporte 24/7",
      "API Completa",
      "Proxies Premium"
    ],
    popular: true
  },
  {
    id: "enterprise",
    title: "Enterprise",
    price: "R$ 199,90",
    period: "/mês",
    features: [
      "Todas as ferramentas OSINT",
      "Automações ilimitadas",
      "Scanner completo",
      "Suporte prioritário",
      "API Ilimitada",
      "Proxies dedicados"
    ],
    popular: false
  }
];

export default function CheckoutPage() {
  const { currentTheme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') || 'professional';
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const selectedPlan = plans.find(plan => plan.id === planId) || plans[1];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simular processamento de pagamento
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Redirecionar para dashboard após sucesso
    router.push('/dashboard?welcome=true');
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <div className={`min-h-screen ${currentTheme.dashboard.background}`}>
      <div className="max-w-6xl mx-auto p-6">
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
              <Eye className={`w-8 h-8 ${currentTheme.dashboard.text}`} />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${currentTheme.dashboard.text}`}>Checkout Elite</h1>
              <p className={currentTheme.dashboard.textSecondary}>Acesso total ao ATOMIC EYE - O Olho Que Tudo Vê</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário de Pagamento */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}
          >
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
              <h2 className={`text-xl font-semibold ${currentTheme.dashboard.text}`}>Informações de Pagamento</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Método de Pagamento */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${currentTheme.dashboard.textSecondary}`}>
                  Método de Pagamento
                </label>
                <div className="flex gap-4">
                  <label className={`flex items-center gap-2 cursor-pointer ${currentTheme.dashboard.text}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit"
                      checked={paymentMethod === 'credit'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <CreditCard className="w-5 h-5" />
                    Cartão de Crédito
                  </label>
                  <label className={`flex items-center gap-2 cursor-pointer ${currentTheme.dashboard.text}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pix"
                      checked={paymentMethod === 'pix'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <Shield className="w-5 h-5" />
                    PIX
                  </label>
                </div>
              </div>

              {/* Dados Pessoais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${currentTheme.dashboard.textSecondary}`}>
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}
                      placeholder="Seu nome completo"
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${currentTheme.dashboard.textSecondary}`}>
                    Email
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${currentTheme.dashboard.textSecondary}`}>
                  Telefone
                </label>
                <div className="relative">
                  <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={`w-full pl-10 pr-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              {/* Dados do Cartão */}
              {paymentMethod === 'credit' && (
                <>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${currentTheme.dashboard.textSecondary}`}>
                      Número do Cartão
                    </label>
                    <div className="relative">
                      <CreditCard className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                        required
                        maxLength={19}
                        className={`w-full pl-10 pr-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${currentTheme.dashboard.textSecondary}`}>
                        Validade
                      </label>
                      <div className="relative">
                        <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          required
                          maxLength={5}
                          className={`w-full pl-10 pr-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}
                          placeholder="MM/AA"
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${currentTheme.dashboard.textSecondary}`}>
                        CVV
                      </label>
                      <div className="relative">
                        <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                        <input
                          type="text"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          required
                          maxLength={4}
                          className={`w-full pl-10 pr-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Endereço */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${currentTheme.dashboard.textSecondary}`}>
                  Endereço
                </label>
                <div className="relative">
                  <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.dashboard.textSecondary}`} />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className={`w-full pl-10 pr-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}
                    placeholder="Rua, número, complemento"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${currentTheme.dashboard.textSecondary}`}>
                    Cidade
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}
                    placeholder="São Paulo"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${currentTheme.dashboard.textSecondary}`}>
                    Estado
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}
                    placeholder="SP"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${currentTheme.dashboard.textSecondary}`}>
                    CEP
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg ${currentTheme.dashboard.text} focus:outline-none focus:border-gray-600`}
                    placeholder="00000-000"
                  />
                </div>
              </div>

              {/* Botão de Pagamento */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  isProcessing
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:scale-105'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Clock className="w-5 h-5 animate-spin" />
                    Processando Pagamento...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Finalizar Compra - {selectedPlan.price}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Resumo do Plano */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Plano Selecionado */}
            <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}>
              <div className="flex items-center gap-3 mb-4">
                <Zap className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
                <h2 className={`text-xl font-semibold ${currentTheme.dashboard.text}`}>Plano Selecionado</h2>
              </div>
              
              <div className={`p-4 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg border ${currentTheme.dashboard.borders}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-lg font-semibold ${currentTheme.dashboard.text}`}>{selectedPlan.title}</h3>
                  {selectedPlan.popular && (
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">Popular</span>
                  )}
                </div>
                <div className="mb-4">
                  <span className={`text-2xl font-bold ${currentTheme.dashboard.text}`}>{selectedPlan.price}</span>
                  <span className={currentTheme.dashboard.textSecondary}>{selectedPlan.period}</span>
                </div>
                <ul className="space-y-2">
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className={`text-sm ${currentTheme.dashboard.textSecondary}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Segurança */}
            <div className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-xl p-6`}>
              <div className="flex items-center gap-3 mb-4">
                <Shield className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
                <h2 className={`text-xl font-semibold ${currentTheme.dashboard.text}`}>Segurança Garantida</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Pagamento 100% seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Dados criptografados</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Cancelamento a qualquer momento</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className={`text-sm ${currentTheme.dashboard.textSecondary}`}>Suporte 24/7 incluído</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 