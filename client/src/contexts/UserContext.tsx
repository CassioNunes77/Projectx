import React, { createContext, useContext } from 'react';
import { User, Personality } from '../types';

interface UserContextType {
  user: User | null;
  personality: Personality | null;
  updateUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 