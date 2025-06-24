import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteFaq = () => {
  const queryClient = useQueryClient()
  

  return useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem('token')
      
      const res = await fetch(`http://localhost:4000/api/faq/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        
      })
      
      if (!res.ok) throw new Error('Failed to delete FAQ')
      
      
      if (res.status === 204) {
        return null
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faq'] })
    },
  })
}