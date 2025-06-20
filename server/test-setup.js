// Configuração global para testes
require('dotenv').config({ path: '.env.test' });

// Mock do console.log para reduzir ruído nos testes
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Timeout global para testes
jest.setTimeout(10000);

// Mock do OpenAI para testes
jest.mock('openai', () => ({
  OpenAI: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: 'Resposta simulada da IA para testes'
              }
            }
          ]
        })
      }
    }
  }))
})); 