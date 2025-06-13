import { create } from 'zustand'
import { mockEvents } from '@/mock/data'

export type Event = (typeof mockEvents)[number]

interface EventStore {
  events: Event[]
  getEventById: (id: string) => Event | undefined
  addEvent: (event: Event) => void
  removeEvent: (id: string) => void
  updateEvent: (updated: Event) => void
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: mockEvents,

  getEventById: (id: string) => {
    return get().events.find((e) => e.id === id)
  },

  addEvent: (event: Event) => {
    set((state) => ({ events: [...state.events, event] }))
  },

  removeEvent: (id: string) => {
    set((state) => ({ events: state.events.filter((e) => e.id !== id) }))
  },

  updateEvent: (updated) => {
    set((state) => ({
      events: state.events.map((e) => (e.id === updated.id ? updated : e)),
    }))
  },
}))
