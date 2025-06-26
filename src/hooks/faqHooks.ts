import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFaqs, addFaq, deleteFaq, updateFaq } from '@/api/faq'

export const useGetFaqs = () => useQuery({
  queryKey: ['faq'],
  queryFn: getFaqs,
})

export const useCreateFaq = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addFaq,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['faq'] }),
  })
}

export const useDeleteFaq = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteFaq,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['faq'] }),
  })
}

export const useUpdateFaq = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, question, answer }: { id: string; question: string; answer: string }) =>
      updateFaq(id, { question, answer }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['faq'] }),
  })
}
