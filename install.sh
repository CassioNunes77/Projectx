#!/bin/bash

echo "💕 Instalando Namorada Virtual AI..."
echo "=================================="

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js 16+ primeiro."
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# Instalar dependências do projeto principal
echo "📦 Instalando dependências do projeto principal..."
npm install

# Instalar dependências do servidor
echo "🔧 Instalando dependências do servidor..."
cd server
npm install
cd ..

# Instalar dependências do cliente
echo "🎨 Instalando dependências do cliente..."
cd client
npm install
cd ..

# Criar arquivo .env se não existir
if [ ! -f "server/.env" ]; then
    echo "⚙️ Criando arquivo de configuração..."
    cp server/env.example server/.env
    echo "📝 Por favor, edite o arquivo server/.env e adicione sua chave da API OpenAI"
fi

echo ""
echo "🎉 Instalação concluída!"
echo ""
echo "📋 Próximos passos:"
echo "1. Edite o arquivo server/.env e adicione sua chave da API OpenAI"
echo "2. Execute: npm run dev"
echo "3. Acesse: http://localhost:3000"
echo ""
echo "💡 Para obter uma chave da API OpenAI:"
echo "   - Acesse: https://platform.openai.com/"
echo "   - Crie uma conta e vá para 'API Keys'"
echo "   - Crie uma nova chave e adicione ao arquivo .env"
echo ""
echo "🚀 Boa sorte com sua namorada virtual! 💕" 