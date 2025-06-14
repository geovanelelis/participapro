'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { mockUsers } from '@/mock/data'

type User = (typeof mockUsers)[number]

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(mockUsers[0])

  const login = (email: string, password: string) => {
    const foundUser = mockUsers.find((user) => user.email === email && user.password === password)
    if (foundUser) {
      setUser(foundUser)
    }
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
