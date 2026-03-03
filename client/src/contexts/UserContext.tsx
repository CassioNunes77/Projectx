import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Personality } from '../types';

interface UserContextType {
  user: User | null;
  personality: Personality | null;
  updateUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  value?: {
    user: User | null;
    updateUser: (user: User) => void;
  };
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, value }) => {
  const [internalUser, setInternalUser] = useState<User | null>(null);
  const [personality, setPersonality] = useState<Personality | null>(null);

  const user = value?.user || internalUser;
  const updateUser = value?.updateUser || setInternalUser;

  const contextValue: UserContextType = {
    user,
    personality,
    updateUser,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 