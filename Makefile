.PHONY: help install dev build test lint clean deploy docker-build docker-run

# Variáveis
APP_NAME = virtual-girlfriend-ai
DOCKER_IMAGE = $(APP_NAME):latest
DOCKER_CONTAINER = $(APP_NAME)-container

# Cores para output
RED = \033[0;31m
GREEN = \033[0;32m
YELLOW = \033[1;33m
BLUE = \033[0;34m
NC = \033[0m # No Color

help: ## Mostra esta ajuda
	@echo "$(BLUE)Comandos disponíveis:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2}'

install: ## Instala todas as dependências
	@echo "$(YELLOW)Instalando dependências...$(NC)"
	@npm install
	@cd server && npm install
	@cd client && npm install
	@echo "$(GREEN)Dependências instaladas com sucesso!$(NC)"

dev: ## Inicia o ambiente de desenvolvimento
	@echo "$(YELLOW)Iniciando ambiente de desenvolvimento...$(NC)"
	@npm run dev

build: ## Faz o build da aplicação
	@echo "$(YELLOW)Fazendo build da aplicação...$(NC)"
	@cd client && npm run build
	@echo "$(GREEN)Build concluído!$(NC)"

test: ## Executa os testes
	@echo "$(YELLOW)Executando testes...$(NC)"
	@cd server && npm test
	@echo "$(GREEN)Testes concluídos!$(NC)"

test-watch: ## Executa os testes em modo watch
	@echo "$(YELLOW)Executando testes em modo watch...$(NC)"
	@cd server && npm run test:watch

lint: ## Executa o linter
	@echo "$(YELLOW)Executando linter...$(NC)"
	@cd client && npm run lint
	@echo "$(GREEN)Linter concluído!$(NC)"

lint-fix: ## Corrige problemas do linter
	@echo "$(YELLOW)Corrigindo problemas do linter...$(NC)"
	@cd client && npm run lint:fix
	@echo "$(GREEN)Linter corrigido!$(NC)"

clean: ## Limpa arquivos temporários
	@echo "$(YELLOW)Limpando arquivos temporários...$(NC)"
	@rm -rf node_modules
	@rm -rf server/node_modules
	@rm -rf client/node_modules
	@rm -rf client/build
	@rm -rf .nyc_output
	@rm -rf coverage
	@echo "$(GREEN)Limpeza concluída!$(NC)"

deploy: ## Faz deploy da aplicação
	@echo "$(YELLOW)Fazendo deploy...$(NC)"
	@./deploy.sh
	@echo "$(GREEN)Deploy concluído!$(NC)"

docker-build: ## Constrói a imagem Docker
	@echo "$(YELLOW)Construindo imagem Docker...$(NC)"
	@docker build -t $(DOCKER_IMAGE) .
	@echo "$(GREEN)Imagem Docker construída!$(NC)"

docker-run: ## Executa o container Docker
	@echo "$(YELLOW)Executando container Docker...$(NC)"
	@docker run -d --name $(DOCKER_CONTAINER) -p 5000:5000 $(DOCKER_IMAGE)
	@echo "$(GREEN)Container Docker executando!$(NC)"

docker-stop: ## Para o container Docker
	@echo "$(YELLOW)Parando container Docker...$(NC)"
	@docker stop $(DOCKER_CONTAINER) || true
	@docker rm $(DOCKER_CONTAINER) || true
	@echo "$(GREEN)Container Docker parado!$(NC)"

docker-clean: ## Remove imagens Docker
	@echo "$(YELLOW)Removendo imagens Docker...$(NC)"
	@docker rmi $(DOCKER_IMAGE) || true
	@echo "$(GREEN)Imagens Docker removidas!$(NC)"

setup: ## Configura o ambiente inicial
	@echo "$(YELLOW)Configurando ambiente inicial...$(NC)"
	@cp server/env.example server/.env
	@echo "$(GREEN)Ambiente configurado!$(NC)"
	@echo "$(YELLOW)Edite o arquivo server/.env com suas configurações$(NC)"

start: ## Inicia a aplicação em produção
	@echo "$(YELLOW)Iniciando aplicação em produção...$(NC)"
	@npm run start:prod

logs: ## Mostra os logs da aplicação
	@echo "$(YELLOW)Mostrando logs...$(NC)"
	@pm2 logs $(APP_NAME)

status: ## Mostra o status da aplicação
	@echo "$(YELLOW)Status da aplicação:$(NC)"
	@pm2 status

restart: ## Reinicia a aplicação
	@echo "$(YELLOW)Reiniciando aplicação...$(NC)"
	@pm2 restart $(APP_NAME)

stop: ## Para a aplicação
	@echo "$(YELLOW)Parando aplicação...$(NC)"
	@pm2 stop $(APP_NAME)

backup: ## Faz backup dos dados
	@echo "$(YELLOW)Fazendo backup...$(NC)"
	@mkdir -p backups
	@cp -r server/data backups/$(shell date +%Y%m%d_%H%M%S)
	@echo "$(GREEN)Backup concluído!$(NC)"

update: ## Atualiza a aplicação
	@echo "$(YELLOW)Atualizando aplicação...$(NC)"
	@git pull origin main
	@make install
	@make build
	@make restart
	@echo "$(GREEN)Aplicação atualizada!$(NC)"

security-check: ## Verifica vulnerabilidades de segurança
	@echo "$(YELLOW)Verificando vulnerabilidades...$(NC)"
	@npm audit
	@cd server && npm audit
	@cd client && npm audit
	@echo "$(GREEN)Verificação de segurança concluída!$(NC)"

format: ## Formata o código
	@echo "$(YELLOW)Formatando código...$(NC)"
	@npx prettier --write "**/*.{js,jsx,ts,tsx,json,css,md}"
	@echo "$(GREEN)Código formatado!$(NC)"

check: ## Executa todas as verificações
	@echo "$(YELLOW)Executando verificações...$(NC)"
	@make lint
	@make test
	@make security-check
	@echo "$(GREEN)Todas as verificações concluídas!$(NC)" 