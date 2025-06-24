import { useMutation, useQueryClient } from '@tanstack/react-query';

interface FaqUpdateData {
  id: string;
  question: string;
  answer: string;
}

export const useUpdateFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, question, answer }: FaqUpdateData) => {
      const token = localStorage.getItem('token'); 

      const res = await fetch(`http://localhost:4000/api/faq/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        credentials: 'include',
        body: JSON.stringify({ question, answer }),
      });

      if (!res.ok) throw new Error('Failed to update FAQ');

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faq'] });
    },
  });
};
