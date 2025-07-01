async function deleteComms(commentId: string) {
  const response = await fetch(
    `http://localhost:4000/api/comment/delete/${commentId}`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  )
  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to delete comment')
  }

  return response.json()
}
export default deleteComms
