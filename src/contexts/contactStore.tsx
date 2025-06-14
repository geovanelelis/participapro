import { create } from 'zustand'
import { mockContacts } from '@/mock/data'

type Contact = (typeof mockContacts)[number]

interface ContactStore {
  contacts: Contact[]
  addContact: (contact: Contact) => void
  updateContact: (id: number, updatedContact: Partial<Contact>) => void
  deleteContact: (id: number) => void
}
export const useContactStore = create<ContactStore>((set) => ({
  contacts: mockContacts,

  addContact: (contact) =>
    set((state) => ({
      contacts: [...state.contacts, contact],
    })),

  updateContact: (id, updatedContact) =>
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      ),
    })),

  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    })),
}))
