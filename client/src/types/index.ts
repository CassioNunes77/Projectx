export interface User {
  id: string;
  name: string;
  personalityType: string;
  hobbies?: string;
  relationshipLevel: number;
  createdAt: Date;
  lastActive: Date;
}

export interface Personality {
  name: string;
  description: string;
  avatar: string;
  traits: string[];
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'image' | 'voice';
}

export interface RelationshipLevel {
  name: string;
  intimacy: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface OnboardingData {
  name: string;
  personalityType: string;
  hobbies: string;
} 