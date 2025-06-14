'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useAuth } from '@/contexts/authStore'
import {
  Bell,
  Database,
  Eye,
  Globe,
  Key,
  Mail,
  Monitor,
  Moon,
  Palette,
  Save,
  Settings,
  Shield,
  Sun,
  User,
  Volume2,
  Zap,
} from 'lucide-react'
import { useState } from 'react'

export default function Configuracoes() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('geral')
  const [settings, setSettings] = useState({
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    theme: 'light',

    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true,
    reportAlerts: true,
    soundEnabled: true,

    profileVisibility: 'public',
    dataSharing: false,
    analyticsTracking: true,

    autoSave: true,
    backupEnabled: true,
    twoFactorAuth: false,
  })

  const tabs = [
    { id: 'geral', label: 'Geral', icon: <Settings className="w-4 h-4" /> },
    { id: 'conta', label: 'Conta', icon: <User className="w-4 h-4" /> },
    { id: 'notificacoes', label: 'Notificações', icon: <Bell className="w-4 h-4" /> },
    { id: 'privacidade', label: 'Privacidade', icon: <Shield className="w-4 h-4" /> },
    { id: 'sistema', label: 'Sistema', icon: <Database className="w-4 h-4" /> },
  ]

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    alert('Configurações salvas com sucesso!')
    console.log('Configurações salvas:', settings)
  }

  const renderGeralTab = () => (
    <div className="space-y-6">
      {/* Idioma e Região */}
      <Card className="card-modern border-0">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-blue-600" />
            Idioma e Região
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
              <select
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fuso Horário</label>
              <select
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
              >
                <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                <option value="America/New_York">Nova York (GMT-5)</option>
                <option value="Europe/London">Londres (GMT+0)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tema */}
      <Card className="card-modern border-0">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
            <Palette className="w-5 h-5 mr-2 text-blue-600" />
            Aparência
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'light', label: 'Claro', icon: <Sun className="w-5 h-5" /> },
              { id: 'dark', label: 'Escuro', icon: <Moon className="w-5 h-5" /> },
              { id: 'auto', label: 'Automático', icon: <Monitor className="w-5 h-5" /> },
            ].map((theme) => (
              <div
                key={theme.id}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  settings.theme === theme.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleSettingChange('theme', theme.id)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      settings.theme === theme.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {theme.icon}
                  </div>
                  <span className="font-medium text-gray-800">{theme.label}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContaTab = () => (
    <div className="space-y-6">
      {/* Informações Pessoais */}
      <Card className="card-modern border-0">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={user?.name || ''}
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={user?.email || ''}
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cargo/Função</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Coordenador de Eventos"
            />
          </div>
        </CardContent>
      </Card>

      {/* Segurança */}
      <Card className="card-modern border-0">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
            <Key className="w-5 h-5 mr-2 text-blue-600" />
            Segurança
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <button className="w-full p-3 text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors font-medium">
            Alterar Senha
          </button>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificacoesTab = () => (
    <div className="space-y-6">
      <Card className="card-modern border-0">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-blue-600" />
            Preferências de Notificação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              key: 'emailNotifications',
              icon: <Mail className="w-5 h-5" />,
              title: 'Notificações por Email',
              description: 'Receba atualizações importantes por email',
            },
            {
              key: 'pushNotifications',
              icon: <Bell className="w-5 h-5" />,
              title: 'Notificações Push',
              description: 'Notificações em tempo real no navegador',
            },
            {
              key: 'eventReminders',
              icon: <Zap className="w-5 h-5" />,
              title: 'Lembretes de Eventos',
              description: 'Seja notificado sobre eventos próximos',
            },
            {
              key: 'reportAlerts',
              icon: <Eye className="w-5 h-5" />,
              title: 'Alertas de Relatórios',
              description: 'Receba notificações quando relatórios estiverem prontos',
            },
            {
              key: 'soundEnabled',
              icon: <Volume2 className="w-5 h-5" />,
              title: 'Sons de Notificação',
              description: 'Reproduzir sons para notificações',
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">{item.icon}</div>
                <div>
                  <h4 className="font-medium text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings[item.key as keyof typeof settings] as boolean}
                  onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const renderPrivacidadeTab = () => (
    <div className="space-y-6">
      <Card className="card-modern border-0">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Configurações de Privacidade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visibilidade do Perfil
            </label>
            <select
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={settings.profileVisibility}
              onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
            >
              <option value="public">Público</option>
              <option value="private">Privado</option>
              <option value="contacts">Apenas Contatos</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-800">Compartilhamento de Dados</h4>
              <p className="text-sm text-gray-600">
                Permitir compartilhamento para melhorias do sistema
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.dataSharing}
                onChange={(e) => handleSettingChange('dataSharing', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-800">Rastreamento de Analytics</h4>
              <p className="text-sm text-gray-600">Coletar dados de uso para análise e melhorias</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.analyticsTracking}
                onChange={(e) => handleSettingChange('analyticsTracking', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSistemaTab = () => (
    <div className="space-y-6">
      <Card className="card-modern border-0">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
            <Database className="w-5 h-5 mr-2 text-blue-600" />
            Configurações do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-800">Salvamento Automático</h4>
              <p className="text-sm text-gray-600">Salvar alterações automaticamente</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.autoSave}
                onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-800">Backup Automático</h4>
              <p className="text-sm text-gray-600">Criar backups automáticos dos dados</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.backupEnabled}
                onChange={(e) => handleSettingChange('backupEnabled', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <h4 className="font-medium text-yellow-800 mb-2">Informações do Sistema</h4>
            <div className="text-sm text-yellow-700 space-y-1">
              <p>Versão: ParticipaPro v1.0</p>
              <p>Última atualização: 13 de Junho, 2025</p>
              <p>Servidor: Minas Gerais, Brasil</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="card-modern bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white rounded-2xl shadow-xl">
        <div className="relative z-10 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-2">Configurações</h1>
                  <p className="text-purple-100 text-lg">
                    Personalize sua experiência no ParticipaPro
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="card-modern border-0 sticky top-6">
            <CardContent className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo das Configurações */}
        <div className="lg:col-span-3">
          {activeTab === 'geral' && renderGeralTab()}
          {activeTab === 'conta' && renderContaTab()}
          {activeTab === 'notificacoes' && renderNotificacoesTab()}
          {activeTab === 'privacidade' && renderPrivacidadeTab()}
          {activeTab === 'sistema' && renderSistemaTab()}

          <div className="flex justify-end pt-6">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Configurações</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
