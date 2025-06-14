import { create } from 'zustand'
import { mockFeedbacks } from '@/mock/data'

type Feedback = (typeof mockFeedbacks)[number]
interface FeedbackStore {
  feedbacks: Feedback[]
  addFeedback: (feedback: Feedback) => void
  updateFeedback: (id: number, updatedFeedback: Partial<Feedback>) => void
  deleteFeedback: (id: number) => void
}
export const useFeedbackStore = create<FeedbackStore>((set) => ({
  feedbacks: mockFeedbacks,

  addFeedback: (feedback) =>
    set((state) => ({
      feedbacks: [...state.feedbacks, feedback],
    })),

  updateFeedback: (id, updatedFeedback) =>
    set((state) => ({
      feedbacks: state.feedbacks.map((feedback) =>
        feedback.id === id ? { ...feedback, ...updatedFeedback } : feedback
      ),
    })),

  deleteFeedback: (id) =>
    set((state) => ({
      feedbacks: state.feedbacks.filter((feedback) => feedback.id !== id),
    })),
}))
