'use client'

import { Button } from '@/components/ui/Button'
import {
  ArrowRight,
  Mail,
  Shield,
  Sparkles,
  Lock,
  User,
  FileText,
  Briefcase,
  UserPlus,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import React, { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/contexts/authStore'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    cpfCnpj: '',
    profession: '',
    password: '',
    confirmPassword: '',
  })

  const router = useRouter()
  const { user, login, register } = useAuth()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const success = login(email, password)

    if (success) {
      user?.role === 'admin' ? router.push('/dashboard') : router.push('/events')
    } else {
      alert('Credenciais inválidas. Tente novamente.')
      setEmail('')
      setPassword('')
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (registerData.password !== registerData.confirmPassword) {
      alert('As senhas não coincidem.')
      return
    }

    if (registerData.password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    const success = register({
      name: registerData.name,
      email: registerData.email,
      cpfCnpj: registerData.cpfCnpj,
      profession: registerData.profession,
      password: registerData.password,
    })

    if (success) {
      alert('Cadastro realizado com sucesso! Agora você pode fazer login.')
      setIsRegistering(false)
      setRegisterData({
        name: '',
        email: '',
        cpfCnpj: '',
        profession: '',
        password: '',
        confirmPassword: '',
      })
    } else {
      alert('Erro no cadastro. Verifique se o email já não está em uso.')
    }
  }

  const handleRegisterInputChange = (field: string, value: string) => {
    setRegisterData((prev) => ({
      ...prev,
      [field]: value,
    }))
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

          {/* Seção de login/cadastro */}
          <div>
            <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-xl">
              <CardContent className="p-8">
                {!isRegistering ? (
                  // Formulário de Login
                  <>
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
                        <button
                          onClick={() => setIsRegistering(true)}
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                          Cadastre-se aqui
                        </button>
                      </p>
                    </div>
                  </>
                ) : (
                  // Formulário de Cadastro
                  <>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Cadastro de Participante
                      </h2>
                      <p className="text-gray-600">Preencha os dados para criar sua conta</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleRegister}>
                      <div>
                        <Input
                          label="Nome Completo"
                          type="text"
                          id="name"
                          name="name"
                          value={registerData.name}
                          onChange={(e) => handleRegisterInputChange('name', e.target.value)}
                          placeholder="Seu nome completo"
                          required
                          icon={<User size={18} />}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                        />
                      </div>

                      <div>
                        <Input
                          label="Email"
                          type="email"
                          id="registerEmail"
                          name="registerEmail"
                          value={registerData.email}
                          onChange={(e) => handleRegisterInputChange('email', e.target.value)}
                          placeholder="seu.email@exemplo.com"
                          required
                          icon={<Mail size={18} />}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                        />
                      </div>

                      <div>
                        <Input
                          label="CPF/CNPJ"
                          type="text"
                          id="cpfCnpj"
                          name="cpfCnpj"
                          value={registerData.cpfCnpj}
                          onChange={(e) => handleRegisterInputChange('cpfCnpj', e.target.value)}
                          placeholder="000.000.000-00 ou 00.000.000/0000-00"
                          required
                          icon={<FileText size={18} />}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                        />
                      </div>

                      <div>
                        <Input
                          label="Profissão"
                          type="text"
                          id="profession"
                          name="profession"
                          value={registerData.profession}
                          onChange={(e) => handleRegisterInputChange('profession', e.target.value)}
                          placeholder="Sua profissão"
                          required
                          icon={<Briefcase size={18} />}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                        />
                      </div>

                      <div>
                        <Input
                          label="Senha"
                          type="password"
                          id="registerPassword"
                          name="registerPassword"
                          value={registerData.password}
                          onChange={(e) => handleRegisterInputChange('password', e.target.value)}
                          placeholder="••••••••"
                          required
                          icon={<Lock size={18} />}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                        />
                      </div>

                      <div>
                        <Input
                          label="Confirmar Senha"
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={registerData.confirmPassword}
                          onChange={(e) =>
                            handleRegisterInputChange('confirmPassword', e.target.value)
                          }
                          placeholder="••••••••"
                          required
                          icon={<Lock size={18} />}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                        />
                      </div>

                      <Button
                        type="submit"
                        fullWidth
                        variant="primary"
                        size="lg"
                        icon={<UserPlus size={18} />}
                      >
                        Cadastrar
                      </Button>
                    </form>

                    <div className="mt-8 text-center">
                      <p className="text-sm text-gray-600">
                        Já tem uma conta?{' '}
                        <button
                          onClick={() => setIsRegistering(false)}
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                          Fazer login
                        </button>
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Credenciais de Demonstração */}
          {!isRegistering && (
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
          )}
        </div>
      </div>
    </div>
  )
}
