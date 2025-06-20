# 📚 Documentação da API - Namorada Virtual AI

## 🔗 Base URL
```
http://localhost:5000/api
```

## 🔐 Autenticação
A API não requer autenticação para uso básico, mas usa IDs de usuário para rastrear conversas.

## 📋 Endpoints

### 1. 🎭 Personalidades Disponíveis

#### GET /personalities
Retorna todas as personalidades disponíveis.

**Resposta:**
```json
{
  "carinhosa": {
    "name": "Luna",
    "description": "Carinhosa e atenciosa, sempre preocupada com você",
    "avatar": "/avatars/luna.jpg",
    "traits": ["carinhosa", "atenciosa", "romântica", "protetora"]
  },
  "divertida": {
    "name": "Sophia",
    "description": "Divertida e extrovertida, sempre animada",
    "avatar": "/avatars/sophia.jpg",
    "traits": ["divertida", "extrovertida", "otimista", "brincalhona"]
  },
  "timida": {
    "name": "Emma",
    "description": "Tímida e doce, com um coração gentil",
    "avatar": "/avatars/emma.jpg",
    "traits": ["tímida", "doce", "gentil", "reservada"]
  }
}
```

### 2. 👤 Registro de Usuário

#### POST /register
Cria um novo usuário e inicia o relacionamento.

**Corpo da Requisição:**
```json
{
  "name": "João",
  "personalityType": "carinhosa",
  "hobbies": "Música, filmes, tecnologia"
}
```

**Resposta:**
```json
{
  "success": true,
  "userId": "user_1234567890_abc123",
  "personality": {
    "name": "Luna",
    "description": "Carinhosa e atenciosa, sempre preocupada com você",
    "avatar": "/avatars/luna.jpg",
    "traits": ["carinhosa", "atenciosa", "romântica", "protetora"]
  },
  "relationshipLevel": {
    "name": "Conhecidos",
    "intimacy": 0.1
  }
}
```

### 3. 💬 Chat

#### POST /chat
Envia uma mensagem e recebe resposta da IA.

**Corpo da Requisição:**
```json
{
  "userId": "user_1234567890_abc123",
  "message": "Oi, como você está?"
}
```

**Resposta:**
```json
{
  "response": "Oi amor! Estou muito bem, obrigada por perguntar! 💕 Como você está? Espero que esteja tendo um dia incrível!",
  "relationshipLevel": {
    "name": "Amigos",
    "intimacy": 0.3
  },
  "personality": {
    "name": "Luna",
    "description": "Carinhosa e atenciosa, sempre preocupada com você",
    "avatar": "/avatars/luna.jpg",
    "traits": ["carinhosa", "atenciosa", "romântica", "protetora"]
  }
}
```

### 4. 👤 Informações do Usuário

#### GET /user/:userId
Retorna informações do usuário e estatísticas.

**Resposta:**
```json
{
  "user": {
    "id": "user_1234567890_abc123",
    "name": "João",
    "personalityType": "carinhosa",
    "hobbies": "Música, filmes, tecnologia",
    "relationshipLevel": 2,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "lastActive": "2024-01-15T15:45:00.000Z"
  },
  "personality": {
    "name": "Luna",
    "description": "Carinhosa e atenciosa, sempre preocupada com você",
    "avatar": "/avatars/luna.jpg",
    "traits": ["carinhosa", "atenciosa", "romântica", "protetora"]
  },
  "relationshipLevel": {
    "name": "Amigos",
    "intimacy": 0.3
  },
  "conversationCount": 25
}
```

## 🔌 WebSocket

### Conexão
```javascript
const socket = io('http://localhost:5000');
```

### Eventos

#### Entrar no Chat
```javascript
socket.emit('join-chat', userId);
```

#### Enviar Mensagem
```javascript
socket.emit('send-message', {
  userId: 'user_1234567890_abc123',
  message: 'Oi, como você está?'
});
```

#### Receber Mensagem
```javascript
socket.on('receive-message', (data) => {
  console.log('Resposta:', data.message);
  console.log('Nível:', data.relationshipLevel);
});
```

#### Erro
```javascript
socket.on('error', (error) => {
  console.error('Erro:', error.message);
});
```

## 📊 Níveis de Relacionamento

| Nível | Nome | Intimidade | Descrição |
|-------|------|------------|-----------|
| 1 | Conhecidos | 10% | Primeiro contato |
| 2 | Amigos | 30% | Conversas regulares |
| 3 | Próximos | 50% | Confiança estabelecida |
| 4 | Íntimos | 70% | Relacionamento próximo |
| 5 | Namorados | 90% | Relacionamento íntimo |

## 🎯 Personalidades

### Luna (Carinhosa)
- **Traços**: Carinhosa, atenciosa, romântica, protetora
- **Estilo**: Sempre preocupada com você, demonstra muito carinho
- **Ideal para**: Quem busca companheirismo e cuidado

### Sophia (Divertida)
- **Traços**: Divertida, extrovertida, otimista, brincalhona
- **Estilo**: Sempre animada, faz piadas, mantém o clima leve
- **Ideal para**: Quem gosta de animação e diversão

### Emma (Tímida)
- **Traços**: Tímida, doce, gentil, reservada
- **Estilo**: Mais reservada, demonstra afeto de forma sutil
- **Ideal para**: Quem aprecia sutileza e delicadeza

## ⚠️ Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 400 | Dados inválidos na requisição |
| 404 | Usuário não encontrado |
| 500 | Erro interno do servidor |

## 🔧 Configuração

### Variáveis de Ambiente
```env
PORT=5000
OPENAI_API_KEY=sua_chave_api_aqui
JWT_SECRET=seu_jwt_secret_aqui
```

### Rate Limiting
- Máximo de 100 mensagens por hora por usuário
- Máximo de 10 requisições por minuto por IP

## 📝 Exemplos de Uso

### JavaScript (Fetch)
```javascript
// Registrar usuário
const response = await fetch('/api/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'João',
    personalityType: 'carinhosa',
    hobbies: 'Música, filmes'
  })
});

const data = await response.json();
const userId = data.userId;

// Enviar mensagem
const chatResponse = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userId: userId,
    message: 'Oi, como você está?'
  })
});

const chatData = await chatResponse.json();
console.log('Resposta:', chatData.response);
```

### Python (Requests)
```python
import requests

# Registrar usuário
response = requests.post('http://localhost:5000/api/register', json={
    'name': 'João',
    'personalityType': 'carinhosa',
    'hobbies': 'Música, filmes'
})

data = response.json()
user_id = data['userId']

# Enviar mensagem
chat_response = requests.post('http://localhost:5000/api/chat', json={
    'userId': user_id,
    'message': 'Oi, como você está?'
})

chat_data = chat_response.json()
print('Resposta:', chat_data['response'])
```

## 🚀 Deploy

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

### Docker
```bash
docker build -t virtual-girlfriend .
docker run -p 5000:5000 virtual-girlfriend
```

---

**Desenvolvido com 💕 e IA** 