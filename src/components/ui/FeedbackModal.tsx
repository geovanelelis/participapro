import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './Dialog'
import { Star, Send, CheckCircle, XCircle } from 'lucide-react'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitFeedback: (
    eventId: string,
    feedback: {
      rating: number
      comment: string
      resultsAchieved: boolean
    }
  ) => void
  event: {
    id: string
    name: string
    expectedResults: string
  }
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmitFeedback,
  event,
}) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [resultsAchieved, setResultsAchieved] = useState<boolean | null>(null)

  const handleSubmit = () => {
    if (rating === 0 || !comment.trim() || resultsAchieved === null) {
      alert(
        'Por favor, preencha todos os campos: avaliação, comentário e se os resultados foram alcançados.'
      )
      return
    }

    onSubmitFeedback(event.id, {
      rating,
      comment: comment.trim(),
      resultsAchieved,
    })

    // Reset form
    setRating(0)
    setComment('')
    setResultsAchieved(null)
    onClose()
  }

  const handleClose = () => {
    // Reset form when closing
    setRating(0)
    setComment('')
    setResultsAchieved(null)
    onClose()
  }

  const renderStars = (currentRating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-8 h-8 cursor-pointer transition-colors ${
          i < currentRating ? 'text-yellow-500 fill-current' : 'text-gray-300 hover:text-yellow-400'
        }`}
        onClick={() => setRating(i + 1)}
      />
    ))
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Avaliar Evento: {event.name}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Compartilhe sua experiência e ajude-nos a melhorar nossos eventos.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-6">
          {/* Resultados Esperados */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Resultados esperados para este evento:
            </h4>
            <p className="text-sm text-gray-600">{event.expectedResults}</p>
          </div>

          {/* Avaliação com Estrelas */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Sua avaliação geral do evento:
            </label>
            <div className="flex space-x-1 mb-2">{renderStars(rating)}</div>
            <p className="text-xs text-gray-500">
              {rating === 0 && 'Clique nas estrelas para avaliar'}
              {rating === 1 && 'Muito ruim'}
              {rating === 2 && 'Ruim'}
              {rating === 3 && 'Regular'}
              {rating === 4 && 'Bom'}
              {rating === 5 && 'Excelente'}
            </p>
          </div>

          {/* Comentário */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Seu feedback detalhado:
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
              placeholder="Compartilhe sua experiência, pontos positivos, sugestões de melhoria..."
            />
          </div>

          {/* Resultados Alcançados */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Os resultados esperados foram alcançados?
            </label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="resultsAchieved"
                  value="true"
                  checked={resultsAchieved === true}
                  onChange={() => setResultsAchieved(true)}
                  className="sr-only"
                />
                <div
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl border-2 transition-all ${
                    resultsAchieved === true
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 text-gray-600 hover:border-green-300'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Sim</span>
                </div>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="resultsAchieved"
                  value="false"
                  checked={resultsAchieved === false}
                  onChange={() => setResultsAchieved(false)}
                  className="sr-only"
                />
                <div
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl border-2 transition-all ${
                    resultsAchieved === false
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 text-gray-600 hover:border-red-300'
                  }`}
                >
                  <XCircle className="w-5 h-5" />
                  <span className="font-medium">Não</span>
                </div>
              </label>
            </div>
          </div>
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
            onClick={handleSubmit}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 flex items-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>Enviar Feedback</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FeedbackModal
