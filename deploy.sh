#!/bin/bash

echo "🚀 Deployando Namorada Virtual AI..."
echo "=================================="

# Verificar se estamos no branch correto
if [ "$(git branch --show-current)" != "main" ]; then
    echo "❌ Você deve estar no branch main para fazer deploy"
    exit 1
fi

# Verificar se há mudanças não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Há mudanças não commitadas. Faça commit antes do deploy."
    exit 1
fi

# Verificar se o arquivo .env existe
if [ ! -f "server/.env" ]; then
    echo "❌ Arquivo server/.env não encontrado. Configure as variáveis de ambiente."
    exit 1
fi

# Instalar dependências
echo "📦 Instalando dependências..."
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..

# Build do cliente
echo "🔨 Fazendo build do cliente..."
cd client
npm run build
cd ..

# Verificar se o build foi bem-sucedido
if [ ! -d "client/build" ]; then
    echo "❌ Build falhou. Verifique os erros."
    exit 1
fi

# Parar o processo atual se estiver rodando
echo "🛑 Parando processo atual..."
pm2 stop virtual-girlfriend-server 2>/dev/null || true

# Iniciar com PM2
echo "▶️ Iniciando aplicação..."
pm2 start ecosystem.config.js --env production

# Salvar configuração do PM2
pm2 save

# Verificar status
echo "📊 Status da aplicação:"
pm2 status

echo ""
echo "🎉 Deploy concluído!"
echo "🌐 Aplicação disponível em: http://localhost:5000"
echo ""
echo "📋 Comandos úteis:"
echo "  pm2 logs virtual-girlfriend-server    # Ver logs"
echo "  pm2 restart virtual-girlfriend-server # Reiniciar"
echo "  pm2 stop virtual-girlfriend-server    # Parar"
echo "" 