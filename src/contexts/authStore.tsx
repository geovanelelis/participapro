'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { mockUsers } from '@/mock/data'

type User = (typeof mockUsers)[number]

interface RegisterData {
  name: string
  email: string
  cpfCnpj: string
  profession: string
  password: string
}

interface AuthContextType {
  user: User | null
  users: User[]
  login: (email: string, password: string) => boolean
  register: (data: RegisterData) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>(mockUsers)

  const login = (email: string, password: string): boolean => {
    const foundUser = users.find((user) => user.email === email && user.password === password)
    if (foundUser) {
      setUser(foundUser)
      return true
    }
    return false
  }

  const register = (data: RegisterData): boolean => {
    // Verifica se o email já existe
    const existingUser = users.find((user) => user.email === data.email)
    if (existingUser) {
      return false
    }

    // Cria novo usuário
    const newUser: User = {
      id: users.length + 1,
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'participante',
      cpfCnpj: data.cpfCnpj,
      profession: data.profession,
      createdAt: new Date().toISOString(),
    }

    setUsers((prevUsers) => [...prevUsers, newUser])
    return true
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, users, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
