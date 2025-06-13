'use client'

import { Button } from '@/components/ui/Button'
import { ArrowRight, Mail, Shield, Sparkles, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import React, { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { mockUsers } from '@/mock/data'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const user = mockUsers.find((user) => user.email === email && user.password === password)

    if (user) {
      router.push('/dashboard')
    } else {
      alert('Credenciais inválidas. Tente novamente.')
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="z-10 relative text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                ParticipaPro
              </h1>
            </div>
            <p className="text-gray-600">Sistema de Monitoramento de Participação</p>
          </div>

          {/* Seção de login */}
          <div>
            <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-xl">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Bem-vindo de volta!</h2>
                  <p className="text-gray-600">Faça login para acessar sua conta</p>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                  <div>
                    <Input
                      label="Email"
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu.email@exemplo.com"
                      required
                      icon={<Mail size={18} />}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                    />
                  </div>

                  <div>
                    <Input
                      label="Senha"
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      icon={<Lock size={18} />}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
                    </label>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
                    >
                      Esqueci minha senha
                    </a>
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight size={18} />}
                  >
                    Entrar
                  </Button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Não tem uma conta?{' '}
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      Solicite acesso
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Credenciais de Demonstração */}
          <div className="mt-8 text-center">
            <div className="bg-white/80 backdrop-blur-md border border-blue-200 rounded-2xl p-6">
              <p className="font-semibold text-blue-800 mb-3 flex items-center justify-center">
                <Shield className="w-4 h-4 mr-2" />
                Credenciais de Demonstração
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-gray-700">Email:</span>{' '}
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">
                    admin@participapro.com
                  </code>
                </p>
                <p>
                  <span className="font-medium text-gray-700">Senha:</span>{' '}
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">admin123</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
