import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './Dialog'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import {
  Save,
  Plus,
  Trash2,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Calendar,
  MapPin,
} from 'lucide-react'

interface EventReport {
  eventId: string
  actualParticipants: number
  satisfactionScore: number
  keyTakeaways: string[]
  nextSteps: string[]
  additionalNotes: string
  reportDate: string
}

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (report: EventReport) => void
  event: {
    id: string
    name: string
    description: string
    expectedResults: string
    startDate: string
    endDate: string
    location: string
    type: string
  } | null
  existingReport?: EventReport | null
}

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onSave,
  event,
  existingReport,
}) => {
  const [currentReport, setCurrentReport] = useState<EventReport>({
    eventId: '',
    actualParticipants: 0,
    satisfactionScore: 0,
    keyTakeaways: [''],
    nextSteps: [''],
    additionalNotes: '',
    reportDate: new Date().toISOString().split('T')[0],
  })

  // Resetar o formulário quando o modal abrir/fechar ou quando o evento mudar
  useEffect(() => {
    if (isOpen && event) {
      if (existingReport) {
        setCurrentReport(existingReport)
      } else {
        setCurrentReport({
          eventId: event.id,
          actualParticipants: 0,
          satisfactionScore: 0,
          keyTakeaways: [''],
          nextSteps: [''],
          additionalNotes: '',
          reportDate: new Date().toISOString().split('T')[0],
        })
      }
    }
  }, [isOpen, event, existingReport])

  const handleSave = () => {
    if (!event) return

    // Validar campos obrigatórios
    if (currentReport.actualParticipants <= 0 || currentReport.satisfactionScore <= 0) {
      alert('Por favor, preencha o número de participantes e a pontuação de satisfação.')
      return
    }

    if (currentReport.satisfactionScore < 1 || currentReport.satisfactionScore > 5) {
      alert('A pontuação de satisfação deve estar entre 1 e 5.')
      return
    }

    // Filtrar takeaways e next steps vazios
    const filteredTakeaways = currentReport.keyTakeaways.filter((item) => item.trim() !== '')
    const filteredNextSteps = currentReport.nextSteps.filter((item) => item.trim() !== '')

    if (filteredTakeaways.length === 0) {
      alert('Por favor, adicione pelo menos um aprendizado principal.')
      return
    }

    if (filteredNextSteps.length === 0) {
      alert('Por favor, adicione pelo menos um próximo passo.')
      return
    }

    const updatedReport = {
      ...currentReport,
      keyTakeaways: filteredTakeaways,
      nextSteps: filteredNextSteps,
    }

    onSave(updatedReport)
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  const handleAddTakeaway = () => {
    setCurrentReport({
      ...currentReport,
      keyTakeaways: [...currentReport.keyTakeaways, ''],
    })
  }

  const handleAddNextStep = () => {
    setCurrentReport({
      ...currentReport,
      nextSteps: [...currentReport.nextSteps, ''],
    })
  }

  const handleRemoveTakeaway = (index: number) => {
    if (currentReport.keyTakeaways.length > 1) {
      const updatedTakeaways = currentReport.keyTakeaways.filter((_, i) => i !== index)
      setCurrentReport({
        ...currentReport,
        keyTakeaways: updatedTakeaways,
      })
    }
  }

  const handleRemoveNextStep = (index: number) => {
    if (currentReport.nextSteps.length > 1) {
      const updatedNextSteps = currentReport.nextSteps.filter((_, i) => i !== index)
      setCurrentReport({
        ...currentReport,
        nextSteps: updatedNextSteps,
      })
    }
  }

  const handleUpdateTakeaway = (index: number, value: string) => {
    const updatedTakeaways = [...currentReport.keyTakeaways]
    updatedTakeaways[index] = value
    setCurrentReport({
      ...currentReport,
      keyTakeaways: updatedTakeaways,
    })
  }

  const handleUpdateNextStep = (index: number, value: string) => {
    const updatedNextSteps = [...currentReport.nextSteps]
    updatedNextSteps[index] = value
    setCurrentReport({
      ...currentReport,
      nextSteps: updatedNextSteps,
    })
  }

  if (!event) return null

  const formattedStartDate = new Date(event.startDate).toLocaleDateString('pt-BR')
  const formattedEndDate = new Date(event.endDate).toLocaleDateString('pt-BR')

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {existingReport ? 'Editar Relatório' : 'Criar Relatório'}: {event.name}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Documente os resultados alcançados e planeje os próximos passos para este evento.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-6">
          {/* Informações do Evento */}
          <Card className="card-modern border-0 bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Informações do Evento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {formattedStartDate} - {formattedEndDate}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Resultados Esperados:</h4>
                <p className="text-sm text-gray-600">{event.expectedResults}</p>
              </div>
            </CardContent>
          </Card>

          {/* Dados Básicos do Relatório */}
          <Card className="card-modern border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Resultados Alcançados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Número Real de Participantes *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      min="0"
                      value={currentReport.actualParticipants}
                      onChange={(e) =>
                        setCurrentReport({
                          ...currentReport,
                          actualParticipants: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Ex: 150"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pontuação de Satisfação (1-5) *
                  </label>
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={currentReport.satisfactionScore}
                      onChange={(e) =>
                        setCurrentReport({
                          ...currentReport,
                          satisfactionScore: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Ex: 4.2"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Avaliação geral dos participantes sobre o evento
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Principais Aprendizados */}
          <Card className="card-modern border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Principais Aprendizados
                </div>
                <button
                  onClick={handleAddTakeaway}
                  className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar</span>
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentReport.keyTakeaways.map((takeaway, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      value={takeaway}
                      onChange={(e) => handleUpdateTakeaway(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Digite um aprendizado importante do evento..."
                    />
                    {currentReport.keyTakeaways.length > 1 && (
                      <button
                        onClick={() => handleRemoveTakeaway(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remover aprendizado"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Próximos Passos */}
          <Card className="card-modern border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-between">
                <div className="flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2 text-blue-600" />
                  Próximos Passos
                </div>
                <button
                  onClick={handleAddNextStep}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar</span>
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentReport.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      value={step}
                      onChange={(e) => handleUpdateNextStep(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Digite uma ação ou melhoria para futuros eventos..."
                    />
                    {currentReport.nextSteps.length > 1 && (
                      <button
                        onClick={() => handleRemoveNextStep(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remover próximo passo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Observações Adicionais */}
          <Card className="card-modern border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Observações Adicionais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={currentReport.additionalNotes}
                onChange={(e) =>
                  setCurrentReport({
                    ...currentReport,
                    additionalNotes: e.target.value,
                  })
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Adicione observações, comentários ou informações relevantes sobre o evento, desafios enfrentados, feedback específico dos participantes, etc."
              />
            </CardContent>
          </Card>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
          <button
            onClick={handleClose}
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>{existingReport ? 'Atualizar Relatório' : 'Salvar Relatório'}</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReportModal
