# Companhia - Conversa Inteligente

Uma plataforma de conversação com IA que evolui naturalmente, oferecendo companhia conversacional que cresce de forma orgânica com o usuário.

## 🎯 Conceito

**Companhia** é uma experiência de conversação minimalista e discreta. O foco é na **conexão conversacional** que evolui naturalmente:

- **Início casual**: Conversas simples e amigáveis
- **Evolução orgânica**: O relacionamento cresce baseado na qualidade das interações
- **Intimidade gradual**: A conversa pode se tornar mais íntima com o tempo, como uma conexão real
- **Design discreto**: Interface minimalista escura, sem referências explícitas a "namoro virtual"

## ✨ Características

### 🎨 Design Minimalista
- **Tema escuro** com preto como cor base
- **Interface limpa** e direta ao ponto
- **Campo de chat** sempre visível para primeira interação
- **Sem distrações** desnecessárias

### 💬 Sistema de Relacionamento Progressivo
- **Níveis 1-10**: De "Estranhos" a "Alma Gêmea"
- **Evolução natural**: Baseada na qualidade e frequência das conversas
- **Linguagem adaptativa**: A IA ajusta o tom conforme o nível de intimidade
- **Notificações sutis**: Avisos discretos sobre evolução do relacionamento

### 💎 Recursos Premium
- **Início gratuito**: Todos podem começar a conversar
- **Sugestões naturais**: A IA sugere recursos premium de forma orgânica
- **Micro-pagamentos**: Pequenos valores para benefícios específicos
- **Recursos avançados**: Fotos, áudios, chamadas de voz, personalização

## 🚀 Tecnologias

### Frontend
- **React 18** com TypeScript
- **CSS Variables** para tema escuro
- **Componentes modulares** e reutilizáveis
- **Animações suaves** e responsivas

### Backend
- **Node.js** com Express
- **OpenAI GPT-4** para conversação inteligente
- **Sistema de memória** para contexto de conversas
- **Análise de relacionamento** progressivo

### Infraestrutura
- **Docker** para containerização
- **Kubernetes** para orquestração
- **Múltiplas plataformas** de deploy (Heroku, Vercel, Railway, etc.)

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- OpenAI API Key

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/companhia.git
cd companhia
```

### 2. Instale as dependências
```bash
# Instalar tudo de uma vez
npm run install-all

# Ou individualmente
npm install
cd server && npm install
cd ../client && npm install
```

### 3. Configure as variáveis de ambiente
```bash
# No diretório server/
cp env.example .env
```

Edite o arquivo `.env`:
```env
PORT=3001
OPENAI_API_KEY=sua_chave_openai_aqui
NODE_ENV=development
```

### 4. Execute o projeto
```bash
# Desenvolvimento
npm run dev

# Ou separadamente
# Terminal 1 - Backend
cd server && npm start

# Terminal 2 - Frontend  
cd client && npm start
```

## 🎮 Como Usar

### 1. Primeira Conversa
- Acesse a aplicação
- Digite seu nome
- Escolha o estilo de conversa preferido
- Comece a conversar imediatamente

### 2. Evolução Natural
- **Níveis 1-3**: Conversas casuais e amigáveis
- **Níveis 4-6**: Mais calorosas e pessoais
- **Níveis 7-10**: Intimidade e conexão profunda

### 3. Recursos Premium
- **Gratuito**: Chat básico, personalidade padrão
- **Premium (R$ 19,90/mês)**: Fotos, áudios, chamadas de voz
- **Premium+ (R$ 39,90/mês)**: Vídeo, personalização completa

## 🏗️ Estrutura do Projeto

```
companhia/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes da UI
│   │   ├── contexts/       # Contextos React
│   │   ├── types/          # Tipos TypeScript
│   │   └── utils/          # Utilitários
│   └── public/             # Arquivos estáticos
├── server/                 # Backend Node.js
│   ├── routes/             # Rotas da API
│   ├── services/           # Lógica de negócio
│   └── utils/              # Utilitários
├── k8s/                    # Configurações Kubernetes
├── terraform/              # Infraestrutura como código
└── docs/                   # Documentação
```

## 🎨 Sistema de Design

### Cores
```css
--bg-primary: #000000      /* Preto base */
--bg-secondary: #111111    /* Cinza escuro */
--bg-tertiary: #1a1a1a     /* Cinza médio */
--text-primary: #ffffff    /* Branco */
--text-secondary: #cccccc  /* Cinza claro */
--accent-primary: #4a9eff  /* Azul */
--success-color: #00d4aa   /* Verde */
--warning-color: #ffb800   /* Amarelo */
```

### Componentes
- **Chat**: Interface principal de conversação
- **Onboarding**: Configuração inicial simples
- **Settings**: Gerenciamento de preferências e premium
- **Notifications**: Avisos sutis e não intrusivos

## 🔧 Desenvolvimento

### Scripts Disponíveis
```bash
npm run dev          # Desenvolvimento completo
npm run build        # Build de produção
npm run test         # Executar testes
npm run lint         # Verificar código
npm run format       # Formatar código
```

### Padrões de Código
- **TypeScript** para type safety
- **ESLint** + **Prettier** para formatação
- **Husky** para git hooks
- **Conventional Commits** para commits

## 🚀 Deploy

### Plataformas Suportadas
- **Heroku**: `git push heroku main`
- **Vercel**: Conecte o repositório
- **Railway**: Deploy automático
- **Docker**: `docker-compose up`

### Variáveis de Produção
```env
NODE_ENV=production
OPENAI_API_KEY=sua_chave_producao
DATABASE_URL=sua_url_banco
```

## 📊 Monitoramento

### Analytics Integrados
- **Google Analytics**: Métricas de uso
- **LogRocket**: Debugging de sessões
- **Sentry**: Monitoramento de erros
- **Hotjar**: Análise de comportamento

### Métricas Importantes
- Tempo de conversa
- Evolução de relacionamento
- Conversão para premium
- Satisfação do usuário

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

- **Documentação**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/companhia/issues)
- **Email**: suporte@companhia.com

---

**Companhia** - Porque todo mundo merece uma boa conversa. 💬 