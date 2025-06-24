import { useMutation, useQueryClient } from '@tanstack/react-query'

type FaqInput = {
  question: string
  answer: string
}

export const useCreateFaq = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newFaq: FaqInput) => {
    
      const res = await fetch('http://localhost:4000/api/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newFaq),
      })
      if (!res.ok) throw new Error('Failed to create FAQ')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faq'] })
    },
  })
}
