// Configuração do banco de dados
// Por enquanto usando armazenamento em memória
// Futuro: MongoDB, PostgreSQL ou SQLite

class Database {
  constructor() {
    this.users = new Map();
    this.conversations = new Map();
    this.relationshipLevels = new Map();
  }

  // Usuários
  async createUser(userData) {
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const user = {
      id: userId,
      ...userData,
      relationshipLevel: 1,
      createdAt: new Date(),
      lastActive: new Date()
    };

    this.users.set(userId, user);
    this.conversations.set(userId, []);
    this.relationshipLevels.set(userId, {
      level: 1,
      experience: 0,
      lastUpdated: new Date()
    });

    return user;
  }

  async getUser(userId) {
    return this.users.get(userId) || null;
  }

  async updateUser(userId, updates) {
    const user = this.users.get(userId);
    if (!user) return null;

    const updatedUser = { ...user, ...updates, lastActive: new Date() };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async deleteUser(userId) {
    this.users.delete(userId);
    this.conversations.delete(userId);
    this.relationshipLevels.delete(userId);
    return true;
  }

  // Conversas
  async addMessage(userId, message) {
    if (!this.conversations.has(userId)) {
      this.conversations.set(userId, []);
    }

    const conversation = this.conversations.get(userId);
    conversation.push({
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    });

    // Manter apenas as últimas 100 mensagens
    if (conversation.length > 100) {
      conversation.splice(0, conversation.length - 100);
    }

    return message;
  }

  async getConversation(userId, limit = 50) {
    const conversation = this.conversations.get(userId) || [];
    return conversation.slice(-limit);
  }

  async getConversationCount(userId) {
    const conversation = this.conversations.get(userId) || [];
    return conversation.length;
  }

  // Relacionamento
  async updateRelationshipLevel(userId, newLevel) {
    const relationship = this.relationshipLevels.get(userId);
    if (!relationship) return null;

    const updatedRelationship = {
      ...relationship,
      level: newLevel,
      lastUpdated: new Date()
    };

    this.relationshipLevels.set(userId, updatedRelationship);
    return updatedRelationship;
  }

  async getRelationshipLevel(userId) {
    return this.relationshipLevels.get(userId) || { level: 1, experience: 0 };
  }

  // Estatísticas
  async getStats(userId) {
    const user = await this.getUser(userId);
    const conversationCount = await this.getConversationCount(userId);
    const relationship = await this.getRelationshipLevel(userId);

    const conversation = await this.getConversation(userId);
    const recentMessages = conversation.filter(msg =>
      new Date() - new Date(msg.timestamp) < 24 * 60 * 60 * 1000
    ).length;

    return {
      user,
      conversationCount,
      recentMessages,
      relationshipLevel: relationship.level,
      daysTogether: Math.floor((new Date() - new Date(user?.createdAt || new Date())) / (1000 * 60 * 60 * 24))
    };
  }

  // Backup e Restore (para desenvolvimento)
  async backup() {
    return {
      users: Array.from(this.users.entries()),
      conversations: Array.from(this.conversations.entries()),
      relationshipLevels: Array.from(this.relationshipLevels.entries()),
      timestamp: new Date()
    };
  }

  async restore(backup) {
    this.users = new Map(backup.users);
    this.conversations = new Map(backup.conversations);
    this.relationshipLevels = new Map(backup.relationshipLevels);
    return true;
  }

  // Limpeza de dados antigos
  async cleanup() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    for (const [userId, user] of this.users.entries()) {
      if (user.lastActive < thirtyDaysAgo) {
        await this.deleteUser(userId);
      }
    }
  }
}

// Instância singleton
const database = new Database();

module.exports = database; 