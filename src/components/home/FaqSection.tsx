"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const faqs = [
  {
    question: "O que é a plataforma CyberTools?",
    answer:
      "CyberTools é uma plataforma completa de ferramentas de segurança cibernética que inclui OSINT, automações, stress testing, username checkers e proxies. É projetada para hackers éticos, pesquisadores de segurança e profissionais de TI.",
  },
  {
    question: "As ferramentas são legais para usar?",
    answer:
      "Sim, todas as ferramentas são projetadas para uso ético e legal. Recomendamos fortemente que você use apenas em sistemas que você possui ou tem permissão explícita para testar. Uso não autorizado é ilegal.",
  },
  {
    question: "Quais métodos de pagamento são aceitos?",
    answer:
      "Aceitamos uma ampla gama de métodos de pagamento incluindo PIX, cartão de crédito, criptomoedas e outras opções seguras para sua privacidade.",
  },
  {
    question: "Posso usar as ferramentas para fins educacionais?",
    answer:
      "Absolutamente! Nossa plataforma é ideal para fins educacionais, pesquisa de segurança e desenvolvimento de habilidades em cibersegurança. Oferecemos descontos especiais para estudantes e instituições educacionais.",
  },
  {
    question: "Há suporte técnico disponível?",
    answer:
      "Sim, oferecemos suporte técnico 24/7 para todos os planos. Nossa equipe de especialistas está sempre disponível para ajudar com qualquer dúvida ou problema técnico.",
  },
  {
    question: "As ferramentas são atualizadas regularmente?",
    answer:
      "Sim, nossa equipe de desenvolvimento trabalha constantemente para atualizar e melhorar todas as ferramentas. Novas funcionalidades são adicionadas regularmente para manter a plataforma na vanguarda da tecnologia.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { currentTheme } = useTheme();

  return (
    <section id="section-faq" className="w-full max-w-4xl mx-auto py-16 px-4 md:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-10 text-center"
      >
        <span className={currentTheme.dashboard.text}>Perguntas</span>{" "}
        <span className={currentTheme.dashboard.text}>Frequentes</span>
      </motion.h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className={`${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} rounded-lg overflow-hidden`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`w-full flex justify-between items-center px-4 py-4 text-left ${currentTheme.dashboard.text} font-semibold hover:${currentTheme.dashboard.textSecondary} transition`}
              >
                {faq.question}
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${isOpen ? `rotate-180 ${currentTheme.dashboard.text}` : currentTheme.dashboard.textSecondary}`}
                />
              </button>
              {isOpen && (
                <div className={`px-4 pb-4 text-sm ${currentTheme.dashboard.textSecondary}`}>
                  {faq.answer}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
