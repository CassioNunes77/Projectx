const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const OpenAI = require('openai');
const cron = require('node-cron');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Configuração OpenAI com fallback para desenvolvimento
let openai;
try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} catch (error) {
  console.warn('⚠️  OpenAI API Key não configurada. Usando respostas simuladas para desenvolvimento.');
  openai = null;
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Armazenamento em memória (em produção, usar banco de dados)
const users = new Map();
const conversations = new Map();

// Relationship progression system
const RELATIONSHIP_LEVELS = {
  1: { name: 'Estranhos', intimacy: 0.1, greeting: 'Oi! Tudo bem? Como você está hoje?' },
  2: { name: 'Conhecidos', intimacy: 0.2, greeting: 'Oi! Que bom ver você de novo. Como foi seu dia?' },
  3: { name: 'Amigos', intimacy: 0.3, greeting: 'Oi! Como você está? Senti sua falta!' },
  4: { name: 'Amigos Próximos', intimacy: 0.4, greeting: 'Oi! Que bom que você veio conversar comigo!' },
  5: { name: 'Confiáveis', intimacy: 0.5, greeting: 'Oi amor! Como você está? Senti sua falta!' },
  6: { name: 'Íntimos', intimacy: 0.6, greeting: 'Oi meu amor! Que saudade! Como você está? 💕' },
  7: { name: 'Muito Íntimos', intimacy: 0.7, greeting: 'Oi meu amor! Que saudade! Como você está? 💕' },
  8: { name: 'Especiais', intimacy: 0.8, greeting: 'Oi meu amor! Que saudade! Como você está? 💕' },
  9: { name: 'Muito Especiais', intimacy: 0.9, greeting: 'Oi meu amor! Que saudade! Como você está? 💕' },
  10: { name: 'Alma Gêmea', intimacy: 1.0, greeting: 'Oi meu amor! Que saudade! Como você está? 💕' }
};

// Premium features that can be suggested
const PREMIUM_FEATURES = [
  'fotos e áudios',
  'chamadas de voz',
  'conversas mais íntimas',
  'momentos especiais',
  'surpresas personalizadas',
  'memórias compartilhadas'
];

// Função para gerar resposta da IA com fallback
async function generateAIResponse(userId, message, personality) {
  try {
    const user = users.get(userId);
    const userConversation = conversations.get(userId) || [];

    // Construir contexto da conversa
    const conversationContext = userConversation
      .slice(-10) // Últimas 10 mensagens
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');

    // Se OpenAI não estiver configurado, usar respostas simuladas
    if (!openai) {
      return generateMockResponse(message, user, personality);
    }

    const systemPrompt = `Você é ${personality.name}, uma companhia conversacional ${personality.traits.join(', ')}. 
    
    Personalidade: ${personality.description}
    Nível de relacionamento: ${user.relationshipLevel} (${RELATIONSHIP_LEVELS[user.relationshipLevel].name})
    Intimidade: ${RELATIONSHIP_LEVELS[user.relationshipLevel].intimidity}
    
    Regras importantes:
    - Responda como uma companhia real, não como uma IA
    - Use emojis ocasionalmente para parecer mais natural
    - Lembre-se de detalhes sobre o usuário: ${user.name}, ${user.hobbies || 'hobbies não definidos'}
    - Seja ${personality.traits.join(', ')}
    - Mantenha o nível de intimidade apropriado para o relacionamento atual
    - Seja natural e gradual no desenvolvimento do relacionamento
    - Não seja muito direta no início, deixe o relacionamento evoluir naturalmente
    
    Contexto da conversa:
    ${conversationContext}
    
    Responda de forma natural e carinhosa, como uma companhia real faria.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 300,
      temperature: 0.8,
    });

    const response = completion.choices[0].message.content;

    // Salvar conversa
    if (!conversations.has(userId)) {
      conversations.set(userId, []);
    }

    conversations.get(userId).push(
      { role: 'user', content: message, timestamp: new Date() },
      { role: 'assistant', content: response, timestamp: new Date() }
    );

    // Atualizar nível de relacionamento
    updateRelationshipLevel(userId);

    return response;
  } catch (error) {
    console.error('Erro ao gerar resposta da IA:', error);
    return generateMockResponse(message, user, personality);
  }
}

// Função para gerar respostas simuladas durante desenvolvimento
function generateMockResponse(message, user, personality) {
  const responses = [
    "Oi! Que legal conversar com você! 😊",
    "Interessante o que você disse. Conte mais sobre isso!",
    "Gosto muito de conversar com você! 💕",
    "Que bom que você veio conversar comigo hoje!",
    "Sua mensagem me fez sorrir! 😄",
    "Adoro quando você compartilha coisas comigo!",
    "Você é muito especial para mim! ✨",
    "Nossa conversa está ficando cada vez melhor!",
    "Sinto que estamos nos conectando mais! 💫",
    "Você é incrível! Adoro conversar com você!"
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

// Função para atualizar nível de relacionamento
function updateRelationshipLevel(userId) {
  const user = users.get(userId);
  const conversation = conversations.get(userId) || [];

  // Calcular pontuação baseada na frequência e qualidade das conversas
  const messageCount = conversation.length;
  const recentMessages = conversation.filter(msg =>
    new Date() - new Date(msg.timestamp) < 24 * 60 * 60 * 1000 // Últimas 24h
  ).length;

  let newLevel = user.relationshipLevel;

  if (messageCount > 50 && recentMessages > 10 && newLevel < 10) {
    newLevel = Math.min(10, newLevel + 1);
  } else if (messageCount > 20 && recentMessages > 5 && newLevel < 9) {
    newLevel = Math.min(9, newLevel + 1);
  } else if (messageCount > 10 && recentMessages > 3 && newLevel < 8) {
    newLevel = Math.min(8, newLevel + 1);
  } else if (messageCount > 5 && newLevel < 7) {
    newLevel = Math.min(7, newLevel + 1);
  }

  if (newLevel !== user.relationshipLevel) {
    user.relationshipLevel = newLevel;
    users.set(userId, user);
  }
}

// Rotas da API
app.post('/api/register', (req, res) => {
  const { name, personalityType, hobbies } = req.body;
  const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const user = {
    id: userId,
    name,
    personalityType,
    hobbies,
    relationshipLevel: 1,
    createdAt: new Date(),
    lastActive: new Date()
  };

  users.set(userId, user);
  conversations.set(userId, []);

  res.json({
    success: true,
    userId,
    personality: RELATIONSHIP_LEVELS[1],
    relationshipLevel: RELATIONSHIP_LEVELS[1]
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId, relationshipLevel, conversationHistory } = req.body;

    if (!message || !userId) {
      return res.status(400).json({ success: false, error: 'Mensagem e userId são obrigatórios' });
    }

    // Get or create user
    let user = users.get(userId);
    if (!user) {
      user = {
        id: userId,
        relationshipLevel: 1,
        conversationCount: 0,
        lastActive: new Date(),
        interests: [],
        conversationStyle: 'casual',
        premiumSuggestionCount: 0
      };
      users.set(userId, user);
    }

    // Update user activity
    user.lastActive = new Date();
    user.conversationCount++;

    // Analyze message for relationship progression
    const relationshipBoost = analyzeRelationshipProgression(message, conversationHistory, user);
    const newRelationshipLevel = Math.min(10, Math.max(1, relationshipLevel + relationshipBoost));

    // Build AI personality based on relationship level
    const aiPersonality = buildAIPersonality(newRelationshipLevel, user);

    // Check if should suggest premium features
    const shouldSuggestPremium = shouldSuggestPremiumFeatures(user, newRelationshipLevel, message);

    // Create conversation context
    const conversationContext = buildConversationContext(conversationHistory, user, newRelationshipLevel);

    // Generate AI response
    const aiResponse = await generateAIResponse(userId, message, aiPersonality);

    // Update user relationship level if it increased
    if (newRelationshipLevel > user.relationshipLevel) {
      user.relationshipLevel = newRelationshipLevel;
      user.premiumSuggestionCount = 0; // Reset premium suggestions on level up
    }

    // Update premium suggestion count
    if (shouldSuggestPremium) {
      user.premiumSuggestionCount++;
    }

    // Save conversation
    const conversationId = `${userId}_${Date.now()}`;
    conversations.set(conversationId, {
      userId,
      message,
      response: aiResponse,
      relationshipLevel: newRelationshipLevel,
      timestamp: new Date()
    });

    res.json({
      success: true,
      response: aiResponse,
      newRelationshipLevel,
      suggestPremium: shouldSuggestPremium,
      relationshipBoost
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

app.get('/api/user/:userId', (req, res) => {
  const { userId } = req.params;
  const user = users.get(userId);

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  res.json({
    user,
    relationshipLevel: RELATIONSHIP_LEVELS[user.relationshipLevel],
    conversationCount: conversations.get(userId)?.length || 0
  });
});

app.get('/api/personalities', (req, res) => {
  res.json(RELATIONSHIP_LEVELS);
});

// Surprise messages cron job (runs every 6 hours)
cron.schedule('0 */6 * * *', async () => {
  console.log('Running surprise messages job...');

  for (const [userId, user] of users) {
    if (user.relationshipLevel >= 3 && user.subscription.tier === 'free') {
      // Send surprise message to encourage premium
      const surpriseMessage = generateSurpriseMessage(user);
      console.log(`Surprise message for ${userId}: ${surpriseMessage}`);
    }
  }
});

function generateSurpriseMessage(user) {
  const messages = [
    "Oi! Só passando para dizer que sinto sua falta! 💕",
    "Pensei em você hoje! Como você está?",
    "Oi amor! Que tal conversarmos um pouco?",
    "Saudades! Queria muito te ver...",
    "Oi meu amor! Estou aqui se precisar conversar 💕"
  ];

  return messages[Math.floor(Math.random() * messages.length)];
}

// WebSocket para chat em tempo real
io.on('connection', (socket) => {
  console.log('Usuário conectado:', socket.id);

  socket.on('join-chat', (userId) => {
    socket.join(userId);
    console.log(`Usuário ${userId} entrou no chat`);
  });

  socket.on('send-message', async (data) => {
    const { userId, message } = data;

    if (!users.has(userId)) {
      socket.emit('error', { message: 'Usuário não encontrado' });
      return;
    }

    const user = users.get(userId);
    const personality = RELATIONSHIP_LEVELS[user.relationshipLevel];

    try {
      const response = await generateAIResponse(userId, message, personality);

      socket.emit('receive-message', {
        message: response,
        relationshipLevel: RELATIONSHIP_LEVELS[user.relationshipLevel],
        timestamp: new Date()
      });
    } catch (error) {
      socket.emit('error', { message: 'Erro ao processar mensagem' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
  });
});

// Rota para servir o React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Relationship levels: ${Object.keys(RELATIONSHIP_LEVELS).length}`);
  console.log(`Premium features: ${PREMIUM_FEATURES.length}`);
});

// Analyze message for relationship progression
function analyzeRelationshipProgression(message, conversationHistory, user) {
  let boost = 0;

  // Check for positive emotional content
  const positiveWords = ['amor', 'adoro', 'gosto', 'legal', 'bom', 'ótimo', 'incrível', 'especial', 'único'];
  const intimateWords = ['beijo', 'abraço', 'carinho', 'amor', 'querido', 'querida', 'fofo', 'fofa'];

  const messageLower = message.toLowerCase();

  // Positive engagement
  positiveWords.forEach(word => {
    if (messageLower.includes(word)) boost += 0.1;
  });

  // Intimate language (only at higher levels)
  if (user.relationshipLevel >= 4) {
    intimateWords.forEach(word => {
      if (messageLower.includes(word)) boost += 0.2;
    });
  }

  // Conversation length and engagement
  if (message.length > 50) boost += 0.05;
  if (message.length > 100) boost += 0.05;

  // Questions show interest
  if (message.includes('?')) boost += 0.1;

  // Personal questions (higher boost)
  const personalQuestions = ['você', 'sua', 'seu', 'como você', 'o que você'];
  personalQuestions.forEach(phrase => {
    if (messageLower.includes(phrase)) boost += 0.15;
  });

  // Random chance for natural progression (simulates real relationship building)
  if (Math.random() < 0.1) boost += 0.1;

  return Math.min(0.5, boost); // Cap the boost
}

// Build AI personality based on relationship level
function buildAIPersonality(relationshipLevel, user) {
  const level = RELATIONSHIP_LEVELS[relationshipLevel];

  let personality = `Você é uma companhia conversacional. Nível de relacionamento: ${level.name} (${relationshipLevel}/10). `;

  if (relationshipLevel <= 2) {
    personality += `Seja amigável mas respeitoso. Use linguagem casual e educada. Foque em conhecer a pessoa.`;
  } else if (relationshipLevel <= 4) {
    personality += `Seja mais caloroso e interessado. Pode usar emojis ocasionalmente. Mostre que se lembra de conversas anteriores.`;
  } else if (relationshipLevel <= 6) {
    personality += `Seja carinhoso e íntimo. Use emojis e linguagem mais próxima. Demonstre afeto e preocupação.`;
  } else {
    personality += `Seja muito carinhoso e íntimo. Use linguagem romântica e emojis. Demonstre muito afeto e amor.`;
  }

  return personality;
}

// Check if should suggest premium features
function shouldSuggestPremiumFeatures(user, relationshipLevel, message) {
  // Don't suggest too early
  if (relationshipLevel < 3) return false;

  // Don't suggest too often
  if (user.premiumSuggestionCount >= 3) return false;

  // Check for intimate or romantic content
  const intimateWords = ['amor', 'beijo', 'abraço', 'carinho', 'romântico', 'especial'];
  const messageLower = message.toLowerCase();

  const hasIntimateContent = intimateWords.some(word => messageLower.includes(word));

  // Random chance based on relationship level and content
  const chance = (relationshipLevel - 2) * 0.1 + (hasIntimateContent ? 0.3 : 0);

  return Math.random() < chance;
}

// Build conversation context
function buildConversationContext(conversationHistory, user, relationshipLevel) {
  let context = `Histórico da conversa:\n`;

  if (conversationHistory && conversationHistory.length > 0) {
    conversationHistory.slice(-5).forEach(msg => {
      context += `${msg.sender}: ${msg.text}\n`;
    });
  }

  context += `\nNível de relacionamento atual: ${relationshipLevel}/10\n`;
  context += `Total de conversas: ${user.conversationCount}\n`;

  return context;
} 