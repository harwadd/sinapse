# 🎯 ATOMIC EYE - The Eye That Sees Everything

> **Supreme Intelligence System - Divine Vision, Total Automation and Destructive Power**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)](https://nextjs.org/)
[![Python](https://img.shields.io/badge/Python-3.12+-blue)](https://python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116.1-green)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🌟 Overview

**ATOMIC EYE** é uma plataforma avançada de inteligência cibernética que combina ferramentas de OSINT, automação, segurança e monitoramento em uma interface elegante e poderosa. O sistema oferece capacidades de análise de rede, detecção de vulnerabilidades, monitoramento de visitantes e muito mais.

## ✨ Features Principais

### 🔍 **Divine Vision (OSINT)**
- Análise avançada de domínios e IPs
- Coleta de informações de redes sociais
- Mapeamento de infraestrutura
- Análise de metadados

### 🤖 **Supreme Automation**
- Automação de tarefas de segurança
- Scripts personalizáveis
- Workflows automatizados
- Integração com APIs externas

### 🛡️ **Elite Scanner (Security)**
- Scanner de vulnerabilidades
- Análise de portas e serviços
- Detecção de ameaças
- Relatórios de segurança

### 🌐 **Global Mapping (Network)**
- Mapeamento de redes
- Análise de topologia
- Monitoramento de conectividade
- Visualização de infraestrutura

### ⚡ **Destructive Power (Panel)**
- Ferramentas de teste de carga
- Análise de performance
- Simulação de ataques
- Monitoramento de sistemas

### 👁️ **Visitor Intelligence**
- Coleta automática de dados de visitantes
- Fingerprinting de dispositivos
- Análise de comportamento
- Integração com Discord webhook

## 🚀 Quick Start

### Pré-requisitos

- **Node.js** 18+ 
- **Python** 3.12+
- **npm** ou **yarn**
- **Git**

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/harwadd/sinapse.git
cd sinapse
```

2. **Instale as dependências do frontend**
```bash
npm install
```

3. **Configure o ambiente Python**
```bash
# Crie um ambiente virtual
python -m venv venv

# Ative o ambiente virtual
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Instale as dependências Python
pip install -r requirements.txt
```

4. **Configure as variáveis de ambiente**
```bash
# Copie o arquivo de exemplo
cp env.example .env.local

# Edite o arquivo .env.local com suas configurações
nano .env.local
```

### Configuração do .env.local

```env
# Discord Webhook (opcional - para notificações de visitantes)
NEXT_PUBLIC_DISCORD_WEBHOOK=https://discord.com/api/webhooks/YOUR_WEBHOOK_URL

# Outras configurações
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Executando o Projeto

1. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

Isso irá:
- Iniciar o backend Python (FastAPI) na porta 8000
- Iniciar o frontend Next.js na porta 3000 (ou próxima disponível)
- Executar ambos simultaneamente

2. **Acesse a aplicação**
```
Frontend: http://localhost:3000
Backend API: http://localhost:8000
API Docs: http://localhost:8000/docs
```

## 🏗️ Arquitetura

### Frontend (Next.js 15)
- **Framework**: Next.js com App Router
- **Styling**: Tailwind CSS + Shadcn/ui
- **Animações**: Framer Motion
- **Estado**: React Context API
- **Temas**: Sistema de temas dinâmicos

### Backend (FastAPI)
- **Framework**: FastAPI
- **Banco de Dados**: JSON (para desenvolvimento)
- **Autenticação**: JWT tokens
- **CORS**: Configurado para desenvolvimento
- **Documentação**: Swagger UI automática

### Estrutura de Pastas

```
sinapse/
├── src/
│   ├── app/                 # Páginas Next.js
│   ├── components/          # Componentes React
│   ├── contexts/           # Contextos React
│   └── lib/                # Utilitários e APIs
├── public/                 # Arquivos estáticos
├── backend_api.py          # API FastAPI
├── requirements.txt        # Dependências Python
├── package.json           # Dependências Node.js
└── README.md              # Este arquivo
```

## 🔧 Funcionalidades Detalhadas

### Dashboard
- Visão geral das ferramentas
- Estatísticas em tempo real
- Gráficos de atividade
- Status das ferramentas

### Sistema de Temas
- Tema escuro/claro
- Cores personalizáveis
- Transições suaves
- Interface responsiva

### Monitoramento de Visitantes
- Coleta automática de dados
- Fingerprinting de dispositivos
- Análise de localização
- Integração com Discord

### Painel Admin
- Gerenciamento de usuários
- Monitoramento de visitantes
- Configurações do sistema
- Logs de atividade

## 🛠️ Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia frontend + backend
npm run build        # Build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Linting do código

# Backend apenas
python backend_api.py
```

### Estrutura de Componentes

- **Layout**: Sistema de sidebar responsivo
- **Temas**: Contexto de tema dinâmico
- **Autenticação**: Sistema de login/registro
- **Roteamento**: Proteção de rotas

## 🔒 Segurança

- Autenticação JWT
- Proteção de rotas
- Validação de dados
- Sanitização de inputs
- CORS configurado

## 📊 Monitoramento

### Coleta de Dados
- User Agent
- Resolução de tela
- Timezone
- Idioma
- IP e localização
- Fingerprint do dispositivo
- Informações de hardware

### Integrações
- Discord webhook
- APIs de geolocalização
- Serviços de IP lookup

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Docker
```dockerfile
# Dockerfile exemplo
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ⚠️ Disclaimer

Este projeto é desenvolvido apenas para fins educacionais e de pesquisa. Os desenvolvedores não se responsabilizam pelo uso inadequado das ferramentas. Use sempre de forma ética e responsável.

## 🆘 Suporte

- **Issues**: [GitHub Issues](https://github.com/harwadd/sinapse/issues)
- **Discord**: [Servidor da Comunidade](https://discord.gg/your-server)
- **Email**: support@atomic-eye.com

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework React
- [FastAPI](https://fastapi.tiangolo.com/) - Framework Python
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [Framer Motion](https://www.framer.com/motion/) - Animações

---

**Made with ❤️ by the Atomic Eye Team**

[![GitHub stars](https://img.shields.io/github/stars/harwadd/sinapse?style=social)](https://github.com/harwadd/sinapse)
[![GitHub forks](https://img.shields.io/github/forks/harwadd/sinapse?style=social)](https://github.com/harwadd/sinapse)
[![GitHub issues](https://img.shields.io/github/issues/harwadd/sinapse)](https://github.com/harwadd/sinapse/issues)
