import ReactMarkdown from 'react-markdown';

interface ResumeResultProps {
  resume: string
}

export default function ResumeResult({ resume }: ResumeResultProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="prose max-w-none">
          <ReactMarkdown>{resume}</ReactMarkdown>
        </div>
        
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            打印
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            重新生成
          </button>
        </div>
      </div>
    </div>
  )
}