import { useState, useEffect, useCallback } from 'react';
import type { User } from '@/types';
import { getCurrentUser, setCurrentUser, login as storageLogin, logout as storageLogout, register as storageRegister } from '@/lib/storage';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = useCallback((email: string, password: string): User | null => {
    const loggedInUser = storageLogin(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    return loggedInUser;
  }, []);

  const logout = useCallback(() => {
    storageLogout();
    setUser(null);
  }, []);

  const register = useCallback((userData: Omit<User, 'id' | 'createdAt'>): User => {
    const newUser = storageRegister(userData);
    setUser(newUser);
    return newUser;
  }, []);

  const updateUserState = useCallback((updatedUser: User) => {
    setCurrentUser(updatedUser);
    setUser(updatedUser);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    updateUserState,
  };
}
