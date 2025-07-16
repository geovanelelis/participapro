import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './Dialog'

interface EventRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  onRegister: (eventId: string, details: { whatToSell: string; expectedResults: string }) => void
  event: {
    id: string
    name: string
  }
}

const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegister,
  event,
}) => {
  const [whatToSell, setWhatToSell] = useState('')
  const [expectedResults, setExpectedResults] = useState('')

  const handleSubmit = () => {
    if (!whatToSell || !expectedResults) {
      alert('Por favor, preencha todos os campos.')
      return
    }
    onRegister(event.id, { whatToSell, expectedResults })
    setWhatToSell('')
    setExpectedResults('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Inscrever-se em: {event.name}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Preencha os detalhes da sua participação no evento.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              O que você planeja vender/expor?
            </label>
            <textarea
              value={whatToSell}
              onChange={(e) => setWhatToSell(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Descreva os produtos ou serviços que você irá apresentar..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Resultados esperados com o evento
            </label>
            <textarea
              value={expectedResults}
              onChange={(e) => setExpectedResults(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Ex: Gerar 10 leads, vender 5 produtos, etc."
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
          >
            Enviar Inscrição
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EventRegistrationModal
