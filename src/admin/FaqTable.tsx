
interface FaqItem {
    _id: string;
    question: string;
    answer: string;
  }

type Props = {
  faqs: FaqItem[]
  onEdit: (faq: FaqItem) => void
  onDelete: (faq: FaqItem) => void
}

export default function FaqTable({ faqs, onEdit, onDelete }: Props) {
  return (
    <table className="w-full border border-burgundy shadow-md rounded overflow-hidden">
  <thead className="bg-burgundy text-white">
    <tr>
      <th className="p-3 text-left text-sm">Question</th>
      <th className="p-3 text-left text-sm">Answer</th>
      <th className="p-3 text-center text-sm">Actions</th>
    </tr>
  </thead>
  <tbody>
    {faqs.map((faq, index) => (
      <tr
        key={faq._id}
        className={`${
          index % 2 === 0 ? 'bg-white' : 'bg-[#fef4f4]'
        } border-t border-burgundy hover:bg-[#fce8e8] transition-all`}
      >
        <td className="p-3 text-sm">{faq.question}</td>
        <td className="p-3 text-sm">{faq.answer}</td>
        <td className="p-3 text-center space-x-2">
          <button className="text-burgundy hover:underline hover:font-semibold">Edit</button>
          <button className="text-red-600 hover:underline hover:font-semibold">Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

  )
}

