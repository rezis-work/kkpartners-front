import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import getBlogs from '@/hooks/blogs/getBlogs'
import { updateBlog, deleteBlog } from '@/hooks/blogs/blogs'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Route = createFileRoute('/_authenticated/dashboard/updateBlogs')({
  component: RouteComponent,
})

function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  loading,
}: {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm text-center relative">
        <h3 className="text-lg font-bold mb-4 text-red-700">
          Are you sure you want to delete this blog?
        </h3>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

function EditBlogModal({ blog, onClose, onSave, isPending }: any) {
  const [form, setForm] = useState({ ...blog })
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Edit Blog</h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            onSave(form)
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="p-3 border rounded-xl"
              value={form.title}
              onChange={(e) =>
                setForm((f: any) => ({ ...f, title: e.target.value }))
              }
              placeholder="Title"
              required
            />
            <input
              className="p-3 border rounded-xl"
              value={form.subTitle}
              onChange={(e) =>
                setForm((f: any) => ({ ...f, subTitle: e.target.value }))
              }
              placeholder="Subtitle"
            />
            <input
              className="p-3 border rounded-xl"
              value={form.slug}
              onChange={(e) =>
                setForm((f: any) => ({ ...f, slug: e.target.value }))
              }
              placeholder="Slug"
              required
            />
            <input
              className="p-3 border rounded-xl"
              value={form.author}
              onChange={(e) =>
                setForm((f: any) => ({ ...f, author: e.target.value }))
              }
              placeholder="Author"
              required
            />
            <input
              className="p-3 border rounded-xl"
              value={form.category}
              onChange={(e) =>
                setForm((f: any) => ({ ...f, category: e.target.value }))
              }
              placeholder="Category"
              required
            />
            <input
              className="p-3 border rounded-xl"
              value={form.tags?.join(',') || ''}
              onChange={(e) =>
                setForm((f: any) => ({
                  ...f,
                  tags: e.target.value.split(',').map((t: string) => t.trim()),
                }))
              }
              placeholder="Tags (comma separated)"
            />
          </div>
          <textarea
            className="w-full p-3 border rounded-xl"
            value={form.content}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, content: e.target.value }))
            }
            placeholder="Content"
            rows={4}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="p-3 border rounded-xl"
              value={form.share?.facebook || ''}
              onChange={(e) =>
                setForm((f: any) => ({
                  ...f,
                  share: { ...f.share, facebook: e.target.value },
                }))
              }
              placeholder="Facebook URL"
            />
            <input
              className="p-3 border rounded-xl"
              value={form.share?.linkedin || ''}
              onChange={(e) =>
                setForm((f: any) => ({
                  ...f,
                  share: { ...f.share, linkedin: e.target.value },
                }))
              }
              placeholder="LinkedIn URL"
            />
            <input
              className="p-3 border rounded-xl"
              value={form.share?.x || ''}
              onChange={(e) =>
                setForm((f: any) => ({
                  ...f,
                  share: { ...f.share, x: e.target.value },
                }))
              }
              placeholder="Twitter (X) URL"
            />
            <input
              className="p-3 border rounded-xl"
              value={form.share?.instagram || ''}
              onChange={(e) =>
                setForm((f: any) => ({
                  ...f,
                  share: { ...f.share, instagram: e.target.value },
                }))
              }
              placeholder="Instagram URL"
            />
          </div>
          <textarea
            className="w-full p-3 border rounded-xl"
            value={form.lawWays || ''}
            onChange={(e) =>
              setForm((f: any) => ({ ...f, lawWays: e.target.value }))
            }
            placeholder="Legal considerations"
            rows={2}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}

function RouteComponent() {
  const queryClient = useQueryClient()
  const [page] = useState(1)
  const [editBlog, setEditBlog] = useState<any>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['blogs', page],
    queryFn: () => getBlogs(page),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setDeleteId(null)
      toast.success('Blog deleted successfully!')
    },
    onError: (e: any) => {
      toast.error(e?.message || 'Failed to delete blog')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, update }: { id: string; update: any }) =>
      updateBlog(id, update),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setEditBlog(null)
      toast.success('Blog updated successfully!')
    },
    onError: (e: any) => {
      toast.error(e?.message || 'Failed to update blog')
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10 px-2 sm:px-0">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-blue-900 mb-1">
              Manage Blogs
            </h2>
            <p className="text-gray-600 text-md">
              Update or delete your blog posts below.
            </p>
          </div>
          <Link to="/dashboard">
            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow transition-all duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Back to Dashboard
            </button>
          </Link>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-40 text-blue-700 font-semibold text-lg">
            Loading blogs...
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center h-40 text-red-600 font-semibold text-lg">
            Error loading blogs.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {data?.data?.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-8 text-center text-gray-500 text-lg"
                    >
                      No blogs found.
                    </td>
                  </tr>
                )}
                {data?.data?.map((blog: any, idx: number) => (
                  <tr
                    key={blog._id}
                    className={idx % 2 === 0 ? 'bg-gray-50' : ''}
                  >
                    <td className="py-4 px-6 font-medium text-gray-900 max-w-xs truncate">
                      {blog.title}
                    </td>
                    <td className="py-4 px-6 text-gray-700">{blog.author}</td>
                    <td className="py-4 px-6 flex flex-wrap gap-2">
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-150"
                        onClick={() => setEditBlog(blog)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-150"
                        onClick={() => setDeleteId(blog._id)}
                        disabled={
                          deleteMutation.isPending && deleteId === blog._id
                        }
                      >
                        {deleteMutation.isPending && deleteId === blog._id
                          ? 'Deleting...'
                          : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {editBlog && (
          <EditBlogModal
            blog={editBlog}
            onClose={() => setEditBlog(null)}
            isPending={updateMutation.isPending}
            onSave={(update: any) =>
              updateMutation.mutate({ id: editBlog._id, update })
            }
          />
        )}
        <ConfirmDialog
          open={!!deleteId}
          onCancel={() => setDeleteId(null)}
          onConfirm={() => deleteMutation.mutate(deleteId!)}
          loading={deleteMutation.isPending}
        />
      </div>
    </div>
  )
}
